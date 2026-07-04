import { Github } from 'lucide-react'
import Link from 'next/link'

interface GithubLinkProps {
  className?: string
}

export function GithubLink({ className = '' }: GithubLinkProps) {
  return (
    <Link
      href="https://github.com/nozle-dev/create-nozle-app/tree/main/compute"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ${className}`}
    >
      <Github className="h-4 w-4" />
      View on GitHub
    </Link>
  )
}
