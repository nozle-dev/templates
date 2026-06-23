// Demo data constants - used when DEMO_MODE=true
// This allows templates to work without a database

export const DEMO_PROJECTS = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    status: 'in_progress',
    tasks: 12,
    members: 4,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'iOS and Android mobile application',
    status: 'in_progress',
    tasks: 8,
    members: 3,
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Q4 marketing initiatives',
    status: 'planning',
    tasks: 5,
    members: 2,
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date(),
  },
]

export const DEMO_API_KEYS = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_live_••••••••••••••••1234',
    fullKey: 'sk_live_demo_key_12345678901234567890',
    created: new Date('2026-01-15'),
    lastUsed: new Date(),
  },
  {
    id: '2',
    name: 'Development Key',
    key: 'sk_test_••••••••••••••••5678',
    fullKey: 'sk_test_demo_key_09876543210987654321',
    created: new Date('2026-02-01'),
    lastUsed: new Date(Date.now() - 86400000 * 3),
  },
]

export const DEMO_TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'owner',
    avatar: 'A',
    joinedAt: new Date('2026-01-01'),
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'admin',
    avatar: 'B',
    joinedAt: new Date('2026-01-15'),
  },
  {
    id: '3',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'member',
    avatar: 'C',
    joinedAt: new Date('2026-02-01'),
  },
]

export const DEMO_INSTANCES = [
  {
    id: '1',
    name: 'web-prod-1',
    type: 'c5.large',
    region: 'us-east-1',
    status: 'running',
    uptime: '12d 3h',
    createdAt: new Date('2026-01-01'),
  },
  {
    id: '2',
    name: 'api-prod-1',
    type: 'c5.xlarge',
    region: 'us-west-2',
    status: 'running',
    uptime: '8d 14h',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: '3',
    name: 'gpu-worker-1',
    type: 'p3.2xlarge',
    region: 'us-east-1',
    status: 'stopped',
    uptime: '-',
    createdAt: new Date('2026-02-01'),
  },
]

export const DEMO_CREDIT_ACTIONS = [
  {
    id: '1',
    name: 'Generate Image',
    description: 'AI-powered image generation',
    cost: 10,
    category: 'image',
  },
  {
    id: '2',
    name: 'Analyze Text',
    description: 'Extract insights from text',
    cost: 5,
    category: 'text',
  },
  {
    id: '3',
    name: 'Create Video',
    description: 'Generate short videos',
    cost: 50,
    category: 'video',
  },
  {
    id: '4',
    name: 'Generate Music',
    description: 'AI music composition',
    cost: 25,
    category: 'audio',
  },
]

// Local in-memory store for demo mode CRUD operations
// This simulates database persistence during the session
export class DemoStore {
  private static stores: Map<string, any[]> = new Map()

  static get(key: string): any[] {
    if (!this.stores.has(key)) {
      // Initialize with demo data
      switch (key) {
        case 'projects':
          this.stores.set(key, [...DEMO_PROJECTS])
          break
        case 'api_keys':
          this.stores.set(key, [...DEMO_API_KEYS])
          break
        case 'team_members':
          this.stores.set(key, [...DEMO_TEAM_MEMBERS])
          break
        case 'instances':
          this.stores.set(key, [...DEMO_INSTANCES])
          break
        case 'credit_actions':
          this.stores.set(key, [...DEMO_CREDIT_ACTIONS])
          break
        default:
          this.stores.set(key, [])
      }
    }
    return this.stores.get(key)!
  }

  static set(key: string, data: any[]) {
    this.stores.set(key, data)
  }

  static add(key: string, item: any) {
    const items = this.get(key)
    items.push(item)
    this.set(key, items)
    return item
  }

  static update(key: string, id: string, updates: any) {
    const items = this.get(key)
    const index = items.findIndex((item) => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      this.set(key, items)
      return items[index]
    }
    return null
  }

  static delete(key: string, id: string) {
    const items = this.get(key)
    const filtered = items.filter((item) => item.id !== id)
    this.set(key, filtered)
    return filtered.length < items.length
  }
}
