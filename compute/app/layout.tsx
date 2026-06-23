import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Providers } from '@/components/providers'
import { DemoBanner } from '@/components/demo-banner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Team Workspace',
  description: 'Modern SaaS workspace for teams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <DemoBanner />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
