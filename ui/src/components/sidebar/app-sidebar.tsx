'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { startServer, stopServer } from "@/utils/server"
import { RecipeCombobox } from "@/components/sidebar/recipe-combobox"
import { useState } from "react"

export function AppSidebar() {
  const [isStarting, setIsStarting] = useState(false)
  const [isServerRunning, setIsServerRunning] = useState(false)

  const handleServerStart = async () => {
    setIsStarting(true)
    try {
      const success = await startServer()
      if (success) {
        setIsServerRunning(true)
      }
    } catch (error) {
      console.error('Failed to start server:', error)
    }
    setIsStarting(false)
  }

  const handleServerStop = async () => {
    setIsStarting(true)
    try {
      const success = await stopServer()
      if (success) {
        setIsServerRunning(false)
      }
    } catch (error) {
      console.error('Failed to stop server:', error)
    }
    setIsStarting(false)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <p className="text-xl mb-4 mt-6 ml-2.5">
          Finetuning settings
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
      <Button 
        variant="outline"
        className="ml-2.5 w-[200px]"
        onClick={isServerRunning ? handleServerStop : handleServerStart}
        disabled={isStarting}
      >
        {isStarting ? 'Processing...' : isServerRunning ? 'Stop Server' : 'Start Server'}
      </Button>
      </SidebarGroup>
      <SidebarGroup 
        className="ml-2.5">
          <h1 className="mb-2">Recipes </h1>
          <RecipeCombobox />
      </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}