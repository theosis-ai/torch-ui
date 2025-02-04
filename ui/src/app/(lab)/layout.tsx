import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google';
import "@/globals.css";

const baseUrl = 'https://theosis.ai'

const fontMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400']
})
const fontSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300']
})

export default function LabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {children}
    </div>
  );
}