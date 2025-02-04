import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen">
      <SidebarInset className="ml-30" >
        <div className="p-4" style={{ border: "2px solid blue" }}>
          <SidebarTrigger className="mb-4"/>
          <div className="rounded-lg border p-4">
            <p>Main Content</p>
          </div>
        </div>
      </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
