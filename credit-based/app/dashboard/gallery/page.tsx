'use client'

import { useState, useEffect } from 'react'
import { Image, FileText, Video, Music, Code, Palette, Download, ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface GalleryItem {
  id: string
  type: 'image' | 'text' | 'video' | 'audio' | 'review' | 'palette'
  title: string
  action: string
  cost: number
  output: any
  createdAt: Date
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch gallery items
    // In production, this would call /api/gallery

    // Mock data for demo
    const mockItems: GalleryItem[] = [
      {
        id: '1',
        type: 'image',
        title: 'Abstract Digital Art',
        action: 'generate-image',
        cost: 10,
        output: { url: 'https://picsum.photos/seed/1/400/300' },
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: '2',
        type: 'text',
        title: 'Blog Post Analysis',
        action: 'analyze-text',
        cost: 5,
        output: {
          sentiment: 'positive',
          keywords: ['innovation', 'technology', 'future'],
          wordCount: 247,
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: '3',
        type: 'video',
        title: 'Product Demo Video',
        action: 'create-video',
        cost: 50,
        output: { duration: '15s', resolution: '1080p' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
      },
      {
        id: '4',
        type: 'audio',
        title: 'Ambient Background Track',
        action: 'generate-music',
        cost: 25,
        output: { duration: '30s', genre: 'ambient' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        id: '5',
        type: 'palette',
        title: 'Brand Color Scheme',
        action: 'color-palette',
        cost: 3,
        output: {
          colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
        },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      },
      {
        id: '6',
        type: 'image',
        title: 'Landscape Photo',
        action: 'generate-image',
        cost: 10,
        output: { url: 'https://picsum.photos/seed/2/400/300' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      },
    ]

    setTimeout(() => {
      setItems(mockItems)
      setLoading(false)
    }, 500)
  }, [])

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.type === filter)

  const filters = [
    { value: 'all', label: 'All', count: items.length },
    { value: 'image', label: 'Images', count: items.filter(i => i.type === 'image').length },
    { value: 'text', label: 'Text', count: items.filter(i => i.type === 'text').length },
    { value: 'video', label: 'Videos', count: items.filter(i => i.type === 'video').length },
    { value: 'audio', label: 'Audio', count: items.filter(i => i.type === 'audio').length },
    { value: 'palette', label: 'Palettes', count: items.filter(i => i.type === 'palette').length },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return Image
      case 'text': return FileText
      case 'video': return Video
      case 'audio': return Music
      case 'review': return Code
      case 'palette': return Palette
      default: return FileText
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="mt-1 text-muted-foreground">
          View and manage your creations
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-lg border p-12 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted" />
          <p className="mt-4 text-muted-foreground">
            No {filter === 'all' ? '' : filter} items yet
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const Icon = getIcon(item.type)
            return (
              <div
                key={item.id}
                className="group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
              >
                {/* Preview */}
                <div className="relative aspect-video bg-muted">
                  {item.type === 'image' && item.output.url ? (
                    <img
                      src={item.output.url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : item.type === 'palette' && item.output.colors ? (
                    <div className="flex h-full">
                      {item.output.colors.map((color: string) => (
                        <div
                          key={color}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Icon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded-full bg-white p-2 text-black hover:bg-white/90">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="rounded-full bg-white p-2 text-black hover:bg-white/90">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item.cost} credits</span>
                    <span>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
