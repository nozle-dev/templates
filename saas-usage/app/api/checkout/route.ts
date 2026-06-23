import { NextRequest, NextResponse } from 'next/server'
import { nozle } from '@/lib/nozle-client'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planCode } = await req.json()

    if (!planCode) {
      return NextResponse.json({ error: 'Plan code is required' }, { status: 400 })
    }

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/billing?success=true`

    const result = await nozle.checkout(session.userId, planCode, successUrl)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[/api/checkout] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
