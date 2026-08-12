import type { ResumeData } from "@/lib/types";
import { getResumeTemplate, type ResumeTemplateId } from "@/lib/templates";
import { StyledResumeDocument } from "./StyledResumeDocument";
import { ElegantResumeDocument } from "./ElegantResumeDocument";
import { ExecutiveResumeDocument } from "./ExecutiveResumeDocument";
import { BoldResumeDocument } from "./BoldResumeDocument";

export function ResumeDocument({ data, templateId }: { data: ResumeData; templateId?: ResumeTemplateId }) {
  const template = getResumeTemplate(templateId);

  if (template.layout === "elegant") {
    return <ElegantResumeDocument data={data} />;
  }
  if (template.layout === "executive") {
    return <ExecutiveResumeDocument data={data} />;
  }
  if (template.layout === "bold") {
    return <BoldResumeDocument data={data} />;
  }

  return <StyledResumeDocument data={data} template={template} />;
}
