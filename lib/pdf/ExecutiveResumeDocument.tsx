import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 50,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#1a1a2e",
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 26,
    textAlign: "center",
    color: "#111827",
  },
  contactBar: {
    textAlign: "center",
    fontSize: 9.5,
    color: "#4b5563",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 6,
    marginTop: 10,
  },
  summary: {
    fontFamily: "Times-Italic",
    textAlign: "center",
    color: "#374151",
    marginTop: 14,
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#111827",
    borderBottomWidth: 0.75,
    borderBottomColor: "#d1d5db",
    paddingBottom: 3,
    marginBottom: 6,
  },
  bold: { fontFamily: "Times-Bold" },
  italic: { fontFamily: "Times-Italic" },
  muted: { color: "#6b7280" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 9 },
  bulletText: { flex: 1 },
  pill: {
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
  },
  pillText: { fontSize: 8, color: "#374151" },
});

function BulletList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <View style={styles.bulletRow} key={i}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

// react-pdf's bundled bold core-font metrics mis-kern the letter pair "M"+r/s
// (e.g. "Mr", "Ms"), rendering a visible gap — see PDFKit/react-pdf AFM data.
function splitNameTitle(name: string): [string, string] {
  const match = name.match(/^(Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+(.*)$/i);
  return match ? [`${match[1]} `, match[2]] : ["", name];
}

function skillTags(data: ResumeData): string[] {
  return [data.skillsDigital, data.skillsCommunication, data.skillsLanguages, data.skillsOther, data.skillsCertificates]
    .filter(Boolean)
    .join(", ")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ExecutiveResumeDocument({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const tags = skillTags(data);

  return (
    <Document title={`${data.fullName || "Resume"} - Resume`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.fullName || "Your Name"}</Text>
        <Text style={styles.contactBar}>
          {[data.phone, data.email, data.suburbState].filter(Boolean).join("   |   ")}
        </Text>

        {data.personalStatement && <Text style={styles.summary}>&ldquo;{data.personalStatement}&rdquo;</Text>}

        <View style={{ flexDirection: "row", marginTop: 6 }}>
          <View style={{ width: "60%", paddingRight: 16 }}>
            {data.employment.length > 0 && (
              <>
                <Text style={styles.heading}>Professional Experience</Text>
                {data.employment.map((job) => (
                  <View key={job.id} style={{ marginBottom: 9 }}>
                    <View style={styles.row}>
                      <Text style={styles.bold}>{job.role}</Text>
                      {job.dates ? <Text style={styles.muted}>{job.dates}</Text> : null}
                    </View>
                    {job.organisation ? <Text style={styles.italic}>{job.organisation}</Text> : null}
                    {job.bullets.length > 0 && (
                      <View style={{ marginTop: 2 }}>
                        <BulletList items={job.bullets} />
                      </View>
                    )}
                  </View>
                ))}
              </>
            )}
          </View>

          <View style={{ width: "40%" }}>
            {anyEducation && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.heading}>Education</Text>
                {data.currentSchool ? <Text style={styles.bold}>{data.currentSchool}</Text> : null}
                {data.yearsAttended ? <Text style={styles.muted}>{data.yearsAttended}</Text> : null}
                {data.subjects ? <Text style={{ marginTop: 2 }}>{data.subjects}</Text> : null}
                {data.previousSchools ? <Text style={{ marginTop: 2 }}>{data.previousSchools}</Text> : null}
                {hasCerts &&
                  data.certificates
                    .split("\n")
                    .filter(Boolean)
                    .map((c, i) => (
                      <Text key={i} style={{ marginTop: 2 }}>
                        {c}
                      </Text>
                    ))}
              </View>
            )}

            {tags.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.heading}>Expertise</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {tags.map((t, i) => (
                    <View style={styles.pill} key={i}>
                      <Text style={styles.pillText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.personalQualities.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.heading}>Personal Qualities</Text>
                <BulletList items={data.personalQualities} />
              </View>
            )}

            {data.achievements.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.heading}>Achievements</Text>
                <BulletList items={data.achievements} />
              </View>
            )}

            {data.hobbies && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.heading}>Hobbies and Interests</Text>
                <Text>{data.hobbies}</Text>
              </View>
            )}

            {data.referees.length > 0 && (
              <View>
                <Text style={styles.heading}>References</Text>
                {data.referees.map((r) => {
                  const [title, rest] = splitNameTitle(r.name);
                  return (
                    <View key={r.id} style={{ marginBottom: 6 }}>
                      <Text>
                        {title ? <Text>{title}</Text> : null}
                        <Text style={styles.bold}>{rest}</Text>
                      </Text>
                      {r.role ? <Text style={styles.muted}>{r.role}</Text> : null}
                      {r.organisation ? <Text style={styles.muted}>{r.organisation}</Text> : null}
                      {r.phone ? <Text>Phone: {r.phone}</Text> : null}
                      {r.email ? <Text>Email: {r.email}</Text> : null}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
