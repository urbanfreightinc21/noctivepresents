"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Waitlist({ compact = false }: { compact?: boolean }) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const siteId = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY;
    const listId = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID;
    if (!siteId || !listId) {
      setStatus("error");
      setMessage("ACCESS LIST IS NOT CONNECTED YET.");
      return;
    }

    const email = value.trim();
    if (!email) {
      setStatus("error");
      setMessage("ENTER AN EMAIL ADDRESS.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("CHECK THE EMAIL ADDRESS.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${encodeURIComponent(siteId)}`, {
        method: "POST",
        headers: { "content-type": "application/vnd.api+json", revision: "2026-07-15" },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
              custom_source: "NOCTIVE / AFTER DARK / DROP 001",
              profile: { data: { type: "profile", attributes: {
                email,
                subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                properties: {
                  "NOCTIVE DROP": "AFTER DARK / 001",
                  "NOCTIVE SOURCE": compact ? "HOMEPAGE" : "WEAR PAGE",
                },
              } } },
            },
            relationships: { list: { data: { type: "list", id: listId } } },
          },
        }),
      });
      if (!response.ok) throw new Error("Subscription failed");
      setStatus("success");
      setValue("");
      setMessage("ACCESS CONFIRMED");
    } catch {
      setStatus("error");
      setMessage("SIGNAL FAILED. TRY AGAIN.");
    }
  }

  return (
    <div className={`waitlist ${compact ? "waitlist-compact" : ""}`}>
      <form onSubmit={submit} className="waitlist-form">
        <label className="sr-only" htmlFor={`waitlist-email-${compact ? "compact" : "full"}`}>Email address</label>
        <input id={`waitlist-email-${compact ? "compact" : "full"}`} type="email" inputMode="email" autoComplete="email" placeholder="EMAIL ADDRESS" value={value} onChange={(e) => setValue(e.target.value)} disabled={status === "loading"} />
        <button type="submit" disabled={status === "loading"}>{status === "loading" ? "CONNECTING..." : "JOIN DROP LIST ↗"}</button>
      </form>
      <p className="consent-copy">By joining, you agree to receive marketing emails from Noctive about releases and updates. Unsubscribe anytime. See our <Link href="/privacy">Privacy Policy</Link>.</p>
      {status === "error" && message && <p className="waitlist-status error" aria-live="polite">{message}</p>}
      {status === "success" && (
        <div className="signal-confirm" role="status" aria-live="polite">
          <div className="signal-confirm-grid" />
          <span className="signal-confirm-index">NCTV / ACCESS / 001</span>
          <strong>{message}</strong>
          <p>YOU’RE ON THE LIST.<br />WATCH YOUR INBOX.</p>
          <button type="button" onClick={() => { setStatus("idle"); setMessage(""); }}>CLOSE ↗</button>
        </div>
      )}
    </div>
  );
}
