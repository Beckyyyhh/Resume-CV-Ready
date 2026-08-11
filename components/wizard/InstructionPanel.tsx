import { CheckCircle2, Lightbulb } from "lucide-react";
import type { StepContent } from "@/lib/content";

export function InstructionPanel({ content }: { content: Pick<StepContent, "title" | "blurb" | "whatToInclude" | "tip"> }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold" style={{ color: "#26215c" }}>
          {content.title}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{content.blurb}</p>
      </div>

      {content.whatToInclude.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-sm font-bold mb-2" style={{ color: "#3d2c8d" }}>
            What to include
          </p>
          <ul className="space-y-1.5">
            {content.whatToInclude.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "#534ab7" }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.tip && (
        <div className="rounded-xl border p-4 flex items-start gap-2.5" style={{ backgroundColor: "#faf5ff", borderColor: "#e4defa" }}>
          <Lightbulb size={18} className="mt-0.5 shrink-0" style={{ color: "#534ab7" }} />
          <p className="text-sm text-gray-700">
            <span className="font-bold" style={{ color: "#3d2c8d" }}>
              Tip:{" "}
            </span>
            {content.tip}
          </p>
        </div>
      )}
    </div>
  );
}
