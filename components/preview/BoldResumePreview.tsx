import type { ResumeData } from "@/lib/types";
import { HighlightPlaceholders } from "@/components/wizard/HighlightPlaceholders";

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[12px] font-extrabold uppercase tracking-wide px-3 py-2 mb-3"
      style={{ backgroundColor: "#eef0f2", color: "#111827" }}
    >
      {children}
    </p>
  );
}

function LabelContentRow({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="w-[26%] shrink-0 min-w-0 break-words text-[11px]" style={{ color: "#6b7280" }}>
        {label}
      </div>
      <div className="flex-1 min-w-0 break-words text-[12px]">{children}</div>
    </div>
  );
}

export function BoldResumePreview({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation =
    data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  return (
    <div
      id="resume-preview-surface"
      className="bg-white text-[#1a1a2e] p-8 shadow-sm border border-gray-200 rounded-xl mx-auto break-words"
      style={{ fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif", width: "100%", maxWidth: 720, fontSize: 12, lineHeight: 1.5 }}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <p className="text-[26px] font-extrabold leading-tight min-w-0 break-words" style={{ color: "#111827" }}>
          {data.fullName || "Your Name"}
        </p>
        <div className="text-right text-[11px] shrink-0 min-w-0 break-words" style={{ color: "#4b5563" }}>
          {data.phone && <p>{data.phone}</p>}
          {data.email && <p>{data.email}</p>}
          {data.suburbState && <p>{data.suburbState}</p>}
        </div>
      </div>

      {data.personalStatement && (
        <div className="mb-5">
          <Banner>Summary</Banner>
          <p className="text-[12px]">
            <HighlightPlaceholders text={data.personalStatement} />
          </p>
        </div>
      )}

      {data.employment.length > 0 && (
        <div className="mb-5">
          <Banner>Work Experience</Banner>
          {data.employment.map((job) => (
            <LabelContentRow
              key={job.id}
              label={
                <>
                  {job.organisation && <p>{job.organisation}</p>}
                  {job.dates && <p>{job.dates}</p>}
                </>
              }
            >
              {job.role && <p className="font-bold">{job.role}</p>}
              {job.bullets.length > 0 && (
                <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
                  {job.bullets.map((b, i) => (
                    <li key={i}>
                      <HighlightPlaceholders text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </LabelContentRow>
          ))}
        </div>
      )}

      {anyEducation && (
        <div className="mb-5">
          <Banner>Education</Banner>
          <LabelContentRow
            label={
              <>
                {data.currentSchool && <p>{data.currentSchool}</p>}
                {data.yearsAttended && <p>{data.yearsAttended}</p>}
              </>
            }
          >
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
                <p key={i} className="mt-1">
                  <HighlightPlaceholders text={c} />
                </p>
              ))}
          </LabelContentRow>
        </div>
      )}

      {hasSkills && (
        <div className="mb-5">
          <Banner>Skills</Banner>
          <ul className="space-y-1 text-[12px]">
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
        </div>
      )}

      {data.personalQualities.length > 0 && (
        <div className="mb-5">
          <Banner>Personal Qualities</Banner>
          <ul className="list-disc pl-4 space-y-0.5 text-[12px]">
            {data.personalQualities.map((q, i) => (
              <li key={i}>
                <HighlightPlaceholders text={q} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.achievements.length > 0 && (
        <div className="mb-5">
          <Banner>Achievements</Banner>
          <ul className="list-disc pl-4 space-y-0.5 text-[12px]">
            {data.achievements.map((a, i) => (
              <li key={i}>
                <HighlightPlaceholders text={a} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.hobbies && (
        <div className="mb-5">
          <Banner>Hobbies and Interests</Banner>
          <p className="text-[12px]">
            <HighlightPlaceholders text={data.hobbies} />
          </p>
        </div>
      )}

      {data.referees.length > 0 && (
        <div>
          <Banner>References</Banner>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
            {data.referees.map((r) => (
              <div key={r.id}>
                <p className="font-bold">{r.name}</p>
                {r.role && <p style={{ color: "#4b5563" }}>{r.role}</p>}
                {r.organisation && <p style={{ color: "#4b5563" }}>{r.organisation}</p>}
                {r.phone && <p>Phone: {r.phone}</p>}
                {r.email && <p>Email: {r.email}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
