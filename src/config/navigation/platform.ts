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
    href_en: "/en/dashboard",
    href_ar: "/ar/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "platform-schools",
    label_en: "Schools",
    label_ar: "المدارس",
    href_en: "/en/schools",
    href_ar: "/ar/schools",
    icon: Building2,
  },
  {
    key: "platform-apps-center",
    label_en: "Apps Center",
    label_ar: "مركز التطبيقات",
    href_en: "/en/apps",
    href_ar: "/ar/apps",
    icon: AppWindow,
  },
  {
    key: "platform-users-roles",
    label_en: "Users & Roles",
    label_ar: "المستخدمون والأدوار",
    href_en: "/en/users-roles",
    href_ar: "/ar/users-roles",
    icon: Users,
  },
  {
    key: "platform-reports",
    label_en: "Reports",
    label_ar: "التقارير",
    href_en: "/en/reports",
    href_ar: "/ar/reports",
    icon: BarChart3,
  },
  {
    key: "platform-operations",
    label_en: "Operations",
    label_ar: "العمليات",
    href_en: "/en/operations",
    href_ar: "/ar/operations",
    icon: Wrench,
  },
  {
    key: "platform-security-audit",
    label_en: "Security & Audit",
    label_ar: "الأمان والتدقيق",
    href_en: "/en/security-audit",
    href_ar: "/ar/security-audit",
    icon: ShieldCheck,
  },
];

export const platformBottomItems: NavigationItem[] = [
  {
    key: "platform-system-health",
    label_en: "System Health",
    label_ar: "حالة النظام",
    href_en: "/en/operations",
    href_ar: "/ar/operations",
    icon: Activity,
  },
];
