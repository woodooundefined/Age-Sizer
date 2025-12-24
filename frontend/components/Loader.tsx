"use client";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function Loader({ text, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`loader-90s ${sizeClasses[size]}`} />
      {text && (
        <span className="font-mono text-sm animate-blink">{text}</span>
      )}
    </div>
  );
}

