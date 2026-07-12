"use client";

import { FormEvent, useRef, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

function validate(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Tell me briefly what you would like to build.";

  return errors;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const statusRef = useRef<HTMLParagraphElement>(null);

  function clearError(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Check the highlighted fields and try again.");
      const firstInvalid = Object.keys(nextErrors)[0] as FieldName;
      requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus());
      return;
    }

    setErrors({});
    setStatus("sending");
    setMessage("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send your message.");

      form.reset();
      setStatus("success");
      setMessage("Message sent. I will get back to you soon.");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your message. Please email me directly.");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby="contact-form-note">
      <p id="contact-form-note" className="form-note">Fields marked required must be completed.</p>

      <div className="form-field">
        <label htmlFor="contact-name">Name <span>required</span></label>
        <input id="contact-name" required type="text" name="name" placeholder="Your name" autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} onChange={() => clearError("name")} />
        {errors.name ? <p id="contact-name-error" className="field-error">{errors.name}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-company">Company <span>optional</span></label>
        <input id="contact-company" type="text" name="company" placeholder="Your company" autoComplete="organization" maxLength={120} />
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">Email <span>required</span></label>
        <input id="contact-email" required type="email" name="email" placeholder="your@company.com" autoComplete="email" inputMode="email" maxLength={160} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} onChange={() => clearError("email")} />
        {errors.email ? <p id="contact-email-error" className="field-error">{errors.email}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">What do you need? <span>required</span></label>
        <textarea id="contact-message" required name="message" placeholder="Tell me about your GTM challenge..." maxLength={3000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} onChange={() => clearError("message")} />
        {errors.message ? <p id="contact-message-error" className="field-error">{errors.message}</p> : null}
      </div>

      <div className="honeypot" aria-hidden="true" hidden>
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === "sending"} className="button-primary form-submit">
        {status === "sending" ? "Sending..." : "Send message"} <span aria-hidden="true">-&gt;</span>
      </button>
      <p ref={statusRef} id="contact-form-status" className="contact-form-status" role="status" aria-live="polite" tabIndex={-1} data-status={status}>
        {message}
      </p>
    </form>
  );
}
