export type PlatformSchoolStatus = "active" | "onboarding" | "suspended";
export type PlatformSchoolPlan = "enterprise" | "growth" | "core";
export type PlatformSchoolHealth = "good" | "watch" | "setup" | "critical";
export type ConfigurationHealthStatus = "complete" | "warning" | "missing";
export type PlatformModuleHealth = "good" | "watch" | "setup";
export type PlatformActivityStatus = "success" | "warning" | "info";
export type PlatformAuditCategory =
  | "profile"
  | "modules"
  | "users"
  | "security"
  | "system";
export type PlatformAuditSeverity = "info" | "success" | "warning" | "critical";
export type PlatformSchoolUserRole =
  | "owner"
  | "admin"
  | "teacher"
  | "staff"
  | "viewer";
export type PlatformSchoolUserStatus = "active" | "invited" | "disabled";

export type PlatformSchoolOption = {
  id: string;
  name: string;
  nameAr?: string;
  shortName: string;
  shortNameAr?: string;
  initials: string;
  status: PlatformSchoolStatus;
  plan: PlatformSchoolPlan;
  health: PlatformSchoolHealth;
  students: number;
  users: number;
  modules: string;
  lastActivity: "12m" | "1h" | "2d" | "yesterday";
  academicYear: string;
  curriculum: string;
  curriculumAr?: string;
  principal: string;
  principalAr?: string;
  contactEmail: string;
  contactPhone: string;
  authDetails: {
    loginEmail: string;
    temporaryPassword: string;
    enabled: boolean;
    lastLogin?: string;
    lastLoginAr?: string;
  };
  city: string;
  cityAr?: string;
  address: string;
  addressAr?: string;
  locationLabel: string;
  locationLabelAr?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  operationalSummary: {
    attendanceRate: number;
    openAdmissions: number;
    enabledModules: number;
    totalModules: number;
  };
  configurationHealth: {
    key:
      | "branding"
      | "academicYear"
      | "users"
      | "modules"
      | "documents"
      | "notifications";
    status: ConfigurationHealthStatus;
  }[];
  recentActivity: {
    id: string;
    title: string;
    titleAr?: string;
    timestamp: string;
    timestampAr?: string;
    category: "configuration" | "security" | "sync" | "support";
    status: PlatformActivityStatus;
  }[];
  schoolUsers: {
    id: string;
    name: string;
    nameAr?: string;
    email: string;
    role: PlatformSchoolUserRole;
    status: PlatformSchoolUserStatus;
    lastActive: string;
    lastActiveAr?: string;
  }[];
  auditLog: {
    id: string;
    actor: string;
    actorAr?: string;
    action: string;
    actionAr?: string;
    description?: string;
    descriptionAr?: string;
    timestamp: string;
    timestampAr?: string;
    category: PlatformAuditCategory;
    severity: PlatformAuditSeverity;
    metadata?: Record<string, string>;
  }[];
  moduleUsage: {
    key:
      | "attendance"
      | "admissions"
      | "academics"
      | "nedaa"
      | "reinforcement"
      | "reports";
    enabled: boolean;
    usage: string;
    usageAr?: string;
    health: PlatformModuleHealth;
  }[];
};

