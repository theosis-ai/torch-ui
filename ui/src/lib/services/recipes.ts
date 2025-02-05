export async function getRecipes() {
  const response = await fetch('/api/recipes')
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  const data = await response.json()
  return data.recipes.map((recipe: string) => ({
    value: recipe,
    label: recipe
  }))
}
