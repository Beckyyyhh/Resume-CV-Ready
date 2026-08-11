import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TextField } from "@/components/wizard/FormField";
import { TagListEditor } from "@/components/wizard/TagListEditor";
import { RemovableCard, AddButton } from "@/components/wizard/RemovableCard";
import { employmentStep } from "@/lib/content";
import type { ResumeData, EmploymentEntry } from "@/lib/types";
import { newId } from "@/lib/id";

export function EmploymentStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  function updateEntry(id: string, patch: Partial<EmploymentEntry>) {
    onChange({ employment: data.employment.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
  }

  function addEntry() {
    const entry: EmploymentEntry = { id: newId(), role: "", organisation: "", dates: "", bullets: [] };
    onChange({ employment: [...data.employment, entry] });
  }

  function removeEntry(id: string) {
    onChange({ employment: data.employment.filter((e) => e.id !== id) });
  }

  const quickAdds = (employmentStep.sentenceStarters ?? []).map((s) => ({ label: s.label, text: s.text }));

  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={employmentStep} />
      {employmentStep.ideas && <IdeasBox idea={employmentStep.ideas} />}

      <div className="space-y-4">
        {data.employment.map((job, i) => (
          <RemovableCard key={job.id} title={`Role ${i + 1}`} onRemove={() => removeEntry(job.id)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextField
                label="Role / job title"
                value={job.role}
                onChange={(e) => updateEntry(job.id, { role: e.target.value })}
                placeholder="Volunteer, Babysitter, Work Experience Student..."
              />
              <TextField
                label="Organisation"
                value={job.organisation}
                onChange={(e) => updateEntry(job.id, { organisation: e.target.value })}
                placeholder="Who you worked for"
              />
            </div>
            <TextField
              label="Dates"
              value={job.dates}
              onChange={(e) => updateEntry(job.id, { dates: e.target.value })}
              placeholder="March 2024 – Present"
            />
            <TagListEditor
              label="What you did (2–4 dot points)"
              items={job.bullets}
              onChange={(bullets) => updateEntry(job.id, { bullets })}
              placeholder="Assisted with..."
              quickAdds={quickAdds}
            />
          </RemovableCard>
        ))}
        <AddButton label="Add a role" onClick={addEntry} />
      </div>

      {data.employment.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          Nothing to list yet? That&apos;s OK — read the ideas above, or just write &quot;Currently seeking my
          first employment opportunity&quot; when finalising, and lean on your skills and qualities sections.
        </p>
      )}
    </div>
  );
}
