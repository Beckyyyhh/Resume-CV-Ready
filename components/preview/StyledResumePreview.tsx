import type { ResumeData } from "@/lib/types";
import { HighlightPlaceholders } from "@/components/wizard/HighlightPlaceholders";
import type { ResumeTemplateStyle } from "@/lib/templates";

function Section({
  title,
  template,
  children,
}: {
  title: string;
  template: ResumeTemplateStyle;
  children: React.ReactNode;
}) {
  if (template.sectionStyle === "bar") {
    return (
      <div className="mb-3.5">
        <p
          className="text-[11px] font-extrabold tracking-wider uppercase pl-2 mb-1.5 border-l-4"
          style={{ color: template.colors.heading, borderColor: template.colors.accent }}
        >
          {title}
        </p>
        {children}
      </div>
    );
  }

  if (template.sectionStyle === "plain") {
    return (
      <div className="mb-3.5">
        <p
          className="text-[10px] font-bold uppercase mb-1.5"
          style={{ color: template.colors.muted, letterSpacing: "0.15em" }}
        >
          {title}
        </p>
        {children}
      </div>
    );
  }

  return (
    <div className="mb-3.5">
      <p
        className="text-[11px] font-extrabold tracking-wider uppercase border-b-2 pb-0.5 mb-1.5"
        style={{ color: template.colors.heading, borderColor: template.colors.accent }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

export function StyledResumePreview({ data, template }: { data: ResumeData; template: ResumeTemplateStyle }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation =
    data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;

  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  return (
    <div
      id="resume-preview-surface"
      className="bg-white text-[#1a1a2e] p-8 shadow-sm border border-gray-200 rounded-xl mx-auto break-words"
      style={{ fontFamily: template.fonts.cssBody, width: "100%", maxWidth: 720, fontSize: 12.5, lineHeight: 1.45 }}
    >
      <div className={`mb-4 ${template.headerAlign === "center" ? "text-center" : "text-left"}`}>
        <p className="text-2xl font-bold tracking-wide" style={{ color: "#1a1a2e" }}>
          {data.fullName || "Your Name"}
        </p>
        <p className="text-xs mt-2" style={{ color: template.colors.muted }}>
          {[data.phone, data.email, data.suburbState].filter(Boolean).join("  |  ") || "Phone  |  Email  |  Suburb, State"}
        </p>
      </div>

      {data.personalStatement && (
        <Section title="Personal Statement" template={template}>
          <p className="text-[12.5px]">
            <HighlightPlaceholders text={data.personalStatement} />
          </p>
        </Section>
      )}

      {data.personalQualities.length > 0 && (
        <Section title="Personal Qualities" template={template}>
          <ul className="list-disc pl-4 space-y-0.5">
            {data.personalQualities.map((q, i) => (
              <li key={i}>
                <HighlightPlaceholders text={q} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {anyEducation && (
        <Section title="Education and Training" template={template}>
          {(data.currentSchool || data.yearsAttended) && (
            <p className="font-semibold">
              {data.currentSchool}
              {data.currentSchool && data.yearsAttended ? "  |  " : ""}
              {data.yearsAttended}
            </p>
          )}
          {data.subjects && (
            <p>
              <HighlightPlaceholders text={data.subjects} />
            </p>
          )}
          {data.previousSchools && (
            <p className="mt-1">
              <HighlightPlaceholders text={data.previousSchools} />
            </p>
          )}
          {hasCerts &&
            data.certificates.split("\n").filter(Boolean).map((c, i) => (
              <p key={i} className="mt-0.5">
                <HighlightPlaceholders text={c} />
              </p>
            ))}
        </Section>
      )}

      {data.employment.length > 0 && (
        <Section title="Employment History" template={template}>
          {data.employment.map((job) => (
            <div key={job.id} className="mb-2 last:mb-0">
              <p className="font-semibold">
                {[job.role, job.organisation].filter(Boolean).join("  —  ")}
                {job.dates && (
                  <span className="font-normal" style={{ color: template.colors.muted }}>
                    {"  |  "}
                    {job.dates}
                  </span>
                )}
              </p>
              {job.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
                  {job.bullets.map((b, i) => (
                    <li key={i}>
                      <HighlightPlaceholders text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {hasSkills && (
        <Section title="Skills" template={template}>
          <ul className="space-y-0.5">
            {data.skillsDigital && (
              <li>
                <span className="font-semibold">Digital: </span>
                <HighlightPlaceholders text={data.skillsDigital} />
              </li>
            )}
            {data.skillsCommunication && (
              <li>
                <span className="font-semibold">Communication: </span>
                <HighlightPlaceholders text={data.skillsCommunication} />
              </li>
            )}
            {data.skillsLanguages && (
              <li>
                <span className="font-semibold">Languages: </span>
                <HighlightPlaceholders text={data.skillsLanguages} />
              </li>
            )}
            {data.skillsOther && (
              <li>
                <span className="font-semibold">Organisational: </span>
                <HighlightPlaceholders text={data.skillsOther} />
              </li>
            )}
            {data.skillsCertificates && (
              <li>
                <span className="font-semibold">Licences/Certificates: </span>
                <HighlightPlaceholders text={data.skillsCertificates} />
              </li>
            )}
          </ul>
        </Section>
      )}

      {data.achievements.length > 0 && (
        <Section title="Special Achievements and Awards" template={template}>
          <ul className="list-disc pl-4 space-y-0.5">
            {data.achievements.map((a, i) => (
              <li key={i}>
                <HighlightPlaceholders text={a} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.hobbies && (
        <Section title="Hobbies and Interests" template={template}>
          <p>
            <HighlightPlaceholders text={data.hobbies} />
          </p>
        </Section>
      )}

      {data.referees.length > 0 && (
        <Section title="Referees" template={template}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.referees.map((r) => (
              <div key={r.id} className="min-w-0 break-words">
                <p className="font-semibold">{r.name}</p>
                {r.role && <p>{r.role}</p>}
                {r.organisation && <p>{r.organisation}</p>}
                {r.phone && <p>Phone: {r.phone}</p>}
                {r.email && <p>Email: {r.email}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
