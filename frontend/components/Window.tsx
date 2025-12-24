"use client";

import { ReactNode } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function Window({ title, children, className = "" }: WindowProps) {
  return (
    <div className={`bevel-outset bg-[#c0c0c0] ${className}`}>
      {/* Title Bar */}
      <div className="win95-titlebar flex items-center justify-between">
        <span className="text-sm">{title}</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bevel-outset bg-[#c0c0c0] flex items-center justify-center text-xs font-bold">
            _
          </div>
          <div className="w-4 h-4 bevel-outset bg-[#c0c0c0] flex items-center justify-center text-xs font-bold">
            □
          </div>
          <div className="w-4 h-4 bevel-outset bg-[#c0c0c0] flex items-center justify-center text-xs font-bold">
            ×
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bevel-inset bg-white m-1 p-4">{children}</div>
    </div>
  );
}

