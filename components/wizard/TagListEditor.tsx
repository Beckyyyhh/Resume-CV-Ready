"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export function TagListEditor({
  label,
  items,
  onChange,
  placeholder,
  quickAdds,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  /** Small chips above the input — clicking loads the text into the input for editing, rather than adding it directly. */
  quickAdds?: { label: string; text: string }[];
}) {
  const [draft, setDraft] = useState("");

  function add() {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  }

  return (
    <div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      {quickAdds && quickAdds.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {quickAdds.map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => setDraft(q.text)}
              title={q.text}
              className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-white hover:bg-[#faf5ff] transition-colors"
              style={{ borderColor: "#afa9ec", color: "#534ab7" }}
            >
              {q.label}
            </button>
          ))}
        </div>
      )}
      <div className="mt-1.5 space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-[#afa9ec]">
            <input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="text-sm text-gray-700 flex-1 bg-transparent focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
              aria-label={`Remove ${item}`}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#afa9ec] focus:border-transparent"
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-md text-white shrink-0"
          style={{ backgroundColor: "#3d2c8d" }}
        >
          <Plus size={15} /> Add
        </button>
      </div>
    </div>
  );
}
