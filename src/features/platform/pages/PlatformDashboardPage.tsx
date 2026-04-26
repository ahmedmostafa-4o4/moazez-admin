"use client";

import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  GraduationCap,
  ServerCrash,
  UserPlus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { KPICardV2 } from "@/components/ui";

const kpis = [
  {
    key: "totalSchools",
    value: 48,
    icon: Building2,
    iconColor: "#0f766e",
    iconBgColor: "#ccfbf1",
    chartColor: "#0f766e",
    chartData: [
      { label: "W1", value: 44 },
      { label: "W2", value: 45 },
      { label: "W3", value: 47 },
      { label: "W4", value: 48 },
    ],
  },
  {
    key: "activeStudents",
    value: 32480,
    icon: GraduationCap,
    iconColor: "#2563eb",
    iconBgColor: "#dbeafe",
    chartColor: "#2563eb",
    chartData: [
      { label: "W1", value: 30920 },
      { label: "W2", value: 31580 },
      { label: "W3", value: 32110 },
      { label: "W4", value: 32480 },
    ],
  },
  {
    key: "averageAttendance",
    value: "93.4%",
    icon: CheckCircle2,
    iconColor: "#059669",
    iconBgColor: "#d1fae5",
    chartColor: "#059669",
    chartData: [
      { label: "W1", value: 91 },
      { label: "W2", value: 92 },
      { label: "W3", value: 93 },
      { label: "W4", value: 93.4 },
    ],
  },
  {
    key: "openAdmissions",
    value: 1284,
    icon: UserPlus,
    iconColor: "#4f46e5",
    iconBgColor: "#e0e7ff",
    chartColor: "#4f46e5",
    chartData: [
      { label: "W1", value: 1180 },
      { label: "W2", value: 1215 },
      { label: "W3", value: 1260 },
      { label: "W4", value: 1284 },
    ],
  },
  {
    key: "apiErrorsToday",
    value: 17,
    icon: ServerCrash,
    iconColor: "#dc2626",
    iconBgColor: "#fee2e2",
    chartColor: "#dc2626",
    chartData: [
      { label: "6h", value: 6 },
      { label: "12h", value: 9 },
      { label: "18h", value: 12 },
      { label: "24h", value: 17 },
    ],
  },
  {
    key: "dataQualityIssues",
    value: 36,
    icon: AlertTriangle,
    iconColor: "#d97706",
    iconBgColor: "#fef3c7",
    chartColor: "#d97706",
    chartData: [
      { label: "W1", value: 42 },
      { label: "W2", value: 39 },
      { label: "W3", value: 38 },
      { label: "W4", value: 36 },
    ],
  },
];

export default function PlatformDashboardPage() {
  const t = useTranslations("platform.dashboard");

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <KPICardV2
            key={kpi.key}
            title={t(`kpis.${kpi.key}.title`)}
            value={kpi.value}
            subtitle={t(`kpis.${kpi.key}.subtitle`)}
            icon={kpi.icon}
            iconColor={kpi.iconColor}
            iconBgColor={kpi.iconBgColor}
            chartColor={kpi.chartColor}
            showChart={false}
          />
        ))}
      </div>
    </div>
  );
}
