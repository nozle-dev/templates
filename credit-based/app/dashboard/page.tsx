'use client'

/**
 * PRODUCTION: Import Nozle SDK components
 *
 * import { usePlan } from '@nozle-js/react'
 * import { PlanBadge } from '@nozle-js/react'
 *
 * const { plan, loading } = usePlan()
 * <PlanBadge plan={plan.code} />
 */

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export default function DashboardHome() {
  const { user } = useAuth()

  const projects = [
    { id: '1', name: 'Website Redesign', tasks: 12, members: 4 },
    { id: '2', name: 'Mobile App', tasks: 8, members: 3 },
    { id: '3', name: 'Marketing Campaign', tasks: 5, members: 2 },
  ]

  const activity = [
    { id: '1', user: 'Alice', action: 'created a new task', project: 'Website Redesign', time: '2 hours ago' },
    { id: '2', user: 'Bob', action: 'completed a task', project: 'Mobile App', time: '4 hours ago' },
    { id: '3', user: 'Charlie', action: 'commented on', project: 'Marketing Campaign', time: '6 hours ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="mt-1 text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        {/* PRODUCTION: Show plan badge */}
        {/* {!loading && plan && <PlanBadge plan={plan.code} />} */}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-6">
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-muted-foreground">Active Projects</div>
        </div>
        <div className="rounded-lg border p-6">
          <div className="text-2xl font-bold">25</div>
          <div className="text-sm text-muted-foreground">Open Tasks</div>
        </div>
        <div className="rounded-lg border p-6">
          <div className="text-2xl font-bold">9</div>
          <div className="text-sm text-muted-foreground">Team Members</div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-accent"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="rounded-lg border p-6 hover:bg-accent"
            >
              <h3 className="font-semibold">{project.name}</h3>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{project.tasks} tasks</span>
                <span>{project.members} members</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <div className="space-y-4 rounded-lg border p-6">
          {activity.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                {item.user[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{item.user}</span> {item.action}{' '}
                  <span className="font-medium">{item.project}</span>
                </p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
