'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, FolderKanban, Users, BarChart3, Settings, CreditCard } from 'lucide-react'
import { UserMenu } from '@/components/user-menu'
import { DemoNotice } from '@/components/demo-notice'
import { GithubLink } from '@/components/github-link'
import { ThemeToggle } from '@/components/theme-toggle'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  ]

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Demo Notice Banner - Hidden for cleaner demo experience */}
      {/* <DemoNotice /> */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed, no scroll */}
        <aside className="flex w-64 flex-col border-r bg-card">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image src={`${basePath}/nozle-logo.svg`} alt="Nozle" width={100} height={35} className="h-7 w-auto" unoptimized />
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
