import {
  Wrench,
  Cog,
  Snowflake,
  ScanLine,
  Zap,
  Disc3,
  Droplets,
  ClipboardCheck,
  ArrowUpDown,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/content/services";

const map: Record<IconKey, LucideIcon> = {
  suspension: ArrowUpDown,
  engine: Cog,
  gearbox: Wrench,
  ac: Snowflake,
  diagnostics: ScanLine,
  electrical: Zap,
  brakes: Disc3,
  oil: Droplets,
  inspection: ClipboardCheck,
};

export function ServiceIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = map[name];
  return <Icon className={className} aria-hidden="true" />;
}
