'use client'

import { GitBranch, CheckCircle2, XCircle, Clock } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

export default function DeploymentsPage() {
  const deployments = [
    { id: '1', commit: 'abc123f', message: 'Update API endpoints', status: 'success', time: new Date(Date.now() - 3600000) },
    { id: '2', commit: 'def456a', message: 'Fix authentication bug', status: 'success', time: new Date(Date.now() - 7200000) },
    { id: '3', commit: 'ghi789b', message: 'Add rate limiting', status: 'failed', time: new Date(Date.now() - 10800000) },
    { id: '4', commit: 'jkl012c', message: 'Database migration', status: 'in_progress', time: new Date(Date.now() - 1800000) },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deployments</h1>
        <p className="mt-1 text-muted-foreground">Deployment history and status</p>
      </div>

      <div className="space-y-2">
        {deployments.map((deploy) => {
          const StatusIcon = deploy.status === 'success' ? CheckCircle2 : deploy.status === 'failed' ? XCircle : Clock
          return (
            <div key={deploy.id} className="rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <GitBranch className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-muted px-2 py-0.5 text-xs">{deploy.commit}</code>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                          deploy.status === 'success'
                            ? 'bg-green-500/10 text-green-600'
                            : deploy.status === 'failed'
                            ? 'bg-red-500/10 text-red-600'
                            : 'bg-blue-500/10 text-blue-600'
                        }`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {deploy.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm">{deploy.message}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {formatDateTime(deploy.time)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
