"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  mockPlatformSchools,
  type PlatformSchoolOption,
  type PlatformSchoolPlan,
} from "@/features/platform/data/mockSchools";

const PLATFORM_SCHOOLS_STORAGE_KEY = "moazzez.platform.schools";
const platformSchoolListeners = new Set<() => void>();

export type CreatePlatformSchoolInput = {
  name: string;
  nameAr: string;
  shortName: string;
  shortNameAr: string;
  initials: string;
  plan: PlatformSchoolPlan;
  academicYear: string;
  curriculum: string;
  curriculumAr: string;
  principal: string;
  principalAr: string;
  contactEmail: string;
  contactPhone: string;
  loginEmail: string;
  temporaryPassword: string;
  authEnabled: boolean;
  city: string;
  cityAr: string;
  address: string;
  addressAr: string;
  locationLabel: string;
  locationLabelAr: string;
};

export type MockAuthSession =
  | { type: "platform"; email: string }
  | { type: "school"; schoolId: string; email: string };

const MOCK_AUTH_SESSION_STORAGE_KEY = "moazzez.mock-auth-session";

function withDefaultAuthDetails(school: PlatformSchoolOption) {
  if (school.authDetails) {
    return school;
  }

  return {
    ...school,
    authDetails: {
      loginEmail: school.contactEmail,
      temporaryPassword: `${school.initials || "School"}123!`,
      enabled: school.status !== "suspended",
      lastLogin: school.lastActivity,
      lastLoginAr: undefined,
    },
  };
}

function readStoredPlatformSchools(): PlatformSchoolOption[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(PLATFORM_SCHOOLS_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed.map(withDefaultAuthDetails) : [];
  } catch {
    return [];
  }
}

function writeStoredPlatformSchools(schools: PlatformSchoolOption[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    PLATFORM_SCHOOLS_STORAGE_KEY,
    JSON.stringify(schools),
  );
}

function subscribeToPlatformSchools(listener: () => void) {
  platformSchoolListeners.add(listener);

  return () => {
    platformSchoolListeners.delete(listener);
  };
}

function notifyPlatformSchoolListeners() {
  platformSchoolListeners.forEach((listener) => listener());
}

function getStoredPlatformSchoolsSnapshot() {
  return JSON.stringify(readStoredPlatformSchools());
}

function getAllPlatformSchools() {
  const storedSchools = readStoredPlatformSchools();
  const storedIds = new Set(storedSchools.map((school) => school.id));

  return [
    ...storedSchools,
    ...mockPlatformSchools
      .filter((school) => !storedIds.has(school.id))
      .map(withDefaultAuthDetails),
  ];
}

export function createPlatformSchool(
  input: CreatePlatformSchoolInput,
): PlatformSchoolOption {
  const timestamp = Date.now();
  const id = `school_${timestamp}`;
  const initials = input.initials.trim().toUpperCase();

  return {
    id,
    name: input.name.trim(),
    nameAr: input.nameAr.trim(),
    shortName: input.shortName.trim(),
    shortNameAr: input.shortNameAr.trim(),
    initials,
    status: "onboarding",
    plan: input.plan,
    health: "setup",
    students: 0,
    users: 1,
    modules: "0/6",
    lastActivity: "12m",
    academicYear: input.academicYear.trim(),
    curriculum: input.curriculum.trim(),
    curriculumAr: input.curriculumAr.trim(),
    principal: input.principal.trim(),
    principalAr: input.principalAr.trim(),
    contactEmail: input.contactEmail.trim(),
    contactPhone: input.contactPhone.trim(),
    authDetails: {
      loginEmail: input.loginEmail.trim(),
      temporaryPassword: input.temporaryPassword.trim(),
      enabled: input.authEnabled,
      lastLogin: "Never",
      lastLoginAr: "لم يتم تسجيل الدخول",
    },
    city: input.city.trim(),
    cityAr: input.cityAr.trim(),
    address: input.address.trim(),
    addressAr: input.addressAr.trim(),
    locationLabel: input.locationLabel.trim(),
    locationLabelAr: input.locationLabelAr.trim(),
    coordinates: { lat: 0, lng: 0 },
    operationalSummary: {
      attendanceRate: 0,
      openAdmissions: 0,
      enabledModules: 0,
      totalModules: 6,
    },
    configurationHealth: [
      { key: "branding", status: "warning" },
      { key: "academicYear", status: "complete" },
      { key: "users", status: "warning" },
      { key: "modules", status: "missing" },
      { key: "documents", status: "missing" },
      { key: "notifications", status: "missing" },
    ],
    recentActivity: [
      {
        id: `act_${timestamp}_created`,
        title: "School created",
        titleAr: "تم إنشاء المدرسة",
        timestamp: "12 minutes ago",
        timestampAr: "منذ 12 دقيقة",
        category: "configuration",
        status: "info",
      },
    ],
    schoolUsers: [
      {
        id: `user_${timestamp}_owner`,
        name: input.principal.trim(),
        nameAr: input.principalAr.trim(),
        email: input.contactEmail.trim(),
        role: "owner",
        status: "invited",
        lastActive: "Invite pending",
        lastActiveAr: "الدعوة معلقة",
      },
    ],
    auditLog: [
      {
        id: `audit_${timestamp}_created`,
        actor: "Platform admin",
        actorAr: "مدير المنصة",
        action: "School profile created",
        actionAr: "تم إنشاء ملف المدرسة",
        description: "A new school was created locally from the schools directory.",
        descriptionAr: "تم إنشاء مدرسة جديدة محليًا من دليل المدارس.",
        timestamp: "12 minutes ago",
        timestampAr: "منذ 12 دقيقة",
        category: "profile",
        severity: "success",
        metadata: { source: "Schools directory" },
      },
    ],
    moduleUsage: [
      {
        key: "attendance",
        enabled: false,
        usage: "Setup pending",
        usageAr: "الإعداد معلق",
        health: "setup",
      },
      {
        key: "admissions",
        enabled: false,
        usage: "Setup pending",
        usageAr: "الإعداد معلق",
        health: "setup",
      },
      {
        key: "academics",
        enabled: false,
        usage: "Setup pending",
        usageAr: "الإعداد معلق",
        health: "setup",
      },
      {
        key: "nedaa",
        enabled: false,
        usage: "Setup pending",
        usageAr: "الإعداد معلق",
        health: "setup",
      },
      {
        key: "reinforcement",
        enabled: false,
        usage: "Setup pending",
        usageAr: "الإعداد معلق",
        health: "setup",
      },
      {
        key: "reports",
        enabled: false,
        usage: "Setup pending",
        usageAr: "الإعداد معلق",
        health: "setup",
      },
    ],
  };
}

