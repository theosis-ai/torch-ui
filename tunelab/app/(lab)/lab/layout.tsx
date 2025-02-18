import "@/app/globals.css";
import { SidebarProvider, SidebarInset } from "@/components/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-[16rem]">
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
