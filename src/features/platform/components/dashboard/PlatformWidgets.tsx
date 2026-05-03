"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, ServerCrash, Activity, CheckCircle2, AlertCircle } from "lucide-react";

export function LeaderboardWidget({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.widgets.leaderboard");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>
      <div className="space-y-4 mt-4">
        {data.map((item, i) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                {i + 1}
              </span>
              <span className="font-medium text-gray-800">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{item.score}%</span>
              <span className={`w-2 h-2 rounded-full ${
                item.status === 'excellent' ? 'bg-green-500' :
                item.status === 'good' ? 'bg-blue-500' :
                item.status === 'average' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotificationsQueueWidget({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.widgets.notificationsQueue");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Channel</th>
              <th className="px-4 py-3 text-right">Sent</th>
              <th className="px-4 py-3 text-right">Failed</th>
              <th className="px-4 py-3 text-right rounded-tr-lg">Delayed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900">{item.channel}</td>
                <td className="px-4 py-3 text-right text-gray-600">{item.sent.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-red-600">{item.failed.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-yellow-600">{item.delayed.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DataQualityWidget({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.widgets.dataQualityCenter");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>
      <div className="space-y-3 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
            {item.severity === 'critical' ? (
              <ServerCrash className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            ) : item.severity === 'high' ? (
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{item.issue}</p>
              <p className="text-xs text-gray-500 mt-1">{item.count} occurrences</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SystemJobsWidget({ data }: { data: any[] }) {
  const t = useTranslations("platform.dashboard.widgets.systemJobs");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t("title")}</h3>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>
      <div className="space-y-4 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              {item.status === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : item.status === 'failed' ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : item.status === 'processing' ? (
                <Activity className="w-5 h-5 text-blue-500" />
              ) : (
                <Clock className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-800">{item.job}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              item.status === 'success' ? 'bg-green-100 text-green-700' :
              item.status === 'failed' ? 'bg-red-100 text-red-700' :
              item.status === 'processing' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-200 text-gray-700'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Quick Clock icon definition since I forgot to import it in the top block and it's used above
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
