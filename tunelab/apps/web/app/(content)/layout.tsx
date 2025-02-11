import "@workspace/ui/styles/globals.css";
import { GeistSans } from "geist/font/sans";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${GeistSans.variable} `}>
      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        {children}
      </main>
    </div>
  );
}
