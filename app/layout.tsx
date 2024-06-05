import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Launchbox",
  description: "Launchbox is a platform for launching your tokens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-Aeonik">{children}</body>
    </html>
  );
}
