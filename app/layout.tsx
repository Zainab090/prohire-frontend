import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ProHire — Your AI Career Agent",
  description: "From Profile to Placement. AI agents that discover jobs, prepare applications, run mock interviews, and build your career roadmap."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-textPrimary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
