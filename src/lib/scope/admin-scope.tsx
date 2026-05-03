"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocale } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  mockPlatformSchools,
  type PlatformSchoolOption,
} from "@/features/platform/data/mockSchools";
import {
  getStoredSelectedSchoolId,
  setStoredSelectedSchoolId,
} from "./selected-school";

type AdminScope =
  | { mode: "platform"; selectedSchoolId: string }
  | { mode: "school"; schoolId: string };

type AdminScopeContextValue = {
  scope: AdminScope;
  mode: AdminScope["mode"];
  selectedSchoolId: string;
  selectedSchool?: PlatformSchoolOption;
  schools: PlatformSchoolOption[];
  selectSchool: (schoolId: string) => void;
  goToPlatform: () => void;
  goToSchoolProfile: (schoolId?: string) => void;
};

const AdminScopeContext = createContext<AdminScopeContextValue | null>(null);

const FALLBACK_SCHOOL_ID = "school_123";

function getDefaultSchoolId() {
  return (
    mockPlatformSchools.find((school) => school.status === "active")?.id ??
    FALLBACK_SCHOOL_ID
  );
}

function resolveSchoolId(schoolId?: string | string[] | null) {
  const candidate = Array.isArray(schoolId) ? schoolId[0] : schoolId;

  if (candidate && mockPlatformSchools.some((school) => school.id === candidate)) {
    return candidate;
  }

  const storedSchoolId = getStoredSelectedSchoolId();

  if (
    storedSchoolId &&
    mockPlatformSchools.some((school) => school.id === storedSchoolId)
  ) {
    return storedSchoolId;
  }

  return getDefaultSchoolId();
}

function isSchoolProfile(pathname: string) {
  return /\/platform\/schools\/[^/]+\/profile(?:\/)?$/.test(pathname);
}

export function AdminScopeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams<{ schoolId?: string | string[] }>();
  const router = useRouter();
  const routeSchoolId = params?.schoolId;
  const initialSchoolId = resolveSchoolId(routeSchoolId);
  const [selectedSchoolId, setSelectedSchoolId] = useState(initialSchoolId);
  const mode: AdminScope["mode"] = isSchoolProfile(pathname)
    ? "school"
    : "platform";
  const routeResolvedSchoolId = useMemo(
    () => resolveSchoolId(routeSchoolId),
    [routeSchoolId],
  );
  const effectiveSelectedSchoolId =
    mode === "school" ? routeResolvedSchoolId : selectedSchoolId;

  useEffect(() => {
    setSelectedSchoolId(routeResolvedSchoolId);
    setStoredSelectedSchoolId(routeResolvedSchoolId);
  }, [routeResolvedSchoolId]);

  const selectedSchool = useMemo(
    () =>
      mockPlatformSchools.find(
        (school) => school.id === effectiveSelectedSchoolId,
      ),
    [effectiveSelectedSchoolId],
  );

  const selectSchool = useCallback((schoolId: string) => {
    const nextSchoolId = resolveSchoolId(schoolId);
    setSelectedSchoolId(nextSchoolId);
    setStoredSelectedSchoolId(nextSchoolId);
  }, []);

  const goToPlatform = useCallback(() => {
    router.push(`/${locale}/platform/dashboard`);
  }, [locale, router]);

  const goToSchoolProfile = useCallback(
    (schoolId?: string) => {
      const nextSchoolId = resolveSchoolId(
        schoolId ?? effectiveSelectedSchoolId,
      );
      setSelectedSchoolId(nextSchoolId);
      setStoredSelectedSchoolId(nextSchoolId);
      router.push(`/${locale}/platform/schools/${nextSchoolId}/profile`);
    },
    [effectiveSelectedSchoolId, locale, router],
  );

  const scope = useMemo<AdminScope>(
    () =>
      mode === "school"
        ? { mode: "school", schoolId: effectiveSelectedSchoolId }
        : { mode: "platform", selectedSchoolId: effectiveSelectedSchoolId },
    [effectiveSelectedSchoolId, mode],
  );

  const value = useMemo<AdminScopeContextValue>(
    () => ({
      scope,
      mode,
      selectedSchoolId: effectiveSelectedSchoolId,
      selectedSchool,
      schools: mockPlatformSchools,
      selectSchool,
      goToPlatform,
      goToSchoolProfile,
    }),
    [
      scope,
      mode,
      effectiveSelectedSchoolId,
      selectedSchool,
      selectSchool,
      goToPlatform,
      goToSchoolProfile,
    ],
  );

  return (
    <AdminScopeContext.Provider value={value}>
      {children}
    </AdminScopeContext.Provider>
  );
}

export function useAdminScope() {
  const context = useContext(AdminScopeContext);

  if (!context) {
    throw new Error("useAdminScope must be used within AdminScopeProvider");
  }

  return context;
}

export function useOptionalAdminScope() {
  return useContext(AdminScopeContext);
}
