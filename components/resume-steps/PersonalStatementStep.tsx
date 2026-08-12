import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { SentenceStarters } from "@/components/wizard/SentenceStarters";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TextAreaField } from "@/components/wizard/FormField";
import { personalStatementStep } from "@/lib/content";
import type { ResumeData } from "@/lib/types";

function appendText(current: string, addition: string) {
  return current.trim() ? `${current.trim()} ${addition}` : addition;
}

export function PersonalStatementStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={personalStatementStep} />
      <SentenceStarters
        starters={personalStatementStep.sentenceStarters ?? []}
        onUse={(text) => onChange({ personalStatement: appendText(data.personalStatement, text) })}
      />
      {personalStatementStep.ideas && <IdeasBox idea={personalStatementStep.ideas} />}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <TextAreaField
          label="Your personal statement"
          hint="3–5 sentences introducing who you are and what you're looking for"
          rows={6}
          value={data.personalStatement}
          onChange={(e) => onChange({ personalStatement: e.target.value })}
          placeholder="I am an enthusiastic Year [year level] student at..."
        />
      </div>
    </div>
  );
}
