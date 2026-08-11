import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { SentenceStarters } from "@/components/wizard/SentenceStarters";
import { TextAreaField } from "@/components/wizard/FormField";
import { hobbiesStep } from "@/lib/content";
import type { ResumeData } from "@/lib/types";

function appendText(current: string, addition: string) {
  return current.trim() ? `${current.trim()} ${addition}` : addition;
}

export function HobbiesStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={hobbiesStep} />
      <SentenceStarters
        starters={hobbiesStep.sentenceStarters ?? []}
        onUse={(text) => onChange({ hobbies: appendText(data.hobbies, text) })}
      />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <TextAreaField
          label="Hobbies and interests"
          hint="3–5 sentences or dot points"
          rows={5}
          value={data.hobbies}
          onChange={(e) => onChange({ hobbies: e.target.value })}
        />
      </div>
    </div>
  );
}
