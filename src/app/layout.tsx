import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { Providers } from "@/providers/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#0F5A37",
};

export const metadata: Metadata = {
  title: "Aura Ecommerce | Premium Furniture & Decor",
  description: "Shop the best modern furniture and home decor. High-quality pieces for every room.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Aura Ecommerce",
    description: "Premium furniture and home decor ecommerce platform.",
    url: "https://aura-ecommerce.com",
    siteName: "Aura",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Ecommerce",
    description: "Shop the best modern furniture.",
  },
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
          <Providers>
            {children}
          </Providers>
        </LenisProvider>
      </body>
    </html>
  );
}
