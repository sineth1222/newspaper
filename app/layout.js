"use client";

import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog App",
  description: "A simple blog built with Next.js and Tailwind CSS",
};*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <SessionProvider>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}


//className={`${geistSans.variable} ${geistMono.variable} antialiased`}