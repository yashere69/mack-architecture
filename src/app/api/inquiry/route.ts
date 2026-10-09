import { NextResponse } from 'next/server';

// Receives contact-form inquiries and forwards them to the studio's inbox.
// Delivery is configured per deployment with INQUIRY_WEBHOOK_URL (any endpoint that
// accepts JSON — e.g. the studio's existing CMS inbox, a Zapier/Make hook, or a
// transactional-email function). Without it the endpoint answers 503 and the form
// hands the message to the visitor's own email app instead — nothing is silently lost.

const REASONS = new Set(['Connect with designers', 'Apply for a career']);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const str = (k: string, max: number) => (typeof body[k] === 'string' ? (body[k] as string).trim().slice(0, max) : '');

  // Honeypot filled → pretend success, drop silently.
  if (str('company', 200)) return NextResponse.json({ ok: true });

  const inquiry = {
    reason: str('reason', 60),
    name: str('name', 120),
    email: str('email', 200),
    message: str('message', 4000),
    website: str('website', 300),
    consent: body.consent === 'yes',
    receivedAt: new Date().toISOString(),
  };

  if (!REASONS.has(inquiry.reason)) return NextResponse.json({ error: 'Please choose a reason.' }, { status: 422 });
  if (!inquiry.name) return NextResponse.json({ error: 'Please add your name.' }, { status: 422 });
  if (!EMAIL.test(inquiry.email)) return NextResponse.json({ error: 'Please add a valid email address.' }, { status: 422 });
  if (!inquiry.message) return NextResponse.json({ error: 'Please add a message.' }, { status: 422 });
  if (!inquiry.consent) return NextResponse.json({ error: 'Please confirm the consent checkbox.' }, { status: 422 });
  if (inquiry.website && !/^https?:\/\//i.test(inquiry.website)) {
    return NextResponse.json({ error: 'Please enter the website as a full link (https://…).' }, { status: 422 });
  }

  const hook = process.env.INQUIRY_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ error: 'Inbox not configured.' }, { status: 503 });

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(inquiry),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'The studio inbox could not be reached. Please email the studio directly.' }, { status: 502 });
  }
}
