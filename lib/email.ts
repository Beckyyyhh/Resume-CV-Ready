import {
  buildResumePdfBlob,
  buildResumeDocxBlob,
  buildCoverLetterPdfBlob,
  buildCoverLetterDocxBlob,
  filenameSlug,
} from "./downloads";
import type { ResumeData, CoverLetterData } from "./types";
import type { ResumeTemplateId } from "./templates";

export class EmailSendError extends Error {}

async function sendDocuments(params: {
  email: string;
  kind: "resume" | "cover-letter";
  fullName: string;
  pdfBlob: Blob;
  docxBlob: Blob;
  baseName: string;
}) {
  const formData = new FormData();
  formData.set("email", params.email);
  formData.set("kind", params.kind);
  formData.set("fullName", params.fullName);
  formData.set("pdf", params.pdfBlob, `${params.baseName}.pdf`);
  formData.set("docx", params.docxBlob, `${params.baseName}.docx`);

  let response: Response;
  try {
    response = await fetch("/api/send-document", { method: "POST", body: formData });
  } catch {
    throw new EmailSendError("Couldn't reach the server. Check your connection and try again.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new EmailSendError(body.error || "Something went wrong sending the email. Please try again.");
  }
}

export async function emailResume(data: ResumeData, templateId: ResumeTemplateId | undefined, email: string) {
  const [pdfBlob, docxBlob] = await Promise.all([
    buildResumePdfBlob(data, templateId),
    buildResumeDocxBlob(data, templateId),
  ]);
  await sendDocuments({
    email,
    kind: "resume",
    fullName: data.fullName,
    pdfBlob,
    docxBlob,
    baseName: `${filenameSlug(data.fullName, "resume")}-resume`,
  });
}

export async function emailCoverLetter(data: CoverLetterData, email: string) {
  const [pdfBlob, docxBlob] = await Promise.all([
    buildCoverLetterPdfBlob(data),
    buildCoverLetterDocxBlob(data),
  ]);
  await sendDocuments({
    email,
    kind: "cover-letter",
    fullName: data.fullName,
    pdfBlob,
    docxBlob,
    baseName: `${filenameSlug(data.fullName, "cover-letter")}-cover-letter`,
  });
}
