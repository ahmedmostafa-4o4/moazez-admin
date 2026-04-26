"use client";

import { Bell, Menu, Search, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslations } from "next-intl";
import ScopeSwitcher from "@/components/layout/ScopeSwitcher";

interface PlatformTopNavProps {
  isSidebarOpen: boolean;
  onMenuToggle: () => void;
}

export default function PlatformTopNav({
  isSidebarOpen,
  onMenuToggle,
}: PlatformTopNavProps) {
  const t = useTranslations("platform.topNav");

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={onMenuToggle}
            className="shrink-0 rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
            type="button"
            aria-label={t("toggleNavigation")}
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <ScopeSwitcher />
          </div>

          <div className="hidden flex-1 justify-center lg:flex">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3.5 pe-10 ps-4 text-sm text-gray-700 transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <Search className="absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-lg border-2 border-neutral-200 transition-colors hover:bg-gray-100 sm:h-[50px] sm:w-[50px]"
              aria-label={t("notifications")}
              type="button"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute end-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <LanguageSwitcher />

            <div className="hidden text-end md:block">
              <p className="text-sm font-semibold text-gray-900">
                Ahmed Mostafa
              </p>
              <p className="text-xs text-gray-500">{t("role")}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
              AM
            </div>
          </div>
        </div>

        <div className="mt-3 lg:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pe-10 ps-4 text-sm text-gray-700 transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
