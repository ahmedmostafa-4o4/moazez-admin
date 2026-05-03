export interface Student {
  id: string;
  full_name_en: string;
  full_name_ar: string;
  student_id: string;
  status: string;
  grade: string;
  gradeRequested?: string;
  section: string;
  risk_flags?: string[];
}
export interface StudentGuardian {}
export interface StudentDocument {}
export interface StudentMedicalProfile {}
export interface StudentTimelineEvent {}
export type StudentStatus = string;
