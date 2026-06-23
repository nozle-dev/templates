'use client'

/**
 * ============================================================================
 * HOW TO USE NOZLE SDK FOR GRADUATED USAGE PRICING
 * ============================================================================
 *
 * PRODUCTION IMPLEMENTATION:
 */
// import { PricingTable, UsageMeter } from '@nozle-js/react'
/**
 * export default function PricingPage() {
 *   return (
 *     <div>
 *       <UsageMeter
 *         customerId={customerId}
 *         dimension="compute_hours"
 *         showTiers={true}
 *       />
 *       <PricingTable
 *         customerId={customerId}
 *         showGraduatedTiers={true}
 *       />
 *     </div>
 *   )
 * }
 *
 * For graduated usage pricing, Nozle SDK:
 * - Tracks usage by dimension (compute_hours, api_calls, etc.)
 * - Applies tiered pricing automatically
 * - Shows real-time cost breakdown
 * - Meters usage with nozle.meter()
 *
 * DEMO MODE: Mock UI below shows graduated tiers
 */

import Link from 'next/link'
import { ArrowLeft, Check, TrendingDown } from 'lucide-react'

const pricingTiers = [
  {
    name: 'First 100 Hours',
    range: '0-100 hours',
    price: '$0.50',
    unit: 'per hour',
    description: 'Perfect for development and testing',
  },
  {
    name: 'Next 900 Hours',
    range: '101-1,000 hours',
    price: '$0.35',
    unit: 'per hour',
    description: 'Growing applications and staging environments',
    popular: true,
  },
  {
    name: 'Over 1,000 Hours',
    range: '1,001+ hours',
    price: '$0.20',
    unit: 'per hour',
    description: 'Production scale with volume pricing',
  },
]

const instanceTypes = [
  {
    name: 'CPU Small',
    specs: '2 vCPU, 4GB RAM',
    features: ['2 CPU cores', '4GB memory', 'Standard SSD', 'Good for web apps'],
  },
  {
    name: 'CPU Medium',
    specs: '4 vCPU, 8GB RAM',
    features: ['4 CPU cores', '8GB memory', 'Fast SSD', 'Good for APIs'],
    popular: true,
  },
  {
    name: 'GPU Instance',
    specs: '8 vCPU, 32GB RAM, 1x GPU',
    features: ['8 CPU cores', '32GB memory', '1x NVIDIA GPU', 'ML & rendering'],
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
              Pay only for what you use. Volume discounts automatically applied.
            </p>
          </div>

          {/* Graduated Tiers */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="h-6 w-6 text-primary" />
              <h2 className="text-title-xl text-ink">Graduated Pricing Tiers</h2>
            </div>
            <p className="text-body-md text-muted mb-8">
              The more you use, the less you pay per hour. Tiers are applied automatically by Nozle SDK.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`card ${tier.popular ? 'ring-2 ring-primary' : ''}`}
                >
                  {tier.popular && (
                    <div className="badge badge-primary mb-4">Best Value</div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-title-lg text-ink mb-2">{tier.name}</h3>
                    <p className="text-body-sm text-muted mb-4">{tier.range}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-display-md text-primary font-bold">{tier.price}</span>
                      <span className="text-body-md text-muted">{tier.unit}</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-body">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Example */}
          <div className="card bg-primary-soft/30 border-primary/20 mb-12">
            <h3 className="text-title-lg text-ink mb-4">Example: 250 hours usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-body-md text-body">First 100 hours × $0.50</span>
                <span className="text-body-md text-ink font-semibold">$50.00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-body-md text-body">Next 150 hours × $0.35</span>
                <span className="text-body-md text-ink font-semibold">$52.50</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="text-title-md text-ink">Total</span>
                <span className="text-title-lg text-primary font-bold">$102.50</span>
              </div>
            </div>
            <p className="text-caption text-muted mt-4">
              Nozle SDK automatically calculates tiered pricing - you just meter usage with{' '}
              <code className="bg-canvas px-1.5 py-0.5 rounded">nozle.meter()</code>
            </p>
          </div>

          {/* Instance Types */}
          <div className="mb-12">
            <h2 className="text-title-xl text-ink mb-6">Instance Types</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {instanceTypes.map((instance) => (
                <div
                  key={instance.name}
                  className={`card ${instance.popular ? 'ring-2 ring-primary' : ''}`}
                >
                  {instance.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="badge badge-primary px-4 py-1">Most Popular</span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-title-lg text-ink mb-2">{instance.name}</h3>
                    <p className="text-body-sm text-muted">{instance.specs}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {instance.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-success shrink-0 mt-1" />
                        <span className="text-body-sm text-body">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="btn-secondary w-full">Create Instance</button>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="card max-w-3xl mx-auto">
            <h3 className="text-title-lg text-ink mb-4">How Usage Tracking Works</h3>
            <ol className="space-y-3 text-body-md text-body">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>Create and start instances through the dashboard</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>Nozle SDK automatically meters compute hours while instances run</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>Graduated pricing applies automatically - no manual calculation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>View real-time usage and costs in the dashboard</span>
              </li>
            </ol>
          </div>

          <div className="mt-12 text-center">
            <p className="text-body-md text-muted">
              Questions about pricing?{' '}
              <a href="#" className="text-primary hover:underline">
                Contact sales
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
