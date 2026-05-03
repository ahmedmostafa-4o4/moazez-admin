import type { NavigationItem } from "./types";
import { LayoutDashboard } from "lucide-react";

export const schoolMenuItems: NavigationItem[] = [
  {
    key: "school-dashboard",
    label_en: "Dashboard",
    label_ar: "لوحة التحكم",
    href_en: "/en/dashboard",
    href_ar: "/ar/dashboard",
    icon: LayoutDashboard,
  },
];

export const schoolBottomItems: NavigationItem[] = [];
