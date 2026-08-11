import { Document, Packer, Paragraph, TextRun } from "docx";
import type { CoverLetterData } from "@/lib/types";

const BODY_SIZE = 22; // 11pt

function body(text: string, opts: { bold?: boolean; spacingAfter?: number } = {}): Paragraph {
  return new Paragraph({
    spacing: { after: opts.spacingAfter ?? 200 },
    children: [new TextRun({ text, size: BODY_SIZE, bold: opts.bold, font: "Georgia" })],
  });
}

export async function buildCoverLetterDocxBlob(data: CoverLetterData): Promise<Blob> {
  const greetingName = data.employerName ? data.employerName : "Hiring Manager";
  const signOff = data.employerName ? "Yours sincerely," : "Yours faithfully,";

  const children: Paragraph[] = [
    body(data.fullName || "Your Name", { bold: true, spacingAfter: 20 }),
    body([data.phone, data.email, data.suburbState].filter(Boolean).join("   |   "), { spacingAfter: 200 }),
    body(data.date || "", { spacingAfter: 200 }),
  ];

  if (data.employerName) children.push(body(data.employerName, { spacingAfter: 20 }));
  if (data.companyName) children.push(body(data.companyName, { spacingAfter: 20 }));
  if (data.companyAddress) children.push(body(data.companyAddress, { spacingAfter: 200 }));

  children.push(body(`Dear ${greetingName},`, { spacingAfter: 200 }));

  [data.openingParagraph, data.fitParagraph, data.companyParagraph, data.closingParagraph]
    .filter(Boolean)
    .forEach((p) => children.push(body(p, { spacingAfter: 200 })));

  children.push(body(signOff, { spacingAfter: 400 }));
  children.push(body(data.fullName || "Your Name", { bold: true }));

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return Packer.toBlob(doc);
}
