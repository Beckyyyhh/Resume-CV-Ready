import type { ResumeData } from "@/lib/types";
import { getResumeTemplate, type ResumeTemplateId } from "@/lib/templates";
import { buildStyledResumeDocxBlob } from "./styledResumeDocx";
import { buildElegantResumeDocxBlob } from "./elegantResumeDocx";
import { buildExecutiveResumeDocxBlob } from "./executiveResumeDocx";
import { buildBoldResumeDocxBlob } from "./boldResumeDocx";

export async function buildResumeDocxBlob(data: ResumeData, templateId?: ResumeTemplateId): Promise<Blob> {
  const template = getResumeTemplate(templateId);

  if (template.layout === "elegant") {
    return buildElegantResumeDocxBlob(data);
  }
  if (template.layout === "executive") {
    return buildExecutiveResumeDocxBlob(data);
  }
  if (template.layout === "bold") {
    return buildBoldResumeDocxBlob(data);
  }

  return buildStyledResumeDocxBlob(data, template);
}
