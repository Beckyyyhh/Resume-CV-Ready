"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";

export function ExampleModal({
  buttonLabel = "See a completed example",
  title,
  children,
}: {
  buttonLabel?: string;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold px-3.5 py-1.5 rounded-md border transition-colors hover:bg-[#faf5ff]"
        style={{ borderColor: "#afa9ec", color: "#534ab7" }}
      >
        <Eye size={15} /> {buttonLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="bg-gray-50 rounded-xl max-w-3xl w-full my-8 shadow-xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-white rounded-t-xl sticky top-0">
              <p className="font-bold" style={{ color: "#26215c", fontFamily: "var(--font-nunito), sans-serif" }}>
                {title}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
