"use client";

import { useState } from "react";
import { Check, Download, FileText, FileType } from "lucide-react";
import { coverLetterChecklist } from "@/lib/content";

export function ReviewStep({
  onDownloadPdf,
  onDownloadDocx,
  pdfLoading,
  docxLoading,
}: {
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
  pdfLoading: boolean;
  docxLoading: boolean;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold" style={{ color: "#26215c" }}>
          Final Checklist &amp; Finalise
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-700">
          Look over your letter in the preview, tick off the checklist, then download your finished cover letter.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-bold" style={{ color: "#3d2c8d" }}>
            Cover letter final checklist
          </p>
          <span className="text-xs font-semibold text-gray-400">
            {doneCount}/{coverLetterChecklist.length}
          </span>
        </div>
        <ul className="space-y-1.5">
          {coverLetterChecklist.map((item, i) => (
            <li key={item}>
              <label className="flex items-start gap-2.5 text-sm text-gray-700 cursor-pointer">
                <span
                  onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                  className="mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center"
                  style={
                    checked[i]
                      ? { backgroundColor: "#3d2c8d", borderColor: "#3d2c8d" }
                      : { borderColor: "#d1d5db" }
                  }
                >
                  {checked[i] && <Check size={12} color="#fff" strokeWidth={3} />}
                </span>
                <span className={checked[i] ? "line-through text-gray-400" : ""}>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border p-5 text-center" style={{ backgroundColor: "#faf5ff", borderColor: "#e4defa" }}>
        <p className="font-bold mb-1" style={{ color: "#26215c", fontFamily: "var(--font-nunito), sans-serif" }}>
          Ready to finalise your cover letter?
        </p>
        <p className="text-sm text-gray-600 mb-4">Download a copy to keep, print, or attach to job applications.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={pdfLoading}
            className="inline-flex items-center justify-center gap-2 text-sm font-bold px-5 py-2.5 rounded-md text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#3d2c8d" }}
          >
            {pdfLoading ? <Download size={16} className="animate-pulse" /> : <FileText size={16} />}
            {pdfLoading ? "Preparing PDF…" : "Download as PDF"}
          </button>
          <button
            type="button"
            onClick={onDownloadDocx}
            disabled={docxLoading}
            className="inline-flex items-center justify-center gap-2 text-sm font-bold px-5 py-2.5 rounded-md border transition-colors hover:bg-[#faf5ff] disabled:opacity-60"
            style={{ borderColor: "#534ab7", color: "#534ab7" }}
          >
            {docxLoading ? <Download size={16} className="animate-pulse" /> : <FileType size={16} />}
            {docxLoading ? "Preparing Word doc…" : "Download as Word (.docx)"}
          </button>
        </div>
      </div>
    </div>
  );
}
