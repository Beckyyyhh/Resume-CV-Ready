import Link from "next/link";
import { FileText } from "lucide-react";
import { NavTabs } from "./NavTabs";

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4 h-24">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="flex items-center justify-center rounded-xl"
            style={{ height: 52, width: 52, backgroundColor: "#3d2c8d" }}
          >
            <FileText size={26} color="#ffffff" strokeWidth={2.25} />
          </span>
          <span className="leading-tight" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
            <span className="text-xl font-extrabold block" style={{ color: "#26215c" }}>
              Resume Ready
            </span>
            <span className="text-sm font-semibold block" style={{ color: "#534ab7" }}>
              Resume &amp; Cover Letter Builder for Students
            </span>
          </span>
        </Link>
      </div>
      <NavTabs />
    </header>
  );
}
