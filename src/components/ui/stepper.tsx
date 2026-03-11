import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStepId: string;
}

export function Stepper({
  steps,
  currentStepId,
  className,
  ...props
}: StepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);

  return (
    <div
      className={cn("flex items-center w-full h-[64px] px-2", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <React.Fragment key={step.id}>
            {/* Step Item */}
            <div className="flex flex-col items-center justify-center relative min-w-[80px]">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 text-caption font-semibold z-10 bg-background",
                  isCompleted &&
                    "bg-primary border-primary text-primary-foreground",
                  isCurrent &&
                    "bg-primary border-primary text-primary-foreground",
                  isPending && "border-border text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  "absolute top-10 text-caption whitespace-nowrap",
                  isCompleted || isCurrent
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 bg-border relative top-[-10px]">
                <div
                  className="absolute inset-0 bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
