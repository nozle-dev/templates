'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/lib/auth-context'
import { LogOut, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Appearance */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Appearance</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Customize how the application looks on your device
          </p>
          <div className="mt-4">
            <label className="text-sm font-medium">Theme</label>
            <div className="mt-2">
              <ThemeToggle />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Choose between light, dark, or system theme. Your preference is saved locally.
            </p>
          </div>
        </div>

        {/* Profile */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Profile</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                defaultValue={user?.name || 'Demo User'}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue={user?.email || 'demo@nozle.app'}
                disabled
                className="mt-1 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Notifications</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose what notifications you want to receive
          </p>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Email notifications', desc: 'Receive updates via email' },
              { label: 'Task updates', desc: 'Get notified when tasks are updated' },
              { label: 'Team mentions', desc: 'Notifications when you are mentioned' },
            ].map((item) => (
              <label key={item.label} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Account Actions */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Account</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account and sign out
          </p>
          <div className="mt-4 space-y-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-6">
          <h3 className="font-semibold text-red-900 dark:text-red-100">Danger Zone</h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="mt-4 flex items-center gap-2 rounded-md border-2 border-red-600 dark:border-red-500 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition-colors">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
