"use client";

import { Trash2 } from "lucide-react";

export function RemovableCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 space-y-3 relative">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold" style={{ color: "#3d2c8d" }}>
          {title}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove"
        >
          <Trash2 size={16} />
        </button>
      </div>
      {children}
    </div>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-md border-2 border-dashed transition-colors hover:bg-[#faf5ff]"
      style={{ borderColor: "#afa9ec", color: "#534ab7" }}
    >
      + {label}
    </button>
  );
}
