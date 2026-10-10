import Link from 'next/link';
import { nav, site } from '@/content/site';
import { Monogram } from './Logo';
import { Arrow } from './Arrow';
import s from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={`grid ${s.top}`}>
        <p className={`label ${s.kicker}`}>Visit</p>
        <p className={`d2 ${s.line}`} data-m="lines">
          By appointment,
          <br />
          in Andheri West, Mumbai.
        </p>
        <Link href="/contact" className={s.cta}>
          <span className="label">Request an appointment</span>
          <Arrow className={s.arrow} />
        </Link>
      </div>

      <div className={`grid ${s.cols}`}>
        <div className={s.col}>
          <p className={`label ${s.h}`}>Studio</p>
          <address className="small">
            {site.address.lines.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </address>
          <a className={`small link link--static ${s.after}`} href={site.mapUrl} target="_blank" rel="noopener noreferrer">
            Open in Maps<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className={s.col}>
          <p className={`label ${s.h}`}>Contact</p>
          <p className={`small ${s.stack}`}>
            <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
            <a className="link" href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
        <nav className={s.col} aria-label="Footer">
          <p className={`label ${s.h}`}>Index</p>
          <ul className={`small ${s.stack}`}>
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="link" href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.col}>
          <p className={`label ${s.h}`}>Follow</p>
          <p className="small">
            <a className="link" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>

      <div className={`wrap ${s.base}`}>
        <Monogram className={s.seal} />
        <div className={s.legal}>
          <p className="small">© {year} {site.name}</p>
          <p className="small">
            <Link className="link" href="/privacy-policy">Privacy</Link>
            <span aria-hidden="true"> · </span>
            <Link className="link" href="/terms-and-conditions">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
