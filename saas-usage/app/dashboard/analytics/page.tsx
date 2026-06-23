'use client'

/**
 * PRODUCTION: Use FeatureGate to restrict features by plan
 *
 * import { FeatureGate, UpgradePrompt } from '@nozle-js/react'
 *
 * <FeatureGate customerId={user.id} feature="pro_features" fallback={<UpgradePrompt />}>
 *   <AnalyticsDashboard />
 * </FeatureGate>
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, FolderKanban, CheckCircle2, Lock } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

const data = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 19 },
  { name: 'Wed', tasks: 15 },
  { name: 'Thu', tasks: 22 },
  { name: 'Fri', tasks: 18 },
  { name: 'Sat', tasks: 8 },
  { name: 'Sun', tasks: 5 },
]

function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-muted-foreground">Insights into your team&apos;s productivity</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Tasks', value: '99', icon: CheckCircle2, change: '+12%' },
          { label: 'Active Projects', value: '8', icon: FolderKanban, change: '+2' },
          { label: 'Team Members', value: '12', icon: Users, change: '+3' },
          { label: 'Completion Rate', value: '87%', icon: TrendingUp, change: '+5%' },
        ].map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className="rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-2xl font-bold">{metric.value}</div>
              <div className="mt-1 text-xs text-green-600">{metric.change}</div>
            </div>
          )
        })}
      </div>

      {/* Chart */}
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 font-semibold">Tasks Completed This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const { user } = useAuth()

  // DEMO: Showing upgrade prompt, PRODUCTION: Use FeatureGate
  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="mt-2 text-muted-foreground">
          Unlock detailed analytics and insights into your team&apos;s productivity
        </p>
        <div className="mt-6">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </div>
  )
}
