// FILE: src/types/index.ts
// Main type exports for the application

// Admissions Module
export * from "@/features/admissions/types/admissions";

// Students Module (with renamed exports to avoid conflicts)
export type {
  Student,
} from "@/features/students-guardians/students/types";

// Re-export DocumentStatus from students with alias to avoid conflict

// Notifications Module
export * from "./notifications";

// Note: For better tree-shaking and explicit imports, prefer importing from specific modules:
// import type { Application } from "@/types/admissions";
// import type { Student } from "@/features/students-guardians/students/types";
// import type { Notification } from "@/types/notifications";
