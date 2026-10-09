import type { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import s from '@/components/Prose.module.css';

export const metadata: Metadata = { title: 'Privacy policy', alternates: { canonical: '/privacy-policy' } };

// Copy carried over verbatim from the studio's existing site.
export default function Privacy() {
  return (
    <Page>
      <PageHead kicker="Legal" title="Privacy policy" />
      <div className={`grid ${s.body}`}>
        <p className={`label ${s.updated}`}>Inquiries &amp; data</p>
        <div className={`body ${s.text}`}>
          <p>
            When you use the contact form, the name, email, reason for contact, message and optional portfolio link you
            provide are stored in the studio’s inquiry inbox. Authorized studio editors can access this information to respond
            to your inquiry.
          </p>
          <p>The public website does not use advertising or analytics cookies.</p>
          <p>
            Contact the studio using the email on the <Link className="link link--static" href="/contact">contact page</Link> to ask
            about your information.
          </p>
        </div>
      </div>
    </Page>
  );
}
