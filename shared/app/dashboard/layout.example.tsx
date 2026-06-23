import Link from 'next/link'
import { Home, FolderKanban, Users, BarChart3, Settings, CreditCard } from 'lucide-react'
import { UserMenu } from '@/components/user-menu'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="text-lg font-bold">
            Workspace
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Menu at Bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <UserMenu />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  )
}
