"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Age Sizer",
  projectId: "age-sizer-demo-project-id",
  chains: [sepolia],
  ssr: true,
});

