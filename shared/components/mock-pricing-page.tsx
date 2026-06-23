/**
 * DEMO MODE - Reusable Mock Pricing Page Component
 *
 * In production with real Nozle integration:
 * import { PricingTable } from '@nozle-js/react'
 * <PricingTable customerId={customerId} currentPlanCode={currentPlan} />
 */

'use client'

import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

interface Plan {
  code: string
  name: string
  price: string
  description: string
  features: string[]
  current?: boolean
  popular?: boolean
}

interface MockPricingPageProps {
  plans: Plan[]
  backHref?: string
  backLabel?: string
}

export function MockPricingPage({
  plans,
  backHref = '/dashboard',
  backLabel = 'Back to Dashboard',
}: MockPricingPageProps) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="container mx-auto px-4 py-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-body hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-display-lg text-ink mb-4">Simple, transparent pricing</h1>
            <p className="text-body-lg text-muted">
              Choose the plan that&apos;s right for your team
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
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
                    {plan.price !== 'Custom' && !plan.price.includes('per') && (
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
                    In production: This would open Nozle checkout
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
