import * as React from "react"
import { cn } from "@/lib/utils"

export interface ActivityLogData {
  id: string
  time: string
  user: string
  action: string
  result?: "success" | "error" | "warning" | "info"
  details?: string
}

interface ActivityTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  logs: ActivityLogData[]
  onLogClick?: (log: ActivityLogData) => void
}

export function ActivityTimeline({ logs, onLogClick, className, ...props }: ActivityTimelineProps) {
  return (
    <div className={cn("flex flex-col relative", className)} {...props}>
      <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border" />
      {logs.map((log) => {
        let dotColor = "bg-border"
        if (log.result === "success") dotColor = "bg-success"
        if (log.result === "error") dotColor = "bg-destructive"
        if (log.result === "warning") dotColor = "bg-warning"
        if (log.result === "info") dotColor = "bg-info"

        return (
          <div
            key={log.id}
            className="flex items-center h-[36px] group cursor-pointer hover:bg-slate-50 relative z-10 px-2 rounded-xs transition-colors"
            onClick={() => onLogClick?.(log)}
          >
            <div className={cn("w-[10px] h-[10px] rounded-full shrink-0 mr-4 z-10 ring-4 ring-background shadow-sm", dotColor)} />
            <div className="flex flex-1 items-center gap-3 text-body-sm min-w-0">
              <span className="text-muted-foreground shrink-0 w-[50px]">{log.time}</span>
              <span className="font-semibold text-foreground shrink-0 w-[80px] truncate">{log.user}</span>
              <span className="text-foreground truncate flex-1">{log.action}</span>
              {log.result === "error" && (
                <span className="text-destructive text-caption bg-destructive-soft px-2 py-0.5 rounded-full shrink-0">
                  실패
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
