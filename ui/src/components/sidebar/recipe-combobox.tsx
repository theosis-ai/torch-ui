"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { API_BASE_URL } from "@/utils/config"
import { getRecipes } from "@/lib/services/recipes"

type Recipe = {
  value: string
  label: string
}

export function RecipeCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [recipes, setRecipes] = React.useState<Recipe[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getRecipes()
      .then(recipes => {
        setRecipes(recipes)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch recipes:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Button variant="outline" className="w-[200px]">Loading...</Button>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? recipes.find((recipe) => recipe.value === value)?.label
            : "Select recipe..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search recipe..." />
          <CommandList>
            <CommandEmpty>No recipe found.</CommandEmpty>
            <CommandGroup>
              {recipes?.map((recipe) => (
                <CommandItem
                  key={recipe.value}
                  value={recipe.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === recipe.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {recipe.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
