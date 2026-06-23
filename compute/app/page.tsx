import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold">Workspace</div>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm hover:underline">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Your team&apos;s workspace
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Collaborate, organize, and build together. Everything your team needs in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium hover:bg-accent"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/40 py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-3xl font-bold">Everything you need</h2>
              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {[
                  { title: 'Project Management', desc: 'Organize work into projects and tasks' },
                  { title: 'Team Collaboration', desc: 'Invite members and work together' },
                  { title: 'Analytics', desc: 'Track progress with detailed insights' },
                  { title: 'Integrations', desc: 'Connect your favorite tools' },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 Workspace. Built with Nozle.
        </div>
      </footer>
    </div>
  )
}
