import type { ResumeData } from "@/lib/types";
import { HighlightPlaceholders } from "@/components/wizard/HighlightPlaceholders";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3.5">
      <p
        className="text-[11px] font-extrabold tracking-wider uppercase border-b-2 pb-0.5 mb-1.5"
        style={{ color: "#26215c", borderColor: "#3d2c8d" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

export function ResumePreview({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation =
    data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;

  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  return (
    <div
      id="resume-preview-surface"
      className="bg-white text-[#1a1a2e] p-8 shadow-sm border border-gray-200 rounded-xl mx-auto"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif", width: "100%", maxWidth: 720, fontSize: 12.5, lineHeight: 1.45 }}
    >
      <div className="text-center mb-4">
        <p className="text-2xl font-bold tracking-wide" style={{ color: "#1a1a2e" }}>
          {data.fullName || "Your Name"}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          {[data.phone, data.email, data.suburbState].filter(Boolean).join("  |  ") || "Phone  |  Email  |  Suburb, State"}
        </p>
      </div>

      {data.personalStatement && (
        <Section title="Personal Statement">
          <p className="text-[12.5px]">
            <HighlightPlaceholders text={data.personalStatement} />
          </p>
        </Section>
      )}

      {data.personalQualities.length > 0 && (
        <Section title="Personal Qualities">
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
        <Section title="Education and Training">
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
        <Section title="Employment History">
          {data.employment.map((job) => (
            <div key={job.id} className="mb-2 last:mb-0">
              <p className="font-semibold">
                {[job.role, job.organisation].filter(Boolean).join("  —  ")}
                {job.dates && <span className="font-normal text-gray-600">  |  {job.dates}</span>}
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
        <Section title="Skills">
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
        <Section title="Special Achievements and Awards">
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
        <Section title="Hobbies and Interests">
          <p>
            <HighlightPlaceholders text={data.hobbies} />
          </p>
        </Section>
      )}

      {data.referees.length > 0 && (
        <Section title="Referees">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.referees.map((r) => (
              <div key={r.id}>
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
