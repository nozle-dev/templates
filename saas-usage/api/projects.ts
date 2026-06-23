// Example API service layer for Projects
// Demonstrates dual-mode pattern: demo mode vs database mode

import { isDemoMode, query } from '../lib/db'
import { DemoStore } from '../constants/demo-data'

export interface Project {
  id: string
  name: string
  description: string | null
  status: string
  tasks: number
  members: number
  createdAt: Date
  updatedAt: Date
}

export async function getProjects(userId: string): Promise<Project[]> {
  if (isDemoMode()) {
    // Demo mode: return from in-memory store
    return DemoStore.get('projects')
  }

  // DB mode: query PostgreSQL
  const result = await query(
    'SELECT id, name, description, status, tasks, members, created_at, updated_at FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    tasks: row.tasks,
    members: row.members,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }))
}

export async function getProject(projectId: string, userId: string): Promise<Project | null> {
  if (isDemoMode()) {
    const projects = DemoStore.get('projects')
    return projects.find((p) => p.id === projectId) || null
  }

  const result = await query(
    'SELECT id, name, description, status, tasks, members, created_at, updated_at FROM projects WHERE id = $1 AND user_id = $2',
    [projectId, userId]
  )

  if (result.rows.length === 0) {
    return null
  }

  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    tasks: row.tasks,
    members: row.members,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

export async function createProject(
  userId: string,
  data: { name: string; description?: string }
): Promise<Project> {
  if (isDemoMode()) {
    const project: Project = {
      id: `demo_${Date.now()}`,
      name: data.name,
      description: data.description || null,
      status: 'active',
      tasks: 0,
      members: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    DemoStore.add('projects', project)
    return project
  }

  const result = await query(
    'INSERT INTO projects (user_id, name, description) VALUES ($1, $2, $3) RETURNING id, name, description, status, tasks, members, created_at, updated_at',
    [userId, data.name, data.description || null]
  )

  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    tasks: row.tasks,
    members: row.members,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

export async function updateProject(
  projectId: string,
  userId: string,
  data: Partial<Pick<Project, 'name' | 'description' | 'status'>>
): Promise<Project | null> {
  if (isDemoMode()) {
    const updated = DemoStore.update('projects', projectId, {
      ...data,
      updatedAt: new Date(),
    })
    return updated
  }

  const fields = []
  const values = []
  let paramIndex = 1

  if (data.name !== undefined) {
    fields.push(`name = $${paramIndex++}`)
    values.push(data.name)
  }
  if (data.description !== undefined) {
    fields.push(`description = $${paramIndex++}`)
    values.push(data.description)
  }
  if (data.status !== undefined) {
    fields.push(`status = $${paramIndex++}`)
    values.push(data.status)
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`)
  values.push(projectId, userId)

  const result = await query(
    `UPDATE projects SET ${fields.join(', ')} WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1} RETURNING id, name, description, status, tasks, members, created_at, updated_at`,
    values
  )

  if (result.rows.length === 0) {
    return null
  }

  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    tasks: row.tasks,
    members: row.members,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }
}

export async function deleteProject(projectId: string, userId: string): Promise<boolean> {
  if (isDemoMode()) {
    return DemoStore.delete('projects', projectId)
  }

  const result = await query(
    'DELETE FROM projects WHERE id = $1 AND user_id = $2',
    [projectId, userId]
  )

  return result.rowCount > 0
}
