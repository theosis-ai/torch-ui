import "@/globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/themeProvider";
import Nav from "@/components/nav";
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
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}
        ><StackProvider app={stackServerApp}><StackTheme>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Nav />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </StackTheme></StackProvider></body>
      </html>
  );
}
