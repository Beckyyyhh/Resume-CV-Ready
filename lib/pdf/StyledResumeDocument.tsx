import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/types";
import type { ResumeTemplateStyle } from "@/lib/templates";

function buildStyles(template: ResumeTemplateStyle) {
  const sectionTitleBase = {
    fontFamily: template.fonts.pdfBold,
    fontSize: 10,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
    marginBottom: 5,
    color: template.colors.heading,
  };

  const sectionTitle =
    template.sectionStyle === "underline"
      ? { ...sectionTitleBase, borderBottomWidth: 1.2, borderBottomColor: template.colors.accent, paddingBottom: 2 }
      : template.sectionStyle === "bar"
        ? { ...sectionTitleBase, borderLeftWidth: 3, borderLeftColor: template.colors.accent, paddingLeft: 6 }
        : { ...sectionTitleBase, fontSize: 9, letterSpacing: 1.5, color: template.colors.muted };

  return StyleSheet.create({
    page: {
      paddingTop: 42,
      paddingBottom: 42,
      paddingHorizontal: 48,
      fontFamily: template.fonts.pdfBody,
      fontSize: 10.5,
      lineHeight: 1.4,
      color: "#1a1a2e",
    },
    name: {
      fontFamily: template.fonts.pdfBold,
      fontSize: 20,
      textAlign: template.headerAlign,
      letterSpacing: 0.5,
    },
    contactLine: {
      textAlign: template.headerAlign,
      fontSize: 9,
      color: template.colors.muted,
      marginTop: 8,
      marginBottom: 14,
    },
    sectionTitle,
    section: {
      marginBottom: 11,
    },
    bold: {
      fontFamily: template.fonts.pdfBold,
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
      color: template.colors.muted,
    },
  });
}

// react-pdf's bundled bold core-font metrics mis-kern the letter pair "M"+r/s
// (e.g. "Mr", "Ms"), rendering a visible gap — see PDFKit/react-pdf AFM data.
// Splitting a leading title off into a regular-weight run avoids the bug.
function splitNameTitle(name: string): [string, string] {
  const match = name.match(/^(Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+(.*)$/i);
  return match ? [`${match[1]} `, match[2]] : ["", name];
}

function BulletList({ items, styles }: { items: string[]; styles: ReturnType<typeof buildStyles> }) {
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

export function StyledResumeDocument({ data, template }: { data: ResumeData; template: ResumeTemplateStyle }) {
  const styles = buildStyles(template);

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
            <BulletList items={data.personalQualities} styles={styles} />
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
                <BulletList items={job.bullets} styles={styles} />
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
            <BulletList items={data.achievements} styles={styles} />
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
