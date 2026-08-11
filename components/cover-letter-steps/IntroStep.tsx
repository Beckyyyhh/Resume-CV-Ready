import { AlertTriangle, ListChecks } from "lucide-react";
import { coverLetterIntro, exampleCoverLetter } from "@/lib/content";
import { ExampleModal } from "@/components/wizard/ExampleModal";
import { CoverLetterPreview } from "@/components/preview/CoverLetterPreview";

export function IntroStep() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold" style={{ color: "#26215c" }}>
          Why Cover Letters Matter
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{coverLetterIntro.whatIs}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <p className="text-sm font-bold mb-2" style={{ color: "#3d2c8d" }}>
          Who needs a cover letter?
        </p>
        <ul className="space-y-1.5">
          {coverLetterIntro.whoNeeds.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <ListChecks size={16} className="mt-0.5 shrink-0" style={{ color: "#534ab7" }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-sm font-bold mb-2" style={{ color: "#3d2c8d" }}>
            Key rules for a great cover letter
          </p>
          <ul className="space-y-1.5">
            {coverLetterIntro.keyRules.map((item) => (
              <li key={item} className="text-sm text-gray-700">
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-4" style={{ backgroundColor: "#fef2f2", borderColor: "#fecaca" }}>
          <p className="text-sm font-bold mb-2 flex items-center gap-1.5" style={{ color: "#991b1b" }}>
            <AlertTriangle size={15} />
            Common mistakes to avoid
          </p>
          <ul className="space-y-1.5">
            {coverLetterIntro.commonMistakes.map((item) => (
              <li key={item} className="text-sm text-red-900">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-600">Want to see what a finished cover letter looks like first?</p>

      <ExampleModal title="Example cover letter — Jessica Taylor">
        <CoverLetterPreview data={exampleCoverLetter} />
      </ExampleModal>
    </div>
  );
}
