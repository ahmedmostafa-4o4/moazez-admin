export type PlatformSchoolOption = {
  id: string;
  name: string;
  nameAr?: string;
  status: "active" | "onboarding" | "suspended";
  plan: "enterprise" | "growth" | "core";
  students: number;
  health: "good" | "watch" | "setup" | "critical";
};

export const mockPlatformSchools: PlatformSchoolOption[] = [
  {
    id: "school_123",
    name: "Al Noor International School",
    nameAr: "مدرسة النور الدولية",
    status: "active",
    plan: "enterprise",
    students: 1248,
    health: "good",
  },
  {
    id: "school_204",
    name: "Future Leaders Academy",
    nameAr: "أكاديمية قادة المستقبل",
    status: "active",
    plan: "growth",
    students: 842,
    health: "watch",
  },
  {
    id: "school_317",
    name: "Cairo STEM School",
    nameAr: "مدرسة القاهرة للعلوم والتكنولوجيا",
    status: "onboarding",
    plan: "enterprise",
    students: 516,
    health: "setup",
  },
  {
    id: "school_411",
    name: "Green Valley School",
    nameAr: "مدرسة الوادي الأخضر",
    status: "active",
    plan: "core",
    students: 693,
    health: "good",
  },
  {
    id: "school_512",
    name: "Riyadh Digital Academy",
    nameAr: "أكاديمية الرياض الرقمية",
    status: "suspended",
    plan: "growth",
    students: 391,
    health: "critical",
  },
];
