"use client"

import * as React from "react"
import {
  AudioWaveform,
  Binary,
  Bolt,
  BookOpen,
  Bot,
  Command,
  Fullscreen,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
  MessageCircleCode
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavRecipes } from "@/components/sidebar/nav-recipes"
import { NavUser } from "@/components/sidebar/nav-user"
import { ToolSwitcher } from "@/components/sidebar/tool-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "jxtngx",
    email: "m@example.com",
    avatar: "https://avatars.githubusercontent.com/u/26209687",
  },
  tools: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Llama 3.1",
          url: "#",
        },
        {
          title: "Llama 3.2",
          url: "#",
        },
        {
          title: "Llama 3.3",
          url: "#",
        },
      ],
    },
    {
      title: "Configs",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Llama 3.1",
          url: "#",
        },
        {
          title: "Llama 3.2",
          url: "#",
        },
        {
          title: "Llama 3.2 Vision",
          url: "#",
        },
        {
          title: "llama 3.3",
          url: "#",
        },
      ],
    },
    {
      title: "Runs",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
      ],
    },
  ],
  recipes: [
    {
      name: "Full finetuning",
      url: "#",
      icon: Fullscreen,
    },
    {
      name: "LoRA finetuning",
      url: "#",
      icon: PieChart,
    },
    {
      name: "QAT",
      url: "#",
      icon: Binary,
    },
    {
      name: "DPO",
      url: "#",
      icon: Bolt,
    },
    {
      name: "RLHF",
      url: "#",
      icon: MessageCircleCode,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <ToolSwitcher tools={data.tools} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavRecipes recipes={data.recipes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
