import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

type PageThumbnailStatus = "normal" | "modified" | "error"

interface PageThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  pageNumber: number
  status?: PageThumbnailStatus
  isActive?: boolean
  onClick?: () => void
}

export function PageThumbnail({
  pageNumber,
  status = "normal",
  isActive = false,
  onClick,
  className,
  ...props
}: PageThumbnailProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-2 cursor-pointer transition-all duration-160",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-[96px] h-[136px] bg-white border shadow-sm rounded-sm flex items-center justify-center p-2 relative overflow-hidden group",
          isActive ? "border-primary border-2 shadow-md ring-2 ring-primary/20" : "border-border hover:border-border-strong hover:shadow-md"
        )}
      >
        <div className="text-muted-foreground/30 text-heading-lg font-bold group-hover:text-muted-foreground/50 transition-colors">
          {pageNumber}
        </div>
        
        {/* Placeholder lines for visual effect */}
        <div className="absolute inset-4 flex flex-col gap-1 opacity-20 pointer-events-none">
          <div className="w-1/2 h-1 bg-current rounded-full mb-1" />
          <div className="w-full h-1 bg-current rounded-full" />
          <div className="w-full h-1 bg-current rounded-full" />
          <div className="w-3/4 h-1 bg-current rounded-full" />
        </div>

        {/* Status Badges */}
        {status === "modified" && (
          <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-warning rounded-full border border-white shadow-xs" title="수정됨" />
        )}
        {status === "error" && (
          <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-destructive rounded-full border border-white shadow-xs flex items-center justify-center" title="오류">
            <AlertTriangle className="w-[8px] h-[8px] text-white" />
          </div>
        )}
      </div>

      <div className="text-caption font-medium text-text-secondary">
        Page {pageNumber}
      </div>
    </div>
  )
}
