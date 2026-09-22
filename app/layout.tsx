import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monmenu.fr",
  description: "Monmenu.fr is a B2B SaaS that lets independent restaurant owners build a beautiful, mobile-first digital menu in minutes and share it with a QR code on every ta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-ink text-paper antialiased">{children}</body>
    </html>
  );
}
