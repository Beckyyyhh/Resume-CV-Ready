import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { TextField } from "@/components/wizard/FormField";
import { contactStep } from "@/lib/content";
import type { ResumeData } from "@/lib/types";

export function ContactStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={contactStep} />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
        <TextField
          label="Full Name"
          value={data.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="Jordan Smith"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Phone"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="0412 345 678"
          />
          <TextField
            label="Email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="jordan.smith@gmail.com"
          />
        </div>
        <TextField
          label="Suburb / State"
          value={data.suburbState}
          onChange={(e) => onChange({ suburbState: e.target.value })}
          placeholder="Bayside VIC"
        />
      </div>
    </div>
  );
}
