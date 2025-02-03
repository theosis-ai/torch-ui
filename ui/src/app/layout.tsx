import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Tune Lab",
  description: "tune Llamas with torchtune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        >
          <nav className="flex items-center justify-between mt-8 ml-12 mr-12 mb-4">
            <div className="flex gap-6">
              <Link href="/">Home</Link>
              <SignedIn>
                <Link
                  className="items-center flex gap-1"
                  href="/lab"
                >
                Tune Lab
                </Link>
              </SignedIn>
              <SignedOut>
              <Link
                className="items-center flex gap-1"
                href="https://github.com/pytorch/torchtune"
                target="_blank"
              >
                {`torchtune`} <ExternalLink height="12" width="12" />
              </Link>
              </SignedOut>
              <SignedOut>
              <Link
                className="items-center flex gap-1"
                href="https://github.com/vercel/next.js"
                target="_blank"
              >
                {`nextjs`} <ExternalLink height="12" width="12" />
              </Link>
              </SignedOut>
            </div>
            <div className="flex">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Link href="/sign-in" className="btn">
                    Sign In / Sign Up
                  </Link>
                </SignInButton>
              </SignedOut>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
