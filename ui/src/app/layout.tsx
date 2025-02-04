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
import Nav from "@/components/navigation";
import Footer from "@/components/footer";

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
            <Nav />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
