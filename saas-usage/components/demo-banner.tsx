'use client'

import { AlertCircle } from 'lucide-react'

export function DemoBanner() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

  if (!isDemoMode) {
    return null
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-900 dark:text-amber-100">
            <span className="font-medium">Demo Mode:</span> Changes won't be saved.
          </p>
        </div>
      </div>
    </div>
  )
}
