import * as React from "react"
import { cn } from "@/lib/utils"

interface PromptVariableTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  type?: "system" | "user"
}

export function PromptVariableTag({ name, type = "user", className, ...props }: PromptVariableTagProps) {
  const isSystem = type === "system"

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center h-[28px] px-3 font-mono text-caption rounded-full whitespace-nowrap",
        isSystem 
          ? "bg-muted text-muted-foreground border border-border" 
          : "bg-primary/10 text-primary border border-primary/20",
        className
      )}
      {...props}
    >
      {`{${name}}`}
    </span>
  )
}
