"use client";

import { forwardRef } from "react";

interface BaseProps {
  label: string;
  hint?: string;
}

export function TextField({
  label,
  hint,
  ...props
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      {hint && <span className="block text-xs text-gray-400 mt-0.5">{hint}</span>}
      <input
        {...props}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#afa9ec] focus:border-transparent"
      />
    </label>
  );
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextAreaField({ label, hint, ...props }, ref) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      {hint && <span className="block text-xs text-gray-400 mt-0.5">{hint}</span>}
      <textarea
        ref={ref}
        {...props}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#afa9ec] focus:border-transparent"
      />
    </label>
  );
});
