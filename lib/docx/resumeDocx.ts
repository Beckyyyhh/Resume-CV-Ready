import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from "docx";
import type { ResumeData } from "@/lib/types";

const BODY_SIZE = 21; // 10.5pt
const PURPLE = "3D2C8D";
const INDIGO = "26215C";
const MUTED = "4B5563";

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 240, after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PURPLE, space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 20, color: INDIGO, font: "Georgia" })],
  });
}

function body(text: string, opts: { bold?: boolean; color?: string } = {}): Paragraph {
  return new Paragraph({
    spacing: { after: 70 },
    children: [new TextRun({ text, size: BODY_SIZE, bold: opts.bold, color: opts.color, font: "Georgia" })],
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: BODY_SIZE, font: "Georgia" })],
  });
}

export async function buildResumeDocxBlob(data: ResumeData): Promise<Blob> {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  const children: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: data.fullName || "Your Name", bold: true, size: 40, font: "Georgia" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: [data.phone, data.email, data.suburbState].filter(Boolean).join("   |   "),
          size: 18,
          color: MUTED,
          font: "Georgia",
        }),
      ],
    }),
  ];

  if (data.personalStatement) {
    children.push(sectionHeading("Personal Statement"));
    children.push(body(data.personalStatement));
  }

  if (data.personalQualities.length > 0) {
    children.push(sectionHeading("Personal Qualities"));
    data.personalQualities.forEach((q) => children.push(bullet(q)));
  }

  if (anyEducation) {
    children.push(sectionHeading("Education and Training"));
    if (data.currentSchool || data.yearsAttended) {
      children.push(body([data.currentSchool, data.yearsAttended].filter(Boolean).join("   |   "), { bold: true }));
    }
    if (data.subjects) children.push(body(data.subjects));
    if (data.previousSchools) children.push(body(data.previousSchools));
    if (hasCerts) {
      data.certificates
        .split("\n")
        .filter(Boolean)
        .forEach((c) => children.push(body(c)));
    }
  }

  if (data.employment.length > 0) {
    children.push(sectionHeading("Employment History"));
    data.employment.forEach((job) => {
      const line = [job.role, job.organisation].filter(Boolean).join("  —  ");
      children.push(body(line + (job.dates ? `   |   ${job.dates}` : ""), { bold: true }));
      job.bullets.forEach((b) => children.push(bullet(b)));
    });
  }

  if (hasSkills) {
    children.push(sectionHeading("Skills"));
    const skillLines: [string, string][] = [
      ["Digital", data.skillsDigital],
      ["Communication", data.skillsCommunication],
      ["Languages", data.skillsLanguages],
      ["Organisational", data.skillsOther],
      ["Licences/Certificates", data.skillsCertificates],
    ];
    skillLines
      .filter(([, value]) => value)
      .forEach(([label, value]) => {
        children.push(
          new Paragraph({
            spacing: { after: 70 },
            children: [
              new TextRun({ text: `${label}: `, bold: true, size: BODY_SIZE, font: "Georgia" }),
              new TextRun({ text: value, size: BODY_SIZE, font: "Georgia" }),
            ],
          })
        );
      });
  }

  if (data.achievements.length > 0) {
    children.push(sectionHeading("Special Achievements and Awards"));
    data.achievements.forEach((a) => children.push(bullet(a)));
  }

  if (data.hobbies) {
    children.push(sectionHeading("Hobbies and Interests"));
    children.push(body(data.hobbies));
  }

  if (data.referees.length > 0) {
    children.push(sectionHeading("Referees"));
    data.referees.forEach((r) => {
      children.push(body(r.name, { bold: true }));
      [r.role, r.organisation, r.phone && `Phone: ${r.phone}`, r.email && `Email: ${r.email}`]
        .filter(Boolean)
        .forEach((line) => children.push(body(line as string, { color: MUTED })));
    });
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return Packer.toBlob(doc);
}
