'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock usage data for demo
const mockUsageData = [
  { date: '2026-06-17', requests: 8234, tokens: 124500 },
  { date: '2026-06-18', requests: 9123, tokens: 143200 },
  { date: '2026-06-19', requests: 11456, tokens: 178900 },
  { date: '2026-06-20', requests: 10234, tokens: 156700 },
  { date: '2026-06-21', requests: 12789, tokens: 198400 },
  { date: '2026-06-22', requests: 13456, tokens: 210500 },
  { date: '2026-06-23', requests: 15123, tokens: 234600 },
]

export default function UsagePage() {
  const totalRequests = mockUsageData.reduce((sum, day) => sum + day.requests, 0)
  const avgRequests = Math.round(totalRequests / mockUsageData.length)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-lg text-ink">Usage</h1>
        <p className="mt-1 text-body-md text-muted">Detailed usage metrics and analytics</p>
      </div>

      {/* Usage Alert Banner */}
      <div className="card border-primary/20 bg-primary-soft/20">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-5 w-5 text-primary"
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
          </div>
          <div className="flex-1">
            <h3 className="text-title-md text-ink">Current Usage</h3>
            <p className="mt-1 text-body-sm text-muted">
              You've used <span className="font-semibold text-ink">{totalRequests.toLocaleString()}</span> API calls this period.
              Your plan includes <span className="font-semibold">10,000</span> base calls plus overage billing at $0.002/call.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-caption text-muted mb-2">Total API Calls (7 days)</p>
          <p className="text-display-lg text-ink">{totalRequests.toLocaleString()}</p>
          <p className="text-body-sm text-success mt-2">+12% vs previous week</p>
        </div>

        <div className="card">
          <p className="text-caption text-muted mb-2">Average Per Day</p>
          <p className="text-display-lg text-ink">{avgRequests.toLocaleString()}</p>
          <p className="text-body-sm text-muted mt-2">Based on last 7 days</p>
        </div>

        <div className="card">
          <p className="text-caption text-muted mb-2">Overage Cost (MTD)</p>
          <p className="text-display-lg text-ink">$126.14</p>
          <p className="text-body-sm text-muted mt-2">{((totalRequests - 10000) * 0.002).toFixed(2)} overage calls</p>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="card">
        <h3 className="text-title-md text-ink mb-6">API Calls (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockUsageData}>
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(239 84% 67%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(214 32% 91%)' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(214 32% 91%)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(214 32% 91%)',
                borderRadius: '8px',
                fontSize: '14px',
              }}
              formatter={(value: number) => [value.toLocaleString(), 'API Calls']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="hsl(239 84% 67%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRequests)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Implementation Note */}
      <div className="card border-border-soft bg-surface-soft">
        <div className="flex items-start gap-3">
          <svg
            className="h-5 w-5 text-muted shrink-0 mt-0.5"
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
          <div className="text-body-sm text-muted">
            <p className="font-medium text-ink">Demo Mode - Mock Data</p>
            <p className="mt-1">
              In production, this data comes from the Nozle SDK via{' '}
              <code className="bg-surface-strong px-1.5 py-0.5 rounded text-xs">UsageDashboard</code> and{' '}
              <code className="bg-surface-strong px-1.5 py-0.5 rounded text-xs">UsageAlert</code> components.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
