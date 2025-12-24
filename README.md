# Age Sizer

Prove you're 18+ without revealing your actual age. Your age is encrypted in the browser, verified on-chain using FHE, and only the boolean result (PASS/FAIL) is decryptable by you. The contract never sees your real age.

## Features

- 🔒 **Client-side Encryption** — Age encrypted locally before leaving your browser
- ⛓️ **On-chain FHE Computation** — Threshold check runs on encrypted data
- 👤 **User-only Decryption** — Only you can decrypt the boolean result
- 🎨 **Retro 90s UI** — Because privacy can be fun

## Live Demo

| Resource | Link |
|----------|------|
| **Contract** | [`0x57E4F92cEB8d49570Ea951F3964A617391A5725f`](https://sepolia.etherscan.io/address/0x57E4F92cEB8d49570Ea951F3964A617391A5725f#code) |
| **Network** | Ethereum Sepolia Testnet |
| **Status** | ✅ Verified on Etherscan |

## Tech Stack

- **Contract**: Solidity 0.8.24 + @fhevm/solidity v0.9
- **Frontend**: Next.js 14 + TypeScript + Tailwind
- **FHE**: @zama-fhe/relayer-sdk v0.3.0-5
- **Wallet**: RainbowKit + wagmi + viem

## Quick Start

```bash
# Frontend
cd frontend && npm install && npm run dev
```

Open http://localhost:3000, connect wallet (Sepolia), enter age, verify.

## Tests

```bash
cd contracts && npm test
```

```
✅ 11 passing

  AgeSizer
    Deployment
      ✔ should deploy successfully
      ✔ should have correct AGE_THRESHOLD constant
    State Management
      ✔ should return false for hasVerified before verification
      ✔ should return false for isVerified before verification
      ✔ should revert getResultHandle for non-verified user
    Access Control
      ✔ should track verification status per user
      ✔ should allow any address to check verification status
    Contract Interface
      ✔ should have verifyAge function
      ✔ should have getResultHandle function
      ✔ should have hasVerified mapping
      ✔ should have isVerified function
```

## The Magic 🪄

```
User Input (25)
      │
      ▼ [Browser]
   Encrypt with FHE SDK
      │
      ▼ [Blockchain]
   FHE.ge(encrypted_age, 18)
      │
      ▼ [User]
   Decrypt → true ✓
```

Nobody—not the contract, not validators, not anyone—ever sees "25".

## License

MIT
