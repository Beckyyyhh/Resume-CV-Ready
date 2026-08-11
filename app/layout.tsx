import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Resume Ready — Resume & Cover Letter Builder for Students",
  description:
    "A free step-by-step tool that helps high school students write a resume and cover letter, with samples, sentence starters and a downloadable PDF or Word document at the end.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${openSans.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-open-sans), sans-serif" }}
      >
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">{children}</main>
        <footer className="border-t border-gray-200 py-6 mt-10 no-print">
          <p className="max-w-7xl mx-auto px-4 text-xs text-gray-500">
            Everything you type stays in your own browser — nothing is uploaded or saved to a server.
          </p>
        </footer>
      </body>
    </html>
  );
}
