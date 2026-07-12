import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function text(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Please complete the form and try again." }, { status: 400 });
  }

  // Silently accept automated submissions caught by the hidden honeypot field.
  if (text(payload.website, 200)) return NextResponse.json({ ok: true });

  const name = text(payload.name, 100);
  const company = text(payload.company, 120);
  const email = text(payload.email, 160);
  const message = text(payload.message, 3000);

  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ message: "Please add your name, email, and a message." }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (!webhookUrl || !secret) {
    return NextResponse.json({ message: "The contact form is not configured yet. Please email me directly." }, { status: 503 });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ name, company, email, message, secret, receivedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    const result = (await upstream.json().catch(() => null)) as { ok?: boolean } | null;

    if (!upstream.ok || !result?.ok) {
      return NextResponse.json({ message: "Unable to send your message. Please email me directly." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ message: "Unable to send your message. Please email me directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
