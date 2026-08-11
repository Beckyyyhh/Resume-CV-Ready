import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { TextField } from "@/components/wizard/FormField";
import { clDetailsStep } from "@/lib/content";
import type { CoverLetterData } from "@/lib/types";

export function DetailsStep({
  data,
  onChange,
}: {
  data: CoverLetterData;
  onChange: (patch: Partial<CoverLetterData>) => void;
}) {
  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={clDetailsStep} />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
        <p className="text-sm font-bold" style={{ color: "#3d2c8d" }}>
          Your details
        </p>
        <TextField label="Full name" value={data.fullName} onChange={(e) => onChange({ fullName: e.target.value })} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField label="Phone" value={data.phone} onChange={(e) => onChange({ phone: e.target.value })} />
          <TextField label="Email" value={data.email} onChange={(e) => onChange({ email: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Suburb / State"
            value={data.suburbState}
            onChange={(e) => onChange({ suburbState: e.target.value })}
          />
          <TextField
            label="Date"
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value })}
            placeholder="24 August 2026"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4">
        <p className="text-sm font-bold" style={{ color: "#3d2c8d" }}>
          Who you're writing to
        </p>
        <TextField
          label="Employer / manager name"
          hint="Title + surname works best for the greeting (e.g. 'Dear Mr Kelly,'). Leave blank to use 'Hiring Manager'."
          value={data.employerName}
          onChange={(e) => onChange({ employerName: e.target.value })}
          placeholder="Mr Kelly"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Company name"
            value={data.companyName}
            onChange={(e) => onChange({ companyName: e.target.value })}
          />
          <TextField
            label="Company address"
            value={data.companyAddress}
            onChange={(e) => onChange({ companyAddress: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Job title you're applying for"
            value={data.jobTitle}
            onChange={(e) => onChange({ jobTitle: e.target.value })}
          />
          <TextField
            label="Where you saw it advertised"
            value={data.whereSeen}
            onChange={(e) => onChange({ whereSeen: e.target.value })}
            placeholder="the shop noticeboard, Seek, a friend..."
          />
        </div>
      </div>
    </div>
  );
}
