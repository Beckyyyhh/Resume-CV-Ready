import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  ShadingType,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";
import type { ResumeData } from "@/lib/types";

const BODY_SIZE = 20; // 10pt
const FONT = "Georgia";
const MUTED = "6B7280";
const RULE_COLOR = "D1D5DB";
const PILL_FILL = "E5E7EB";
const PILL_TEXT = "374151";

const NONE_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } as const;
const noBorders = { top: NONE_BORDER, bottom: NONE_BORDER, left: NONE_BORDER, right: NONE_BORDER };

function heading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE_COLOR, space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 18, font: FONT, characterSpacing: 14 })],
  });
}

function body(text: string, opts: { bold?: boolean; italic?: boolean; muted?: boolean } = {}): Paragraph {
  return new Paragraph({
    spacing: { after: 50 },
    children: [
      new TextRun({
        text,
        size: BODY_SIZE,
        bold: opts.bold,
        italics: opts.italic,
        color: opts.muted ? MUTED : undefined,
        font: FONT,
      }),
    ],
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: BODY_SIZE, font: FONT })],
  });
}

function splitNameTitle(name: string): [string, string] {
  const match = name.match(/^(Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+(.*)$/i);
  return match ? [`${match[1]} `, match[2]] : ["", name];
}

function skillTags(data: ResumeData): string[] {
  return [data.skillsDigital, data.skillsCommunication, data.skillsLanguages, data.skillsOther, data.skillsCertificates]
    .filter(Boolean)
    .join(", ")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function buildExecutiveResumeDocxBlob(data: ResumeData): Promise<Blob> {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const tags = skillTags(data);

  const header: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: data.fullName || "Your Name", bold: true, size: 52, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 4, color: RULE_COLOR, space: 6 },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE_COLOR, space: 6 },
      },
      children: [
        new TextRun({
          text: [data.phone, data.email, data.suburbState].filter(Boolean).join("   |   "),
          size: 19,
          color: MUTED,
          font: FONT,
        }),
      ],
    }),
  ];

  if (data.personalStatement) {
    header.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({ text: `“${data.personalStatement}”`, italics: true, size: BODY_SIZE, color: "374151", font: FONT }),
        ],
      })
    );
  }

  const left: Paragraph[] = [];
  if (data.employment.length > 0) {
    left.push(heading("Professional Experience"));
    data.employment.forEach((job) => {
      left.push(
        new Paragraph({
          spacing: { after: 20 },
          tabStops: [{ type: "right" as const, position: 5400 }],
          children: [
            new TextRun({ text: job.role, bold: true, size: BODY_SIZE, font: FONT }),
            new TextRun({ text: job.dates ? `\t${job.dates}` : "", size: BODY_SIZE, color: MUTED, font: FONT }),
          ],
        })
      );
      if (job.organisation) left.push(body(job.organisation, { italic: true }));
      job.bullets.forEach((b) => left.push(bullet(b)));
    });
  }

  const right: Paragraph[] = [];
  if (anyEducation) {
    right.push(heading("Education"));
    if (data.currentSchool) right.push(body(data.currentSchool, { bold: true }));
    if (data.yearsAttended) right.push(body(data.yearsAttended, { muted: true }));
    if (data.subjects) right.push(body(data.subjects));
    if (data.previousSchools) right.push(body(data.previousSchools));
    if (hasCerts) {
      data.certificates
        .split("\n")
        .filter(Boolean)
        .forEach((c) => right.push(body(c)));
    }
  }

  if (tags.length > 0) {
    right.push(heading("Expertise"));
    right.push(
      new Paragraph({
        spacing: { after: 60 },
        children: tags.map(
          (t) =>
            new TextRun({
              text: ` ${t}  `,
              size: 16,
              color: PILL_TEXT,
              font: FONT,
              shading: { type: ShadingType.CLEAR, fill: PILL_FILL },
            })
        ),
      })
    );
  }

  if (data.personalQualities.length > 0) {
    right.push(heading("Personal Qualities"));
    data.personalQualities.forEach((q) => right.push(bullet(q)));
  }

  if (data.achievements.length > 0) {
    right.push(heading("Achievements"));
    data.achievements.forEach((a) => right.push(bullet(a)));
  }

  if (data.hobbies) {
    right.push(heading("Hobbies and Interests"));
    right.push(body(data.hobbies));
  }

  if (data.referees.length > 0) {
    right.push(heading("References"));
    data.referees.forEach((r) => {
      const [title, rest] = splitNameTitle(r.name);
      right.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: title, size: BODY_SIZE, font: FONT }),
            new TextRun({ text: rest, bold: true, size: BODY_SIZE, font: FONT }),
          ],
        })
      );
      [r.role, r.organisation, r.phone && `Phone: ${r.phone}`, r.email && `Email: ${r.email}`]
        .filter(Boolean)
        .forEach((line) => right.push(body(line as string, { muted: true })));
    });
  }

  const table = new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: [5400, 3626],
    borders: { ...noBorders, insideHorizontal: NONE_BORDER, insideVertical: NONE_BORDER },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 5400, type: WidthType.DXA },
            margins: { right: 260 },
            borders: noBorders,
            children: left.length > 0 ? left : [new Paragraph({ children: [] })],
          }),
          new TableCell({
            width: { size: 3626, type: WidthType.DXA },
            margins: { left: 260 },
            borders: noBorders,
            children: right.length > 0 ? right : [new Paragraph({ children: [] })],
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [{ properties: {}, children: [...header, table] }],
  });

  return Packer.toBlob(doc);
}
