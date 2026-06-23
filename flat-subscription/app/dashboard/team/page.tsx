'use client'

/**
 * PRODUCTION: Use PlanGate to restrict features by plan
 *
 * import { PlanGate } from '@nozle-js/react'
 *
 * <PlanGate planCode="pro" fallback={<LockedButton />}>
 *   <UnlockedButton />
 * </PlanGate>
 */

import { Plus, Mail } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function TeamPage() {
  const { user } = useAuth()
  const members = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Owner', avatar: 'A' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Admin', avatar: 'B' },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Member', avatar: 'C' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="mt-1 text-muted-foreground">Manage your team members and permissions</p>
        </div>
        {/* DEMO: Showing disabled button, PRODUCTION: Use PlanGate */}
        <button disabled className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm opacity-50">
          <Plus className="h-4 w-4" />
          Invite Member (Pro Plan Required)
        </button>
      </div>

      {/* Team count notice */}
      {/* DEMO: Showing free plan limits, PRODUCTION: Use PlanGate */}
      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
        <p className="text-sm">
          <strong>Free plan:</strong> Limited to 3 team members. Upgrade to Pro to invite more.
        </p>
      </div>

      {/* Members List */}
      <div className="space-y-2">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {member.avatar}
              </div>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </div>
              </div>
            </div>
            <div className="rounded-full bg-muted px-3 py-1 text-xs">{member.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
