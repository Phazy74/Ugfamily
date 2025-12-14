

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarController from "@/components/NavbarController";
import SplashLoader from "@/components/SplashLoader";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UnionGate",
  description: "Welcome to uniongate bank, where your financial goals meet smart solutions. Experience seamless banking with security, convenience, and personalized service",
  icons: {
    icon: "/fav.png",
    
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {




  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SplashLoader>
      <NavbarController />
        {children}
        </SplashLoader>
      </body>
    </html>
  );
}
