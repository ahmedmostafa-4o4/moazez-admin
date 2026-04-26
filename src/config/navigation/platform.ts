import {
  Activity,
  AppWindow,
  BarChart3,
  Building2,
  LayoutDashboard,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import type { NavigationItem } from "./types";

export const platformMenuItems: NavigationItem[] = [
  {
    key: "platform-dashboard",
    label_en: "Platform Dashboard",
    label_ar: "لوحة تحكم المنصة",
    href_en: "/en/platform/dashboard",
    href_ar: "/ar/platform/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "platform-schools",
    label_en: "Schools",
    label_ar: "المدارس",
    href_en: "/en/platform/schools",
    href_ar: "/ar/platform/schools",
    icon: Building2,
  },
  {
    key: "platform-apps-center",
    label_en: "Apps Center",
    label_ar: "مركز التطبيقات",
    href_en: "/en/platform/apps",
    href_ar: "/ar/platform/apps",
    icon: AppWindow,
  },
  {
    key: "platform-users-roles",
    label_en: "Users & Roles",
    label_ar: "المستخدمون والأدوار",
    href_en: "/en/platform/users-roles",
    href_ar: "/ar/platform/users-roles",
    icon: Users,
  },
  {
    key: "platform-reports",
    label_en: "Reports",
    label_ar: "التقارير",
    href_en: "/en/platform/reports",
    href_ar: "/ar/platform/reports",
    icon: BarChart3,
  },
  {
    key: "platform-operations",
    label_en: "Operations",
    label_ar: "العمليات",
    href_en: "/en/platform/operations",
    href_ar: "/ar/platform/operations",
    icon: Wrench,
  },
  {
    key: "platform-security-audit",
    label_en: "Security & Audit",
    label_ar: "الأمان والتدقيق",
    href_en: "/en/platform/security-audit",
    href_ar: "/ar/platform/security-audit",
    icon: ShieldCheck,
  },
];

export const platformBottomItems: NavigationItem[] = [
  {
    key: "platform-system-health",
    label_en: "System Health",
    label_ar: "حالة النظام",
    href_en: "/en/platform/operations",
    href_ar: "/ar/platform/operations",
    icon: Activity,
  },
];
