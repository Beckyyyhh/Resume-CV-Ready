"use client";

import { Check } from "lucide-react";
import { resumeTemplates, type ResumeTemplateId } from "@/lib/templates";

export function TemplatePicker({
  value,
  onChange,
}: {
  value: ResumeTemplateId;
  onChange: (id: ResumeTemplateId) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 no-print">
      <p className="text-xs font-bold uppercase tracking-wide mb-2 px-1" style={{ color: "#3d2c8d" }}>
        Template
      </p>
      <div className="grid grid-cols-3 gap-2">
        {resumeTemplates.map((t) => {
          const active = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              title={t.description}
              className="relative flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-center transition-colors"
              style={
                active
                  ? { borderColor: t.swatch, backgroundColor: "#faf5ff" }
                  : { borderColor: "#e5e7eb", backgroundColor: "#fff" }
              }
            >
              {active && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full"
                  style={{ width: 16, height: 16, backgroundColor: t.swatch }}
                >
                  <Check size={10} color="#fff" strokeWidth={3} />
                </span>
              )}
              <span
                className="block rounded-full"
                style={{ width: 18, height: 18, backgroundColor: t.swatch }}
              />
              <span className="text-xs font-semibold text-gray-700">{t.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
