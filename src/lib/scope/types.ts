export type AppScope = "platform" | "school";

export type PlatformScope = {
  scope: "platform";
  selectedSchoolId?: string;
};

export type SchoolScope = {
  scope: "school";
  schoolId: string;
  academicYearId?: string;
  termId?: string;
};
