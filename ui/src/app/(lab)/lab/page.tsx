import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-[18rem]">
        <div className="p-4">
          <SidebarTrigger className="mb-4"/>
          <div className="rounded-lg border p-4">
            <p>an eventual interactive playground</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
