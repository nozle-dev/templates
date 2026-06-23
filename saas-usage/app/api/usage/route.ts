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

    // Track usage with Nozle SDK
    await nozle.meter({
      customerId,
      dimension,
      quantity,
      metadata,
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

    // Fetch usage from Nozle SDK
    const usage = await nozle.getUsage({ customerId })

    return NextResponse.json(usage)
  } catch (error) {
    console.error('Usage fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch usage' },
      { status: 500 }
    )
  }
}
