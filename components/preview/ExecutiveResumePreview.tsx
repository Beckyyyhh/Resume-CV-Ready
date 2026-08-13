import type { ResumeData } from "@/lib/types";
import { HighlightPlaceholders } from "@/components/wizard/HighlightPlaceholders";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10.5px] font-bold uppercase pb-1 mb-2 border-b"
      style={{ letterSpacing: "0.12em", color: "#111827", borderColor: "#d1d5db" }}
    >
      {children}
    </p>
  );
}

function skillTags(data: ResumeData): string[] {
  return [data.skillsDigital, data.skillsCommunication, data.skillsLanguages, data.skillsOther, data.skillsCertificates]
    .filter(Boolean)
    .join(", ")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ExecutiveResumePreview({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation =
    data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const tags = skillTags(data);

  return (
    <div
      id="resume-preview-surface"
      className="bg-white text-[#1a1a2e] p-8 shadow-sm border border-gray-200 rounded-xl mx-auto break-words"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif", width: "100%", maxWidth: 720, fontSize: 12, lineHeight: 1.5 }}
    >
      <div className="text-center">
        <p className="text-3xl font-bold" style={{ color: "#111827" }}>
          {data.fullName || "Your Name"}
        </p>
      </div>

      <div className="text-center mt-3 pt-2 pb-2 border-t border-b text-[11px]" style={{ borderColor: "#d1d5db", color: "#4b5563" }}>
        {[data.phone, data.email, data.suburbState].filter(Boolean).join("   |   ") || "Phone   |   Email   |   Suburb, State"}
      </div>

      {data.personalStatement && (
        <p className="text-center italic mt-4 mb-4 text-[12px]" style={{ color: "#374151" }}>
          &ldquo;<HighlightPlaceholders text={data.personalStatement} />&rdquo;
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-7 mt-4">
        <div className="min-w-0">
          {data.employment.length > 0 && (
            <>
              <Heading>Professional Experience</Heading>
              <div className="space-y-3">
                {data.employment.map((job) => (
                  <div key={job.id} className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-bold text-[13px] min-w-0 break-words">{job.role}</p>
                      {job.dates && (
                        <p className="text-[10.5px] shrink-0" style={{ color: "#6b7280" }}>
                          {job.dates}
                        </p>
                      )}
                    </div>
                    {job.organisation && <p className="italic text-[11.5px]">{job.organisation}</p>}
                    {job.bullets.length > 0 && (
                      <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[11.5px]">
                        {job.bullets.map((b, i) => (
                          <li key={i}>
                            <HighlightPlaceholders text={b} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="space-y-4 min-w-0">
          {anyEducation && (
            <div>
              <Heading>Education</Heading>
              <div className="text-[11px] space-y-0.5">
                {data.currentSchool && <p className="font-semibold">{data.currentSchool}</p>}
                {data.yearsAttended && <p style={{ color: "#6b7280" }}>{data.yearsAttended}</p>}
                {data.subjects && (
                  <p>
                    <HighlightPlaceholders text={data.subjects} />
                  </p>
                )}
                {data.previousSchools && (
                  <p>
                    <HighlightPlaceholders text={data.previousSchools} />
                  </p>
                )}
                {hasCerts &&
                  data.certificates.split("\n").filter(Boolean).map((c, i) => (
                    <p key={i}>
                      <HighlightPlaceholders text={c} />
                    </p>
                  ))}
              </div>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <Heading>Expertise</Heading>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 rounded-full"
                    style={{ backgroundColor: "#e5e7eb", color: "#374151" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.personalQualities.length > 0 && (
            <div>
              <Heading>Personal Qualities</Heading>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                {data.personalQualities.map((q, i) => (
                  <li key={i}>
                    <HighlightPlaceholders text={q} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.achievements.length > 0 && (
            <div>
              <Heading>Achievements</Heading>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                {data.achievements.map((a, i) => (
                  <li key={i}>
                    <HighlightPlaceholders text={a} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.hobbies && (
            <div>
              <Heading>Hobbies and Interests</Heading>
              <p className="text-[11px]">
                <HighlightPlaceholders text={data.hobbies} />
              </p>
            </div>
          )}

          {data.referees.length > 0 && (
            <div>
              <Heading>References</Heading>
              <div className="space-y-2 text-[11px]">
                {data.referees.map((r) => (
                  <div key={r.id}>
                    <p className="font-semibold">{r.name}</p>
                    {r.role && <p style={{ color: "#6b7280" }}>{r.role}</p>}
                    {r.organisation && <p style={{ color: "#6b7280" }}>{r.organisation}</p>}
                    {r.phone && <p>Phone: {r.phone}</p>}
                    {r.email && <p>Email: {r.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
