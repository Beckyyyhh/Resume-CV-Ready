"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailDeliveryForm({ onSend }: { onSend: (email: string) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await onSend(email);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="rounded-xl border p-4" style={{ backgroundColor: "#f0f9ff", borderColor: "#bae6fd" }}>
      <p className="text-sm font-bold mb-1 flex items-center gap-1.5" style={{ color: "#075985" }}>
        <Mail size={15} /> No access to your Downloads folder? Email it to yourself
      </p>
      <p className="text-xs text-gray-600 mb-3">
        Handy on school Chromebooks — we&apos;ll send both the PDF and Word version straight to your inbox.
      </p>

      {status === "sent" ? (
        <p className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#15803d" }}>
          <CheckCircle2 size={16} /> Sent! Don&apos;t see it in {email} within 5 minutes? Check your spam/junk folder.
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7dd3fc] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-bold px-4 py-2 rounded-md text-white transition-opacity hover:opacity-90 disabled:opacity-60 shrink-0"
              style={{ backgroundColor: "#0369a1" }}
            >
              {status === "sending" ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
              {status === "sending" ? "Sending…" : "Email me a copy"}
            </button>
          </form>
          <p className="text-[11px] text-gray-500 mt-1.5">
            Don&apos;t see it within 5 minutes? Check your spam/junk folder.
          </p>
        </>
      )}

      {status === "error" && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
