'use client'

import { Plus, Search } from 'lucide-react'
import Link from 'next/link'

export default function ProjectsPage() {
  const projects = [
    { id: '1', name: 'Website Redesign', description: 'Complete redesign of company website', tasks: 12, status: 'In Progress' },
    { id: '2', name: 'Mobile App', description: 'iOS and Android mobile application', tasks: 8, status: 'In Progress' },
    { id: '3', name: 'Marketing Campaign', description: 'Q4 marketing initiatives', tasks: 5, status: 'Planning' },
    { id: '4', name: 'API Integration', description: 'Third-party API integrations', tasks: 15, status: 'In Progress' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-muted-foreground">Manage and organize your team&apos;s work</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Project List */}
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="rounded-lg border p-6 hover:bg-accent"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold">{project.name}</h3>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                {project.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
            <div className="mt-4 text-sm text-muted-foreground">{project.tasks} tasks</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
