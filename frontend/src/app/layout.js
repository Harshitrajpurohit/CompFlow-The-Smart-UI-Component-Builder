"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarMenu } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata = {
  title: "Compflow",
  description: "Ai Component Generator",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideFooter = pathname === "/sessions" || pathname.startsWith("/sessions/") || pathname.startsWith("/signin");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full `}
      >
        <NavbarMenu />
        {children}
        {!hideFooter && <Footer />} {/* ✅ Conditional Rendering */}
      </body>
    </html>
  );
}
