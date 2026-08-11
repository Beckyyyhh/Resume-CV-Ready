import { AlertTriangle, ListChecks } from "lucide-react";
import { resumeIntro, exampleResume } from "@/lib/content";
import { ExampleModal } from "@/components/wizard/ExampleModal";
import { ResumePreview } from "@/components/preview/ResumePreview";

export function IntroStep() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold" style={{ color: "#26215c" }}>
          Why Resumes Matter
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{resumeIntro.whatIs}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <p className="text-sm font-bold mb-2" style={{ color: "#3d2c8d" }}>
          Who needs a resume?
        </p>
        <ul className="space-y-1.5">
          {resumeIntro.whoNeeds.map((item) => (
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
            Key rules for a great resume
          </p>
          <ul className="space-y-1.5">
            {resumeIntro.keyRules.map((item) => (
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
            {resumeIntro.commonMistakes.map((item) => (
              <li key={item} className="text-sm text-red-900">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Even if you have never had a job, completed work experience, or won an award, you still have plenty to
        offer — this builder will help you find it. Want to see what a finished resume looks like first?
      </p>

      <ExampleModal title="Example resume — Jessica Taylor">
        <ResumePreview data={exampleResume} />
      </ExampleModal>
    </div>
  );
}
