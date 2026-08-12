import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";
import type { ResumeData } from "@/lib/types";

const BODY_SIZE = 20; // 10pt
const FONT = "Georgia";
const NAME_FONT = "Segoe Script";
const MUTED = "6B7280";
const RULE_COLOR = "D1D5DB";

const NONE_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } as const;
const noBorders = { top: NONE_BORDER, bottom: NONE_BORDER, left: NONE_BORDER, right: NONE_BORDER };

function heading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 70 },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 18, font: FONT, characterSpacing: 20 })],
  });
}

function body(text: string, opts: { bold?: boolean; italic?: boolean; muted?: boolean } = {}): Paragraph {
  return new Paragraph({
    spacing: { after: 60 },
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

function rule(): Paragraph {
  return new Paragraph({
    spacing: { before: 40, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE_COLOR, space: 1 } },
    children: [new TextRun({ text: "", size: 2 })],
  });
}

// react-pdf/pdfkit's bold "Mr"/"Ms" kerning bug doesn't affect Word, but the
// title-split still reads more naturally, so it's kept consistent here too.
function splitNameTitle(name: string): [string, string] {
  const match = name.match(/^(Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+(.*)$/i);
  return match ? [`${match[1]} `, match[2]] : ["", name];
}

export async function buildElegantResumeDocxBlob(data: ResumeData): Promise<Blob> {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const skillLines: [string, string][] = (
    [
      ["Digital", data.skillsDigital],
      ["Communication", data.skillsCommunication],
      ["Languages", data.skillsLanguages],
      ["Organisational", data.skillsOther],
      ["Licences", data.skillsCertificates],
    ] as [string, string][]
  ).filter(([, v]) => v);

  const header: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: data.fullName || "Your Name", size: 72, font: NAME_FONT })],
    }),
    rule(),
  ];

  const summary: Paragraph[] = [];
  if (data.personalStatement) {
    summary.push(heading("Summary"));
    summary.push(body(data.personalStatement));
    summary.push(rule());
  }

  const left: Paragraph[] = [heading("Contact")];
  if (data.phone) left.push(body(data.phone));
  if (data.email) left.push(body(data.email));
  if (data.suburbState) left.push(body(data.suburbState));

  if (anyEducation) {
    left.push(rule());
    left.push(heading("Education"));
    if (data.currentSchool) left.push(body(data.currentSchool, { bold: true }));
    if (data.yearsAttended) left.push(body(data.yearsAttended, { muted: true }));
    if (data.subjects) left.push(body(data.subjects));
    if (data.previousSchools) left.push(body(data.previousSchools));
    if (hasCerts) {
      data.certificates
        .split("\n")
        .filter(Boolean)
        .forEach((c) => left.push(body(c)));
    }
  }

  if (skillLines.length > 0 || data.personalQualities.length > 0) {
    left.push(rule());
    if (skillLines.length > 0) {
      left.push(heading("Skills"));
      skillLines.forEach(([label, value]) => {
        left.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: `${label}: `, size: BODY_SIZE, color: MUTED, font: FONT }),
              new TextRun({ text: value, size: BODY_SIZE, font: FONT }),
            ],
          })
        );
      });
    }
    if (data.personalQualities.length > 0) {
      left.push(heading("Personal Qualities"));
      data.personalQualities.forEach((q) => left.push(bullet(q)));
    }
  }

  const right: Paragraph[] = [];
  if (data.employment.length > 0) {
    right.push(heading("Experience"));
    data.employment.forEach((job) => {
      right.push(
        new Paragraph({
          spacing: { after: 20 },
          tabStops: [{ type: "right" as const, position: 9026 - 3400 }],
          children: [
            new TextRun({ text: job.role, bold: true, size: BODY_SIZE, font: FONT }),
            new TextRun({ text: job.dates ? `\t${job.dates}` : "", size: BODY_SIZE, color: MUTED, font: FONT }),
          ],
        })
      );
      if (job.organisation) right.push(body(job.organisation, { italic: true }));
      job.bullets.forEach((b) => right.push(bullet(b)));
    });
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
    columnWidths: [3000, 6026],
    borders: { ...noBorders, insideHorizontal: NONE_BORDER, insideVertical: NONE_BORDER },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 3000, type: WidthType.DXA },
            margins: { right: 260 },
            borders: { ...noBorders, right: { style: BorderStyle.SINGLE, size: 4, color: RULE_COLOR } },
            children: left,
          }),
          new TableCell({
            width: { size: 6026, type: WidthType.DXA },
            margins: { left: 320 },
            borders: noBorders,
            children: right,
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [{ properties: {}, children: [...header, ...summary, table] }],
  });

  return Packer.toBlob(doc);
}
