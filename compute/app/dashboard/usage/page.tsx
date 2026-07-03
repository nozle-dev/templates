'use client'

import { useAuth } from '@/lib/auth-context'
import { UsageMeter } from '@nozle-js/react'

export default function UsagePage() {
  const { user } = useAuth()

  // Mock usage data for demo
  const mockUsage = {
    current: 847,
    limit: 1000,
    percentage: 84.7
  }

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

      <div className="rounded-lg border p-6">
        <h3 className="mb-4 font-semibold">Current Usage</h3>
        <div className="space-y-4">
          <UsageMeter
            label="Compute Hours"
            used={mockUsage.current}
            limit={mockUsage.limit}
            showText
          />
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              You've used <span className="font-semibold text-foreground">{mockUsage.current}</span> of{' '}
              <span className="font-semibold">{mockUsage.limit}</span> compute hours this month.
              {mockUsage.percentage > 80 && (
                <span className="block mt-2 text-amber-600">
                  ⚠️ You're approaching your limit. Consider upgrading your plan.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <svg
            className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Demo Mode - Mock Data</p>
            <p className="mt-1">
              In production, usage data comes from the Nozle SDK via{' '}
              <code className="bg-background px-1.5 py-0.5 rounded text-xs">useUsage</code> hook or{' '}
              <code className="bg-background px-1.5 py-0.5 rounded text-xs">UsageMeter</code> component.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
