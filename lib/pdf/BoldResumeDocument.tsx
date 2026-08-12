import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#1a1a2e",
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22, color: "#111827" },
  contactBlock: { textAlign: "right", fontSize: 9, color: "#4b5563" },
  banner: {
    backgroundColor: "#eef0f2",
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  bannerText: { fontFamily: "Helvetica-Bold", fontSize: 10.5, letterSpacing: 0.5, color: "#111827" },
  section: { marginBottom: 14 },
  entryRow: { flexDirection: "row", marginBottom: 10 },
  entryLabel: { width: "26%", fontSize: 9, color: "#6b7280", paddingRight: 8 },
  entryContent: { flex: 1 },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: "#4b5563" },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 9 },
  bulletText: { flex: 1 },
});

function Banner({ children }: { children: string }) {
  return (
    <View style={styles.banner} wrap={false}>
      <Text style={styles.bannerText}>{children.toUpperCase()}</Text>
    </View>
  );
}

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

export function BoldResumeDocument({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  return (
    <Document title={`${data.fullName || "Resume"} - Resume`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{data.fullName || "Your Name"}</Text>
          <View style={styles.contactBlock}>
            {data.phone ? <Text>{data.phone}</Text> : null}
            {data.email ? <Text>{data.email}</Text> : null}
            {data.suburbState ? <Text>{data.suburbState}</Text> : null}
          </View>
        </View>

        {data.personalStatement && (
          <View style={styles.section}>
            <Banner>Summary</Banner>
            <Text>{data.personalStatement}</Text>
          </View>
        )}

        {data.employment.length > 0 && (
          <View style={styles.section}>
            <Banner>Work Experience</Banner>
            {data.employment.map((job) => (
              <View style={styles.entryRow} key={job.id}>
                <View style={styles.entryLabel}>
                  {job.organisation ? <Text>{job.organisation}</Text> : null}
                  {job.dates ? <Text>{job.dates}</Text> : null}
                </View>
                <View style={styles.entryContent}>
                  {job.role ? <Text style={styles.bold}>{job.role}</Text> : null}
                  {job.bullets.length > 0 && (
                    <View style={{ marginTop: 2 }}>
                      <BulletList items={job.bullets} />
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {anyEducation && (
          <View style={styles.section}>
            <Banner>Education</Banner>
            <View style={styles.entryRow}>
              <View style={styles.entryLabel}>
                {data.currentSchool ? <Text>{data.currentSchool}</Text> : null}
                {data.yearsAttended ? <Text>{data.yearsAttended}</Text> : null}
              </View>
              <View style={styles.entryContent}>
                {data.subjects ? <Text>{data.subjects}</Text> : null}
                {data.previousSchools ? <Text style={{ marginTop: 3 }}>{data.previousSchools}</Text> : null}
                {hasCerts &&
                  data.certificates
                    .split("\n")
                    .filter(Boolean)
                    .map((c, i) => (
                      <Text key={i} style={{ marginTop: 3 }}>
                        {c}
                      </Text>
                    ))}
              </View>
            </View>
          </View>
        )}

        {hasSkills && (
          <View style={styles.section}>
            <Banner>Skills</Banner>
            {data.skillsDigital && (
              <Text style={{ marginBottom: 3 }}>
                <Text style={styles.bold}>Digital: </Text>
                {data.skillsDigital}
              </Text>
            )}
            {data.skillsCommunication && (
              <Text style={{ marginBottom: 3 }}>
                <Text style={styles.bold}>Communication: </Text>
                {data.skillsCommunication}
              </Text>
            )}
            {data.skillsLanguages && (
              <Text style={{ marginBottom: 3 }}>
                <Text style={styles.bold}>Languages: </Text>
                {data.skillsLanguages}
              </Text>
            )}
            {data.skillsOther && (
              <Text style={{ marginBottom: 3 }}>
                <Text style={styles.bold}>Organisational: </Text>
                {data.skillsOther}
              </Text>
            )}
            {data.skillsCertificates && (
              <Text style={{ marginBottom: 3 }}>
                <Text style={styles.bold}>Licences/Certificates: </Text>
                {data.skillsCertificates}
              </Text>
            )}
          </View>
        )}

        {data.personalQualities.length > 0 && (
          <View style={styles.section}>
            <Banner>Personal Qualities</Banner>
            <BulletList items={data.personalQualities} />
          </View>
        )}

        {data.achievements.length > 0 && (
          <View style={styles.section}>
            <Banner>Achievements</Banner>
            <BulletList items={data.achievements} />
          </View>
        )}

        {data.hobbies && (
          <View style={styles.section}>
            <Banner>Hobbies and Interests</Banner>
            <Text>{data.hobbies}</Text>
          </View>
        )}

        {data.referees.length > 0 && (
          <View style={styles.section}>
            <Banner>References</Banner>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {data.referees.map((r) => {
                const [title, rest] = splitNameTitle(r.name);
                return (
                  <View key={r.id} style={{ width: "50%", marginBottom: 4 }}>
                    <Text>
                      {title ? <Text>{title}</Text> : null}
                      <Text style={styles.bold}>{rest}</Text>
                    </Text>
                    {r.role ? <Text style={styles.muted}>{r.role}</Text> : null}
                    {r.organisation ? <Text style={styles.muted}>{r.organisation}</Text> : null}
                    {r.phone ? <Text style={styles.muted}>Phone: {r.phone}</Text> : null}
                    {r.email ? <Text style={styles.muted}>Email: {r.email}</Text> : null}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
