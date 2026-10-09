import Link from 'next/link';
import { Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import s from '@/components/Prose.module.css';

export default function NotFound() {
  return (
    <Page>
      <PageHead kicker="404" title="This room is empty" tone="The page could not be found" />
      <div className={`grid ${s.body}`}>
        <p className={`label ${s.updated}`}>Continue</p>
        <ul className={`body ${s.text}`}>
          <li><Link className="link" href="/projects">The index of projects</Link></li>
          <li><Link className="link" href="/studio">The studio</Link></li>
          <li><Link className="link" href="/contact">Contact</Link></li>
        </ul>
      </div>
    </Page>
  );
}
