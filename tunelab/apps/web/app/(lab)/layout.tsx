import { ClerkProvider } from "@clerk/nextjs";
import "./lab.css";

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div >
        {children}
      </div>
    </ClerkProvider>
  );
}
