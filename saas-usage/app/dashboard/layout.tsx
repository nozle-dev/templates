'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Key, FileText, BarChart3, Users, Settings, CreditCard } from 'lucide-react'
import { UserMenu } from '@/components/user-menu'
import { DemoNotice } from '@/components/demo-notice'
import { GithubLink } from '@/components/github-link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { name: 'Usage', href: '/dashboard/usage', icon: BarChart3 },
    { name: 'Logs', href: '/dashboard/logs', icon: FileText },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  ]

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Demo Notice Banner */}
      <DemoNotice />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed, no scroll */}
        <aside className="flex w-64 flex-col border-r bg-card">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="text-lg font-bold hover:text-primary transition-colors">
              API Platform
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer - Fixed at bottom */}
          <div className="border-t bg-muted/30 p-4 space-y-3">
            <div className="flex flex-col gap-3">
              <ThemeToggle />
              <GithubLink className="w-full justify-center" />
            </div>
            <UserMenu />
          </div>
        </aside>

        {/* Main content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
