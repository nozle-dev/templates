'use client'

/**
 * ============================================================================
 * HOW TO USE NOZLE SDK FOR BILLING
 * ============================================================================
 *
 * PRODUCTION IMPLEMENTATION:
 * ------------------------
 * import { BillingPortal, PricingTable } from '@nozle-js/react'
 *
 * export default function BillingPage() {
 *   return (
 *     <BillingPortal customerId={user.id}>
 *       <PricingTable
 *         customerId={user.id}
 *         currentPlanCode={user.planCode}
 *         showInBilling={true}
 *       />
 *     </BillingPortal>
 *   )
 * }
 *
 * The SDK components automatically:
 * - Show current subscription with all available plans
 * - Highlight the current plan
 * - Enable upgrade/downgrade buttons
 * - Display payment method
 * - Show invoice history with downloads
 * - Handle plan changes and checkout
 *
 * DEMO MODE BELOW:
 * ---------------
 * End-user billing page showing current plan + all available plans
 */

import { CreditCard, Download, Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    code: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      'Up to 3 team members',
      'Up to 5 projects',
      'Basic features',
      'Community support',
    ],
    current: true,
  },
  {
    code: 'pro',
    name: 'Pro',
    price: 29,
    description: 'For growing teams',
    features: [
      'Unlimited team members',
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    current: false,
    popular: true,
  },
  {
    code: 'enterprise',
    name: 'Enterprise',
    price: null,
    priceLabel: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'SLA guarantee',
      'Advanced security',
      'Custom contracts',
    ],
    current: false,
  },
]

const paymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expMonth: 12,
  expYear: 2027,
}

const invoices = [
  { id: 'inv_001', date: 'June 23, 2026', amount: 0, status: 'paid', plan: 'Free Plan' },
  { id: 'inv_002', date: 'May 23, 2026', amount: 0, status: 'paid', plan: 'Free Plan' },
  { id: 'inv_003', date: 'April 23, 2026', amount: 0, status: 'paid', plan: 'Free Plan' },
]

export default function BillingPage() {
  const currentPlan = plans.find((p) => p.current)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your plan, payment method, and invoices
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="rounded-lg border bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Current Plan</div>
            <div className="mt-1 flex items-baseline gap-2">
              <h2 className="text-2xl font-bold">{currentPlan?.name}</h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                <div className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                Active
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold">
                ${currentPlan?.price || 0}
              </span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Renews automatically on <span className="font-medium text-foreground">July 23, 2026</span>
            </p>
          </div>
        </div>
      </div>

      {/* All Available Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Upgrade or downgrade your plan anytime
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.code}
              className={`relative rounded-lg border bg-card p-6 transition-all ${
                plan.current
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:border-primary/50 hover:shadow-md'
              }`}
            >
              {plan.popular && !plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 right-4">
                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {plan.price !== null ? `$${plan.price}` : plan.priceLabel}
                  </span>
                  {plan.price !== null && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.current}
                className={`w-full rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                  plan.current
                    ? 'cursor-not-allowed bg-muted text-muted-foreground'
                    : plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border hover:bg-accent'
                }`}
              >
                {plan.current ? 'Current Plan' : plan.price !== null ? 'Upgrade' : 'Contact Sales'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Method */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="border-b p-4">
            <h3 className="font-semibold">Payment Method</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-600">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium">
                  {paymentMethod.brand} •••• {paymentMethod.last4}
                </div>
                <div className="text-sm text-muted-foreground">
                  Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
                </div>
              </div>
            </div>
            <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
              Update Payment Method
            </button>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="border-b p-4">
            <h3 className="font-semibold">Billing Summary</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Total Invoices</span>
              <span className="font-semibold">{invoices.length}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Total Spent</span>
              <span className="font-semibold">
                ${invoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Next Charge</span>
              <span className="font-semibold">${currentPlan?.price || 0}.00</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Billing Date</span>
              <span className="font-semibold">July 23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="border-b p-4">
          <h3 className="font-semibold">Invoice History</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Download your past invoices
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-sm">{invoice.date}</td>
                  <td className="px-4 py-3 text-sm">{invoice.plan}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                      <Check className="h-3 w-3" />
                      Paid
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm hover:bg-accent transition-colors"
                      title="Download invoice"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6">
        <h3 className="font-semibold text-red-900 dark:text-red-100">Cancel Subscription</h3>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
          Cancel your subscription and lose access to premium features. You can resubscribe anytime.
        </p>
        <button className="mt-4 rounded-md border-2 border-red-600 dark:border-red-500 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition-colors">
          Cancel Subscription
        </button>
      </div>
    </div>
  )
}
