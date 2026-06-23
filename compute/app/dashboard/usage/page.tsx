'use client'

import { UsageDashboard } from '@nozle-js/react'
import { useAuth } from '@/lib/auth-context'

export default function UsagePage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Usage</h1>
        <p className="mt-1 text-muted-foreground">Compute hours and cost breakdown</p>
      </div>

      <div className="rounded-lg border p-6">
        <h3 className="mb-4 font-semibold">Graduated Pricing Tiers</h3>
        <div className="space-y-3">
          {[
            { range: '0-100 hours', rate: '$0.50/hour', color: 'bg-blue-500' },
            { range: '101-1,000 hours', rate: '$0.35/hour', color: 'bg-green-500' },
            { range: '1,001+ hours', rate: '$0.20/hour', color: 'bg-purple-500' },
          ].map((tier) => (
            <div key={tier.range} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${tier.color}`} />
                <span className="text-sm">{tier.range}</span>
              </div>
              <span className="font-mono text-sm font-medium">{tier.rate}</span>
            </div>
          ))}
        </div>
      </div>

      <UsageDashboard
        customerId={user?.id || 'demo_customer'}
        features={[
          { code: 'compute_hours', name: 'Compute Hours', color: 'hsl(var(--primary))' }
        ]}
      />
    </div>
  )
}
