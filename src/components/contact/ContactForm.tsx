'use client';

import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import { Arrow } from '@/components/Arrow';
import s from './ContactForm.module.css';

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'fallback'; href: string };

const REASONS = ['Connect with designers', 'Apply for a career'] as const;

export function ContactForm() {
  const id = useId();
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [reason, setReason] = useState<(typeof REASONS)[number]>(REASONS[0]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.company) return; // honeypot
    setState({ kind: 'sending' });

    // Hand the message to the visitor's own email app — used whenever no form inbox
    // is available on the host, so nothing is ever silently lost.
    const fallback = () => {
      const body = [
        `Reason: ${data.reason}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.website ? `Website: ${data.website}` : '',
        '',
        data.message,
      ]
        .filter((l) => l !== '')
        .join('\n');
      const href = `mailto:${site.email}?subject=${encodeURIComponent(`${data.reason} — ${data.name}`)}&body=${encodeURIComponent(body)}`;
      setState({ kind: 'fallback', href });
      window.location.href = href;
    };

    try {
      // Netlify Forms: the static definition lives in /__forms.html. If the host isn't
      // collecting forms, the request returns an error or that static file itself — never
      // treat either as a successful submission.
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'inquiry', ...data }).toString(),
      });
      const text = res.ok ? await res.text() : '';
      if (res.ok && !text.includes('MACK_FORMS_DEFINITION')) {
        setState({ kind: 'sent' });
        form.reset();
        return;
      }
      fallback();
    } catch {
      fallback();
    }
  }

  if (state.kind === 'sent') {
    return (
      <div className={s.done} role="status">
        <p className="lede">Thank you — your message has reached the studio.</p>
        <p className="small">{site.visits}. The studio will reply to the email you provided.</p>
      </div>
    );
  }

  return (
    <form className={s.form} name="inquiry" onSubmit={submit} noValidate>
      <fieldset className={s.reasons}>
        <legend className="label label--muted">Reason</legend>
        {REASONS.map((r) => (
          <label key={r} className={s.reason} data-checked={reason === r || undefined}>
            <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} />
            <span>{r}</span>
          </label>
        ))}
      </fieldset>

      <div className={s.field}>
        <label htmlFor={`${id}-name`} className="label label--muted">Name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" required maxLength={120} />
      </div>
      <div className={s.field}>
        <label htmlFor={`${id}-email`} className="label label--muted">Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>
      <div className={s.field}>
        <label htmlFor={`${id}-message`} className="label label--muted">Message</label>
        <textarea id={`${id}-message`} name="message" rows={5} required maxLength={4000} />
      </div>
      <div className={s.field}>
        <label htmlFor={`${id}-website`} className="label label--muted">
          {reason === 'Apply for a career' ? 'Portfolio link' : 'Website'} <span className={s.opt}>(optional)</span>
        </label>
        <input id={`${id}-website`} name="website" type="url" inputMode="url" placeholder="https://" maxLength={300} />
      </div>
      {/* Honeypot: invisible to people, tempting to bots */}
      <div className={s.hp} aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className={s.consent}>
        <input type="checkbox" name="consent" value="yes" required />
        <span className="small">
          I agree to the <Link className="link link--static" href="/privacy-policy">Privacy Policy</Link> and{' '}
          <Link className="link link--static" href="/terms-and-conditions">Terms &amp; Conditions</Link> and consent to the studio
          responding to my inquiry.
        </span>
      </label>

      <div className={s.actions}>
        <button type="submit" className={`label ${s.submit}`} disabled={state.kind === 'sending'}>
          <span>{state.kind === 'sending' ? 'Sending…' : 'Send inquiry'}</span>
          <Arrow />
        </button>
        <p className={`small ${s.note}`} role="status" aria-live="polite">
          {state.kind === 'fallback' ? (
            <>
              Your email app should open with the message ready to send.{' '}
              <a className="link link--static" href={state.href}>Open it again</a>
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
