import { NextRequest, NextResponse } from 'next/server'
import { nozle } from '@/lib/nozle-client'

export async function POST(request: NextRequest) {
  try {
    const { customerId, dimension, quantity, metadata } = await request.json()

    if (!customerId || !dimension || typeof quantity !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: customerId, dimension, quantity' },
        { status: 400 }
      )
    }

    // Track usage event with Nozle SDK
    await nozle.track(customerId, `usage:${dimension}`, {
      dimension,
      quantity,
      ...metadata,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Usage tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track usage' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch usage stats
// Note: In demo mode, returns mock data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')

    if (!customerId) {
      return NextResponse.json(
        { error: 'Missing customerId parameter' },
        { status: 400 }
      )
    }

    // Mock usage data for demo
    // In production, you would fetch this from your analytics/usage tracking system
    const usage = {
      customerId,
      period: 'current_month',
      metrics: [
        { dimension: 'api_calls', used: 8234, limit: 10000, percentage: 82.34 },
        { dimension: 'storage_gb', used: 45.2, limit: 100, percentage: 45.2 },
      ],
    }

    return NextResponse.json(usage)
  } catch (error) {
    console.error('Usage fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch usage' },
      { status: 500 }
    )
  }
}
