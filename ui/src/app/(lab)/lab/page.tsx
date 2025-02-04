import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function Page() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <AppSidebar />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <div className="p-6">
            {/* Main content */}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}