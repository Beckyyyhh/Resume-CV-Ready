import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from "docx";
import type { ResumeData } from "@/lib/types";
import { getResumeTemplate, type ResumeTemplateId, type ResumeTemplateStyle } from "@/lib/templates";

const BODY_SIZE = 21; // 10.5pt

function hex(color: string): string {
  return color.replace("#", "").toUpperCase();
}

function sectionHeading(text: string, template: ResumeTemplateStyle): Paragraph {
  const accent = hex(template.colors.accent);
  const heading = hex(template.colors.heading);
  const muted = hex(template.colors.muted);

  const border =
    template.sectionStyle === "underline"
      ? { bottom: { style: BorderStyle.SINGLE, size: 6, color: accent, space: 2 } }
      : template.sectionStyle === "bar"
        ? { left: { style: BorderStyle.SINGLE, size: 18, color: accent, space: 6 } }
        : undefined;

  return new Paragraph({
    spacing: { before: 240, after: 90 },
    border,
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: template.sectionStyle === "plain" ? 18 : 20,
        color: template.sectionStyle === "plain" ? muted : heading,
        font: template.fonts.docxBody,
      }),
    ],
  });
}

function body(text: string, template: ResumeTemplateStyle, opts: { bold?: boolean; muted?: boolean } = {}): Paragraph {
  return new Paragraph({
    spacing: { after: 70 },
    children: [
      new TextRun({
        text,
        size: BODY_SIZE,
        bold: opts.bold,
        color: opts.muted ? hex(template.colors.muted) : undefined,
        font: template.fonts.docxBody,
      }),
    ],
  });
}

function bullet(text: string, template: ResumeTemplateStyle): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: BODY_SIZE, font: template.fonts.docxBody })],
  });
}

export async function buildResumeDocxBlob(data: ResumeData, templateId?: ResumeTemplateId): Promise<Blob> {
  const template = getResumeTemplate(templateId);
  const align = template.headerAlign === "center" ? AlignmentType.CENTER : AlignmentType.LEFT;

  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  const children: Paragraph[] = [
    new Paragraph({
      alignment: align,
      spacing: { after: 40 },
      children: [new TextRun({ text: data.fullName || "Your Name", bold: true, size: 40, font: template.fonts.docxBody })],
    }),
    new Paragraph({
      alignment: align,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: [data.phone, data.email, data.suburbState].filter(Boolean).join("   |   "),
          size: 18,
          color: hex(template.colors.muted),
          font: template.fonts.docxBody,
        }),
      ],
    }),
  ];

  if (data.personalStatement) {
    children.push(sectionHeading("Personal Statement", template));
    children.push(body(data.personalStatement, template));
  }

  if (data.personalQualities.length > 0) {
    children.push(sectionHeading("Personal Qualities", template));
    data.personalQualities.forEach((q) => children.push(bullet(q, template)));
  }

  if (anyEducation) {
    children.push(sectionHeading("Education and Training", template));
    if (data.currentSchool || data.yearsAttended) {
      children.push(
        body([data.currentSchool, data.yearsAttended].filter(Boolean).join("   |   "), template, { bold: true })
      );
    }
    if (data.subjects) children.push(body(data.subjects, template));
    if (data.previousSchools) children.push(body(data.previousSchools, template));
    if (hasCerts) {
      data.certificates
        .split("\n")
        .filter(Boolean)
        .forEach((c) => children.push(body(c, template)));
    }
  }

  if (data.employment.length > 0) {
    children.push(sectionHeading("Employment History", template));
    data.employment.forEach((job) => {
      const line = [job.role, job.organisation].filter(Boolean).join("  —  ");
      children.push(body(line + (job.dates ? `   |   ${job.dates}` : ""), template, { bold: true }));
      job.bullets.forEach((b) => children.push(bullet(b, template)));
    });
  }

  if (hasSkills) {
    children.push(sectionHeading("Skills", template));
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
              new TextRun({ text: `${label}: `, bold: true, size: BODY_SIZE, font: template.fonts.docxBody }),
              new TextRun({ text: value, size: BODY_SIZE, font: template.fonts.docxBody }),
            ],
          })
        );
      });
  }

  if (data.achievements.length > 0) {
    children.push(sectionHeading("Special Achievements and Awards", template));
    data.achievements.forEach((a) => children.push(bullet(a, template)));
  }

  if (data.hobbies) {
    children.push(sectionHeading("Hobbies and Interests", template));
    children.push(body(data.hobbies, template));
  }

  if (data.referees.length > 0) {
    children.push(sectionHeading("Referees", template));
    data.referees.forEach((r) => {
      children.push(body(r.name, template, { bold: true }));
      [r.role, r.organisation, r.phone && `Phone: ${r.phone}`, r.email && `Email: ${r.email}`]
        .filter(Boolean)
        .forEach((line) => children.push(body(line as string, template, { muted: true })));
    });
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return Packer.toBlob(doc);
}
