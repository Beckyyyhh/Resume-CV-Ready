import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TagListEditor } from "@/components/wizard/TagListEditor";
import { achievementsStep } from "@/lib/content";
import type { ResumeData } from "@/lib/types";

export function AchievementsStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  const quickAdds = (achievementsStep.sentenceStarters ?? []).map((s) => ({ label: s.label, text: s.text }));

  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={achievementsStep} />
      {achievementsStep.ideas && <IdeasBox idea={achievementsStep.ideas} />}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <TagListEditor
          label="Achievements & awards"
          items={data.achievements}
          onChange={(items) => onChange({ achievements: items })}
          placeholder="Principal's Award for Academic Excellence — 2024"
          quickAdds={quickAdds}
        />
      </div>
    </div>
  );
}
