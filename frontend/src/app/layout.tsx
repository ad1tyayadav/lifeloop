/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "LIFELOOP - Financial Chaos Analysis",
  description: "Analyze your financial transactions with AI-powered insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where we do NOT want the header/footer
  const hideLayout =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <AppProvider>
          {!hideLayout && <Header />}
          {children}
          {!hideLayout && <Footer />}
        </AppProvider>
      </body>
    </html>
  );
}
