"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DropdownMenu } from "@/components/ui/dropdown";
import DatePicker from "@/components/ui/input/DatePicker";
import { Calendar, Check, Filter } from "lucide-react";

export function DashboardFilterBar() {
  const t = useTranslations("platform.dashboard.filters");
  const [period, setPeriod] = useState("this_month");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const periodOptions = [
    { label: t("today"), value: "today", icon: <Calendar className="w-4 h-4" /> },
    { label: t("this_week"), value: "this_week", icon: <Calendar className="w-4 h-4" /> },
    { label: t("this_month"), value: "this_month", icon: <Calendar className="w-4 h-4" /> },
    { label: t("this_year"), value: "this_year", icon: <Calendar className="w-4 h-4" /> },
    { label: t("custom"), value: "custom", icon: <Filter className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <DropdownMenu
          items={periodOptions}
          onSelect={setPeriod}
          placeholder={t("this_month")}
          width="w-48"
        />
      </div>

      {period === "custom" && (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">{t("from_date")}:</span>
            <div className="w-40">
              <DatePicker
                value={fromDate}
                onChange={setFromDate}
                placeholder={t("from_date")}
                fullWidth={true}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">{t("to_date")}:</span>
            <div className="w-40">
              <DatePicker
                value={toDate}
                onChange={setToDate}
                placeholder={t("to_date")}
                fullWidth={true}
                minDate={fromDate || undefined}
              />
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2563eb] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
            <Check className="w-4 h-4" />
            {t("apply")}
          </button>
        </div>
      )}
    </div>
  );
}
