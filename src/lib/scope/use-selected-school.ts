"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  mockPlatformSchools,
  type PlatformSchoolOption,
} from "@/features/platform/data/mockSchools";
import { usePlatformSchools } from "@/features/platform/data/platformSchoolStore";
import {
  clearStoredSelectedSchoolId,
  getStoredSelectedSchoolId,
  setStoredSelectedSchoolId,
} from "./selected-school";

const FALLBACK_SCHOOL_ID = "school_123";

function getDefaultSchoolId() {
  return (
    mockPlatformSchools.find((school) => school.status === "active")?.id ??
    FALLBACK_SCHOOL_ID
  );
}

function getInitialSelectedSchoolId(urlSchoolId: string | null) {
  return urlSchoolId ?? getStoredSelectedSchoolId() ?? getDefaultSchoolId();
}

export function useSelectedSchool() {
  const searchParams = useSearchParams();
  const urlSchoolId = searchParams.get("schoolId");
  const { schools } = usePlatformSchools();
  const [selectedSchoolId, setSelectedSchoolIdState] = useState(() =>
    getInitialSelectedSchoolId(urlSchoolId),
  );

  useEffect(() => {
    if (urlSchoolId && urlSchoolId !== selectedSchoolId) {
      queueMicrotask(() => {
        setSelectedSchoolIdState(urlSchoolId);
        setStoredSelectedSchoolId(urlSchoolId);
      });
    }
  }, [selectedSchoolId, urlSchoolId]);

  useEffect(() => {
    if (selectedSchoolId) {
      setStoredSelectedSchoolId(selectedSchoolId);
    }
  }, [selectedSchoolId]);

  const selectedSchool = useMemo<PlatformSchoolOption | undefined>(
    () => schools.find((school) => school.id === selectedSchoolId),
    [schools, selectedSchoolId],
  );

  const setSelectedSchoolId = useCallback((schoolId: string) => {
    setSelectedSchoolIdState(schoolId);
    setStoredSelectedSchoolId(schoolId);
  }, []);

  const clearSelectedSchool = useCallback(() => {
    const nextSchoolId = getDefaultSchoolId();
    clearStoredSelectedSchoolId();
    setSelectedSchoolIdState(nextSchoolId);
  }, []);

  return {
    selectedSchoolId,
    selectedSchool,
    schools,
    setSelectedSchoolId,
    clearSelectedSchool,
  };
}
