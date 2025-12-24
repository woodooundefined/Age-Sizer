import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { StatusBar } from "@/components/StatusBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Age Sizer - FHE Age Verification",
  description: "Verify your age privately using Fully Homomorphic Encryption",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof global === 'undefined') {
                window.global = window;
              }
              if (typeof Buffer === 'undefined') {
                window.Buffer = { isBuffer: () => false };
              }
            `,
          }}
        />
      </head>
      <body className="bg-90s-tile h-screen font-system overflow-hidden flex flex-col">
        <Providers>
          {/* Header */}
          <header className="bevel-outset bg-[#c0c0c0]">
            {/* Marquee Banner */}
            <div className="bg-[#000080] text-white py-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mx-4 text-[#ffff00]">★ AGE SIZER ★</span>
                <span className="mx-4 text-[#00ff00]">FULLY HOMOMORPHIC ENCRYPTION</span>
                <span className="mx-4 text-[#ff00ff]">PRIVACY FIRST</span>
                <span className="mx-4 text-[#00ffff]">POWERED BY ZAMA</span>
                <span className="mx-4 text-[#ff8000]">VERIFY WITHOUT REVEALING</span>
                <span className="mx-4 text-[#ff0000]">★ NEW! ★</span>
                <span className="mx-4 text-[#ffff00]">★ AGE SIZER ★</span>
                <span className="mx-4 text-[#00ff00]">FULLY HOMOMORPHIC ENCRYPTION</span>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex justify-end">
              <StatusBar />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl mx-auto p-4 w-full">{children}</main>

          {/* Footer */}
          <footer className="fixed bottom-0 left-0 right-0">
            <div className="hr-groove" />
            <div className="bg-[#c0c0c0] bevel-outset p-2 flex justify-between items-center text-xs font-mono">
              <span>© 2025 AGE SIZER | SEPOLIA TESTNET</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bevel-outset bg-[#c0c0c0] px-3 py-1 flex items-center gap-2 hover:bg-[#d0d0d0]"
                title="View on GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GITHUB</span>
              </a>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
