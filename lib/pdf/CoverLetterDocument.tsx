import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CoverLetterData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 56,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#1a1a2e",
  },
  bold: { fontFamily: "Times-Bold" },
  block: { marginBottom: 12 },
  paragraph: { marginBottom: 10 },
});

export function CoverLetterDocument({ data }: { data: CoverLetterData }) {
  const greetingName = data.employerName ? data.employerName : "Hiring Manager";
  const signOff = data.employerName ? "Yours sincerely," : "Yours faithfully,";

  return (
    <Document title={`${data.fullName || "Cover Letter"} - Cover Letter`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.block}>
          <Text style={styles.bold}>{data.fullName || "Your Name"}</Text>
          <Text>{[data.phone, data.email, data.suburbState].filter(Boolean).join("   |   ")}</Text>
        </View>

        <Text style={styles.block}>{data.date || ""}</Text>

        <View style={styles.block}>
          {data.employerName ? <Text>{data.employerName}</Text> : null}
          {data.companyName ? <Text>{data.companyName}</Text> : null}
          {data.companyAddress ? <Text>{data.companyAddress}</Text> : null}
        </View>

        <Text style={styles.paragraph}>Dear {greetingName},</Text>

        {data.openingParagraph && <Text style={styles.paragraph}>{data.openingParagraph}</Text>}
        {data.fitParagraph && <Text style={styles.paragraph}>{data.fitParagraph}</Text>}
        {data.companyParagraph && <Text style={styles.paragraph}>{data.companyParagraph}</Text>}
        {data.closingParagraph && <Text style={styles.paragraph}>{data.closingParagraph}</Text>}

        <Text style={{ marginTop: 6 }}>{signOff}</Text>
        <Text style={[styles.bold, { marginTop: 22 }]}>{data.fullName || "Your Name"}</Text>
      </Page>
    </Document>
  );
}
