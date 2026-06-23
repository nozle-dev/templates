# Nozle Templates

**Production-ready Next.js templates showcasing Nozle SDK integration for different billing models.**

Learn how to integrate billing into your SaaS by exploring fully-functional demo applications. Each template demonstrates best practices for a specific billing pattern — from simple subscriptions to complex usage-based models.

---

## 🎯 What is This?

**Nozle Templates** is a collection of **4 standalone Next.js applications**, each demonstrating how to implement a different billing model using the [Nozle SDK](https://github.com/nozle-dev/nozle-js).

### Purpose

- **Learning Resource:** See real-world implementations of Nozle SDK
- **Starting Point:** Use as boilerplate for your own SaaS
- **Reference:** Copy patterns and components into existing projects
- **Demo Showcase:** Explore billing UIs before building your own

### Key Features

✅ **Working Demos** - Run locally with zero configuration  
✅ **Production Patterns** - Real UI components and API routes  
✅ **Demo Mode** - No API keys or database required  
✅ **Fully Documented** - Inline comments explain every integration  
✅ **Type-Safe** - Full TypeScript with proper types  
✅ **Modern Stack** - Next.js 16, React 19, Tailwind CSS 4

---

## 📦 Available Templates

### 1. **flat-subscription** - Tiered Subscription Plans
**Best for:** SaaS products with feature-based tiers

- Fixed monthly/annual pricing (Free, Pro, Enterprise)
- Plan-based feature gating
- User seat limits
- Usage quotas per plan
- **Examples:** Notion, Linear, Slack, GitHub

**Key SDK Components:**
- `<PlanGate>` - Show/hide features by plan
- `<FeatureGate>` - Check entitlements
- `<PricingTable>` - Display plans

---

### 2. **saas-usage** - Base Subscription + Metered Usage
**Best for:** API platforms and services with variable usage

- Base subscription fee
- Metered usage (API calls, tokens, requests)
- Overage billing
- Usage dashboards and alerts
- **Examples:** Stripe, Twilio, SendGrid, Cloudflare

**Key SDK Components:**
- `nozle.meter()` - Track usage events
- `<UsageDashboard>` - Show consumption
- `nozle.track()` - Log billable actions

---

### 3. **compute** - Graduated Pricing Tiers
**Best for:** Infrastructure and compute services

- Tiered pricing (volume discounts)
- Pay-as-you-go compute hours
- Real-time usage tracking
- Cost forecasting
- **Examples:** Vercel, Railway, AWS Lambda, Render

**Key SDK Components:**
- Graduated pricing configuration
- `nozle.meter()` with tier breaks
- Cost estimation UI

---

### 4. **credit-based** - Prepaid Credit Marketplace
**Best for:** Creative tools and action-based platforms

- Buy credit packs upfront
- Spend credits per action
- Atomic balance deduction
- Action marketplace
- Credit history and refills
- **Examples:** Canva, Midjourney, Replicate, RunwayML

**Key SDK Components:**
- `nozle.checkAndDeduct()` - Atomic credit spend
- Credit balance tracking
- Transaction history

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org))
- **pnpm** 8+ (Install: `npm install -g pnpm`)
- **Git** (for cloning)

### Option 1: Run One Template

```bash
# Clone the repository
git clone https://github.com/nozle-dev/templates.git
cd templates

# Choose a template and run it
cd flat-subscription

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo Login:**
- Email: `demo@example.com`
- Password: `demo123`

### Option 2: Install All Templates (Development)

```bash
# Clone repository
git clone https://github.com/nozle-dev/templates.git
cd templates

# Install all dependencies
pnpm install

# Run specific template
pnpm dev:flat          # flat-subscription on port 3000
pnpm dev:saas          # saas-usage on port 3001
pnpm dev:compute       # compute on port 3002
pnpm dev:credits       # credit-based on port 3003
```

### Option 3: Use with create-nozle-app

The easiest way to start a new project:

```bash
npx create-nozle-app my-app
```

Interactive CLI will let you choose a template and scaffold a new project.

---

## 📂 Repository Structure

```
nozle-templates/
├── flat-subscription/     ✅ Standalone Next.js app
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/               # Nozle SDK client
│   ├── public/            # Static assets
│   └── package.json       # Dependencies
│
├── saas-usage/            ✅ Standalone Next.js app
├── compute/               ✅ Standalone Next.js app
├── credit-based/          ✅ Standalone Next.js app
│
├── shared/                ⚠️  Development only
│   ├── lib/               # Common utilities (synced to templates)
│   ├── styles/            # Global CSS (synced to templates)
│   └── config/            # Shared configs (synced to templates)
│
├── scripts/
│   └── sync-shared.sh     # Copies shared/ into each template
│
├── docker-compose.yml     # Run all templates together
└── Dockerfile             # Container build config
```

**Important:** Each template is **100% self-contained**. The `shared/` directory is for development convenience only — its contents are copied into each template so they remain standalone.

---

## 🔧 Tech Stack

All templates use the same modern stack:

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | Component library |
| **@nozle-js/react** | Client-side SDK (hooks, components) |
| **@nozle-js/node** | Server-side SDK (API routes) |
| **Recharts** | Usage charts and analytics |
| **lucide-react** | Icon library |

---

## 🎨 Design System

All templates share a unified design language:

- **Colors:** Nozle Violet (`#6366f1`) as primary, semantic colors for states
- **Typography:** Inter font family, clean hierarchy
- **Spacing:** Generous whitespace, Airbnb-inspired aesthetic
- **Components:** Buttons, cards, badges, forms, tables (from shadcn/ui)
- **Dark Mode:** Full support with next-themes

