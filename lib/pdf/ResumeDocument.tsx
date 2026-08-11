import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 48,
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    lineHeight: 1.4,
    color: "#1a1a2e",
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  contactLine: {
    textAlign: "center",
    fontSize: 9,
    color: "#374151",
    marginTop: 4,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1.2,
    borderBottomColor: "#3d2c8d",
    paddingBottom: 2,
    marginBottom: 5,
  },
  section: {
    marginBottom: 11,
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 1.5,
  },
  bulletDot: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  entryBlock: {
    marginBottom: 6,
  },
  muted: {
    color: "#4b5563",
  },
});

// react-pdf's bundled bold core-font metrics mis-kern the letter pair "M"+r/s
// (e.g. "Mr", "Ms"), rendering a visible gap — see PDFKit/react-pdf AFM data.
// Splitting a leading title off into a regular-weight run avoids the bug.
function splitNameTitle(name: string): [string, string] {
  const match = name.match(/^(Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+(.*)$/i);
  return match ? [`${match[1]} `, match[2]] : ["", name];
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

export function ResumeDocument({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const hasSkills =
    data.skillsDigital || data.skillsCommunication || data.skillsLanguages || data.skillsOther || data.skillsCertificates;

  return (
    <Document title={`${data.fullName || "Resume"} - Resume`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.fullName || "Your Name"}</Text>
        <Text style={styles.contactLine}>
          {[data.phone, data.email, data.suburbState].filter(Boolean).join("   |   ")}
        </Text>

        {data.personalStatement && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Statement</Text>
            <Text>{data.personalStatement}</Text>
          </View>
        )}

        {data.personalQualities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Qualities</Text>
            <BulletList items={data.personalQualities} />
          </View>
        )}

        {anyEducation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education and Training</Text>
            {(data.currentSchool || data.yearsAttended) && (
              <Text style={styles.bold}>
                {[data.currentSchool, data.yearsAttended].filter(Boolean).join("   |   ")}
              </Text>
            )}
            {data.subjects && <Text>{data.subjects}</Text>}
            {data.previousSchools && <Text>{data.previousSchools}</Text>}
            {hasCerts &&
              data.certificates
                .split("\n")
                .filter(Boolean)
                .map((c, i) => <Text key={i}>{c}</Text>)}
          </View>
        )}

        {data.employment.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employment History</Text>
            {data.employment.map((job) => (
              <View style={styles.entryBlock} key={job.id}>
                <Text style={styles.bold}>
                  {[job.role, job.organisation].filter(Boolean).join("  —  ")}
                  {job.dates ? `   |   ${job.dates}` : ""}
                </Text>
                <BulletList items={job.bullets} />
              </View>
            ))}
          </View>
        )}

        {hasSkills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skillsDigital && (
              <Text>
                <Text style={styles.bold}>Digital: </Text>
                {data.skillsDigital}
              </Text>
            )}
            {data.skillsCommunication && (
              <Text>
                <Text style={styles.bold}>Communication: </Text>
                {data.skillsCommunication}
              </Text>
            )}
            {data.skillsLanguages && (
              <Text>
                <Text style={styles.bold}>Languages: </Text>
                {data.skillsLanguages}
              </Text>
            )}
            {data.skillsOther && (
              <Text>
                <Text style={styles.bold}>Organisational: </Text>
                {data.skillsOther}
              </Text>
            )}
            {data.skillsCertificates && (
              <Text>
                <Text style={styles.bold}>Licences/Certificates: </Text>
                {data.skillsCertificates}
              </Text>
            )}
          </View>
        )}

        {data.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Achievements and Awards</Text>
            <BulletList items={data.achievements} />
          </View>
        )}

        {data.hobbies && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hobbies and Interests</Text>
            <Text>{data.hobbies}</Text>
          </View>
        )}

        {data.referees.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Referees</Text>
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
