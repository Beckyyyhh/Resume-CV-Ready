"use client";

import { useEffect, useRef, useState } from "react";
import { Printer, X } from "lucide-react";

// A4 is 210mm x 297mm — this ratio lets us compute where a page break would
// fall for whatever pixel width the "page" ends up rendering at.
const A4_HEIGHT_OVER_WIDTH = 297 / 210;

export function A4PrintPreviewButton({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageBreaks, setPageBreaks] = useState<number[]>([]);

  useEffect(() => {
    if (!open) return;
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.getBoundingClientRect().width;
      if (!width) return;
      const pageHeight = width * A4_HEIGHT_OVER_WIDTH;
      const totalHeight = el.scrollHeight;
      const breaks: number[] = [];
      for (let y = pageHeight; y < totalHeight - 24; y += pageHeight) {
        breaks.push(y);
      }
      setPageBreaks(breaks);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-semibold px-3.5 py-1.5 rounded-md border transition-colors hover:bg-[#faf5ff]"
        style={{ borderColor: "#afa9ec", color: "#534ab7" }}
      >
        <Printer size={15} /> Print Preview
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8 shadow-xl">
            <div className="flex items-start justify-between gap-3 px-5 py-3.5 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
              <div>
                <p className="font-bold" style={{ color: "#26215c", fontFamily: "var(--font-nunito), sans-serif" }}>
                  {title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Shown at real A4 proportions. Dashed lines are approximately where a new printed page would start.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 bg-gray-100 rounded-b-xl">
              <div className="relative mx-auto" style={{ maxWidth: 720 }} ref={contentRef}>
                {children}
                {pageBreaks.map((y, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 flex items-center gap-2 pointer-events-none"
                    style={{ top: y }}
                  >
                    <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "#f87171" }} />
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white shrink-0"
                      style={{ color: "#dc2626" }}
                    >
                      Page {i + 2}
                    </span>
                    <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: "#f87171" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
