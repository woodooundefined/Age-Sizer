"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { Window } from "@/components/Window";
import { Button } from "@/components/Button";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const { isConnected } = useAccount();
  const { fhevmStatus } = useAppStore();
  const router = useRouter();

  const canStart = isConnected && fhevmStatus === "ready";

  return (
    <div className="py-4">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-6xl md:text-8xl uppercase animate-rainbow mb-4">
          AGE SIZER
        </h1>
        <div className="bevel-inset bg-[#ffffcc] p-4 inline-block">
          <p className="font-mono text-lg">
            ★ PRIVATE AGE VERIFICATION ★
          </p>
        </div>
      </div>

      {/* Main Window */}
      <Window title="AGE SIZER v1.0" className="max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Feature Box */}
          <div className="bg-construction p-1">
            <div className="bg-[#ffff00] bevel-outset p-3 text-center">
              <span className="font-heading text-xl uppercase">
                🔒 FHE ENCRYPTED 🔒
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bevel-inset bg-white p-4">
            <ul className="font-mono text-sm space-y-2">
              <li>► Encrypt your age locally</li>
              <li>► Verify on-chain without revealing</li>
              <li>► Only result (PASS/FAIL) is visible</li>
            </ul>
          </div>

          {/* Divider */}
          <div className="hr-groove" />

          {/* Action Area */}
          <div className="space-y-4">
            {!isConnected ? (
              <div className="text-center">
                <p className="font-mono text-sm mb-4 animate-blink">
                  ▶ CONNECT WALLET TO START ◀
                </p>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              </div>
            ) : fhevmStatus !== "ready" ? (
              <div className="text-center">
                <p className="font-mono text-sm mb-2">
                  INITIALIZING FHE ENGINE...
                </p>
                <div className="loader-90s mx-auto" />
              </div>
            ) : (
              <div className="text-center">
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => router.push("/verify")}
                  disabled={!canStart}
                  className="animate-pulse-glow"
                >
                  ▶ START VERIFICATION ◀
                </Button>
              </div>
            )}
          </div>

          {/* Status Badge */}
          {isConnected && (
            <div className="flex justify-center gap-4">
              <span
                className={`
                  bevel-outset px-3 py-1 text-xs font-mono
                  ${fhevmStatus === "ready" ? "bg-[#00ff00]" : "bg-[#ffff00]"}
                `}
              >
                FHE: {fhevmStatus.toUpperCase()}
              </span>
              <span className="bevel-outset bg-[#00ff00] px-3 py-1 text-xs font-mono">
                WALLET: CONNECTED
              </span>
            </div>
          )}
        </div>
      </Window>
    </div>
  );
}

