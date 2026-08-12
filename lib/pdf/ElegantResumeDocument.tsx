import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";

Font.register({ family: "AlexBrush", src: "/fonts/AlexBrush-Regular.ttf" });
// Disable automatic hyphenation — otherwise narrow columns can break proper
// nouns mid-word (e.g. "Melbourne" -> "Mel-bourne").
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#1a1a2e",
  },
  name: {
    fontFamily: "AlexBrush",
    fontSize: 40,
    textAlign: "center",
    color: "#111827",
  },
  rule: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginTop: 14,
    marginBottom: 14,
  },
  heading: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#111827",
    marginBottom: 6,
  },
  muted: { color: "#6b7280" },
  bold: { fontFamily: "Times-Bold" },
  italic: { fontFamily: "Times-Italic" },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 9 },
  bulletText: { flex: 1 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
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

export function ElegantResumeDocument({ data }: { data: ResumeData }) {
  const hasCerts = data.certificates.trim().length > 0;
  const anyEducation = data.currentSchool || data.yearsAttended || data.subjects || data.previousSchools || hasCerts;
  const skillLines: [string, string][] = (
    [
      ["Digital", data.skillsDigital],
      ["Communication", data.skillsCommunication],
      ["Languages", data.skillsLanguages],
      ["Organisational", data.skillsOther],
      ["Licences", data.skillsCertificates],
    ] as [string, string][]
  ).filter(([, v]) => v);

  return (
    <Document title={`${data.fullName || "Resume"} - Resume`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.fullName || "Your Name"}</Text>
        <View style={styles.rule} />

        {data.personalStatement && (
          <>
            <Text style={styles.heading}>Summary</Text>
            <Text>{data.personalStatement}</Text>
            <View style={styles.rule} />
          </>
        )}

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "33%", paddingRight: 12, borderRightWidth: 1, borderRightColor: "#d1d5db" }}>
            <Text style={styles.heading}>Contact</Text>
            {data.phone ? <Text style={{ marginBottom: 3 }}>{data.phone}</Text> : null}
            {data.email ? <Text style={{ marginBottom: 3 }}>{data.email}</Text> : null}
            {data.suburbState ? <Text style={{ marginBottom: 3 }}>{data.suburbState}</Text> : null}

            {anyEducation && (
              <>
                <View style={styles.rule} />
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
              </>
            )}

            {(skillLines.length > 0 || data.personalQualities.length > 0) && <View style={styles.rule} />}

            {skillLines.length > 0 && (
              <>
                <Text style={styles.heading}>Skills</Text>
                {skillLines.map(([label, value]) => (
                  <Text key={label} style={{ marginBottom: 3 }}>
                    <Text style={styles.muted}>{label}: </Text>
                    {value}
                  </Text>
                ))}
              </>
            )}

            {data.personalQualities.length > 0 && (
              <>
                <Text style={[styles.heading, { marginTop: skillLines.length > 0 ? 8 : 0 }]}>Personal Qualities</Text>
                <BulletList items={data.personalQualities} />
              </>
            )}
          </View>

          <View style={{ width: "67%", paddingLeft: 16 }}>
            {data.employment.length > 0 && (
              <>
                <Text style={styles.heading}>Experience</Text>
                {data.employment.map((job) => (
                  <View key={job.id} style={{ marginBottom: 8 }}>
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

            {data.achievements.length > 0 && (
              <View style={{ marginTop: 6 }}>
                <Text style={styles.heading}>Achievements</Text>
                <BulletList items={data.achievements} />
              </View>
            )}

            {data.hobbies && (
              <View style={{ marginTop: 6 }}>
                <Text style={styles.heading}>Hobbies and Interests</Text>
                <Text>{data.hobbies}</Text>
              </View>
            )}

            {data.referees.length > 0 && (
              <View style={{ marginTop: 6 }}>
                <Text style={styles.heading}>References</Text>
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
                      {r.phone ? <Text>Phone: {r.phone}</Text> : null}
                      {r.email ? <Text>Email: {r.email}</Text> : null}
                    </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
