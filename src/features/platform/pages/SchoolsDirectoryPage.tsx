"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DataTable } from "@/components/ui";
import type { Column } from "@/components/ui/data-table";

type SchoolDirectoryRow = {
  id: string;
  name: string;
  status: "active" | "onboarding";
  plan: "enterprise" | "growth" | "core";
  students: number;
  users: number;
  modules: string;
  health: "good" | "watch" | "setup";
  lastActivity: string;
  [key: string]: unknown;
};

const schools: SchoolDirectoryRow[] = [
  {
    id: "school_123",
    name: "Al Noor International School",
    status: "active",
    plan: "enterprise",
    students: 1248,
    users: 184,
    modules: "12/14",
    health: "good",
    lastActivity: "12m",
  },
  {
    id: "school_204",
    name: "Future Leaders Academy",
    status: "active",
    plan: "growth",
    students: 842,
    users: 96,
    modules: "10/14",
    health: "watch",
    lastActivity: "1h",
  },
  {
    id: "school_317",
    name: "Cairo STEM School",
    status: "onboarding",
    plan: "enterprise",
    students: 516,
    users: 62,
    modules: "7/14",
    health: "setup",
    lastActivity: "yesterday",
  },
  {
    id: "school_411",
    name: "Green Valley School",
    status: "active",
    plan: "core",
    students: 693,
    users: 78,
    modules: "8/14",
    health: "good",
    lastActivity: "2d",
  },
];

const badgeClassName = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  onboarding: "bg-blue-50 text-blue-700 border-blue-200",
  good: "bg-emerald-50 text-emerald-700 border-emerald-200",
  watch: "bg-amber-50 text-amber-700 border-amber-200",
  setup: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export default function SchoolsDirectoryPage() {
  const locale = useLocale();
  const t = useTranslations("platform.schools");

  const columns: Column<SchoolDirectoryRow>[] = [
    { key: "name", label: t("columns.schoolName"), searchable: true },
    {
      key: "status",
      label: t("columns.status"),
      render: (value) => {
        const status = value as SchoolDirectoryRow["status"];

        return (
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClassName[status]}`}
          >
            {t(`status.${status}`)}
          </span>
        );
      },
    },
    {
      key: "plan",
      label: t("columns.plan"),
      render: (value) => t(`plans.${value as SchoolDirectoryRow["plan"]}`),
    },
    {
      key: "students",
      label: t("columns.students"),
      sortable: true,
      render: (value) => Number(value).toLocaleString(locale),
    },
    {
      key: "users",
      label: t("columns.users"),
      sortable: true,
      render: (value) => Number(value).toLocaleString(locale),
    },
    { key: "modules", label: t("columns.modules") },
    {
      key: "health",
      label: t("columns.health"),
      render: (value) => {
        const health = value as SchoolDirectoryRow["health"];

        return (
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClassName[health]}`}
          >
            {t(`health.${health}`)}
          </span>
        );
      },
    },
    {
      key: "lastActivity",
      label: t("columns.lastActivity"),
      render: (value) =>
        t(`lastActivity.${value as SchoolDirectoryRow["lastActivity"]}`),
    },
    {
      key: "actions",
      label: t("columns.actions"),
      render: (_value, row) => (
        <Link
          href={`/${locale}/dashboard?schoolId=${row.id}`}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/25 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          {t("actions.openSchoolDashboard")}
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <DataTable
          columns={columns}
          data={schools}
          itemsPerPage={10}
          showPagination
          urlState={{
            keyPrefix: "platformSchools",
            syncPagination: true,
            syncSorting: true,
          }}
        />
      </div>
    </div>
  );
}