---

## ⚙️ Configuration & Environment

### Demo Mode (Default)

Templates work **out of the box** with zero configuration:

```bash
# No .env.local needed!
pnpm dev
```

- Uses mock data
- No database required
- No API keys needed
- Perfect for learning

### Production Mode

To connect to real Nozle billing:

1. **Get API keys** from [Nozle Dashboard](https://app.nozle.dev)

2. **Create `.env.local`** in the template directory:

```bash
# Nozle API Keys
NOZLE_API_KEY=sk_live_your_secret_key
NEXT_PUBLIC_NOZLE_PUBLIC_KEY=pk_live_your_public_key

# Optional: Stripe integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Demo mode toggle
NEXT_PUBLIC_DEMO_MODE=false
```

3. **Configure plans** in Nozle Dashboard

4. **Restart dev server**

---

## 🛠️ Development

### Running Templates Locally

```bash
# Install dependencies
pnpm install

# Run a specific template
pnpm dev:flat          # Port 3000
pnpm dev:saas          # Port 3001
pnpm dev:compute       # Port 3002
pnpm dev:credits       # Port 3003

# Build all templates
pnpm build

# Type-check all templates
pnpm typecheck

# Lint all templates
pnpm lint
```

### Modifying Templates

Each template is **independent** — changes in one don't affect others.

**To modify shared code:**

1. Edit files in `shared/` directory
2. Run `./scripts/sync-shared.sh` to copy changes to all templates
3. This keeps templates standalone while avoiding duplication during development

### Running with Docker

```bash
# Build and run all 4 templates
docker-compose up

# Access templates
# http://localhost:3000 - flat-subscription
# http://localhost:3001 - saas-usage
# http://localhost:3002 - compute
# http://localhost:3003 - credit-based
```

---

## 📚 What Each Template Shows

### Common Features (All Templates)

✅ Authentication flow (demo mode)  
✅ Protected routes  
✅ Dashboard with usage/billing info  
✅ Pricing page  
✅ Billing portal  
✅ API route patterns  
✅ Error handling  
✅ Loading states  
✅ Responsive design

### Template-Specific Features

| Template | Unique Features |
|----------|----------------|
| **flat-subscription** | Plan comparison, upgrade/downgrade flows, feature gates, seat management |
| **saas-usage** | Usage meters, overage alerts, usage history, real-time tracking |
| **compute** | Tiered pricing calculator, cost forecasting, compute hour tracking |
| **credit-based** | Credit marketplace, pack purchasing, atomic deduction, transaction history |

---

## 🎓 Learning Path

**New to Nozle?** Follow this order:

1. **Start with flat-subscription** - Simplest billing model
2. **Explore saas-usage** - Adds metered usage concept
3. **Check compute** - Advanced tiered pricing
4. **Study credit-based** - Complex credit mechanics

**Key Files to Review:**

```
app/
├── pricing/page.tsx       # How to display plans
├── dashboard/
│   └── billing/page.tsx   # Billing management UI
└── api/
    ├── track/route.ts     # Usage tracking endpoint
    ├── checkout/route.ts  # Subscription checkout
    └── can/route.ts       # Feature gate checks

lib/
└── nozle-client.ts        # SDK initialization
```

---

## 🚢 Deployment

Templates are production-ready and can deploy to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting**
- **Docker containers**

### Deploy Checklist

- [ ] Set production environment variables
- [ ] Configure Nozle API keys (production mode)
- [ ] Set up database (if using persistent data)
- [ ] Add authentication (Clerk, Auth0, NextAuth)
- [ ] Configure domain
- [ ] Test checkout flows
- [ ] Monitor usage tracking

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies won't install:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Hydration errors:**
```bash
# Restart dev server
# Ctrl+C, then pnpm dev
```

**Can't login in demo mode:**
Check that you're using:
- Email: `demo@example.com`
- Password: `demo123`

For more help, see [QUICK-START.md](./QUICK-START.md)

---

## 🤝 Contributing

We welcome contributions! Feel free to:

- Report bugs via [GitHub Issues](https://github.com/nozle-dev/templates/issues)
- Suggest new templates or features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License - feel free to use these templates in your projects.

---

## 🔗 Links

- **Nozle SDK:** [github.com/nozle-dev/nozle-js](https://github.com/nozle-dev/nozle-js)
- **Documentation:** [docs.nozle.dev](https://docs.nozle.dev)
- **Dashboard:** [app.nozle.dev](https://app.nozle.dev)
- **create-nozle-app:** `npx create-nozle-app`

---

**Questions?** Open an issue or check the [Nozle Docs](https://docs.nozle.dev)

**Built with ❤️ for developers building billing into their SaaS**
