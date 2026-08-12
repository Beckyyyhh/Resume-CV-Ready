import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ShadingType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";
import type { ResumeData } from "@/lib/types";

const BODY_SIZE = 21; // 10.5pt
const FONT = "Calibri";
const MUTED = "4B5563";
const BANNER_FILL = "EEF0F2";

const NONE_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } as const;
const noBorders = { top: NONE_BORDER, bottom: NONE_BORDER, left: NONE_BORDER, right: NONE_BORDER };

const PAGE_WIDTH = 9026;
const LABEL_WIDTH = 2350;
const CONTENT_WIDTH = PAGE_WIDTH - LABEL_WIDTH;

function banner(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 200, after: 120 },
    shading: { type: ShadingType.CLEAR, fill: BANNER_FILL },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 21, font: FONT, color: "111827" })],
  });
}

function body(text: string, opts: { bold?: boolean; muted?: boolean } = {}): Paragraph {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text, size: BODY_SIZE, bold: opts.bold, color: opts.muted ? MUTED : undefined, font: FONT }),
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

function labelContentTable(rows: { label: Paragraph[]; content: Paragraph[] }[]): Table {
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [LABEL_WIDTH, CONTENT_WIDTH],
    borders: { ...noBorders, insideHorizontal: NONE_BORDER, insideVertical: NONE_BORDER },
    rows: rows.map(
      (r) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: LABEL_WIDTH, type: WidthType.DXA },
              margins: { right: 200, bottom: 160 },
              borders: noBorders,
              children: r.label,
            }),
            new TableCell({
              width: { size: CONTENT_WIDTH, type: WidthType.DXA },
              margins: { bottom: 160 },
              borders: noBorders,
              children: r.content,
            }),
          ],
        })
    ),
  });
}

export async function buildBoldResumeDocxBlob(data: ResumeData): Promise<Blob> {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  const contactLines: Paragraph[] = [
    data.phone && new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 20 }, children: [new TextRun({ text: data.phone, size: 18, color: MUTED, font: FONT })] }),
    data.email && new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 20 }, children: [new TextRun({ text: data.email, size: 18, color: MUTED, font: FONT })] }),
    data.suburbState && new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: data.suburbState, size: 18, color: MUTED, font: FONT })] }),
  ].filter(Boolean) as Paragraph[];

  const headerTable = new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [Math.round(PAGE_WIDTH * 0.55), Math.round(PAGE_WIDTH * 0.45)],
    borders: { ...noBorders, insideHorizontal: NONE_BORDER, insideVertical: NONE_BORDER },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: Math.round(PAGE_WIDTH * 0.55), type: WidthType.DXA },
            borders: noBorders,
            children: [
              new Paragraph({
                children: [new TextRun({ text: data.fullName || "Your Name", bold: true, size: 44, font: FONT, color: "111827" })],
              }),
            ],
          }),
          new TableCell({
            width: { size: Math.round(PAGE_WIDTH * 0.45), type: WidthType.DXA },
            borders: noBorders,
            children: contactLines.length > 0 ? contactLines : [new Paragraph({ children: [] })],
          }),
        ],
      }),
    ],
  });

  const children: (Paragraph | Table)[] = [headerTable, new Paragraph({ spacing: { after: 100 }, children: [] })];

  if (data.personalStatement) {
    children.push(banner("Summary"));
    children.push(body(data.personalStatement));
  }

  if (data.employment.length > 0) {
    children.push(banner("Work Experience"));
    children.push(
      labelContentTable(
        data.employment.map((job) => ({
          label: [
            ...(job.organisation ? [body(job.organisation, { muted: true })] : []),
            ...(job.dates ? [body(job.dates, { muted: true })] : []),
          ],
          content: [
            ...(job.role ? [body(job.role, { bold: true })] : []),
            ...job.bullets.map((b) => bullet(b)),
          ],
        }))
      )
    );
  }

  if (anyEducation) {
    children.push(banner("Education"));
    const certParas = hasCerts
      ? data.certificates.split("\n").filter(Boolean).map((c) => body(c))
      : [];
    children.push(
      labelContentTable([
        {
          label: [
            ...(data.currentSchool ? [body(data.currentSchool, { muted: true })] : []),
            ...(data.yearsAttended ? [body(data.yearsAttended, { muted: true })] : []),
          ],
          content: [
            ...(data.subjects ? [body(data.subjects)] : []),
            ...(data.previousSchools ? [body(data.previousSchools)] : []),
            ...certParas,
          ],
        },
      ])
    );
  }

  if (hasSkills) {
    children.push(banner("Skills"));
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
            spacing: { after: 60 },
            children: [
              new TextRun({ text: `${label}: `, bold: true, size: BODY_SIZE, font: FONT }),
              new TextRun({ text: value, size: BODY_SIZE, font: FONT }),
            ],
          })
        );
      });
  }

  if (data.personalQualities.length > 0) {
    children.push(banner("Personal Qualities"));
    data.personalQualities.forEach((q) => children.push(bullet(q)));
  }

  if (data.achievements.length > 0) {
    children.push(banner("Achievements"));
    data.achievements.forEach((a) => children.push(bullet(a)));
  }

  if (data.hobbies) {
    children.push(banner("Hobbies and Interests"));
    children.push(body(data.hobbies));
  }

  if (data.referees.length > 0) {
    children.push(banner("References"));
    data.referees.forEach((r) => {
      const [title, rest] = splitNameTitle(r.name);
      children.push(
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
        .forEach((line) => children.push(body(line as string, { muted: true })));
    });
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return Packer.toBlob(doc);
}
