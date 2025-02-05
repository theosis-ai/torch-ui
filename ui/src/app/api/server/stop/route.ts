import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/utils/config'

export async function POST() {
  try {
    const response = await fetch(`${API_BASE_URL}/shutdown`, {
      method: 'POST',
    })
    
    if (!response.ok) {
      throw new Error('Failed to stop server')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error stopping server:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
