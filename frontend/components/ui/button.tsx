import * as React from "react"
import { cn } from "../../lib/utils";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm",
          variant === "default" && "bg-pink-500 text-white hover:bg-pink-600",
          variant === "outline" && "border border-pink-500 text-pink-500 hover:bg-pink-50",
          variant === "ghost" && "text-pink-500 hover:bg-pink-100",
          size === "default" && "px-4 py-2 text-sm",
          size === "sm" && "px-3 py-1 text-xs",
          size === "lg" && "px-6 py-3 text-base",
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
