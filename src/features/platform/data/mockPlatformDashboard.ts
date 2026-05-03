export type PlatformDashboardKpi = {
  key:
    | "totalSchools"
    | "activeStudents"
    | "averageAttendance"
    | "openAdmissions"
    | "apiErrorsToday"
    | "dataQualityIssues";
  value: number | string;
  iconKey:
    | "schools"
    | "students"
    | "attendance"
    | "admissions"
    | "errors"
    | "quality";
  iconColor: string;
  iconBgColor: string;
  chartColor: string;
  change: {
    value: number;
    percentage: number;
    isPositive: boolean;
  };
};

export type PlatformAttentionItem = {
  id: string;
  schoolId: string;
  schoolName: string;
  schoolNameAr: string;
  severity: "critical" | "warning" | "info";
  issueKey: "syncFailed" | "setupBlocked" | "lowAttendance";
  ownerKey: "operations" | "success" | "academic";
  statusKey: "open" | "inProgress";
};

export type PlatformHealthItem = {
  key: "api" | "syncJobs" | "backgroundJobs" | "storage" | "uptime";
  status: "healthy" | "watch" | "critical";
  value: string;
};

export type PlatformModuleAdoption = {
  key: "attendance" | "admissions" | "academics" | "reports" | "usersRoles";
  enabledSchools: number;
  totalSchools: number;
};

export type PlatformActivityItem = {
  id: string;
  type: "schoolCreated" | "appEnabled" | "roleChanged" | "incidentResolved";
  actor: string;
  timeKey: "now" | "minutesAgo" | "hoursAgo" | "yesterday";
};

export type PlatformTopSchool = {
  id: string;
  name: string;
  nameAr: string;
  plan: "enterprise" | "growth" | "core";
  students: number;
  health: "good" | "watch" | "setup" | "critical";
  lastActivityKey: "12m" | "1h" | "yesterday" | "2d";
};

export const platformDashboardKpis: PlatformDashboardKpi[] = [
  {
    key: "totalSchools",
    value: 48,
    iconKey: "schools",
    iconColor: "#0f766e",
    iconBgColor: "#ccfbf1",
    chartColor: "#0f766e",
    change: { value: 2, percentage: 4, isPositive: true },
  },
  {
    key: "activeStudents",
    value: 32480,
    iconKey: "students",
    iconColor: "#2563eb",
    iconBgColor: "#dbeafe",
    chartColor: "#2563eb",
    change: { value: 410, percentage: 1, isPositive: true },
  },
  {
    key: "averageAttendance",
    value: "93.4%",
    iconKey: "attendance",
    iconColor: "#059669",
    iconBgColor: "#d1fae5",
    chartColor: "#059669",
    change: { value: 1.4, percentage: 2, isPositive: true },
  },
  {
    key: "openAdmissions",
    value: 1284,
    iconKey: "admissions",
    iconColor: "#4f46e5",
    iconBgColor: "#e0e7ff",
    chartColor: "#4f46e5",
    change: { value: 68, percentage: 6, isPositive: true },
  },
  {
    key: "apiErrorsToday",
    value: 17,
    iconKey: "errors",
    iconColor: "#dc2626",
    iconBgColor: "#fee2e2",
    chartColor: "#dc2626",
    change: { value: 5, percentage: 23, isPositive: false },
  },
  {
    key: "dataQualityIssues",
    value: 36,
    iconKey: "quality",
    iconColor: "#d97706",
    iconBgColor: "#fef3c7",
    chartColor: "#d97706",
    change: { value: 6, percentage: 14, isPositive: true },
  },
];

export const platformAttentionItems: PlatformAttentionItem[] = [
  {
    id: "attention-1",
    schoolId: "school_512",
    schoolName: "Riyadh Digital Academy",
    schoolNameAr: "أكاديمية الرياض الرقمية",
    severity: "critical",
    issueKey: "syncFailed",
    ownerKey: "operations",
    statusKey: "open",
  },
  {
    id: "attention-2",
    schoolId: "school_317",
    schoolName: "Cairo STEM School",
    schoolNameAr: "مدرسة القاهرة للعلوم والتكنولوجيا",
    severity: "warning",
    issueKey: "setupBlocked",
    ownerKey: "success",
    statusKey: "inProgress",
  },
  {
    id: "attention-3",
    schoolId: "school_204",
    schoolName: "Future Leaders Academy",
    schoolNameAr: "أكاديمية قادة المستقبل",
    severity: "info",
    issueKey: "lowAttendance",
    ownerKey: "academic",
    statusKey: "open",
  },
];

export const platformHealthItems: PlatformHealthItem[] = [
  { key: "api", status: "healthy", value: "99.98%" },
  { key: "syncJobs", status: "watch", value: "3 delayed" },
  { key: "backgroundJobs", status: "healthy", value: "128/min" },
  { key: "storage", status: "healthy", value: "64%" },
  { key: "uptime", status: "healthy", value: "30d" },
];

export const platformModuleAdoption: PlatformModuleAdoption[] = [
  { key: "attendance", enabledSchools: 45, totalSchools: 48 },
  { key: "admissions", enabledSchools: 39, totalSchools: 48 },
  { key: "academics", enabledSchools: 42, totalSchools: 48 },
  { key: "reports", enabledSchools: 31, totalSchools: 48 },
  { key: "usersRoles", enabledSchools: 48, totalSchools: 48 },
];

export const platformActivityItems: PlatformActivityItem[] = [
  {
    id: "activity-1",
    type: "incidentResolved",
    actor: "Operations",
    timeKey: "now",
  },
  {
    id: "activity-2",
    type: "appEnabled",
    actor: "Ahmed Mostafa",
    timeKey: "minutesAgo",
  },
  {
    id: "activity-3",
    type: "roleChanged",
    actor: "Security Admin",
    timeKey: "hoursAgo",
  },
  {
    id: "activity-4",
    type: "schoolCreated",
    actor: "Success Team",
    timeKey: "yesterday",
  },
];

export const platformTopSchools: PlatformTopSchool[] = [
  {
    id: "school_123",
    name: "Al Noor International School",
    nameAr: "مدرسة النور الدولية",
    plan: "enterprise",
    students: 1248,
    health: "good",
    lastActivityKey: "12m",
  },
  {
    id: "school_204",
    name: "Future Leaders Academy",
    nameAr: "أكاديمية قادة المستقبل",
    plan: "growth",
    students: 842,
    health: "watch",
    lastActivityKey: "1h",
  },
  {
    id: "school_317",
    name: "Cairo STEM School",
    nameAr: "مدرسة القاهرة للعلوم والتكنولوجيا",
    plan: "enterprise",
    students: 516,
    health: "setup",
    lastActivityKey: "yesterday",
  },
  {
    id: "school_411",
    name: "Green Valley School",
    nameAr: "مدرسة الوادي الأخضر",
    plan: "core",
    students: 693,
    health: "good",
    lastActivityKey: "2d",
  },
];
