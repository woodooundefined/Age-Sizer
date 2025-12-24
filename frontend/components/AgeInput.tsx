"use client";

import { useState, ChangeEvent } from "react";
import { MIN_AGE, MAX_AGE } from "@/lib/constants";

interface AgeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AgeInput({ value, onChange, disabled }: AgeInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Allow empty input
    if (raw === "") {
      onChange("");
      setError(null);
      return;
    }

    // Only allow digits
    if (!/^\d+$/.test(raw)) {
      setError("INTEGERS ONLY!");
      return;
    }

    const num = parseInt(raw, 10);

    // Validate range
    if (num < MIN_AGE) {
      setError(`MIN: ${MIN_AGE}`);
      return;
    }

    if (num > MAX_AGE) {
      setError(`MAX: ${MAX_AGE}`);
      return;
    }

    setError(null);
    onChange(raw);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-heading text-lg uppercase">Enter Your Age:</label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="18"
        className={`
          w-full p-3 text-2xl font-mono text-center
          bevel-inset bg-white
          focus-win95
          ${disabled ? "opacity-50 cursor-not-allowed bg-[#c0c0c0]" : ""}
          ${error ? "text-[#ff0000]" : "text-black"}
        `}
      />
      {error && (
        <span className="text-[#ff0000] font-mono text-sm font-bold animate-blink">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

