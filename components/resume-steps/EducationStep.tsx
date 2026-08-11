import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { SentenceStarters } from "@/components/wizard/SentenceStarters";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TextField, TextAreaField } from "@/components/wizard/FormField";
import { educationStep } from "@/lib/content";
import type { ResumeData } from "@/lib/types";

function appendText(current: string, addition: string) {
  return current.trim() ? `${current.trim()} ${addition}` : addition;
}

const STARTER_TARGET: Record<string, keyof ResumeData> = {
  "Current school": "currentSchool",
  Subjects: "subjects",
  Certificates: "certificates",
  "Online learning": "certificates",
};

export function EducationStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={educationStep} />
      <SentenceStarters
        starters={educationStep.sentenceStarters ?? []}
        onUse={(text) => {
          const label = educationStep.sentenceStarters?.find((s) => s.text === text)?.label ?? "";
          const field = STARTER_TARGET[label] ?? "subjects";
          onChange({ [field]: appendText(data[field] as string, text) } as Partial<ResumeData>);
        }}
      />
      {educationStep.ideas && <IdeasBox idea={educationStep.ideas} />}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Current school"
            value={data.currentSchool}
            onChange={(e) => onChange({ currentSchool: e.target.value })}
            placeholder="Bayside Secondary College, Melbourne"
          />
          <TextField
            label="Years attended"
            value={data.yearsAttended}
            onChange={(e) => onChange({ yearsAttended: e.target.value })}
            placeholder="2021 – Present"
          />
        </div>
        <TextAreaField
          label="Subjects & year level"
          rows={3}
          value={data.subjects}
          onChange={(e) => onChange({ subjects: e.target.value })}
          placeholder="Currently completing Year 10. Subjects include..."
        />
        <TextField
          label="Previous school(s)"
          hint="Leave blank if not applicable"
          value={data.previousSchools}
          onChange={(e) => onChange({ previousSchools: e.target.value })}
        />
        <TextAreaField
          label="Certificates or courses"
          hint="One per line — e.g. First Aid Certificate — completed February 2024"
          rows={3}
          value={data.certificates}
          onChange={(e) => onChange({ certificates: e.target.value })}
        />
      </div>
    </div>
  );
}
