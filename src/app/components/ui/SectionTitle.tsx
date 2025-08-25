import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  children?: ReactNode;
}

export function SectionTitle({
  title,
  subtitle,
  description,
  align = "center",
  className,
  children
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  return (
    <div className={cn("space-y-4", alignClasses[align], className)}>
      {subtitle && (
        <p className="text-sm font-medium text-primary uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
