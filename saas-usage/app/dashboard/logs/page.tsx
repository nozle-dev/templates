'use client'

import { Search } from 'lucide-react'
import { generateMockLogs } from '@/lib/mock-data'
import { formatDateTime } from '@/lib/utils'

export default function LogsPage() {
  const logs = generateMockLogs(50)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request Logs</h1>
        <p className="mt-1 text-muted-foreground">View and search API request history</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search logs..."
          className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Logs Table */}
      <div className="rounded-lg border">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Timestamp</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Method</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Endpoint</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/20">
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDateTime(log.timestamp)}
                </td>
                <td className="px-4 py-3">
                  <code className="rounded bg-muted px-2 py-0.5 text-xs">{log.method}</code>
                </td>
                <td className="px-4 py-3 text-sm">{log.endpoint}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs ${
                      log.status < 300
                        ? 'bg-green-500/10 text-green-600'
                        : log.status < 500
                        ? 'bg-yellow-500/10 text-yellow-600'
                        : 'bg-red-500/10 text-red-600'
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                  {log.latency}ms
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
