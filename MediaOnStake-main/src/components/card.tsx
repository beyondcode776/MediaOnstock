// src/components/card.tsx
import * as React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "filled";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-card text-card-foreground shadow",
      elevated: "bg-card text-card-foreground shadow-lg",
      outlined: "border bg-card/50 backdrop-blur",
      filled: "bg-primary/10 border border-primary/30",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";