import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconWrapperProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "muted";
  className?: string;
}

export function IconWrapper({
  icon: IconComponent,
  size = "md",
  variant = "default",
  className
}: IconWrapperProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  const variantClasses = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    muted: "text-muted-foreground"
  };

  return (
    <IconComponent
      className={cn(
        "flex-shrink-0",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
}
