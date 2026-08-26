import nodemailer from "nodemailer";

// Needs Node's Buffer + nodemailer, so pin this to the Node runtime
// rather than the (default-on-Vercel) Edge runtime.
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // generous cap; a resume PDF/DOCX is a few hundred KB

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD is not configured");
    return Response.json(
      { error: "Email delivery isn't set up on this deployment yet. Please use the download buttons instead." },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Could not read the submitted form." }, { status: 400 });
  }

  const email = formData.get("email");
  const kind = formData.get("kind");
  const fullName = formData.get("fullName");
  const pdfFile = formData.get("pdf");
  const docxFile = formData.get("docx");

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (kind !== "resume" && kind !== "cover-letter") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!(pdfFile instanceof File) || !(docxFile instanceof File)) {
    return Response.json({ error: "Missing the resume files to send." }, { status: 400 });
  }
  if (pdfFile.size > MAX_ATTACHMENT_BYTES || docxFile.size > MAX_ATTACHMENT_BYTES) {
    return Response.json({ error: "The file is too large to email." }, { status: 400 });
  }

  const label = kind === "cover-letter" ? "cover letter" : "resume";
  const nameForGreeting = typeof fullName === "string" && fullName.trim() ? fullName.trim() : "there";

  try {
    const [pdfBuffer, docxBuffer] = await Promise.all([
      pdfFile.arrayBuffer().then(Buffer.from),
      docxFile.arrayBuffer().then(Buffer.from),
    ]);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    await transporter.sendMail({
      from: `Resume Ready <${gmailUser}>`,
      to: email,
      subject: `Your ${label} from Resume Ready`,
      html: `
        <p>Hi ${nameForGreeting},</p>
        <p>Here's your finished ${label} — attached as both a PDF and a Word document, so you can use whichever one you need.</p>
        <p>Good luck with your application!</p>
        <p>— CVHS Careers team</p>
      `,
      attachments: [
        { filename: pdfFile.name || `${label}.pdf`, content: pdfBuffer },
        { filename: docxFile.name || `${label}.docx`, content: docxBuffer },
      ],
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("send-document error:", err);
    return Response.json({ error: "Something went wrong sending the email. Please try again." }, { status: 500 });
  }
}
