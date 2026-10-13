import sys, os, re, json, html
from html.parser import HTMLParser
root = sys.argv[1]
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.title=None; s.intitle=False; s.meta={}; s.links=[]; s.h=[]; s.inh=None; s.htext=''; s.imgs=[]; s.ld=[]; s.inld=False; s.ldbuf=''; s.anchors=[]; s.textlen=0; s.inscript=False
    def handle_starttag(s,t,a):
        a=dict(a)
        if t=='title': s.intitle=True; s.title=''
        if t=='meta':
            k=a.get('name') or a.get('property')
            if k: s.meta[k]=a.get('content')
        if t=='link' and a.get('rel')=='canonical': s.links.append(a.get('href'))
        if t in('h1','h2','h3'): s.inh=t; s.htext=''
        if t=='img': s.imgs.append((a.get('src'),a.get('alt')))
        if t=='script' and a.get('type')=='application/ld+json': s.inld=True; s.ldbuf=''
        elif t in ('script','style'): s.inscript=True
        if t=='a': s.anchors.append(a.get('href'))
    def handle_endtag(s,t):
        if t=='title': s.intitle=False
        if t==s.inh: s.h.append((t,re.sub(r'\s+',' ',s.htext).strip())); s.inh=None
        if t=='script' and s.inld: s.inld=False; s.ld.append(s.ldbuf)
        if t in ('script','style'): s.inscript=False
    def handle_data(s,d):
        if s.intitle: s.title+=d
        if s.inh: s.htext+=d
        if s.inld: s.ldbuf+=d
        elif not s.inscript: s.textlen+=len(d.strip())
for dp,dn,fn in os.walk(root):
    for f in sorted(fn):
        if not f.endswith('.html') or f.startswith('__') or '404' in f or '_not-found' in dp: continue
        p=P(); p.feed(open(os.path.join(dp,f),encoding='utf8').read())
        rel=os.path.relpath(os.path.join(dp,f),root)
        types=[]
        for l in p.ld:
            try:
                j=json.loads(l); j=j if isinstance(j,list) else [j]; types+= [x.get('@type') for x in j]
            except Exception as e: types.append('INVALID')
        h1=[t for k,t in p.h if k=='h1']
        noalt=[i for i in p.imgs if i[1] is None]
        emptyalt=[i for i in p.imgs if i[1]=='']
        print(f"== {rel}\n title({len(p.title or '')}): {p.title}\n desc({len(p.meta.get('description') or '')}): {p.meta.get('description')}\n robots: {p.meta.get('robots')} | canonical: {p.links}\n h1: {h1} | h2 count: {sum(1 for k,_ in p.h if k=='h2')}\n imgs: {len(p.imgs)} noalt:{len(noalt)} emptyalt:{len(emptyalt)} | ld: {types} | visible text chars: {p.textlen}")
