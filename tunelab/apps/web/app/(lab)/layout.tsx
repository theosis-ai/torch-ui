import "@workspace/ui/styles/globals.css";
import {
  SidebarProvider,
  SidebarInset,
} from "@workspace/ui/components/sidebar";
import { AppSidebar } from "@workspace/ui/components/sidebar/app-sidebar";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-[18rem]">
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
