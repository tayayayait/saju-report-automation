import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

export interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  originalContent: string
  newContent: string
  onAccept?: () => void
  onReject?: () => void
}

// A simple diff viewer component. In a real-world scenario, you might use a library like 'diff' to compute differences.
export function DiffViewer({ originalContent, newContent, onAccept, onReject, className, ...props }: DiffViewerProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-6 relative", className)} {...props}>
      {/* Original Panel */}
      <div className="flex flex-col h-full border border-border rounded-md overflow-hidden">
        <div className="bg-surface-secondary px-4 py-2 border-b border-border text-body-sm font-semibold text-text-secondary">
          기존 초안
        </div>
        <div className="p-4 overflow-y-auto flex-1 text-body-lg whitespace-pre-wrap bg-red-50/30 text-red-900/80">
          {originalContent}
        </div>
      </div>

      {/* Action Divider overlay */}
      {(onAccept || onReject) && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          <button
            title="새로 생성된 내용 채택"
            onClick={onAccept}
            className="w-8 h-8 rounded-full bg-success text-white shadow-md flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            title="기존 내용 유지 (거절)"
            onClick={onReject}
            className="w-8 h-8 rounded-full bg-surface-secondary text-muted-foreground border border-border shadow-md flex items-center justify-center hover:scale-105 transition-transform hover:bg-destructive-soft hover:text-destructive hover:border-destructive"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* New Panel */}
      <div className="flex flex-col h-full border border-border rounded-md overflow-hidden">
        <div className="bg-surface-secondary px-4 py-2 border-b border-border text-body-sm font-semibold text-text-secondary">
          새로 생성된 초안
        </div>
        <div className="p-4 overflow-y-auto flex-1 text-body-lg whitespace-pre-wrap bg-green-50/30 text-green-900/90">
          {newContent}
        </div>
      </div>
    </div>
  )
}
