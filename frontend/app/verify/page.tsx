"use client";

import { useState, useEffect } from "react";
import { useAccount, useWalletClient, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { useRouter } from "next/navigation";
import { Window } from "@/components/Window";
import { Button } from "@/components/Button";
import { AgeInput } from "@/components/AgeInput";
import { VerificationStatus } from "@/components/VerificationStatus";
import { useAppStore } from "@/lib/store";
import { encryptAge, userDecrypt } from "@/lib/fhe";
import { CONTRACT_ADDRESS, CONTRACT_ABI, MIN_AGE, MAX_AGE } from "@/lib/constants";

export default function VerifyPage() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const router = useRouter();
  const [age, setAge] = useState("");
  const {
    fhevmStatus,
    verifyStep,
    setVerifyStep,
    setVerifyError,
    setVerifyResult,
    resetVerification,
  } = useAppStore();

  // Contract write
  const { writeContract, data: txHash, error: writeError, isPending: isWriting } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Read result handle
  const { data: resultHandle, refetch: refetchHandle } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getResultHandle",
    args: address ? [address] : undefined,
    query: { enabled: false },
  });

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  // Reset on mount
  useEffect(() => {
    resetVerification();
  }, [resetVerification]);

  // Handle write error
  useEffect(() => {
    if (writeError) {
      setVerifyStep("error");
      setVerifyError(writeError.message);
    }
  }, [writeError, setVerifyStep, setVerifyError]);

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirming) {
      setVerifyStep("waiting");
    }
  }, [isConfirming, setVerifyStep]);

  // Handle successful transaction - trigger decryption
  useEffect(() => {
    if (isConfirmed && verifyStep === "waiting") {
      handleDecryption();
    }
  }, [isConfirmed, verifyStep]);

  const isValidAge = () => {
    if (!age) return false;
    const num = parseInt(age, 10);
    return !isNaN(num) && num >= MIN_AGE && num <= MAX_AGE;
  };

  const handleVerify = async () => {
    if (!isValidAge() || !address || !walletClient) return;

    try {
      // Step 1: Encrypt
      setVerifyStep("encrypting");
      const ageNum = parseInt(age, 10);
      const encrypted = await encryptAge(CONTRACT_ADDRESS, address, ageNum);

      // Step 2: Submit transaction
      setVerifyStep("submitting");
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "verifyAge",
        args: [encrypted.handle, encrypted.inputProof],
        gas: BigInt(500000),
      });
    } catch (error: any) {
      setVerifyStep("error");
      setVerifyError(error.message || "Encryption failed");
    }
  };

  const handleDecryption = async () => {
    if (!walletClient || !address) return;

    try {
      setVerifyStep("decrypting");

      // Refetch handle
      const { data: handle } = await refetchHandle();
      if (!handle) {
        throw new Error("Failed to get result handle");
      }

      // Decrypt using SDK userDecrypt
      const result = await userDecrypt(handle as string, CONTRACT_ADDRESS, walletClient);

      // Result is 0 (false) or 1 (true)
      const isAdult = result !== BigInt(0);
      setVerifyResult(isAdult);
      setVerifyStep("done");
    } catch (error: any) {
      setVerifyStep("error");
      setVerifyError(error.message || "Decryption failed");
    }
  };

  const handleReset = () => {
    setAge("");
    resetVerification();
  };

  const isProcessing =
    verifyStep === "encrypting" ||
    verifyStep === "submitting" ||
    verifyStep === "waiting" ||
    verifyStep === "decrypting" ||
    isWriting ||
    isConfirming;

  return (
    <div className="py-4">
      {/* Back Button */}
      <Button
        variant="default"
        size="sm"
        onClick={() => router.push("/")}
        className="mb-4"
      >
        ◄ BACK
      </Button>

      {/* Main Window */}
      <Window title="AGE VERIFICATION" className="max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Input Section */}
          {verifyStep === "idle" && (
            <>
              <AgeInput value={age} onChange={setAge} disabled={isProcessing} />

              {/* Info Box */}
              <div className="bevel-inset bg-[#ffffcc] p-3">
                <p className="font-mono text-xs text-center">
                  THRESHOLD: AGE ≥ 18 = PASS
                </p>
              </div>

              {/* Divider */}
              <div className="hr-groove" />

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleVerify}
                  disabled={!isValidAge() || fhevmStatus !== "ready"}
                >
                  🔐 ENCRYPT & VERIFY
                </Button>
              </div>
            </>
          )}

          {/* Processing/Result Section */}
          {verifyStep !== "idle" && (
            <>
              <VerificationStatus />

              {/* Action Buttons */}
              {(verifyStep === "done" || verifyStep === "error") && (
                <div className="flex justify-center gap-4 mt-6">
                  <Button variant="default" onClick={handleReset}>
                    ↻ TRY AGAIN
                  </Button>
                  <Button variant="default" onClick={() => router.push("/")}>
                    ◄ HOME
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Progress Indicator */}
          {isProcessing && (
            <div className="flex justify-center">
              <div className="bevel-outset bg-[#c0c0c0] px-4 py-2">
                <span className="font-mono text-xs animate-blink">
                  ⏳ PROCESSING...
                </span>
              </div>
            </div>
          )}
        </div>
      </Window>

      {/* Warning Banner */}
      <div className="bg-construction p-1 mt-8">
        <div className="bg-[#ffff00] bevel-outset p-2 text-center">
          <span className="font-heading text-sm uppercase">
            ⚠ YOUR AGE IS NEVER REVEALED ⚠
          </span>
        </div>
      </div>
    </div>
  );
}

