"use client";

import {
  AppWindow,
  BarChart3,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";

type PlatformPlaceholderKey =
  | "apps"
  | "usersRoles"
  | "reports"
  | "operations"
  | "securityAudit";

interface PlatformPlaceholderPageProps {
  pageKey: PlatformPlaceholderKey;
}

const icons = {
  apps: AppWindow,
  usersRoles: Users,
  reports: BarChart3,
  operations: Wrench,
  securityAudit: ShieldCheck,
};

export default function PlatformPlaceholderPage({
  pageKey,
}: PlatformPlaceholderPageProps) {
  const t = useTranslations("platform.placeholders");
  const Icon = icons[pageKey];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t(`${pageKey}.title`)}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {t(`${pageKey}.subtitle`)}
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t(`${pageKey}.panelTitle`)}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t(`${pageKey}.panelDescription`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
