import type { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { PageHead } from '@/components/PageHead';
import s from '@/components/Prose.module.css';

export const metadata: Metadata = { title: 'Terms & conditions', alternates: { canonical: '/terms-and-conditions' } };

// Copy carried over verbatim from the studio's existing site.
export default function Terms() {
  return (
    <Page>
      <PageHead kicker="Legal" title="Terms & conditions" />
      <div className={`grid ${s.body}`}>
        <p className={`label ${s.updated}`}>Use of this website</p>
        <div className={`body ${s.text}`}>
          <p>
            The images and design work presented on this website belong to their respective rights holders. Please contact the
            studio before reproducing any material.
          </p>
          <p>
            Project images and descriptions are provided as a portfolio, not as architectural specifications. Submitting an
            inquiry does not establish a client relationship or confirm an appointment.
          </p>
          <p>
            External publications and partner websites are operated independently. For project inquiries, appointments or
            questions, please use the <Link className="link link--static" href="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </Page>
  );
}
