export type ResumeTemplateId = "classic" | "modern" | "minimal";

export interface ResumeTemplateStyle {
  id: ResumeTemplateId;
  name: string;
  description: string;
  /** Small colour swatch used to represent the template in the picker UI. */
  swatch: string;
  headerAlign: "center" | "left";
  sectionStyle: "underline" | "bar" | "plain";
  fonts: {
    /** Core PDF font names (react-pdf/pdfkit standard 14 fonts only — no embedding needed). */
    pdfBody: "Times-Roman" | "Helvetica";
    pdfBold: "Times-Bold" | "Helvetica-Bold";
    /** Font name written into the Word document. */
    docxBody: string;
    /** CSS font-family stack for the on-screen live preview. */
    cssBody: string;
  };
  colors: {
    heading: string;
    accent: string;
    muted: string;
  };
}

export const resumeTemplates: ResumeTemplateStyle[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional serif layout with a centred header. Safe, professional, works everywhere.",
    swatch: "#3d2c8d",
    headerAlign: "center",
    sectionStyle: "underline",
    fonts: {
      pdfBody: "Times-Roman",
      pdfBold: "Times-Bold",
      docxBody: "Georgia",
      cssBody: "Georgia, 'Times New Roman', serif",
    },
    colors: { heading: "#26215c", accent: "#3d2c8d", muted: "#4b5563" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean sans-serif with a bold colour accent. A bit more contemporary.",
    swatch: "#0d9488",
    headerAlign: "left",
    sectionStyle: "bar",
    fonts: {
      pdfBody: "Helvetica",
      pdfBold: "Helvetica-Bold",
      docxBody: "Calibri",
      cssBody: "'Segoe UI', Arial, Helvetica, sans-serif",
    },
    colors: { heading: "#111827", accent: "#0d9488", muted: "#4b5563" },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Understated black-and-white layout with lots of whitespace. Great for printing.",
    swatch: "#9ca3af",
    headerAlign: "left",
    sectionStyle: "plain",
    fonts: {
      pdfBody: "Helvetica",
      pdfBold: "Helvetica-Bold",
      docxBody: "Calibri",
      cssBody: "'Segoe UI', Arial, Helvetica, sans-serif",
    },
    colors: { heading: "#111827", accent: "#9ca3af", muted: "#6b7280" },
  },
];

export const DEFAULT_RESUME_TEMPLATE: ResumeTemplateId = "classic";

export function getResumeTemplate(id: ResumeTemplateId | undefined | null): ResumeTemplateStyle {
  return resumeTemplates.find((t) => t.id === id) ?? resumeTemplates[0];
}
