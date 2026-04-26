"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Building2, Check, ChevronDown, Globe2, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AppScope } from "@/lib/scope/types";
import { useSelectedSchool } from "@/lib/scope/use-selected-school";
import type { PlatformSchoolOption } from "@/features/platform/data/mockSchools";

const statusClassName: Record<PlatformSchoolOption["status"], string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  onboarding: "bg-blue-50 text-blue-700 border-blue-200",
  suspended: "bg-gray-100 text-gray-600 border-gray-200",
};

const healthClassName: Record<PlatformSchoolOption["health"], string> = {
  good: "bg-emerald-50 text-emerald-700 border-emerald-200",
  watch: "bg-amber-50 text-amber-700 border-amber-200",
  setup: "bg-indigo-50 text-indigo-700 border-indigo-200",
  critical: "bg-red-50 text-red-700 border-red-200",
};

export default function ScopeSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("platform.scopeSwitcher");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedSchoolId, selectedSchool, schools, setSelectedSchoolId } =
    useSelectedSchool();

  const currentScope: AppScope = pathname.includes("/platform")
    ? "platform"
    : "school";
  const isPlatformScope = currentScope === "platform";
  const scopeLabel = isPlatformScope ? t("platformScope") : t("schoolScope");
  const selectedSchoolName =
    locale === "ar" && selectedSchool?.nameAr
      ? selectedSchool.nameAr
      : selectedSchool?.name;

  const filteredSchools = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return schools;
    }

    return schools.filter((school) => {
      const englishName = school.name.toLowerCase();
      const arabicName = school.nameAr?.toLowerCase() ?? "";

      return (
        englishName.includes(normalizedQuery) ||
        arabicName.includes(normalizedQuery)
      );
    });
  }, [schools, searchQuery]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const goToPlatformDashboard = () => {
    setIsOpen(false);
    router.push(`/${locale}/platform/dashboard`);
  };

  const goToSchoolDashboard = () => {
    setIsOpen(false);
    router.push(`/${locale}/dashboard?schoolId=${selectedSchoolId}`);
  };

  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);

    if (currentScope === "school") {
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.set("schoolId", schoolId);
      router.replace(`${pathname}?${nextParams.toString()}`);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 w-11 min-w-0 items-center justify-center gap-2 rounded-lg border-2 border-neutral-200 bg-white px-2 text-start transition-colors hover:bg-gray-50 sm:h-[50px] sm:w-auto sm:max-w-[220px] sm:justify-start sm:px-3"
        aria-expanded={isOpen}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {isPlatformScope ? (
            <Globe2 className="h-4 w-4" />
          ) : (
            <Building2 className="h-4 w-4" />
          )}
        </span>
        <span className="hidden min-w-0 flex-1 sm:block">
          <span className="block truncate text-xs font-semibold text-gray-900">
            {scopeLabel}
          </span>
          <span className="block truncate text-[11px] text-gray-500">
            {selectedSchoolName ?? selectedSchoolId}
          </span>
        </span>
        <ChevronDown className="hidden h-4 w-4 shrink-0 text-gray-500 sm:block" />
      </button>

      {isOpen && (
        <div className="fixed inset-x-4 top-20 z-50 max-h-[calc(100vh-6rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg sm:absolute sm:inset-x-auto sm:start-0 sm:top-[calc(100%+0.5rem)] sm:w-[min(420px,calc(100vw-2rem))]">
          <div className="max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="border-b border-gray-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {t("currentScope")}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {isPlatformScope ? (
                    <Globe2 className="h-5 w-5" />
                  ) : (
                    <Building2 className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900">{scopeLabel}</p>
                  <p className="truncate text-sm text-gray-500">
                    {selectedSchoolName
                      ? `${t("selectedSchool")}: ${selectedSchoolName}`
                      : t("selectedSchool")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button
                type="button"
                onClick={goToPlatformDashboard}
                className={`flex w-full items-start gap-3 rounded-lg p-3 text-start transition-colors hover:bg-gray-50 ${
                  isPlatformScope
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700"
                }`}
              >
                <Globe2 className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {t("platformDashboard")}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {t("platformDashboardDescription")}
                  </span>
                </span>
                {isPlatformScope && <Check className="h-4 w-4 shrink-0" />}
              </button>
            </div>

            <div className="border-t border-gray-100 p-3">
              <label
                htmlFor="scope-school-search"
                className="text-xs font-semibold uppercase tracking-wide text-gray-400"
              >
                {t("selectSchool")}
              </label>
              <div className="relative mt-2">
                <input
                  id="scope-school-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t("searchSchoolPlaceholder")}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pe-3 ps-9 text-sm text-gray-700 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pe-1 sm:max-h-72">
                {filteredSchools.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-gray-200 p-4 text-center text-sm text-gray-500">
                    {t("noSchoolsFound")}
                  </p>
                ) : (
                  filteredSchools.map((school) => {
                    const schoolName =
                      locale === "ar" && school.nameAr
                        ? school.nameAr
                        : school.name;
                    const isSelected = school.id === selectedSchoolId;

                    return (
                      <button
                        type="button"
                        key={school.id}
                        onClick={() => handleSelectSchool(school.id)}
                        className={`w-full rounded-lg border p-3 text-start transition-colors hover:bg-gray-50 ${
                          isSelected
                            ? "border-primary/30 bg-primary/10"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="truncate text-sm font-semibold text-gray-900">
                                {schoolName}
                              </p>
                              {isSelected && (
                                <Check className="h-4 w-4 shrink-0 text-primary" />
                              )}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusClassName[school.status]}`}
                              >
                                {t(`status.${school.status}`)}
                              </span>
                              <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                                {t(`plan.${school.plan}`)}
                              </span>
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${healthClassName[school.health]}`}
                              >
                                {t(`health.${school.health}`)}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                              {t("students", { count: school.students })}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 p-3">
              <button
                type="button"
                onClick={goToSchoolDashboard}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  currentScope === "school"
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "bg-primary text-white hover:bg-hover"
                }`}
              >
                <Building2 className="h-4 w-4" />
                {t("openSchoolDashboard")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
