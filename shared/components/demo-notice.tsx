'use client'

import { Info, Github } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function DemoNotice() {
  const [githubUrl, setGithubUrl] = useState('#')

  useEffect(() => {
    setGithubUrl(process.env.NEXT_PUBLIC_GITHUB_REPO_URL || '#')
  }, [])

  return (
    <div className="border-b border-border bg-primary-soft/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">
                Demo Simulation of Nozle Integration
              </p>
              <p className="text-xs text-muted">
                This showcases how the Nozle SDK works. All data is mocked for demonstration.
              </p>
            </div>
          </div>
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-1.5 text-sm font-medium text-ink hover:bg-surface-soft transition-colors"
          >
            <Github className="h-4 w-4" />
            View Code on GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}
