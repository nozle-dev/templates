import { Info } from 'lucide-react'

export function DemoNotice() {
  return (
    <div className="border-b bg-blue-50 dark:bg-blue-950/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3 text-sm">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <p className="text-blue-900 dark:text-blue-100">
            <strong>Demo Mode:</strong> Changes won't be saved.
          </p>
        </div>
      </div>
    </div>
  )
}
