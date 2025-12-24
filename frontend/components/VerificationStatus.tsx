"use client";

import { useAppStore } from "@/lib/store";
import { Loader } from "./Loader";

const STEP_MESSAGES: Record<string, string> = {
  idle: "",
  encrypting: "ENCRYPTING AGE...",
  submitting: "SUBMITTING TX...",
  waiting: "WAITING CONFIRM...",
  decrypting: "DECRYPTING RESULT...",
  done: "",
  error: "ERROR!",
};

export function VerificationStatus() {
  const { verifyStep, verifyError, verifyResult } = useAppStore();

  if (verifyStep === "idle") {
    return null;
  }

  if (verifyStep === "done") {
    return (
      <div
        className={`
          bevel-outset p-6 text-center
          ${verifyResult ? "bg-[#00ff00]" : "bg-[#ff0000]"}
        `}
      >
        <div className="font-heading text-4xl uppercase mb-2">
          {verifyResult ? "✓ VERIFIED" : "✗ REJECTED"}
        </div>
        <div className="font-mono text-lg">
          {verifyResult ? "AGE >= 18 CONFIRMED" : "AGE < 18 DETECTED"}
        </div>
      </div>
    );
  }

  if (verifyStep === "error") {
    return (
      <div className="bevel-outset bg-[#ff0000] p-6 text-center text-white">
        <div className="font-heading text-2xl uppercase mb-2">⚠ ERROR</div>
        <div className="font-mono text-sm break-all">
          {verifyError || "Unknown error occurred"}
        </div>
      </div>
    );
  }

  // Loading states
  return (
    <div className="bevel-inset bg-[#ffffcc] p-6 flex flex-col items-center">
      <Loader text={STEP_MESSAGES[verifyStep]} />
      <div className="mt-4 font-mono text-xs text-[#808080]">
        STEP: {verifyStep.toUpperCase()}
      </div>
    </div>
  );
}

