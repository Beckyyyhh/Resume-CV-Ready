"use client";

import { Check } from "lucide-react";

export function StepProgress({
  labels,
  currentIndex,
  onJump,
}: {
  labels: string[];
  currentIndex: number;
  onJump: (index: number) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-3 py-3 overflow-x-auto no-print">
      <div className="flex items-center gap-1 min-w-max">
        {labels.map((label, i) => {
          const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
          return (
            <div key={label} className="flex items-center">
              {i > 0 && <div className="w-4 h-px mx-0.5" style={{ backgroundColor: "#e5e7eb" }} />}
              <button
                type="button"
                onClick={() => onJump(i)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors"
                style={
                  state === "current"
                    ? { backgroundColor: "#3d2c8d", color: "#fff" }
                    : state === "done"
                      ? { backgroundColor: "#f3f1fc", color: "#534ab7" }
                      : { color: "#9ca3af" }
                }
              >
                <span
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: state === "current" ? "rgba(255,255,255,0.25)" : state === "done" ? "#afa9ec" : "#e5e7eb",
                    color: state === "upcoming" ? "#9ca3af" : "#fff",
                    fontSize: 10,
                  }}
                >
                  {state === "done" ? <Check size={11} /> : i + 1}
                </span>
                {label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
