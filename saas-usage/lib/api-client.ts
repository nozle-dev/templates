// API client helper that respects basePath
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export async function apiClient(path: string, options?: RequestInit) {
  const url = `${basePath}${path}`
  return fetch(url, options)
}

export { basePath }