export function usePlatformSchools() {
  const storedSchoolsSnapshot = useSyncExternalStore(
    subscribeToPlatformSchools,
    getStoredPlatformSchoolsSnapshot,
    () => "[]",
  );

  const storedSchools = useMemo<PlatformSchoolOption[]>(
    () => JSON.parse(storedSchoolsSnapshot) as PlatformSchoolOption[],
    [storedSchoolsSnapshot],
  );

  const schools = useMemo(() => {
    const storedIds = new Set(storedSchools.map((school) => school.id));

    return [
      ...storedSchools,
      ...mockPlatformSchools
        .filter((school) => !storedIds.has(school.id))
        .map(withDefaultAuthDetails),
    ];
  }, [storedSchools]);

  const addSchool = useCallback((input: CreatePlatformSchoolInput) => {
    const school = createPlatformSchool(input);
    const nextSchools = [school, ...readStoredPlatformSchools()];
    writeStoredPlatformSchools(nextSchools);
    notifyPlatformSchoolListeners();

    return school;
  }, []);

  const updateSchool = useCallback((school: PlatformSchoolOption) => {
    const storedSchools = readStoredPlatformSchools();
    const isStoredSchool = storedSchools.some((item) => item.id === school.id);
    const nextSchools = isStoredSchool
      ? storedSchools.map((item) => (item.id === school.id ? school : item))
      : [school, ...storedSchools];

    writeStoredPlatformSchools(nextSchools);
    notifyPlatformSchoolListeners();
  }, []);

  return { schools, addSchool, updateSchool };
}

export function findMockAuthSession(
  email: string,
  password: string,
): MockAuthSession | undefined {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (normalizedEmail === "admin@school.edu" && normalizedPassword === "Admin123!") {
    return { type: "platform", email: normalizedEmail };
  }

  const school = getAllPlatformSchools().find((item) => {
    const auth = item.authDetails;

    return (
      auth.enabled &&
      auth.loginEmail.trim().toLowerCase() === normalizedEmail &&
      auth.temporaryPassword.trim() === normalizedPassword
    );
  });

  if (!school) {
    return undefined;
  }

  return { type: "school", schoolId: school.id, email: normalizedEmail };
}

export function setMockAuthSession(session: MockAuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    MOCK_AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
}

export function recordSchoolLogin(schoolId: string) {
  const storedSchools = readStoredPlatformSchools();
  const storedSchool = storedSchools.find((school) => school.id === schoolId);

  if (!storedSchool) {
    return;
  }

  const nextSchools = storedSchools.map((school) =>
    school.id === schoolId
      ? {
          ...school,
          authDetails: {
            ...school.authDetails,
            lastLogin: "Just now",
            lastLoginAr: "الآن",
          },
        }
      : school,
  );

  writeStoredPlatformSchools(nextSchools);
  notifyPlatformSchoolListeners();
}
