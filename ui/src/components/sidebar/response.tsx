"use client"

import React, { useEffect, useState } from 'react'
import { useSidebar } from "@/components/sidebar/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function Response() {
  const { selectedModel, selectedPersona } = useSidebar()
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/getContent?model=${selectedModel}&prompt=${selectedPersona}`)
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setContent(data.content)
      } catch (error) {
        console.error('Error fetching content:', error)
        setContent('Error loading content')
      }
    }

    fetchContent()
  }, [selectedModel, selectedPersona])
  
  if ((selectedModel === "Base" && selectedPersona !== "Base") || (selectedModel !== "Base" && selectedPersona === "Base")) {
    return <Skeleton />
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {selectedModel === "Base" && selectedPersona === "Base" 
          ? "Base"
          : `${selectedPersona} ${selectedModel}`
        }
      </h1>
      <div>
        className="prose prose-sm max-w-[80%] prose-headings:font-bold prose-p:mb-4 prose-p:leading-relaxed prose-li:leading-relaxed"
        <p>zed</p>
      </div>
    </div>
  )
}