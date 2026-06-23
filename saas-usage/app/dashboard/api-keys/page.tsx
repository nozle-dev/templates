'use client'

/**
 * PRODUCTION: Use FeatureGate to restrict API access by plan
 *
 * import { FeatureGate, UpgradePrompt } from '@nozle-js/react'
 *
 * <FeatureGate customerId={user.id} feature="api_access" fallback={<UpgradePrompt />}>
 *   <ApiKeysContent />
 * </FeatureGate>
 */

import { Lock } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export default function ApiKeysPage() {
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
        <h2 className="text-2xl font-bold">API Access Required</h2>
        <p className="mt-2 text-muted-foreground">
          Upgrade to a paid plan to access API keys and integrate with your applications
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
