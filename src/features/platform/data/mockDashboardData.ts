import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  GraduationCap,
  ServerCrash,
  UserPlus,
  LockOpen,
  Clock,
  MailWarning,
  Unplug,
} from "lucide-react";

export const mockDashboardData = {
  kpis: [
    {
      key: "totalSchools",
      value: 120,
      icon: Building2,
      iconColor: "#0f766e",
      iconBgColor: "#ccfbf1",
      chartColor: "#0f766e",
      chartData: [
        { label: "W1", value: 110 },
        { label: "W2", value: 115 },
        { label: "W3", value: 118 },
        { label: "W4", value: 120 },
      ],
    },
    {
      key: "activeStudents",
      value: 45200,
      icon: GraduationCap,
      iconColor: "#2563eb",
      iconBgColor: "#dbeafe",
      chartColor: "#2563eb",
      chartData: [
        { label: "W1", value: 43000 },
        { label: "W2", value: 44100 },
        { label: "W3", value: 44800 },
        { label: "W4", value: 45200 },
      ],
    },
    {
      key: "averageAttendance",
      value: "94.2%",
      icon: CheckCircle2,
      iconColor: "#059669",
      iconBgColor: "#d1fae5",
      chartColor: "#059669",
      chartData: [
        { label: "W1", value: 92 },
        { label: "W2", value: 93 },
        { label: "W3", value: 94 },
        { label: "W4", value: 94.2 },
      ],
    },
    {
      key: "openAdmissions",
      value: 3450,
      icon: UserPlus,
      iconColor: "#4f46e5",
      iconBgColor: "#e0e7ff",
      chartColor: "#4f46e5",
      chartData: [
        { label: "W1", value: 3100 },
        { label: "W2", value: 3200 },
        { label: "W3", value: 3350 },
        { label: "W4", value: 3450 },
      ],
    },
    {
      key: "assessments",
      value: 156,
      icon: LockOpen,
      iconColor: "#d97706",
      iconBgColor: "#fef3c7",
      chartColor: "#d97706",
      chartData: [
        { label: "W1", value: 120 },
        { label: "W2", value: 130 },
        { label: "W3", value: 145 },
        { label: "W4", value: 156 },
      ],
    },
    {
      key: "reinforcementTasks",
      value: 840,
      icon: Clock,
      iconColor: "#be185d",
      iconBgColor: "#fce7f3",
      chartColor: "#be185d",
      chartData: [
        { label: "W1", value: 900 },
        { label: "W2", value: 880 },
        { label: "W3", value: 850 },
        { label: "W4", value: 840 },
      ],
    },
    {
      key: "users",
      value: 450,
      icon: MailWarning,
      iconColor: "#6b7280",
      iconBgColor: "#f3f4f6",
      chartColor: "#6b7280",
      chartData: [
        { label: "W1", value: 500 },
        { label: "W2", value: 480 },
        { label: "W3", value: 460 },
        { label: "W4", value: 450 },
      ],
    },
    {
      key: "integrations",
      value: 12,
      icon: Unplug,
      iconColor: "#ea580c",
      iconBgColor: "#ffedd5",
      chartColor: "#ea580c",
      chartData: [
        { label: "W1", value: 5 },
        { label: "W2", value: 8 },
        { label: "W3", value: 10 },
        { label: "W4", value: 12 },
      ],
    },
    {
      key: "apiErrorsToday",
      value: 24,
      icon: ServerCrash,
      iconColor: "#dc2626",
      iconBgColor: "#fee2e2",
      chartColor: "#dc2626",
      chartData: [
        { label: "6h", value: 5 },
        { label: "12h", value: 12 },
        { label: "18h", value: 18 },
        { label: "24h", value: 24 },
      ],
    },
  ],

  // Charts Mock Data
  growthTrendData: [
    { name: "Jan", students: 30000, schools: 80 },
    { name: "Feb", students: 32000, schools: 85 },
    { name: "Mar", students: 35000, schools: 90 },
    { name: "Apr", students: 38000, schools: 95 },
    { name: "May", students: 40000, schools: 100 },
    { name: "Jun", students: 45200, schools: 120 },
  ],

  appsStatusData: [
    { school: "School A", active: 10, inactive: 2, error: 0 },
    { school: "School B", active: 8, inactive: 4, error: 1 },
    { school: "School C", active: 12, inactive: 0, error: 2 },
    { school: "School D", active: 5, inactive: 7, error: 0 },
    { school: "School E", active: 11, inactive: 1, error: 0 },
  ],

  userDistributionData: [
    { name: "Students", value: 45200, color: "#2563eb" },
    { name: "Parents", value: 38000, color: "#10b981" },
    { name: "Teachers", value: 3500, color: "#8b5cf6" },
    { name: "Admins", value: 800, color: "#f59e0b" },
  ],

  attendanceGradesData: Array.from({ length: 50 }).map((_, i) => ({
    attendance: 70 + Math.random() * 30, // 70 to 100
    grade: 60 + Math.random() * 40,      // 60 to 100
    school: `School ${String.fromCharCode(65 + (i % 5))}`,
  })),

  admissionsPipelineData: [
    { name: "Leads", value: 10000, fill: "#3b82f6" },
    { name: "Applications", value: 6500, fill: "#8b5cf6" },
    { name: "Accepted", value: 4200, fill: "#10b981" },
    { name: "Enrolled", value: 3450, fill: "#f59e0b" },
  ],

  weeklyHeatmapData: [
    { school: "School A", w1: 95, w2: 96, w3: 94, w4: 98 },
    { school: "School B", w1: 88, w2: 89, w3: 85, w4: 87 },
    { school: "School C", w1: 92, w2: 94, w3: 95, w4: 93 },
    { school: "School D", w1: 75, w2: 78, w3: 80, w4: 82 },
    { school: "School E", w1: 99, w2: 98, w3: 99, w4: 97 },
  ],

  // Widgets Data
  leaderboardData: [
    { id: 1, name: "Al-Amal School", score: 98, trend: "up", status: "excellent" },
    { id: 2, name: "Future Leaders", score: 95, trend: "up", status: "excellent" },
    { id: 3, name: "Pioneers Academy", score: 92, trend: "flat", status: "good" },
    { id: 4, name: "Global Minds", score: 88, trend: "down", status: "average" },
    { id: 5, name: "Horizon School", score: 75, trend: "down", status: "poor" },
  ],

  riskGradesData: [
    { id: 1, school: "Horizon School", grade: "Grade 10", issue: "Low Pass Rate (65%)", severity: "high" },
    { id: 2, school: "Global Minds", grade: "Grade 12", issue: "Low Attendance (78%)", severity: "medium" },
    { id: 3, school: "Pioneers Academy", grade: "Grade 8", issue: "Incomplete Assessments", severity: "medium" },
  ],

  notificationsQueueData: [
    { channel: "SMS", sent: 15420, failed: 230, delayed: 50 },
    { channel: "Email", sent: 45000, failed: 120, delayed: 15 },
    { channel: "WhatsApp", sent: 8500, failed: 450, delayed: 100 },
    { channel: "Push", sent: 125000, failed: 850, delayed: 0 },
  ],

  dataQualityData: [
    { issue: "Students without parents linked", count: 345, severity: "high" },
    { issue: "Classes without schedule", count: 28, severity: "critical" },
    { issue: "Teachers without assignment", count: 15, severity: "medium" },
    { issue: "Missing registration docs", count: 890, severity: "low" },
  ],

  systemJobsData: [
    { job: "Nightly Backup", status: "success", time: "02:00 AM" },
    { job: "SIS Export", status: "processing", time: "Currently Running" },
    { job: "Attendance Sync", status: "failed", time: "08:15 AM" },
    { job: "Financial Migration", status: "pending", time: "Scheduled" },
  ]
};
