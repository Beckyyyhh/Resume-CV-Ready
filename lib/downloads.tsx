import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { ResumeDocument } from "./pdf/ResumeDocument";
import { CoverLetterDocument } from "./pdf/CoverLetterDocument";
import { buildResumeDocxBlob } from "./docx/resumeDocx";
import { buildCoverLetterDocxBlob } from "./docx/coverLetterDocx";
import type { ResumeData, CoverLetterData } from "./types";
import type { ResumeTemplateId } from "./templates";

export function filenameSlug(name: string, fallback: string) {
  const base = name.trim() || fallback;
  return base.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || fallback;
}

export async function buildResumePdfBlob(data: ResumeData, templateId?: ResumeTemplateId): Promise<Blob> {
  return pdf(<ResumeDocument data={data} templateId={templateId} />).toBlob();
}

export async function buildCoverLetterPdfBlob(data: CoverLetterData): Promise<Blob> {
  return pdf(<CoverLetterDocument data={data} />).toBlob();
}

export { buildResumeDocxBlob, buildCoverLetterDocxBlob };

export async function downloadResumePdf(data: ResumeData, templateId?: ResumeTemplateId) {
  const blob = await buildResumePdfBlob(data, templateId);
  saveAs(blob, `${filenameSlug(data.fullName, "resume")}-resume.pdf`);
}

export async function downloadResumeDocx(data: ResumeData, templateId?: ResumeTemplateId) {
  const blob = await buildResumeDocxBlob(data, templateId);
  saveAs(blob, `${filenameSlug(data.fullName, "resume")}-resume.docx`);
}

export async function downloadCoverLetterPdf(data: CoverLetterData) {
  const blob = await buildCoverLetterPdfBlob(data);
  saveAs(blob, `${filenameSlug(data.fullName, "cover-letter")}-cover-letter.pdf`);
}

export async function downloadCoverLetterDocx(data: CoverLetterData) {
  const blob = await buildCoverLetterDocxBlob(data);
  saveAs(blob, `${filenameSlug(data.fullName, "cover-letter")}-cover-letter.docx`);
}
