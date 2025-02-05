import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/utils/config'

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    )
  }
}
