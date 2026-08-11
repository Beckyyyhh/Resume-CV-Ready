"use client";

import { useState } from "react";
import { Eye, PenLine } from "lucide-react";

export function WizardLayout({
  main,
  preview,
}: {
  main: React.ReactNode;
  preview: React.ReactNode;
}) {
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  return (
    <div>
      <div className="lg:hidden flex rounded-lg border border-gray-200 bg-white p-1 mb-4 no-print">
        <button
          type="button"
          onClick={() => setMobileView("edit")}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-1.5 rounded-md transition-colors"
          style={mobileView === "edit" ? { backgroundColor: "#3d2c8d", color: "#fff" } : { color: "#6b7280" }}
        >
          <PenLine size={14} /> Edit
        </button>
        <button
          type="button"
          onClick={() => setMobileView("preview")}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-1.5 rounded-md transition-colors"
          style={mobileView === "preview" ? { backgroundColor: "#3d2c8d", color: "#fff" } : { color: "#6b7280" }}
        >
          <Eye size={14} /> Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className={mobileView === "preview" ? "hidden lg:block" : ""}>{main}</div>
        <div className={`lg:sticky lg:top-28 ${mobileView === "edit" ? "hidden lg:block" : ""}`}>{preview}</div>
      </div>
    </div>
  );
}
