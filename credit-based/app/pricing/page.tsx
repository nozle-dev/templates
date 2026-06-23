'use client'

/**
 * ============================================================================
 * HOW TO USE NOZLE SDK FOR CREDIT-BASED PRICING
 * ============================================================================
 *
 * PRODUCTION IMPLEMENTATION:
 */
// import { PricingTable, CreditBalance } from '@nozle-js/react'
/**
 * export default function PricingPage() {
 *   return (
 *     <div>
 *       <CreditBalance customerId={customerId} />
 *       <PricingTable
 *         customerId={customerId}
 *         onSelect={(pack) => {
 *           // SDK handles checkout for credit packs
 *         }}
 *       />
 *     </div>
 *   )
 * }
 *
 * For credit-based pricing, Nozle SDK:
 * - Tracks credit balance in real-time
 * - Handles atomic credit deduction with checkAndDeduct()
 * - Processes credit pack purchases
 * - Prevents race conditions and double-spending
 *
 * DEMO MODE: Mock UI below shows credit packs
 */

import Link from 'next/link'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'

const creditPacks = [
  {
    id: 'pack_100',
    credits: 100,
    price: 9,
    description: 'Perfect for trying out',
    features: [
      '100 credits',
      'All action types',
      'No expiration',
      'Instant activation',
    ],
  },
  {
    id: 'pack_500',
    credits: 500,
    price: 39,
    description: 'Most popular for creators',
    features: [
      '500 credits',
      'All action types',
      'No expiration',
      'Instant activation',
      '20% bonus credits',
    ],
    popular: true,
    bonus: 100,
  },
  {
    id: 'pack_1000',
    credits: 1000,
    price: 69,
    description: 'Best value for power users',
    features: [
      '1000 credits',
      'All action types',
      'No expiration',
      'Instant activation',
      '30% bonus credits',
      'Priority support',
    ],
    bonus: 300,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-body hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-display-lg text-ink mb-4">Buy Credits</h1>
            <p className="text-body-lg text-muted">
              Purchase credit packs to power your creations. No subscriptions, no expiration.
            </p>
          </div>

          {/* Current Balance */}
          <div className="card max-w-md mx-auto mb-12 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-caption text-muted mb-2">Current Balance</p>
            <p className="text-display-lg text-ink font-bold mb-1">490</p>
            <p className="text-body-sm text-muted">credits available</p>
          </div>

          {/* Credit Packs */}
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {creditPacks.map((pack) => (
              <div
                key={pack.id}
                className={`card relative ${pack.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge badge-primary px-4 py-1">Most Popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-display-md text-ink font-bold">{pack.credits}</span>
                    <span className="text-body-lg text-muted">credits</span>
                  </div>
                  {pack.bonus && (
                    <div className="badge badge-success mb-3">+ {pack.bonus} bonus credits</div>
                  )}
                  <p className="text-body-sm text-muted mb-4">{pack.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-display-sm text-ink font-bold">${pack.price}</span>
                    <span className="text-body-sm text-muted">one-time</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-body-md text-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={pack.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  Buy {pack.credits} Credits
                </button>

                <p className="text-caption text-muted text-center mt-4">
                  SDK handles checkout flow
                </p>
              </div>
            ))}
          </div>

          {/* How Credits Work */}
          <div className="card max-w-3xl mx-auto bg-primary-soft/30 border-primary/20">
            <h3 className="text-title-lg text-ink mb-4">How Credits Work</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-title-sm text-ink mb-1">Generate Image</div>
                <div className="text-body-sm text-muted">10 credits per generation</div>
              </div>
              <div>
                <div className="text-title-sm text-ink mb-1">Analyze Content</div>
                <div className="text-body-sm text-muted">5 credits per analysis</div>
              </div>
              <div>
                <div className="text-title-sm text-ink mb-1">Transform</div>
                <div className="text-body-sm text-muted">15 credits per transformation</div>
              </div>
              <div>
                <div className="text-title-sm text-ink mb-1">Export HD</div>
                <div className="text-body-sm text-muted">20 credits per export</div>
              </div>
            </div>
            <p className="text-body-sm text-muted mt-6">
              Credits never expire. Use them whenever you're ready. Nozle SDK uses atomic{' '}
              <code className="bg-canvas px-1.5 py-0.5 rounded text-caption">checkAndDeduct()</code>{' '}
              to prevent race conditions.
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-body-md text-muted">
              Questions about credits?{' '}
              <a href="#" className="text-primary hover:underline">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
