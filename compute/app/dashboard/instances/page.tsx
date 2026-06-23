'use client'

import { Plus, Play, Square, Trash2 } from 'lucide-react'

export default function InstancesPage() {
  const instances = [
    { id: '1', name: 'web-prod-1', type: 'c5.large', region: 'us-east-1', status: 'running' },
    { id: '2', name: 'api-prod-1', type: 'c5.xlarge', region: 'us-west-2', status: 'running' },
    { id: '3', name: 'gpu-worker-1', type: 'p3.2xlarge', region: 'us-east-1', status: 'stopped' },
    { id: '4', name: 'db-replica-1', type: 'r5.large', region: 'eu-west-1', status: 'running' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Instances</h1>
          <p className="mt-1 text-muted-foreground">Manage your compute instances</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Create Instance
        </button>
      </div>

      <div className="space-y-2">
        {instances.map((instance) => (
          <div key={instance.id} className="flex items-center justify-between rounded-lg border p-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="font-semibold">{instance.name}</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    instance.status === 'running'
                      ? 'bg-green-500/10 text-green-600'
                      : 'bg-gray-500/10 text-gray-600'
                  }`}
                >
                  {instance.status}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{instance.type}</span>
                <span>{instance.region}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {instance.status === 'stopped' ? (
                <button className="rounded-md border p-2 hover:bg-accent">
                  <Play className="h-4 w-4" />
                </button>
              ) : (
                <button className="rounded-md border p-2 hover:bg-accent">
                  <Square className="h-4 w-4" />
                </button>
              )}
              <button className="rounded-md border p-2 text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
