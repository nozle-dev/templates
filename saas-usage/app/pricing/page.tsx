'use client'

/**
 * ============================================================================
 * HOW TO USE NOZLE SDK FOR PRICING
 * ============================================================================
 *
 * PRODUCTION IMPLEMENTATION (uncomment the imports and replace the mock below):
 */
// import { PricingTable } from '@nozle-js/react'
/**
 * export default function PricingPage() {
 *   return (
 *     <PricingTable
 *       customerId={process.env.NEXT_PUBLIC_CUSTOMER_ID}
 *       currentPlanCode="starter"
 *     />
 *   )
 * }
 *
 * The SDK's PricingTable:
 * - Fetches your pricing tiers from Nozle
 * - Shows usage-based pricing clearly
 * - Handles checkout and payment
 * - Updates subscription automatically
 *
 * DEMO MODE: Mock UI below mimics SDK output
 */

import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

const mockPlans = [
  {
    code: 'starter',
    name: 'Starter',
    price: '$29',
    description: 'For small teams getting started',
    features: [
      '10,000 API requests/month',
      '100,000 tokens included',
      'Email support',
      'Basic analytics',
    ],
    current: true,
  },
  {
    code: 'pro',
    name: 'Pro',
    price: '$99',
    description: 'For growing businesses',
    features: [
      '100,000 API requests/month',
      '1M tokens included',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
    popular: true,
  },
  {
    code: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited API requests',
      'Unlimited tokens',
      'Dedicated support',
      'SLA guarantee',
      'Custom contracts',
    ],
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
            <h1 className="text-display-lg text-ink mb-4">Usage-based pricing</h1>
            <p className="text-body-lg text-muted">
              Pay only for what you use. Scale as you grow.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {mockPlans.map((plan) => (
              <div
                key={plan.code}
                className={`card relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge badge-primary px-4 py-1">Most Popular</span>
                  </div>
                )}

                {plan.current && (
                  <div className="absolute -top-4 right-4">
                    <span className="badge badge-success px-3 py-1">Current Plan</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-title-lg text-ink mb-2">{plan.name}</h3>
                  <p className="text-body-sm text-muted mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-display-md text-ink font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-body-md text-muted">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-body-md text-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full ${
                    plan.current
                      ? 'btn-secondary'
                      : plan.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current
                    ? 'Current Plan'
                    : plan.price === 'Custom'
                    ? 'Contact Sales'
                    : 'Upgrade to ' + plan.name}
                </button>

                {!plan.current && plan.price !== 'Custom' && (
                  <p className="text-caption text-muted text-center mt-4">
                    SDK handles checkout flow
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-body-md text-muted">
              Need help choosing?{' '}
              <a href="#" className="text-primary hover:underline">
                Contact our sales team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
