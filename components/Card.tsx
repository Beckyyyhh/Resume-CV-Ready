import { clsx } from "clsx";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx("bg-white rounded-xl shadow-sm border border-gray-200", className)}>{children}</div>;
}
