"use client";

import { useState } from "react";
import { InstructionPanel } from "@/components/wizard/InstructionPanel";
import { SentenceStarters } from "@/components/wizard/SentenceStarters";
import { IdeasBox } from "@/components/wizard/IdeasBox";
import { TagListEditor } from "@/components/wizard/TagListEditor";
import { personalQualitiesStep, personalQualitiesWordBank } from "@/lib/content";
import type { ResumeData } from "@/lib/types";

export function PersonalQualitiesStep({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (patch: Partial<ResumeData>) => void;
}) {
  const [draft, setDraft] = useState("");

  function addQuality(text: string) {
    if (data.personalQualities.includes(text)) return;
    onChange({ personalQualities: [...data.personalQualities, text] });
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <InstructionPanel content={personalQualitiesStep} />
      <SentenceStarters starters={personalQualitiesStep.sentenceStarters ?? []} onUse={setDraft} />
      <IdeasBox
        idea={{ title: "Word bank — click to add", items: personalQualitiesWordBank }}
        onUseItem={addQuality}
      />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <TagListEditor
          label="Your personal qualities (aim for 4–6)"
          items={data.personalQualities}
          onChange={(items) => onChange({ personalQualities: items })}
          placeholder="Type a quality and press Add"
          draft={draft}
          onDraftChange={setDraft}
        />
      </div>
    </div>
  );
}
