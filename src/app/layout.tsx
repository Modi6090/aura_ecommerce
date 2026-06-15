import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura - Premium Furniture",
  description: "Explore Our Modern Furniture Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans antialiased bg-stone-50`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-stone-900">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
