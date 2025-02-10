import "@workspace/ui/styles/content.css";
import type { Metadata } from "next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Llama Cookbook",
    template: "%s | Llama Cookbook",
  },
  description: "Gen AI with NVIDIA, LangChain, and Vercel",
  openGraph: {
    title: "Llama Cookbook",
    description: "Gen AI with NVIDIA, LangChain, and Vercel",
    url: baseUrl,
    siteName: "Llama Cookbook",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col items-center">{children}</div>;
}
