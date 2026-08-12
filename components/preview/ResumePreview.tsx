import type { ResumeData } from "@/lib/types";
import { getResumeTemplate, type ResumeTemplateId } from "@/lib/templates";
import { StyledResumePreview } from "./StyledResumePreview";
import { ElegantResumePreview } from "./ElegantResumePreview";
import { ExecutiveResumePreview } from "./ExecutiveResumePreview";
import { BoldResumePreview } from "./BoldResumePreview";

export function ResumePreview({ data, templateId }: { data: ResumeData; templateId?: ResumeTemplateId }) {
  const template = getResumeTemplate(templateId);

  if (template.layout === "elegant") {
    return <ElegantResumePreview data={data} />;
  }
  if (template.layout === "executive") {
    return <ExecutiveResumePreview data={data} />;
  }
  if (template.layout === "bold") {
    return <BoldResumePreview data={data} />;
  }

  return <StyledResumePreview data={data} template={template} />;
}
