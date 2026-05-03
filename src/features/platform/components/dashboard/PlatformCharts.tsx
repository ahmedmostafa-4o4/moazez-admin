"use client";

import { useTranslations } from "next-intl";
import ChartCard from "@/components/ui/chart-card/ChartCard";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis,
  FunnelChart, Funnel, LabelList
} from "recharts";

export function GrowthTrendChart({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.charts.growthTrend");
  const tMonths = useTranslations("platform.dashboard.months");
  const tData = useTranslations("platform.dashboard.dataLabels");

  const translatedData = data.map(d => ({
    ...d,
    name: tMonths(d.name.toLowerCase()) || d.name
  }));

  return (
    <ChartCard title={t("title")} subtitle={t("subtitle")} className="h-full">
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={translatedData} margin={{top: 20, right: -50, bottom: 20, left: -50}}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line name={tData("students")} yAxisId="left" type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line name={tData("schools")} yAxisId="right" type="monotone" dataKey="schools" stroke="#0f766e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function AppsStatusChart({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.charts.appsStatus");
  const tData = useTranslations("platform.dashboard.dataLabels");

  const translatedData = data.map(d => ({
    ...d,
    school: d.school.replace("School", tData("school"))
  }));

  return (
    <ChartCard title={t("title")} subtitle={t("subtitle")} className="h-full">
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={translatedData} layout="vertical" margin={{ top: 20, right: 10, bottom: 20, left: -50 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="school" type="category" />
            
            <Tooltip />
            <Legend />
            <Bar name={tData("active")} dataKey="active" stackId="a" fill="#10b981" />
            <Bar name={tData("inactive")} dataKey="inactive" stackId="a" fill="#f59e0b" />
            <Bar name={tData("error")} dataKey="error" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function UserDistributionChart({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.charts.userDistribution");
  const tData = useTranslations("platform.dashboard.dataLabels");

  const translatedData = data.map(d => ({
    ...d,
    name: tData(d.name.toLowerCase()) || d.name
  }));

  return (
    <ChartCard title={t("title")} subtitle={t("subtitle")} className="h-full">
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={translatedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {translatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function AttendanceGradesScatter({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.charts.attendanceGradesScatter");
  const tData = useTranslations("platform.dashboard.dataLabels");

  return (
    <ChartCard title={t("title")} subtitle={t("subtitle")} className="h-full">
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 10, bottom: 20, left: -50 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="attendance" name={tData("attendance")} unit="%" domain={[60, 100]} />
            <YAxis type="number" dataKey="grade" name={tData("grade")} unit="%" domain={[50, 100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name={tData("schools")} data={data} fill="#8b5cf6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function AdmissionsPipelineChart({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.charts.admissionsPipeline");
  const tData = useTranslations("platform.dashboard.dataLabels");

  const translatedData = data.map(d => ({
    ...d,
    name: tData(d.name.toLowerCase()) || d.name
  }));

  return (
    <ChartCard title={t("title")} subtitle={t("subtitle")} className="h-full">
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={translatedData}
              isAnimationActive
            >
              <LabelList position="center" fill="#fff" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export function WeeklyHeatmapChart({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.charts.weeklyHeatmap");
  const tData = useTranslations("platform.dashboard.dataLabels");
  
  // Custom simple heatmap implementation using Tailwind CSS
  const getHeatmapColor = (val: number) => {
    if (val >= 95) return 'bg-green-500';
    if (val >= 90) return 'bg-green-300';
    if (val >= 80) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <ChartCard title={t("title")} subtitle={t("subtitle")} className="h-full">
      <div className="mt-6 overflow-x-auto mx-auto max-w-[600px]">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-center font-medium text-gray-500 pb-2 pr-4">{tData("school")}</th>
              <th className="font-medium text-gray-500 pb-2">W1</th>
              <th className="font-medium text-gray-500 pb-2">W2</th>
              <th className="font-medium text-gray-500 pb-2">W3</th>
              <th className="font-medium text-gray-500 pb-2">W4</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="py-2 text-center text-gray-800 font-medium whitespace-nowrap pr-4">
                  {row.school.replace("School", tData("school"))}
                </td>
                <td className="p-1">
                  <div className={`h-8 w-full rounded ${getHeatmapColor(row.w1)} flex items-center justify-center text-white text-xs font-medium`}>
                    {row.w1}%
                  </div>
                </td>
                <td className="p-1">
                  <div className={`h-8 w-full rounded ${getHeatmapColor(row.w2)} flex items-center justify-center text-white text-xs font-medium`}>
                    {row.w2}%
                  </div>
                </td>
                <td className="p-1">
                  <div className={`h-8 w-full rounded ${getHeatmapColor(row.w3)} flex items-center justify-center text-white text-xs font-medium`}>
                    {row.w3}%
                  </div>
                </td>
                <td className="p-1">
                  <div className={`h-8 w-full rounded ${getHeatmapColor(row.w4)} flex items-center justify-center text-white text-xs font-medium`}>
                    {row.w4}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
