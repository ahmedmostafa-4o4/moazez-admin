export const SELECTED_SCHOOL_ID_STORAGE_KEY = "moazzez:selected-school-id";

export function getStoredSelectedSchoolId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(SELECTED_SCHOOL_ID_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredSelectedSchoolId(schoolId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(SELECTED_SCHOOL_ID_STORAGE_KEY, schoolId);
  } catch {
    // Ignore storage failures in restricted browser contexts.
  }
}

export function clearStoredSelectedSchoolId(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(SELECTED_SCHOOL_ID_STORAGE_KEY);
  } catch {
    // Ignore storage failures in restricted browser contexts.
  }
}
