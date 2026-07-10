import {
  Users,
  Boxes,
  Globe,
  Smartphone,
  Network,
  Sparkles,
  LayoutGrid,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Users,
  Boxes,
  Globe,
  Smartphone,
  Network,
  Sparkles,
  LayoutGrid,
  Cloud,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}

export const navItems = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "products", href: "/products" },
  { key: "portfolio", href: "/portfolio" },
  { key: "career", href: "/career" },
  { key: "contacts", href: "/contacts" },
] as const;
