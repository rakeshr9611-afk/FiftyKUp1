import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FiftyKUp — First $50K for College Students",
  description: "Track your journey to your first $50,000.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-black text-white`}>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
