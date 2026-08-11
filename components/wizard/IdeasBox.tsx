"use client";

import { Sparkles } from "lucide-react";
import type { IdeaBox as IdeaBoxType } from "@/lib/content";
import { HighlightPlaceholders } from "./HighlightPlaceholders";

export function IdeasBox({
  idea,
  onUseItem,
}: {
  idea: IdeaBoxType;
  /** If provided, each item becomes a clickable chip that calls this instead of rendering plain text. */
  onUseItem?: (item: string) => void;
}) {
  return (
    <div className="rounded-xl border p-4" style={{ backgroundColor: "#fffbeb", borderColor: "#fde68a" }}>
      <p className="text-sm font-bold mb-2 flex items-center gap-1.5" style={{ color: "#92400e" }}>
        <Sparkles size={15} />
        {idea.title}
      </p>
      {onUseItem ? (
        <div className="flex flex-wrap gap-1.5">
          {idea.items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onUseItem(item)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-white hover:bg-amber-50 transition-colors"
              style={{ borderColor: "#fde68a", color: "#92400e" }}
            >
              + {item}
            </button>
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5">
          {idea.items.map((item) => (
            <li key={item} className="text-sm text-amber-900 leading-relaxed">
              • <HighlightPlaceholders text={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
