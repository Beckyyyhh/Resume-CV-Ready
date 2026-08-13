export type ResumeTemplateId = "classic" | "modern" | "minimal" | "elegant" | "executive" | "bold";

/** "styled" = shared single-column renderer (font/colour/header variations only).
 *  Anything else names a fully custom layout component. */
export type ResumeLayout = "styled" | "elegant" | "executive" | "bold";

export interface ResumeTemplateStyle {
  id: ResumeTemplateId;
  name: string;
  description: string;
  /** Small colour swatch used to represent the template in the picker UI. */
  swatch: string;
  layout: ResumeLayout;
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
    layout: "styled",
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
    layout: "styled",
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
    layout: "styled",
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
  {
    id: "elegant",
    name: "Elegant",
    description: "A signature-style name, soft dividers, and a two-column layout with a sidebar.",
    swatch: "#be185d",
    layout: "elegant",
    headerAlign: "center",
    sectionStyle: "plain",
    fonts: {
      pdfBody: "Times-Roman",
      pdfBold: "Times-Bold",
      docxBody: "Georgia",
      cssBody: "Georgia, 'Times New Roman', serif",
    },
    colors: { heading: "#111827", accent: "#374151", muted: "#6b7280" },
  },
  {
    id: "executive",
    name: "Executive",
    description: "A bold statement name, an italic summary, and skills shown as tags in the sidebar.",
    swatch: "#1e3a8a",
    layout: "executive",
    headerAlign: "center",
    sectionStyle: "underline",
    fonts: {
      pdfBody: "Times-Roman",
      pdfBold: "Times-Bold",
      docxBody: "Georgia",
      cssBody: "Georgia, 'Times New Roman', serif",
    },
    colors: { heading: "#111827", accent: "#9ca3af", muted: "#6b7280" },
  },
  {
    id: "bold",
    name: "Bold",
    description: "An oversized name and full-width grey section banners. Confident and easy to scan.",
    swatch: "#c2410d",
    layout: "bold",
    headerAlign: "left",
    sectionStyle: "plain",
    fonts: {
      pdfBody: "Helvetica",
      pdfBold: "Helvetica-Bold",
      docxBody: "Calibri",
      cssBody: "'Segoe UI', Arial, Helvetica, sans-serif",
    },
    colors: { heading: "#111827", accent: "#111827", muted: "#6b7280" },
  },
];

export const DEFAULT_RESUME_TEMPLATE: ResumeTemplateId = "classic";

export function getResumeTemplate(id: ResumeTemplateId | undefined | null): ResumeTemplateStyle {
  return resumeTemplates.find((t) => t.id === id) ?? resumeTemplates[0];
}
