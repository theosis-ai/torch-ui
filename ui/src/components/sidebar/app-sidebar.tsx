import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar"

import { RecipeCombobox } from "@/components/sidebar/recipe-combobox"


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <p className="text-xl mb-4 mt-6 ml-2.5">
          Finetuning settings
        </p>
      </SidebarHeader>
      <SidebarContent>
      <SidebarGroup 
        className="ml-2.5">
          <h1 className="mb-2">Recipes </h1>
          <RecipeCombobox />
      </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}