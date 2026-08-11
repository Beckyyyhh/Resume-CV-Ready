import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { SentenceStarters } from "@/components/wizard/SentenceStarters";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TextAreaField } from "@/components/wizard/FormField";
import type { StepContent } from "@/lib/content";

function appendText(current: string, addition: string) {
  return current.trim() ? `${current.trim()} ${addition}` : addition;
}

export function ParagraphStep({
  content,
  value,
  onChange,
  fieldLabel,
  placeholder,
}: {
  content: StepContent;
  value: string;
  onChange: (value: string) => void;
  fieldLabel: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={content} />
      {content.sentenceStarters && (
        <SentenceStarters starters={content.sentenceStarters} onUse={(text) => onChange(appendText(value, text))} />
      )}
      {content.ideas && <IdeasBox idea={content.ideas} />}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <TextAreaField label={fieldLabel} rows={6} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </div>
    </div>
  );
}
