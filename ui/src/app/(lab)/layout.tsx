import { ClerkProvider } from "@clerk/nextjs";

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