export const mockPlatformSchools: PlatformSchoolOption[] = [
  {
    id: "school_123",
    name: "Al Noor International School",
    nameAr: "مدرسة النور الدولية",
    shortName: "Al Noor",
    shortNameAr: "النور",
    initials: "AN",
    status: "active",
    plan: "enterprise",
    health: "good",
    students: 1248,
    users: 184,
    modules: "12/14",
    lastActivity: "12m",
    academicYear: "2025/2026",
    curriculum: "American Diploma",
    curriculumAr: "الدبلومة الأمريكية",
    principal: "Noura Al Harbi",
    principalAr: "نورة الحربي",
    contactEmail: "admin@alnoor.edu",
    contactPhone: "+966 11 555 0184",
    authDetails: {
      loginEmail: "admin@alnoor.edu",
      temporaryPassword: "AlNoor123!",
      enabled: true,
      lastLogin: "12 minutes ago",
      lastLoginAr: "منذ 12 دقيقة",
    },
    city: "Riyadh",
    cityAr: "الرياض",
    address: "King Fahd Road, Al Olaya District",
    addressAr: "طريق الملك فهد، حي العليا",
    locationLabel: "Al Olaya campus",
    locationLabelAr: "حرم العليا",
    coordinates: { lat: 24.7136, lng: 46.6753 },
    operationalSummary: {
      attendanceRate: 94.6,
      openAdmissions: 128,
      enabledModules: 12,
      totalModules: 14,
    },
    configurationHealth: [
      { key: "branding", status: "complete" },
      { key: "academicYear", status: "complete" },
      { key: "users", status: "complete" },
      { key: "modules", status: "warning" },
      { key: "documents", status: "complete" },
      { key: "notifications", status: "complete" },
    ],
    recentActivity: [
      {
        id: "act_123_1",
        title: "Attendance sync completed",
        titleAr: "اكتملت مزامنة الحضور",
        timestamp: "12 minutes ago",
        timestampAr: "منذ 12 دقيقة",
        category: "sync",
        status: "success",
      },
      {
        id: "act_123_2",
        title: "Admissions documents updated",
        titleAr: "تم تحديث مستندات القبول",
        timestamp: "2 hours ago",
        timestampAr: "منذ ساعتين",
        category: "configuration",
        status: "info",
      },
      {
        id: "act_123_3",
        title: "New administrator invite accepted",
        titleAr: "تم قبول دعوة مدير جديد",
        timestamp: "Yesterday",
        timestampAr: "أمس",
        category: "security",
        status: "success",
      },
    ],
    schoolUsers: [
      {
        id: "user_123_owner",
        name: "Noura Al Harbi",
        nameAr: "نورة الحربي",
        email: "noura@alnoor.edu",
        role: "owner",
        status: "active",
        lastActive: "12 minutes ago",
        lastActiveAr: "منذ 12 دقيقة",
      },
      {
        id: "user_123_admin",
        name: "Ahmed Mostafa",
        nameAr: "أحمد مصطفى",
        email: "ahmed@alnoor.edu",
        role: "admin",
        status: "active",
        lastActive: "1 hour ago",
        lastActiveAr: "منذ ساعة",
      },
      {
        id: "user_123_teacher",
        name: "Sara Khaled",
        nameAr: "سارة خالد",
        email: "sara.khaled@alnoor.edu",
        role: "teacher",
        status: "active",
        lastActive: "Today",
        lastActiveAr: "اليوم",
      },
      {
        id: "user_123_staff",
        name: "Maha Salem",
        nameAr: "مها سالم",
        email: "maha.salem@alnoor.edu",
        role: "staff",
        status: "invited",
        lastActive: "Invite pending",
        lastActiveAr: "الدعوة معلقة",
      },
      {
        id: "user_123_viewer",
        name: "Yousef Amin",
        nameAr: "يوسف أمين",
        email: "yousef.amin@alnoor.edu",
        role: "viewer",
        status: "disabled",
        lastActive: "Last month",
        lastActiveAr: "الشهر الماضي",
      },
    ],
    auditLog: [
      {
        id: "audit_123_1",
        actor: "Ahmed Mostafa",
        actorAr: "أحمد مصطفى",
        action: "Updated school profile",
        actionAr: "حدّث ملف المدرسة",
        description: "Changed contact phone and location label.",
        descriptionAr: "تم تغيير هاتف التواصل ووسم الموقع.",
        timestamp: "12 minutes ago",
        timestampAr: "منذ 12 دقيقة",
        category: "profile",
        severity: "info",
        metadata: { source: "School profile" },
      },
      {
        id: "audit_123_2",
        actor: "Noura Al Harbi",
        actorAr: "نورة الحربي",
        action: "Enabled reports module",
        actionAr: "فعّلت وحدة التقارير",
        description: "Reports stayed available for all admin roles.",
        descriptionAr: "بقيت التقارير متاحة لكل أدوار الإدارة.",
        timestamp: "2 hours ago",
        timestampAr: "منذ ساعتين",
        category: "modules",
        severity: "success",
        metadata: { module: "reports" },
      },
      {
        id: "audit_123_3",
        actor: "System",
        actorAr: "النظام",
        action: "Attendance sync completed",
        actionAr: "اكتملت مزامنة الحضور",
        description: "Daily attendance import finished without errors.",
        descriptionAr: "اكتمل استيراد الحضور اليومي دون أخطاء.",
        timestamp: "Today",
        timestampAr: "اليوم",
        category: "system",
        severity: "success",
      },
      {
        id: "audit_123_4",
        actor: "Security monitor",
        actorAr: "مراقبة الأمان",
        action: "Administrator invite accepted",
        actionAr: "تم قبول دعوة مدير",
        description: "A new administrator completed account activation.",
        descriptionAr: "أكمل مدير جديد تفعيل الحساب.",
        timestamp: "Yesterday",
        timestampAr: "أمس",
        category: "security",
        severity: "info",
      },
    ],
    moduleUsage: [
      { key: "attendance", enabled: true, usage: "94.6% daily rate", usageAr: "94.6% معدل يومي", health: "good" },
      { key: "admissions", enabled: true, usage: "128 open applications", usageAr: "128 طلب مفتوح", health: "good" },
      { key: "academics", enabled: true, usage: "86 active classes", usageAr: "86 فصل نشط", health: "good" },
      { key: "nedaa", enabled: true, usage: "312 pickups this week", usageAr: "312 استلام هذا الأسبوع", health: "watch" },
      { key: "reinforcement", enabled: true, usage: "1,420 XP events", usageAr: "1,420 حدث XP", health: "good" },
      { key: "reports", enabled: true, usage: "18 exports this week", usageAr: "18 تصدير هذا الأسبوع", health: "good" },
    ],
  },
  {
    id: "school_204",
    name: "Future Leaders Academy",
    nameAr: "أكاديمية قادة المستقبل",
    shortName: "Future Leaders",
    shortNameAr: "قادة المستقبل",
    initials: "FL",
    status: "active",
    plan: "growth",
    health: "watch",
    students: 842,
    users: 96,
    modules: "10/14",
    lastActivity: "1h",
    academicYear: "2025/2026",
    curriculum: "British Curriculum",
    curriculumAr: "المنهج البريطاني",
    principal: "Omar Hassan",
    principalAr: "عمر حسن",
    contactEmail: "operations@futureleaders.edu",
    contactPhone: "+20 2 2477 2196",
    authDetails: {
      loginEmail: "operations@futureleaders.edu",
      temporaryPassword: "Future123!",
      enabled: true,
      lastLogin: "1 hour ago",
      lastLoginAr: "منذ ساعة",
    },
    city: "Cairo",
    cityAr: "القاهرة",
    address: "90 Street, New Cairo",
    addressAr: "شارع التسعين، القاهرة الجديدة",
    locationLabel: "New Cairo campus",
    locationLabelAr: "حرم القاهرة الجديدة",
    coordinates: { lat: 30.0074, lng: 31.4913 },
    operationalSummary: {
      attendanceRate: 89.8,
      openAdmissions: 74,
      enabledModules: 10,
      totalModules: 14,
    },
    configurationHealth: [
      { key: "branding", status: "complete" },
      { key: "academicYear", status: "complete" },
      { key: "users", status: "warning" },
      { key: "modules", status: "warning" },
      { key: "documents", status: "complete" },
      { key: "notifications", status: "warning" },
    ],
    recentActivity: [
      {
        id: "act_204_1",
        title: "Notification provider needs review",
        titleAr: "مزود الإشعارات يحتاج مراجعة",
        timestamp: "1 hour ago",
        timestampAr: "منذ ساعة",
        category: "configuration",
        status: "warning",
      },
      {
        id: "act_204_2",
        title: "Support ticket updated",
        titleAr: "تم تحديث تذكرة الدعم",
        timestamp: "4 hours ago",
        timestampAr: "منذ 4 ساعات",
        category: "support",
        status: "info",
      },
      {
        id: "act_204_3",
        title: "User role matrix exported",
        titleAr: "تم تصدير مصفوفة الأدوار",
        timestamp: "Yesterday",
        timestampAr: "أمس",
        category: "security",
        status: "success",
      },
    ],
    schoolUsers: [
      {
        id: "user_204_owner",
        name: "Omar Hassan",
        nameAr: "عمر حسن",
        email: "omar@futureleaders.edu",
        role: "owner",
        status: "active",
        lastActive: "1 hour ago",
        lastActiveAr: "منذ ساعة",
      },
      {
        id: "user_204_admin",
        name: "Laila Samir",
        nameAr: "ليلى سمير",
        email: "laila@futureleaders.edu",
        role: "admin",
        status: "active",
        lastActive: "4 hours ago",
        lastActiveAr: "منذ 4 ساعات",
      },
      {
        id: "user_204_teacher",
        name: "Karim Adel",
        nameAr: "كريم عادل",
        email: "karim.adel@futureleaders.edu",
        role: "teacher",
        status: "active",
        lastActive: "Yesterday",
        lastActiveAr: "أمس",
      },
      {
        id: "user_204_staff",
        name: "Dina Nabil",
        nameAr: "دينا نبيل",
        email: "dina.nabil@futureleaders.edu",
        role: "staff",
        status: "disabled",
        lastActive: "2 weeks ago",
        lastActiveAr: "منذ أسبوعين",
      },
      {
        id: "user_204_viewer",
        name: "Hany Fawzy",
        nameAr: "هاني فوزي",
        email: "hany.fawzy@futureleaders.edu",
        role: "viewer",
        status: "invited",
        lastActive: "Invite pending",
        lastActiveAr: "الدعوة معلقة",
      },
    ],
    auditLog: [
      {
        id: "audit_204_1",
        actor: "Omar Hassan",
        actorAr: "عمر حسن",
        action: "Reviewed notification provider",
        actionAr: "راجع مزود الإشعارات",
        description: "SMS provider credentials were checked after delivery warnings.",
        descriptionAr: "تم فحص بيانات مزود الرسائل بعد تحذيرات التسليم.",
        timestamp: "1 hour ago",
        timestampAr: "منذ ساعة",
        category: "system",
        severity: "warning",
      },
      {
        id: "audit_204_2",
        actor: "Platform admin",
        actorAr: "مدير المنصة",
        action: "Exported user role matrix",
        actionAr: "صدّر مصفوفة أدوار المستخدمين",
        description: "Role permissions were exported for internal review.",
        descriptionAr: "تم تصدير صلاحيات الأدوار للمراجعة الداخلية.",
        timestamp: "Yesterday",
        timestampAr: "أمس",
        category: "users",
        severity: "success",
      },
      {
        id: "audit_204_3",
        actor: "Support team",
        actorAr: "فريق الدعم",
        action: "Opened module health review",
        actionAr: "فتح مراجعة صحة الوحدات",
        description: "Nedaa and attendance usage were flagged for follow-up.",
        descriptionAr: "تم وضع نداء والحضور للمتابعة.",
        timestamp: "Yesterday",
        timestampAr: "أمس",
        category: "modules",
        severity: "warning",
      },
      {
        id: "audit_204_4",
        actor: "System",
        actorAr: "النظام",
        action: "Profile snapshot created",
        actionAr: "أنشأ لقطة لملف المدرسة",
        description: "A scheduled snapshot was stored for audit history.",
        descriptionAr: "تم حفظ لقطة مجدولة في سجل التدقيق.",
        timestamp: "2 days ago",
        timestampAr: "منذ يومين",
        category: "profile",
        severity: "info",
      },
    ],
    moduleUsage: [
      { key: "attendance", enabled: true, usage: "89.8% daily rate", usageAr: "89.8% معدل يومي", health: "watch" },
      { key: "admissions", enabled: true, usage: "74 open applications", usageAr: "74 طلب مفتوح", health: "good" },
      { key: "academics", enabled: true, usage: "52 active classes", usageAr: "52 فصل نشط", health: "good" },
      { key: "nedaa", enabled: true, usage: "198 pickups this week", usageAr: "198 استلام هذا الأسبوع", health: "watch" },
      { key: "reinforcement", enabled: false, usage: "Not enabled", usageAr: "غير مفعّل", health: "setup" },
      { key: "reports", enabled: true, usage: "9 exports this week", usageAr: "9 عمليات تصدير هذا الأسبوع", health: "good" },
    ],
  },
  {
    id: "school_317",
    name: "Cairo STEM School",
    nameAr: "مدرسة القاهرة للعلوم والتكنولوجيا",
    shortName: "Cairo STEM",
    shortNameAr: "القاهرة STEM",
    initials: "CS",
    status: "onboarding",
    plan: "enterprise",
    health: "setup",
    students: 516,
    users: 62,
    modules: "7/14",
    lastActivity: "yesterday",
    academicYear: "2025/2026",
    curriculum: "STEM Track",
    curriculumAr: "مسار العلوم والتكنولوجيا",
    principal: "Mariam Adel",
    principalAr: "مريم عادل",
    contactEmail: "setup@cairostem.edu",
    contactPhone: "+20 2 2600 7317",
    authDetails: {
      loginEmail: "setup@cairostem.edu",
      temporaryPassword: "StemSetup123!",
      enabled: true,
      lastLogin: "Yesterday",
      lastLoginAr: "أمس",
    },
    city: "Cairo",
    cityAr: "القاهرة",
    address: "Smart Village Road, 6th of October",
    addressAr: "طريق القرية الذكية، 6 أكتوبر",
    locationLabel: "October campus",
    locationLabelAr: "حرم أكتوبر",
    coordinates: { lat: 30.0726, lng: 31.0197 },
    operationalSummary: {
      attendanceRate: 82.4,
      openAdmissions: 211,
      enabledModules: 7,
      totalModules: 14,
    },
    configurationHealth: [
      { key: "branding", status: "warning" },
      { key: "academicYear", status: "complete" },
      { key: "users", status: "warning" },
      { key: "modules", status: "warning" },
      { key: "documents", status: "missing" },
      { key: "notifications", status: "missing" },
    ],
    recentActivity: [
      {
        id: "act_317_1",
        title: "Admissions setup checklist updated",
        titleAr: "تم تحديث قائمة إعداد القبول",
        timestamp: "Yesterday",
        timestampAr: "أمس",
        category: "configuration",
        status: "info",
      },
      {
        id: "act_317_2",
        title: "Document templates still pending",
        titleAr: "قوالب المستندات ما زالت معلقة",
        timestamp: "2 days ago",
        timestampAr: "منذ يومين",
        category: "configuration",
        status: "warning",
      },
      {
        id: "act_317_3",
        title: "Initial data import completed",
        titleAr: "اكتمل استيراد البيانات الأولي",
        timestamp: "3 days ago",
        timestampAr: "منذ 3 أيام",
        category: "sync",
        status: "success",
      },
    ],
    schoolUsers: [
      {
        id: "user_317_owner",
        name: "Mariam Adel",
        nameAr: "مريم عادل",
        email: "mariam@cairostem.edu",
        role: "owner",
        status: "active",
        lastActive: "Yesterday",
        lastActiveAr: "أمس",
      },
      {
        id: "user_317_admin",
        name: "Heba Lotfy",
        nameAr: "هبة لطفي",
        email: "heba@cairostem.edu",
        role: "admin",
        status: "active",
        lastActive: "2 days ago",
        lastActiveAr: "منذ يومين",
      },
      {
        id: "user_317_teacher",
        name: "Tamer Shoukry",
        nameAr: "تامر شكري",
        email: "tamer.shoukry@cairostem.edu",
        role: "teacher",
        status: "invited",
        lastActive: "Invite pending",
        lastActiveAr: "الدعوة معلقة",
      },
      {
        id: "user_317_staff",
        name: "Rana Emad",
        nameAr: "رنا عماد",
        email: "rana.emad@cairostem.edu",
        role: "staff",
        status: "active",
        lastActive: "3 days ago",
        lastActiveAr: "منذ 3 أيام",
      },
      {
        id: "user_317_viewer",
        name: "Mostafa Zaki",
        nameAr: "مصطفى زكي",
        email: "mostafa.zaki@cairostem.edu",
        role: "viewer",
        status: "disabled",
        lastActive: "Never",
        lastActiveAr: "لم ينشط",
      },
    ],
    auditLog: [
      {
        id: "audit_317_1",
        actor: "Mariam Adel",
        actorAr: "مريم عادل",
        action: "Updated admissions checklist",
        actionAr: "حدّثت قائمة إعداد القبول",
        description: "Missing document requirements were marked for setup.",
        descriptionAr: "تم تحديد متطلبات المستندات الناقصة للإعداد.",
        timestamp: "Yesterday",
        timestampAr: "أمس",
        category: "profile",
        severity: "info",
      },
      {
        id: "audit_317_2",
        actor: "Setup specialist",
        actorAr: "مختص الإعداد",
        action: "Disabled Nedaa during onboarding",
        actionAr: "عطّل نداء أثناء التهيئة",
        description: "Pickup workflows remain paused until parent data import is complete.",
        descriptionAr: "تبقى إجراءات الاستلام متوقفة حتى اكتمال استيراد بيانات أولياء الأمور.",
        timestamp: "2 days ago",
        timestampAr: "منذ يومين",
        category: "modules",
        severity: "warning",
      },
      {
        id: "audit_317_3",
        actor: "System",
        actorAr: "النظام",
        action: "Initial data import completed",
        actionAr: "اكتمل استيراد البيانات الأولي",
        description: "Student, class, and staff seed files were processed.",
        descriptionAr: "تمت معالجة ملفات الطلاب والفصول والموظفين الأولية.",
        timestamp: "3 days ago",
        timestampAr: "منذ 3 أيام",
        category: "system",
        severity: "success",
      },
      {
        id: "audit_317_4",
        actor: "Security monitor",
        actorAr: "مراقبة الأمان",
        action: "Temporary setup access granted",
        actionAr: "تم منح صلاحية إعداد مؤقتة",
        description: "Access expires after onboarding review.",
        descriptionAr: "تنتهي الصلاحية بعد مراجعة التهيئة.",
        timestamp: "3 days ago",
        timestampAr: "منذ 3 أيام",
        category: "security",
        severity: "info",
      },
    ],
    moduleUsage: [
      { key: "attendance", enabled: true, usage: "82.4% daily rate", usageAr: "82.4% معدل يومي", health: "watch" },
      { key: "admissions", enabled: true, usage: "211 open applications", usageAr: "211 طلب مفتوح", health: "watch" },
      { key: "academics", enabled: true, usage: "38 active classes", usageAr: "38 فصل نشط", health: "setup" },
      { key: "nedaa", enabled: false, usage: "Setup pending", usageAr: "الإعداد معلق", health: "setup" },
      { key: "reinforcement", enabled: false, usage: "Setup pending", usageAr: "الإعداد معلق", health: "setup" },
      { key: "reports", enabled: true, usage: "4 exports this week", usageAr: "4 عمليات تصدير هذا الأسبوع", health: "good" },
    ],
  },
  {
    id: "school_411",
    name: "Green Valley School",
    nameAr: "مدرسة الوادي الأخضر",
    shortName: "Green Valley",
    shortNameAr: "الوادي الأخضر",
    initials: "GV",
    status: "active",
    plan: "core",
    health: "good",
    students: 693,
    users: 78,
    modules: "8/14",
    lastActivity: "2d",
    academicYear: "2025/2026",
    curriculum: "National Curriculum",
    curriculumAr: "المنهج الوطني",
    principal: "Salma Ibrahim",
    principalAr: "سلمى إبراهيم",
    contactEmail: "info@greenvalley.edu",
    contactPhone: "+20 3 522 8411",
    authDetails: {
      loginEmail: "info@greenvalley.edu",
      temporaryPassword: "Green123!",
      enabled: true,
      lastLogin: "2 days ago",
      lastLoginAr: "منذ يومين",
    },
    city: "Alexandria",
    cityAr: "الإسكندرية",
    address: "Corniche Road, Stanley",
    addressAr: "طريق الكورنيش، ستانلي",
    locationLabel: "Stanley campus",
    locationLabelAr: "حرم ستانلي",
    coordinates: { lat: 31.2242, lng: 29.9626 },
    operationalSummary: {
      attendanceRate: 92.1,
      openAdmissions: 39,
      enabledModules: 8,
      totalModules: 14,
    },
    configurationHealth: [
      { key: "branding", status: "complete" },
      { key: "academicYear", status: "complete" },
      { key: "users", status: "complete" },
      { key: "modules", status: "complete" },
      { key: "documents", status: "warning" },
      { key: "notifications", status: "complete" },
    ],
    recentActivity: [
      {
        id: "act_411_1",
        title: "Weekly report exported",
        titleAr: "تم تصدير التقرير الأسبوعي",
        timestamp: "2 days ago",
        timestampAr: "منذ يومين",
        category: "sync",
        status: "success",
      },
      {
        id: "act_411_2",
        title: "Required document list reviewed",
        titleAr: "تمت مراجعة قائمة المستندات المطلوبة",
        timestamp: "3 days ago",
        timestampAr: "منذ 3 أيام",
        category: "configuration",
        status: "info",
      },
      {
        id: "act_411_3",
        title: "Support check-in completed",
        titleAr: "اكتملت متابعة الدعم",
        timestamp: "Last week",
        timestampAr: "الأسبوع الماضي",
        category: "support",
        status: "success",
      },
    ],
    schoolUsers: [
      {
        id: "user_411_owner",
        name: "Salma Ibrahim",
        nameAr: "سلمى إبراهيم",
        email: "salma@greenvalley.edu",
        role: "owner",
        status: "active",
        lastActive: "2 days ago",
        lastActiveAr: "منذ يومين",
      },
      {
        id: "user_411_admin",
        name: "Mona Farid",
        nameAr: "منى فريد",
        email: "mona@greenvalley.edu",
        role: "admin",
        status: "active",
        lastActive: "3 days ago",
        lastActiveAr: "منذ 3 أيام",
      },
      {
        id: "user_411_teacher",
        name: "Nader Ezz",
        nameAr: "نادر عز",
        email: "nader.ezz@greenvalley.edu",
        role: "teacher",
        status: "active",
        lastActive: "Last week",
        lastActiveAr: "الأسبوع الماضي",
      },
      {
        id: "user_411_staff",
        name: "Reem Yasser",
        nameAr: "ريم ياسر",
        email: "reem.yasser@greenvalley.edu",
        role: "staff",
        status: "active",
        lastActive: "Last week",
        lastActiveAr: "الأسبوع الماضي",
      },
      {
        id: "user_411_viewer",
        name: "Fady Kamal",
        nameAr: "فادي كمال",
        email: "fady.kamal@greenvalley.edu",
        role: "viewer",
        status: "disabled",
        lastActive: "Last month",
        lastActiveAr: "الشهر الماضي",
      },
    ],
    auditLog: [
      {
        id: "audit_411_1",
        actor: "Salma Ibrahim",
        actorAr: "سلمى إبراهيم",
        action: "Reviewed required documents",
        actionAr: "راجعت المستندات المطلوبة",
        description: "Document list was confirmed for the current academic year.",
        descriptionAr: "تم تأكيد قائمة المستندات للسنة الدراسية الحالية.",
        timestamp: "3 days ago",
        timestampAr: "منذ 3 أيام",
        category: "profile",
        severity: "success",
      },
      {
        id: "audit_411_2",
        actor: "Reports service",
        actorAr: "خدمة التقارير",
        action: "Generated weekly report",
        actionAr: "أنشأت التقرير الأسبوعي",
        description: "Operational report was exported for the leadership team.",
        descriptionAr: "تم تصدير تقرير العمليات لفريق القيادة.",
        timestamp: "2 days ago",
        timestampAr: "منذ يومين",
        category: "system",
        severity: "success",
      },
      {
        id: "audit_411_3",
        actor: "Platform admin",
        actorAr: "مدير المنصة",
        action: "Updated reinforcement access",
        actionAr: "حدّث صلاحية التعزيز",
        description: "Teacher access was expanded to the reinforcement module.",
        descriptionAr: "تم توسيع صلاحية المعلمين لوحدة التعزيز.",
        timestamp: "Last week",
        timestampAr: "الأسبوع الماضي",
        category: "modules",
        severity: "info",
      },
      {
        id: "audit_411_4",
        actor: "Security monitor",
        actorAr: "مراقبة الأمان",
        action: "Password policy check passed",
        actionAr: "نجح فحص سياسة كلمة المرور",
        description: "No weak administrator passwords were detected.",
        descriptionAr: "لم يتم اكتشاف كلمات مرور ضعيفة للمديرين.",
        timestamp: "Last week",
        timestampAr: "الأسبوع الماضي",
        category: "security",
        severity: "success",
      },
    ],
    moduleUsage: [
      { key: "attendance", enabled: true, usage: "92.1% daily rate", usageAr: "92.1% معدل يومي", health: "good" },
      { key: "admissions", enabled: true, usage: "39 open applications", usageAr: "39 طلب مفتوح", health: "good" },
      { key: "academics", enabled: true, usage: "44 active classes", usageAr: "44 فصل نشط", health: "good" },
      { key: "nedaa", enabled: false, usage: "Not included in plan", usageAr: "غير مشمول في الخطة", health: "setup" },
      { key: "reinforcement", enabled: true, usage: "680 XP events", usageAr: "680 حدث XP", health: "good" },
      { key: "reports", enabled: true, usage: "11 exports this week", usageAr: "11 تصدير هذا الأسبوع", health: "good" },
    ],
  },
  {
    id: "school_512",
    name: "Riyadh Digital Academy",
    nameAr: "أكاديمية الرياض الرقمية",
    shortName: "Riyadh Digital",
    shortNameAr: "الرياض الرقمية",
    initials: "RD",
    status: "suspended",
    plan: "growth",
    health: "critical",
    students: 391,
    users: 44,
    modules: "6/14",
    lastActivity: "2d",
    academicYear: "2025/2026",
    curriculum: "Blended Learning",
    curriculumAr: "التعلم المدمج",
    principal: "Fahad Al Mutairi",
    principalAr: "فهد المطيري",
    contactEmail: "admin@riyadhdigital.edu",
    contactPhone: "+966 11 882 0031",
    authDetails: {
      loginEmail: "admin@riyadhdigital.edu",
      temporaryPassword: "Riyadh123!",
      enabled: false,
      lastLogin: "Last week",
      lastLoginAr: "الأسبوع الماضي",
    },
    city: "Riyadh",
    cityAr: "الرياض",
    address: "Digital City, Al Nakheel",
    addressAr: "المدينة الرقمية، حي النخيل",
    locationLabel: "Digital City campus",
    locationLabelAr: "حرم المدينة الرقمية",
    coordinates: { lat: 24.7736, lng: 46.6437 },
    operationalSummary: {
      attendanceRate: 76.2,
      openAdmissions: 18,
      enabledModules: 6,
      totalModules: 14,
    },
    configurationHealth: [
      { key: "branding", status: "complete" },
      { key: "academicYear", status: "warning" },
      { key: "users", status: "warning" },
      { key: "modules", status: "missing" },
      { key: "documents", status: "warning" },
      { key: "notifications", status: "missing" },
    ],
    recentActivity: [
      {
        id: "act_512_1",
        title: "API error threshold exceeded",
        titleAr: "تم تجاوز حد أخطاء واجهة البرمجة",
        timestamp: "2 days ago",
        timestampAr: "منذ يومين",
        category: "sync",
        status: "warning",
      },
      {
        id: "act_512_2",
        title: "Account suspension reviewed",
        titleAr: "تمت مراجعة تعليق الحساب",
        timestamp: "3 days ago",
        timestampAr: "منذ 3 أيام",
        category: "security",
        status: "warning",
      },
      {
        id: "act_512_3",
        title: "Support escalation opened",
        titleAr: "تم فتح تصعيد دعم",
        timestamp: "Last week",
        timestampAr: "الأسبوع الماضي",
        category: "support",
        status: "info",
      },
    ],
    schoolUsers: [
      {
        id: "user_512_owner",
        name: "Fahad Al Mutairi",
        nameAr: "فهد المطيري",
        email: "fahad@riyadhdigital.edu",
        role: "owner",
        status: "disabled",
        lastActive: "Last week",
        lastActiveAr: "الأسبوع الماضي",
      },
      {
        id: "user_512_admin",
        name: "Khaled Mansour",
        nameAr: "خالد منصور",
        email: "khaled@riyadhdigital.edu",
        role: "admin",
        status: "disabled",
        lastActive: "Last week",
        lastActiveAr: "الأسبوع الماضي",
      },
      {
        id: "user_512_teacher",
        name: "Abeer Sultan",
        nameAr: "عبير سلطان",
        email: "abeer.sultan@riyadhdigital.edu",
        role: "teacher",
        status: "active",
        lastActive: "2 days ago",
        lastActiveAr: "منذ يومين",
      },
      {
        id: "user_512_staff",
        name: "Saad Rashed",
        nameAr: "سعد راشد",
        email: "saad.rashed@riyadhdigital.edu",
        role: "staff",
        status: "invited",
        lastActive: "Invite pending",
        lastActiveAr: "الدعوة معلقة",
      },
      {
        id: "user_512_viewer",
        name: "Huda Nasser",
        nameAr: "هدى ناصر",
        email: "huda.nasser@riyadhdigital.edu",
        role: "viewer",
        status: "disabled",
        lastActive: "Last month",
        lastActiveAr: "الشهر الماضي",
      },
    ],
    auditLog: [
      {
        id: "audit_512_1",
        actor: "System",
        actorAr: "النظام",
        action: "API error threshold exceeded",
        actionAr: "تم تجاوز حد أخطاء واجهة البرمجة",
        description: "Integration errors crossed the configured critical threshold.",
        descriptionAr: "تجاوزت أخطاء التكامل الحد الحرج المحدد.",
        timestamp: "2 days ago",
        timestampAr: "منذ يومين",
        category: "system",
        severity: "critical",
      },
      {
        id: "audit_512_2",
        actor: "Platform admin",
        actorAr: "مدير المنصة",
        action: "Reviewed account suspension",
        actionAr: "راجع تعليق الحساب",
        description: "School access remains suspended until billing and sync issues are resolved.",
        descriptionAr: "يبقى وصول المدرسة معلقًا حتى حل مشكلات الفوترة والمزامنة.",
        timestamp: "3 days ago",
        timestampAr: "منذ 3 أيام",
        category: "security",
        severity: "warning",
      },
      {
        id: "audit_512_3",
        actor: "Fahad Al Mutairi",
        actorAr: "فهد المطيري",
        action: "Requested module reactivation",
        actionAr: "طلب إعادة تفعيل الوحدات",
        description: "Nedaa and reinforcement reactivation is pending platform approval.",
        descriptionAr: "إعادة تفعيل نداء والتعزيز بانتظار موافقة المنصة.",
        timestamp: "Last week",
        timestampAr: "الأسبوع الماضي",
        category: "modules",
        severity: "warning",
      },
      {
        id: "audit_512_4",
        actor: "Support team",
        actorAr: "فريق الدعم",
        action: "Opened escalation case",
        actionAr: "فتح حالة تصعيد",
        description: "A critical support case was attached to the school profile.",
        descriptionAr: "تم ربط حالة دعم حرجة بملف المدرسة.",
        timestamp: "Last week",
        timestampAr: "الأسبوع الماضي",
        category: "users",
        severity: "info",
      },
    ],
    moduleUsage: [
      { key: "attendance", enabled: true, usage: "76.2% daily rate", usageAr: "76.2% معدل يومي", health: "watch" },
      { key: "admissions", enabled: true, usage: "18 open applications", usageAr: "18 طلب مفتوح", health: "watch" },
      { key: "academics", enabled: true, usage: "29 active classes", usageAr: "29 فصل نشط", health: "watch" },
      { key: "nedaa", enabled: false, usage: "Suspended", usageAr: "معلق", health: "setup" },
      { key: "reinforcement", enabled: false, usage: "Suspended", usageAr: "معلق", health: "setup" },
      { key: "reports", enabled: true, usage: "2 exports this week", usageAr: "عمليتا تصدير هذا الأسبوع", health: "watch" },
    ],
  },
];
