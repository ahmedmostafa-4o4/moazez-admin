import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  GraduationCap,
  ServerCrash,
  UserPlus,
} from "lucide-react";

const kpis = [
  {
    title: "Total Schools",
    value: "48",
    subtitle: "Across all active regions",
    icon: Building2,
    iconClassName: "bg-teal-50 text-primary",
  },
  {
    title: "Active Students",
    value: "32,480",
    subtitle: "Currently enrolled",
    icon: GraduationCap,
    iconClassName: "bg-blue-50 text-blue-600",
  },
  {
    title: "Average Attendance",
    value: "93.4%",
    subtitle: "Platform-wide this week",
    icon: CheckCircle2,
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Open Admissions",
    value: "1,284",
    subtitle: "Applications in progress",
    icon: UserPlus,
    iconClassName: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "API Errors Today",
    value: "17",
    subtitle: "Mock operational signal",
    icon: ServerCrash,
    iconClassName: "bg-red-50 text-red-600",
  },
  {
    title: "Data Quality Issues",
    value: "36",
    subtitle: "Records requiring review",
    icon: AlertTriangle,
    iconClassName: "bg-amber-50 text-amber-600",
  },
];

export default function PlatformDashboardPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">Platform</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-gray-500">
          Mock platform metrics for the Super Admin foundation.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <article
              key={kpi.title}
              className="rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {kpi.title}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] ${kpi.iconClassName}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">{kpi.subtitle}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
