import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DPI-HT-01 Forensic Reconstruction",
  description:
    "Reconstruction of Divorce Party International Ltd. at 31 August 2026: 100 certified decisions, three statements, schedules and reconciliations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
