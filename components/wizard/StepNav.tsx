"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

export function StepNav({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Continue",
  hideBack,
}: {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  hideBack?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-2 no-print">
      {!hideBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={15} /> {backLabel}
        </button>
      ) : (
        <span />
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 text-sm font-bold px-5 py-2.5 rounded-md text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#3d2c8d" }}
        >
          {nextLabel} <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}
