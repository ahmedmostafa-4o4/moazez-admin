"use client";

import { useTranslations } from "next-intl";
import { KPICardV2 } from "@/components/ui";
import { mockDashboardData } from "../data/mockDashboardData";
import {
  LeaderboardWidget,
  NotificationsQueueWidget,
  DataQualityWidget,
  SystemJobsWidget
} from "../components/dashboard/PlatformWidgets";
import {
  GrowthTrendChart,
  AppsStatusChart,
  UserDistributionChart,
  AttendanceGradesScatter,
  AdmissionsPipelineChart,
  WeeklyHeatmapChart
} from "../components/dashboard/PlatformCharts";
import { DashboardFilterBar } from "../components/dashboard/DashboardFilterBar";

export default function PlatformDashboardPage() {
  const t = useTranslations("platform.dashboard");

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between flex-wrap">
          <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
      </div>
              <DashboardFilterBar />

      </div>
    


      {/* KPIs Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {mockDashboardData.kpis.map((kpi) => (
          <KPICardV2
            key={kpi.key}
            title={t(`kpis.${kpi.key}.title`)}
            value={kpi.value}
            subtitle={t(`kpis.${kpi.key}.subtitle`)}
            icon={kpi.icon}
            iconColor={kpi.iconColor}
            iconBgColor={kpi.iconBgColor}
            chartColor={kpi.chartColor}
            showChart={true}
            chartData={kpi.chartData}
          />
        ))}
      </div>

      {/* Main Widgets Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-2 mt-8">
        <LeaderboardWidget data={mockDashboardData.leaderboardData} />
        <DataQualityWidget data={mockDashboardData.dataQualityData} />
        <NotificationsQueueWidget data={mockDashboardData.notificationsQueueData} />
        <SystemJobsWidget data={mockDashboardData.systemJobsData} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-8">
        <GrowthTrendChart data={mockDashboardData.growthTrendData} />
        <AppsStatusChart data={mockDashboardData.appsStatusData} />
        <UserDistributionChart data={mockDashboardData.userDistributionData} />
        <WeeklyHeatmapChart data={mockDashboardData.weeklyHeatmapData} />
        <AttendanceGradesScatter data={mockDashboardData.attendanceGradesData} />
        <AdmissionsPipelineChart data={mockDashboardData.admissionsPipelineData} />
      </div>
    </div>
  );
}
