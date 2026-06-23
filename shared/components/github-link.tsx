'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function GithubLink({ className = '' }: { className?: string }) {
  const [repoUrl, setRepoUrl] = useState('#')

  useEffect(() => {
    setRepoUrl(process.env.NEXT_PUBLIC_GITHUB_REPO_URL || 'https://github.com/nozle-app/nozle-templates')
  }, [])

  return (
    <Link
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors ${className}`}
      title="View source code on GitHub"
    >
      <Github className="h-4 w-4" />
      <span className="hidden sm:inline">View Code</span>
    </Link>
  )
}
