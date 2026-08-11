import type { CoverLetterData } from "@/lib/types";
import { HighlightPlaceholders } from "@/components/wizard/HighlightPlaceholders";

export function CoverLetterPreview({ data }: { data: CoverLetterData }) {
  const greetingName = data.employerName ? data.employerName : "Hiring Manager";
  const signOff = data.employerName ? "Yours sincerely," : "Yours faithfully,";

  return (
    <div
      className="bg-white text-[#1a1a2e] p-8 shadow-sm border border-gray-200 rounded-xl mx-auto"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif", width: "100%", maxWidth: 720, fontSize: 12.5, lineHeight: 1.6 }}
    >
      <p className="font-bold">{data.fullName || "Your Name"}</p>
      <p className="text-xs text-gray-600">
        {[data.phone, data.email, data.suburbState].filter(Boolean).join("  |  ") || "Phone  |  Email  |  Suburb, State"}
      </p>

      <p className="mt-4">
        <HighlightPlaceholders text={data.date || "[Date]"} />
      </p>

      <div className="mt-4">
        {data.employerName && <p>{data.employerName}</p>}
        {data.companyName && <p>{data.companyName}</p>}
        {data.companyAddress && <p>{data.companyAddress}</p>}
      </div>

      <p className="mt-4">Dear {greetingName},</p>

      <div className="mt-3 space-y-3">
        <p>
          <HighlightPlaceholders
            text={
              data.openingParagraph ||
              "I am writing to apply for the [job title] position advertised on/at [where you saw it]."
            }
          />
        </p>
        {data.fitParagraph && (
          <p>
            <HighlightPlaceholders text={data.fitParagraph} />
          </p>
        )}
        {data.companyParagraph && (
          <p>
            <HighlightPlaceholders text={data.companyParagraph} />
          </p>
        )}
        {data.closingParagraph && (
          <p>
            <HighlightPlaceholders text={data.closingParagraph} />
          </p>
        )}
      </div>

      <p className="mt-4">{signOff}</p>
      <p className="mt-3 font-bold">{data.fullName || "Your Name"}</p>
    </div>
  );
}
