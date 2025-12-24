"use client";

import { create } from "zustand";

type FhevmStatus = "idle" | "initializing" | "ready" | "error";
type VerifyStep = "idle" | "encrypting" | "submitting" | "waiting" | "decrypting" | "done" | "error";

interface AppStore {
  // FHEVM State
  fhevmStatus: FhevmStatus;
  fhevmError: string | null;
  setFhevmStatus: (status: FhevmStatus) => void;
  setFhevmError: (error: string | null) => void;

  // Verification State
  verifyStep: VerifyStep;
  verifyError: string | null;
  verifyResult: boolean | null;
  setVerifyStep: (step: VerifyStep) => void;
  setVerifyError: (error: string | null) => void;
  setVerifyResult: (result: boolean | null) => void;
  resetVerification: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // FHEVM State
  fhevmStatus: "idle",
  fhevmError: null,
  setFhevmStatus: (status) => set({ fhevmStatus: status }),
  setFhevmError: (error) => set({ fhevmError: error }),

  // Verification State
  verifyStep: "idle",
  verifyError: null,
  verifyResult: null,
  setVerifyStep: (step) => set({ verifyStep: step }),
  setVerifyError: (error) => set({ verifyError: error }),
  setVerifyResult: (result) => set({ verifyResult: result }),
  resetVerification: () =>
    set({
      verifyStep: "idle",
      verifyError: null,
      verifyResult: null,
    }),
}));

