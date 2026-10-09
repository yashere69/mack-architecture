'use client';

import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import s from './ContactForm.module.css';

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'fallback'; href: string } | { kind: 'error'; msg: string };

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
    setState({ kind: 'sending' });
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState({ kind: 'sent' });
        form.reset();
        return;
      }
      if (res.status === 503) {
        // No inbox configured for this deployment — hand over to the visitor's email app.
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
        return;
      }
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      setState({ kind: 'error', msg: j.error ?? 'Something went wrong. Please email the studio directly.' });
    } catch {
      setState({ kind: 'error', msg: 'The message could not be sent. Please check your connection or email the studio directly.' });
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
    <form className={s.form} onSubmit={submit} noValidate>
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
          <span aria-hidden="true">→</span>
        </button>
        <p className={`small ${s.note}`} role="status" aria-live="polite">
          {state.kind === 'fallback' ? (
            <>
              Your email app should open with the message ready to send.{' '}
              <a className="link link--static" href={state.href}>Open it again</a>
            </>
          ) : state.kind === 'error' ? (
            state.msg
          ) : null}
        </p>
      </div>
    </form>
  );
}
