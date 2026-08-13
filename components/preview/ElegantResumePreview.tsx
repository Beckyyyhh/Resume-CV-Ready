import { Phone, Mail, MapPin } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { HighlightPlaceholders } from "@/components/wizard/HighlightPlaceholders";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[12px] font-bold uppercase mb-2"
      style={{ letterSpacing: "0.18em", color: "#111827" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="my-4 border-t" style={{ borderColor: "#d1d5db" }} />;
}

export function ElegantResumePreview({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation =
    data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const skillLines: [string, string][] = [
    ["Digital", data.skillsDigital],
    ["Communication", data.skillsCommunication],
    ["Languages", data.skillsLanguages],
    ["Organisational", data.skillsOther],
    ["Licences", data.skillsCertificates],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <div
      id="resume-preview-surface"
      className="bg-white text-[#1a1a2e] p-8 shadow-sm border border-gray-200 rounded-xl mx-auto break-words overflow-hidden"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif", width: "100%", maxWidth: 720, fontSize: 12, lineHeight: 1.45 }}
    >
      <div className="text-center">
        <p
          className="break-words"
          style={{
            fontFamily: "var(--font-elegant), 'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.2,
            color: "#111827",
          }}
        >
          {data.fullName || "Your Name"}
        </p>
      </div>

      <Divider />

      {data.personalStatement && (
        <>
          <Heading>Summary</Heading>
          <p className="text-[12px]">
            <HighlightPlaceholders text={data.personalStatement} />
          </p>
          <Divider />
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.9fr] gap-6">
        <div className="sm:border-r sm:pr-5" style={{ borderColor: "#d1d5db" }}>
          <Heading>Contact</Heading>
          <div className="space-y-1.5 text-[11.5px]">
            {data.phone && (
              <p className="flex items-center gap-2">
                <Phone size={12} style={{ color: "#6b7280" }} /> {data.phone}
              </p>
            )}
            {data.email && (
              <p className="flex items-center gap-2">
                <Mail size={12} style={{ color: "#6b7280" }} /> {data.email}
              </p>
            )}
            {data.suburbState && (
              <p className="flex items-center gap-2">
                <MapPin size={12} style={{ color: "#6b7280" }} /> {data.suburbState}
              </p>
            )}
          </div>

          {anyEducation && (
            <>
              <Divider />
              <Heading>Education</Heading>
              <div className="text-[11.5px] space-y-1">
                {(data.currentSchool || data.yearsAttended) && (
                  <p className="font-semibold">{data.currentSchool}</p>
                )}
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
            </>
          )}

          {(skillLines.length > 0 || data.personalQualities.length > 0) && (
            <>
              <Divider />
              {skillLines.length > 0 && (
                <>
                  <Heading>Skills</Heading>
                  <ul className="text-[11.5px] space-y-1 mb-3">
                    {skillLines.map(([label, value]) => (
                      <li key={label}>
                        <span style={{ color: "#6b7280" }}>{label}: </span>
                        <HighlightPlaceholders text={value} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {data.personalQualities.length > 0 && (
                <>
                  <Heading>Personal Qualities</Heading>
                  <ul className="text-[11.5px] list-disc pl-4 space-y-1">
                    {data.personalQualities.map((q, i) => (
                      <li key={i}>
                        <HighlightPlaceholders text={q} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>

        <div>
          {data.employment.length > 0 && (
            <>
              <Heading>Experience</Heading>
              <div className="space-y-3 mb-1">
                {data.employment.map((job) => (
                  <div key={job.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-semibold text-[12.5px]">{job.role}</p>
                      {job.dates && (
                        <p className="text-[11px] shrink-0" style={{ color: "#6b7280" }}>
                          {job.dates}
                        </p>
                      )}
                    </div>
                    {job.organisation && <p className="text-[11.5px] italic">{job.organisation}</p>}
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

          {data.achievements.length > 0 && (
            <div className="mt-4">
              <Heading>Achievements</Heading>
              <ul className="list-disc pl-4 space-y-0.5 text-[11.5px]">
                {data.achievements.map((a, i) => (
                  <li key={i}>
                    <HighlightPlaceholders text={a} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.hobbies && (
            <div className="mt-4">
              <Heading>Hobbies and Interests</Heading>
              <p className="text-[11.5px]">
                <HighlightPlaceholders text={data.hobbies} />
              </p>
            </div>
          )}

          {data.referees.length > 0 && (
            <div className="mt-4">
              <Heading>References</Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11.5px]">
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
