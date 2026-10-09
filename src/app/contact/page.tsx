import type { Metadata } from 'next';
import { Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import { ContactForm } from '@/components/contact/ContactForm';
import { site } from '@/content/site';
import s from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name} in Andheri West, Mumbai — by appointment only. ${site.email} · ${site.phone}.`,
  alternates: { canonical: '/contact' },
  openGraph: { title: `Contact — ${site.name}`, url: '/contact', images: [{ url: '/og/contact.jpg', width: 1200, height: 630 }] },
};

export default function ContactPage() {
  return (
    <Page>
      <PageHead kicker="Contact" title="Write to the studio" tone="By appointment only" />
      <div className={`grid ${s.body}`}>
        <aside className={s.details} aria-label="Studio details">
          <div className={s.block}>
            <p className="label label--muted">Email</p>
            <a className={`link ${s.big}`} href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className={s.block}>
            <p className="label label--muted">Telephone</p>
            <a className={`link ${s.big}`} href={site.phoneHref}>{site.phone}</a>
          </div>
          <div className={s.block}>
            <p className="label label--muted">Studio</p>
            <address className={s.addr}>
              {site.address.lines.map((l) => (
                <span key={l}>{l}<br /></span>
              ))}
            </address>
            <a className="small link link--static" href={site.mapUrl} target="_blank" rel="noopener noreferrer">
              Open in Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className={s.block}>
            <p className="label label--muted">Follow</p>
            <a className="link" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </aside>
        <section className={s.formCol} aria-labelledby="form-h">
          <h2 id="form-h" className="sr-only">Inquiry form</h2>
          <ContactForm />
        </section>
      </div>
    </Page>
  );
}
