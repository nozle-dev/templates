// Mock data generators for demo mode when backend is unreachable

export function generateMockUsageData(days: number = 30) {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split('T')[0],
      usage: Math.floor(Math.random() * 5000) + 1000,
      cost: Math.floor(Math.random() * 100) + 20,
    })
  }

  return data
}

export function generateMockApiKeys() {
  return [
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_••••••••••••••••1234',
      created: new Date('2026-01-15'),
      lastUsed: new Date(),
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'sk_test_••••••••••••••••5678',
      created: new Date('2026-02-01'),
      lastUsed: new Date(Date.now() - 86400000 * 3),
    },
  ]
}

export function generateMockLogs(count: number = 50) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE']
  const endpoints = ['/api/users', '/api/products', '/api/orders', '/api/analytics']
  const statuses = [200, 201, 400, 401, 404, 500]

  const logs = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    logs.push({
      id: `log_${i}`,
      timestamp: new Date(now - i * 60000),
      method: methods[Math.floor(Math.random() * methods.length)],
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      latency: Math.floor(Math.random() * 500) + 50,
    })
  }

  return logs
}
