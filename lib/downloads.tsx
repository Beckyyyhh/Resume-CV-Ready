import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { ResumeDocument } from "./pdf/ResumeDocument";
import { CoverLetterDocument } from "./pdf/CoverLetterDocument";
import { buildResumeDocxBlob } from "./docx/resumeDocx";
import { buildCoverLetterDocxBlob } from "./docx/coverLetterDocx";
import type { ResumeData, CoverLetterData } from "./types";

function slug(name: string, fallback: string) {
  const base = name.trim() || fallback;
  return base.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || fallback;
}

export async function downloadResumePdf(data: ResumeData) {
  const blob = await pdf(<ResumeDocument data={data} />).toBlob();
  saveAs(blob, `${slug(data.fullName, "resume")}-resume.pdf`);
}

export async function downloadResumeDocx(data: ResumeData) {
  const blob = await buildResumeDocxBlob(data);
  saveAs(blob, `${slug(data.fullName, "resume")}-resume.docx`);
}

export async function downloadCoverLetterPdf(data: CoverLetterData) {
  const blob = await pdf(<CoverLetterDocument data={data} />).toBlob();
  saveAs(blob, `${slug(data.fullName, "cover-letter")}-cover-letter.pdf`);
}

export async function downloadCoverLetterDocx(data: CoverLetterData) {
  const blob = await buildCoverLetterDocxBlob(data);
  saveAs(blob, `${slug(data.fullName, "cover-letter")}-cover-letter.docx`);
}
