"use client";

import { useState } from "react";
import { Clock, Mail, Loader2, CheckCircle2, X } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContinueLaterButton({ onSend }: { onSend: (email: string) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  function close() {
    setOpen(false);
    setStatus("idle");
    setError("");
    setEmail("");
  }

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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors no-print"
      >
        <Clock size={13} /> Continue later
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-2 gap-3">
              <p className="font-bold" style={{ color: "#26215c" }}>
                Email me a link to continue
              </p>
              <button
                type="button"
                onClick={close}
                className="text-gray-400 hover:text-gray-600 shrink-0"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              We&apos;ll send a link that opens straight back up to exactly where you left off &mdash;
              handy if you run out of time and need to finish on a different computer later.
            </p>

            {status === "sent" ? (
              <p className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#15803d" }}>
                <CheckCircle2 size={16} /> Sent! Don&apos;t see it in {email} within 5 minutes? Check your spam/junk folder.
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#a89fe0] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-1.5 text-sm font-bold px-4 py-2 rounded-md text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#3d2c8d" }}
                  >
                    {status === "sending" ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
                    {status === "sending" ? "Sending…" : "Send me the link"}
                  </button>
                </form>
                <p className="text-[11px] text-gray-500 mt-1.5">
                  Don&apos;t see it within 5 minutes? Check your spam/junk folder.
                </p>
              </>
            )}

            {status === "error" && <p className="text-xs text-red-600 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
