"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume Builder" },
  { href: "/cover-letter", label: "Cover Letter Builder" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav style={{ backgroundColor: "#3d2c8d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center">
        {tabs.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 relative"
              style={{ fontFamily: "var(--font-nunito), sans-serif" }}
            >
              {tab.label}
              {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
