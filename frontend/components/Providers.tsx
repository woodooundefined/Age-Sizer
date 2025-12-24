"use client";

import { ReactNode, useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "@/lib/wagmi";
import { useAppStore } from "@/lib/store";

const queryClient = new QueryClient();

function FhevmInitializer({ children }: { children: ReactNode }) {
  const { setFhevmStatus, setFhevmError } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const init = async () => {
      setFhevmStatus("initializing");
      try {
        // Dynamic import to avoid SSR issues
        const { initFhevm } = await import("@/lib/fhe");
        await initFhevm();
        setFhevmStatus("ready");
      } catch (error: any) {
        setFhevmError(error.message || "Failed to initialize FHEVM");
        setFhevmStatus("error");
      }
    };

    init();
  }, [mounted, setFhevmStatus, setFhevmError]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#000080",
            accentColorForeground: "white",
            borderRadius: "none",
            fontStack: "system",
          })}
          locale="en"
          modalSize="compact"
        >
          <FhevmInitializer>{children}</FhevmInitializer>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
