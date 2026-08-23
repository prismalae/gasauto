import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Kept as a thin wrapper so existing call sites keep working. The chrome
 * gradient fill is gone — headings are plain ink on paper now.
 */
export function GradientText({
  as: Tag = "span",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("text-ink", className)}>{children}</Tag>;
}
