"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type Channel = "email" | "sms";
type Status = "idle" | "loading" | "success" | "error";

function normalizeUsPhone(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("+")) {
    const digits = trimmed.replace(/\D/g, "");
    if (digits.length >= 8 && digits.length <= 15) return `+${digits}`;
    return null;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export default function Waitlist({ compact = false }: { compact?: boolean }) {
  const [channel, setChannel] = useState<Channel>("email");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const placeholder = useMemo(
    () => (channel === "email" ? "EMAIL ADDRESS" : "MOBILE NUMBER"),
    [channel]
  );

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

    const raw = value.trim();
    if (!raw) {
      setStatus("error");
      setMessage(channel === "email" ? "ENTER AN EMAIL ADDRESS." : "ENTER A MOBILE NUMBER.");
      return;
    }

    let profileAttributes: Record<string, unknown>;
    if (channel === "email") {
      const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
      if (!looksLikeEmail) {
        setStatus("error");
        setMessage("CHECK THE EMAIL ADDRESS.");
        return;
      }
      profileAttributes = {
        email: raw,
        subscriptions: {
          email: { marketing: { consent: "SUBSCRIBED" } },
        },
        properties: {
          "NOCTIVE DROP": "AFTER DARK / 001",
          "NOCTIVE SOURCE": compact ? "HOMEPAGE" : "WEAR PAGE",
        },
      };
    } else {
      const phone = normalizeUsPhone(raw);
      if (!phone) {
        setStatus("error");
        setMessage("USE A VALID MOBILE NUMBER.");
        return;
      }
      profileAttributes = {
        phone_number: phone,
        subscriptions: {
          sms: { marketing: { consent: "SUBSCRIBED" } },
        },
        properties: {
          "NOCTIVE DROP": "AFTER DARK / 001",
          "NOCTIVE SOURCE": compact ? "HOMEPAGE" : "WEAR PAGE",
        },
      };
    }

    setStatus("loading");

    try {
      const response = await fetch(
        `https://a.klaviyo.com/client/subscriptions?company_id=${encodeURIComponent(siteId)}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/vnd.api+json",
            revision: "2026-07-15",
          },
          body: JSON.stringify({
            data: {
              type: "subscription",
              attributes: {
                custom_source: "NOCTIVE / AFTER DARK / DROP 001",
                profile: {
                  data: {
                    type: "profile",
                    attributes: profileAttributes,
                  },
                },
              },
              relationships: {
                list: {
                  data: { type: "list", id: listId },
                },
              },
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Subscription failed");

      setStatus("success");
      setValue("");
      setMessage(channel === "email" ? "YOU'RE ON THE EMAIL LIST." : "YOU'RE ON THE TEXT LIST.");
    } catch {
      setStatus("error");
      setMessage("SIGNAL FAILED. TRY AGAIN.");
    }
  }

  return (
    <div className={`waitlist ${compact ? "waitlist-compact" : ""}`}>
      <div className="waitlist-tabs" role="tablist" aria-label="Choose alert method">
        <button
          type="button"
          className={channel === "email" ? "active" : ""}
          onClick={() => {
            setChannel("email");
            setValue("");
            setStatus("idle");
            setMessage("");
          }}
        >
          EMAIL
        </button>
        <button
          type="button"
          className={channel === "sms" ? "active" : ""}
          onClick={() => {
            setChannel("sms");
            setValue("");
            setStatus("idle");
            setMessage("");
          }}
        >
          TEXT
        </button>
      </div>

      <form onSubmit={submit} className="waitlist-form">
        <label className="sr-only" htmlFor={`waitlist-${channel}-${compact ? "compact" : "full"}`}>
          {channel === "email" ? "Email address" : "Mobile phone number"}
        </label>
        <input
          id={`waitlist-${channel}-${compact ? "compact" : "full"}`}
          type={channel === "email" ? "email" : "tel"}
          inputMode={channel === "email" ? "email" : "tel"}
          autoComplete={channel === "email" ? "email" : "tel"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "CONNECTING..." : "JOIN DROP LIST ↗"}
        </button>
      </form>

      {channel === "email" ? (
        <p className="consent-copy">
          By joining, you agree to receive marketing emails from Noctive about releases and updates. Unsubscribe anytime. See our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      ) : (
        <p className="consent-copy consent-sms">
          By entering your number and clicking “JOIN DROP LIST,” you agree to receive recurring marketing and promotional text messages from Noctive at the number provided. Consent is not a condition of purchase. Msg &amp; data rates may apply. Msg frequency varies. Reply HELP for help or STOP to cancel. See our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms</Link>.
        </p>
      )}

      {message && (
        <p className={`waitlist-status ${status === "success" ? "success" : "error"}`} aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
