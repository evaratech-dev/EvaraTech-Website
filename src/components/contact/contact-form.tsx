"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Demo-request form, submitted straight to Web3Forms over fetch — no backend,
 * so it works on a static Vercel deploy. The access key is a public
 * client-side key by Web3Forms' design; an env var can override it.
 *
 * Collects name, email, contact number and an optional message, with a
 * honeypot field for basic spam protection.
 */
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "a026adc9-3495-4e3c-a065-be941ce73ad9";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "h-12 w-full rounded-xl border border-evara-line-strong bg-white px-4 text-base text-evara-ink placeholder:text-evara-slate-400 focus-visible:border-evara-water focus-visible:ring-2 focus-visible:ring-evara-water/30 focus-visible:outline-none";
const labelClass = "text-sm font-medium text-evara-ink";

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");

    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New demo request — evaratech.com");
    data.append("from_name", "EvaraTech Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
        onSuccess?.();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError(
        "Couldn't reach the server. Please try again, or email contact@evaratech.com."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-evara-leaf/10 text-evara-leaf">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="font-heading text-lg font-semibold text-evara-ink">
          Thanks — we&rsquo;ve got it.
        </h3>
        <p className="text-sm text-evara-slate">
          The EvaraTech team will get back to you shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-2 h-11 rounded-xl border-evara-line-strong px-5 text-sm"
          onClick={() => setStatus("idle")}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — hidden from people, catches bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className={labelClass}>
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className={labelClass}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-phone" className={labelClass}>
          Contact number
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className={labelClass}>
          Message <span className="text-evara-slate-400">(optional)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="What would you like to monitor, and where?"
          className={`${fieldClass} h-auto resize-y py-3 leading-relaxed`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-12 w-full rounded-xl bg-evara-water text-base font-semibold text-white shadow-[0_14px_30px_-14px_rgba(28,117,188,0.8)] hover:bg-evara-water-700 disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Submit"
        )}
      </Button>

      <p className="text-center text-xs text-evara-slate-400">
        We&rsquo;ll only use your details to respond to this request.
      </p>
    </form>
  );
}
