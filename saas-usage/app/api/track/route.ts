import { NextRequest, NextResponse } from 'next/server'
import { nozle } from '@/lib/nozle-client'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { event, metadata } = await req.json()

    if (!event) {
      return NextResponse.json({ error: 'Event is required' }, { status: 400 })
    }

    await nozle.track(session.userId, event, metadata)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[/api/track] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
