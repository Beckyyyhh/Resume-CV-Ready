import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { SentenceStarters } from "@/components/wizard/SentenceStarters";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TextField } from "@/components/wizard/FormField";
import { skillsStep } from "@/lib/content";
import type { ResumeData } from "@/lib/types";

function appendText(current: string, addition: string) {
  return current.trim() ? `${current.trim()} ${addition}` : addition;
}

const STARTER_TARGET: Record<string, keyof ResumeData> = {
  Digital: "skillsDigital",
  Creative: "skillsOther",
  Communication: "skillsCommunication",
  Languages: "skillsLanguages",
  Organisational: "skillsOther",
  Physical: "skillsOther",
  Licence: "skillsCertificates",
};

export function SkillsStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={skillsStep} />
      <SentenceStarters
        starters={skillsStep.sentenceStarters ?? []}
        onUse={(text) => {
          const label = skillsStep.sentenceStarters?.find((s) => s.text === text)?.label ?? "";
          const field = STARTER_TARGET[label] ?? "skillsOther";
          onChange({ [field]: appendText(data[field] as string, text) } as Partial<ResumeData>);
        }}
      />
      {skillsStep.ideas && <IdeasBox idea={skillsStep.ideas} />}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
        <TextField
          label="Digital skills"
          value={data.skillsDigital}
          onChange={(e) => onChange({ skillsDigital: e.target.value })}
          placeholder="Microsoft Word, Excel, PowerPoint, Canva..."
        />
        <TextField
          label="Communication"
          value={data.skillsCommunication}
          onChange={(e) => onChange({ skillsCommunication: e.target.value })}
        />
        <TextField
          label="Languages"
          value={data.skillsLanguages}
          onChange={(e) => onChange({ skillsLanguages: e.target.value })}
          placeholder="Fluent in English; conversational..."
        />
        <TextField
          label="Other skills"
          hint="Organisational, physical/practical, creative..."
          value={data.skillsOther}
          onChange={(e) => onChange({ skillsOther: e.target.value })}
        />
        <TextField
          label="Certificates / licences"
          value={data.skillsCertificates}
          onChange={(e) => onChange({ skillsCertificates: e.target.value })}
        />
      </div>
    </div>
  );
}
