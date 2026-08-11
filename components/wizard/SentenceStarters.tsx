"use client";

import { PlusCircle } from "lucide-react";
import type { SentenceStarter } from "@/lib/content";

export function SentenceStarters({
  starters,
  onUse,
}: {
  starters: SentenceStarter[];
  onUse: (text: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <p className="text-sm font-bold mb-2.5" style={{ color: "#3d2c8d" }}>
        Sentence starters — click one to add it, then fill in the blanks
      </p>
      <div className="space-y-2">
        {starters.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onUse(s.text)}
            className="w-full text-left flex items-start gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:border-[#afa9ec] hover:bg-[#faf5ff] transition-colors"
          >
            <PlusCircle size={15} className="mt-0.5 shrink-0 text-gray-400" />
            <span>
              <span className="font-semibold text-gray-800">{s.label}: </span>
              <span className="text-gray-600 italic">{s.text}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
