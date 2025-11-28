import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdvancedBackground from "../components/AdvancedBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash's - Portfolio",
  description: "Personal portfolio showcasing my projects and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased relative`}>
        <AdvancedBackground />
        {children}
      </body>
    </html>
  );
}
