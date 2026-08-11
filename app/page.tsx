import Link from "next/link";
import { FileText, Mail, ArrowRight, Lightbulb, Eye, Download, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Step-by-step guidance",
    body: "Every section is broken down with clear instructions on exactly what to include and why it matters.",
  },
  {
    icon: Eye,
    title: "Sentence starters & samples",
    body: "Stuck on what to write? Click a sentence starter or a worked example to get moving instantly.",
  },
  {
    icon: Download,
    title: "Download PDF or Word",
    body: "Finish up and download a professional, ready-to-send resume or cover letter in either format.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing ever uploaded",
    body: "Everything you type is saved only in your own browser — no accounts, no server, no data collection.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center pt-6 pb-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={{ color: "#26215c" }}>
          Your first resume, made easy.
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A free, step-by-step builder that helps high school students write a resume and cover letter —
          with samples, sentence starters and ideas for every section, even if you&apos;ve never had a job.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/resume"
          className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-[#afa9ec] transition-colors"
        >
          <span
            className="flex items-center justify-center rounded-xl mb-4"
            style={{ height: 52, width: 52, backgroundColor: "#3d2c8d" }}
          >
            <FileText size={26} color="#fff" />
          </span>
          <h2 className="text-xl font-extrabold" style={{ color: "#26215c" }}>
            Build Your Resume
          </h2>
          <p className="mt-1.5 text-sm text-gray-600">
            Work through personal statement, qualities, education, experience, skills, achievements and referees.
          </p>
          <span
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold"
            style={{ color: "#534ab7" }}
          >
            Start building <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        <Link
          href="/cover-letter"
          className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-[#afa9ec] transition-colors"
        >
          <span
            className="flex items-center justify-center rounded-xl mb-4"
            style={{ height: 52, width: 52, backgroundColor: "#534ab7" }}
          >
            <Mail size={26} color="#fff" />
          </span>
          <h2 className="text-xl font-extrabold" style={{ color: "#26215c" }}>
            Write Your Cover Letter
          </h2>
          <p className="mt-1.5 text-sm text-gray-600">
            Learn how to open strong, show you&apos;re a good fit, and sign off professionally — tailored to
            each job.
          </p>
          <span
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold"
            style={{ color: "#534ab7" }}
          >
            Start writing <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <f.icon size={20} style={{ color: "#534ab7" }} />
              <p className="mt-2.5 text-sm font-bold text-gray-800">{f.title}</p>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-6 text-center" style={{ backgroundColor: "#faf5ff", borderColor: "#e4defa" }}>
        <p className="font-bold" style={{ color: "#26215c", fontFamily: "var(--font-nunito), sans-serif" }}>
          Never had a job before? That&apos;s completely OK.
        </p>
        <p className="mt-1.5 text-sm text-gray-600 max-w-xl mx-auto">
          Every step includes ideas for students with no work experience — babysitting, volunteering, school
          roles and more all count. You have more to offer than you think.
        </p>
      </section>
    </div>
  );
}
