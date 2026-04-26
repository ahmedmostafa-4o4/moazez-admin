import type { ComponentType } from "react";

export interface NavigationItem {
  key: string;
  label_en: string;
  label_ar: string;
  href_en: string;
  href_ar: string;
  icon: ComponentType<{ className?: string }>;
  children?: NavigationItem[];
  badge?: () => number;
  buttonVariant?: "default" | "highlight";
  buttonBackgroundImage?: string;
}
