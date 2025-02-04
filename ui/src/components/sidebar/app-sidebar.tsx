import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar"


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <p className="text-2xl mb-4 mt-6 ml-2.5">
          Settings
        </p>
      </SidebarHeader>
      <SidebarContent>
      <SidebarGroup>zed</SidebarGroup>
        <SidebarGroup>zod</SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}