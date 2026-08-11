import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TextField } from "@/components/wizard/FormField";
import { RemovableCard, AddButton } from "@/components/wizard/RemovableCard";
import { refereesStep } from "@/lib/content";
import type { ResumeData, RefereeEntry } from "@/lib/types";
import { newId } from "@/lib/id";

export function RefereesStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  function updateEntry(id: string, patch: Partial<RefereeEntry>) {
    onChange({ referees: data.referees.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  }

  function addEntry() {
    const entry: RefereeEntry = { id: newId(), name: "", role: "", organisation: "", phone: "", email: "" };
    onChange({ referees: [...data.referees, entry] });
  }

  function removeEntry(id: string) {
    onChange({ referees: data.referees.filter((r) => r.id !== id) });
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={{ ...refereesStep, whatToInclude: [] }} />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <p className="text-sm font-bold mb-2" style={{ color: "#3d2c8d" }}>
          Good referees for a Year 10 student
        </p>
        <ul className="space-y-1.5">
          {refereesStep.whatToInclude.map((item) => (
            <li key={item} className="text-sm text-gray-700">
              • {item}
            </li>
          ))}
        </ul>
      </div>
      {refereesStep.ideas && <IdeasBox idea={refereesStep.ideas} />}

      <div className="space-y-4">
        {data.referees.map((r, i) => (
          <RemovableCard key={r.id} title={`Referee ${i + 1}`} onRemove={() => removeEntry(r.id)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextField
                label="Full name"
                value={r.name}
                onChange={(e) => updateEntry(r.id, { name: e.target.value })}
              />
              <TextField
                label="Role / title"
                value={r.role}
                onChange={(e) => updateEntry(r.id, { role: e.target.value })}
                placeholder="Teacher — Commerce"
              />
            </div>
            <TextField
              label="Organisation"
              value={r.organisation}
              onChange={(e) => updateEntry(r.id, { organisation: e.target.value })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TextField
                label="Phone"
                value={r.phone}
                onChange={(e) => updateEntry(r.id, { phone: e.target.value })}
              />
              <TextField
                label="Email"
                value={r.email}
                onChange={(e) => updateEntry(r.id, { email: e.target.value })}
              />
            </div>
          </RemovableCard>
        ))}
        <AddButton label="Add a referee" onClick={addEntry} />
      </div>

      {data.referees.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          Not ready to list referees yet? You can write &quot;References available on request&quot; instead — just
          remember to ask permission before you actually give anyone&apos;s details out.
        </p>
      )}
    </div>
  );
}
