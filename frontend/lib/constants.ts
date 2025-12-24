// Age Sizer Contract Address (deployed on Sepolia)
export const CONTRACT_ADDRESS = "0x57E4F92cEB8d49570Ea951F3964A617391A5725f" as const;

// Sepolia Chain ID
export const SEPOLIA_CHAIN_ID = 11155111;

// Etherscan Base URL
export const ETHERSCAN_URL = "https://sepolia.etherscan.io";

// Age Threshold
export const MIN_AGE = 1;
export const MAX_AGE = 200;
export const ADULT_AGE = 18;

// Contract ABI (simplified for Age Sizer)
export const CONTRACT_ABI = [
  {
    inputs: [
      { name: "encryptedAge", type: "bytes32" },
      { name: "inputProof", type: "bytes" },
    ],
    name: "verifyAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getResultHandle",
    outputs: [{ name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "hasVerified",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "user", type: "address" }],
    name: "AgeVerified",
    type: "event",
  },
] as const;

