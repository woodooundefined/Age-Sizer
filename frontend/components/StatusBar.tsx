"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useAppStore } from "@/lib/store";
import { CONTRACT_ADDRESS, ETHERSCAN_URL } from "@/lib/constants";
import { useState } from "react";

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function StatusBar() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { fhevmStatus } = useAppStore();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const getStatusColor = () => {
    switch (fhevmStatus) {
      case "ready":
        return "online";
      case "error":
        return "offline";
      case "initializing":
        return "loading";
      default:
        return "loading";
    }
  };

  const getStatusText = () => {
    switch (fhevmStatus) {
      case "ready":
        return "ONLINE";
      case "error":
        return "ERROR";
      case "initializing":
        return "INIT...";
      default:
        return "WAIT";
    }
  };

  return (
    <div className="bevel-outset bg-win95-gray p-2 flex items-center gap-4 text-xs font-mono">
      {/* FHEVM Status */}
      <div className="flex items-center gap-2">
        <span className="font-bold">FHE:</span>
        <div className={`status-dot ${getStatusColor()}`} />
        <span>{getStatusText()}</span>
      </div>

      {/* Divider */}
      <div className="w-[2px] h-4 bg-[#808080]" />

      {/* Contract Address */}
      <div className="flex items-center gap-2">
        <span className="font-bold">CONTRACT:</span>
        {CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000" ? (
          <a
            href={`${ETHERSCAN_URL}/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-link"
          >
            {shortenAddress(CONTRACT_ADDRESS)}
          </a>
        ) : (
          <span className="text-[#808080]">NOT SET</span>
        )}
      </div>

      {/* Divider */}
      <div className="w-[2px] h-4 bg-[#808080]" />

      {/* Wallet Address */}
      <div className="flex items-center gap-2">
        <span className="font-bold">WALLET:</span>
        {isConnected && address ? (
          <>
            <button
              onClick={copyAddress}
              className="retro-link cursor-pointer bg-transparent border-none p-0 font-mono text-xs"
              title="Click to copy"
            >
              {copied ? "COPIED!" : shortenAddress(address)}
            </button>
            <button
              onClick={() => disconnect()}
              className="bevel-outset bg-[#ff0000] text-white px-2 py-0.5 text-xs font-bold hover:bg-[#cc0000] active:translate-x-[1px] active:translate-y-[1px] active:[border-color:#808080_#fff_#fff_#808080]"
              title="Disconnect wallet"
            >
              ✕
            </button>
          </>
        ) : (
          <span className="text-[#808080]">NOT CONNECTED</span>
        )}
      </div>
    </div>
  );
}

