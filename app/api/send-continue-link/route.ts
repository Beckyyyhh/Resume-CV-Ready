import nodemailer from "nodemailer";

// Needs Node's Buffer + nodemailer, so pin this to the Node runtime
// rather than the (default-on-Vercel) Edge runtime.
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_STATE_LENGTH = 60000; // generous cap for a base64-encoded resume/cover letter
const BASE64_RE = /^[A-Za-z0-9+/=]+$/;

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD is not configured");
    return Response.json(
      { error: "Email delivery isn't set up on this deployment yet." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Could not read the request." }, { status: 400 });
  }

  const { email, kind, fullName, state } = (body ?? {}) as Record<string, unknown>;

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (kind !== "resume" && kind !== "cover-letter") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  // `state` is opaque, base64-encoded progress data built entirely client-side — this
  // route never decodes or reads it, only relays it inside a link back to the app.
  if (typeof state !== "string" || state.length === 0 || state.length > MAX_STATE_LENGTH || !BASE64_RE.test(state)) {
    return Response.json({ error: "There's nothing to save yet." }, { status: 400 });
  }

  const label = kind === "cover-letter" ? "cover letter" : "resume";
  const path = kind === "cover-letter" ? "/cover-letter" : "/resume";
  const nameForGreeting = typeof fullName === "string" && fullName.trim() ? fullName.trim() : "there";
  const origin = new URL(request.url).origin;
  const link = `${origin}${path}#continue=${encodeURIComponent(state)}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    await transporter.sendMail({
      from: `Resume Ready <${gmailUser}>`,
      to: email,
      subject: `Continue your ${label} on Resume Ready`,
      html: `
        <p>Hi ${nameForGreeting},</p>
        <p>Click the link below to pick up your ${label} right where you left off &mdash; on this device or any other.</p>
        <p><a href="${link}">${link}</a></p>
        <p>This link carries your saved progress, so only open it on a device you trust and don't forward it on.</p>
        <p>— CVHS Careers team</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("send-continue-link error:", err);
    return Response.json({ error: "Something went wrong sending the email. Please try again." }, { status: 500 });
  }
}
