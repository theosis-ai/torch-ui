import "@/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import ModeSwitcher from "@/components/modeSwitcher";
import { ThemeProvider } from "@/components/themeProvider";

const baseUrl = "https://tunelab.theosis.ai";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tune Lab",
    template: "%s | Tune Lab",
  },
  description: "finetune llamas with torchtune",
  openGraph: {
    title: "Tune Lab",
    description: "finetune llamas with torchtune",
    url: baseUrl,
    siteName: "Tune Lab",
    locale: "en_US",
    type: "website",
  },
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <nav className="flex items-center justify-between mt-8 ml-4 mr-4 mb-4 sm:ml-12 sm:mr-12">
              <div>
              <ModeSwitcher />
              </div>
              <div className="flex flex-1 justify-left gap-6 ml-4">
              <Link href="/">Home</Link>
              <SignedIn>
                <Link className="items-center flex gap-1" href="/lab">
                Tune Lab
                </Link>
              </SignedIn>
              </div>
              <div className="flex flex-1 justify-end">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                <Link
                  href="/sign-in"
                  className="btn flex gap-2 justify-center items-center"
                >
                  Sign In <LogIn height="18" width="18" />
                </Link>
                </SignInButton>
              </SignedOut>
              </div>
            </nav>
            {children}
            <footer className="mt-auto">
              <SignedOut>
              <p className="text-neutral-600 dark:text-neutral-300 items-center flex flex-col gap-1 text-xs">
                © {new Date().getFullYear()} Theosis AI
              </p>
              </SignedOut>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
