"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Power,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  UserCog,
  Users,
  XCircle,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modal";
import { Input, Select, TextArea } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/Toast";
import {
  type ConfigurationHealthStatus,
  type PlatformActivityStatus,
  type PlatformAuditCategory,
  type PlatformAuditSeverity,
  type PlatformModuleHealth,
  type PlatformSchoolHealth,
  type PlatformSchoolOption,
  type PlatformSchoolUserRole,
  type PlatformSchoolUserStatus,
} from "@/features/platform/data/mockSchools";
import { usePlatformSchools } from "@/features/platform/data/platformSchoolStore";

type ModuleUsageItem = PlatformSchoolOption["moduleUsage"][number];
type AuditLogItem = PlatformSchoolOption["auditLog"][number];
type SchoolUserItem = PlatformSchoolOption["schoolUsers"][number];
type EditableSchoolProfile = Pick<
  PlatformSchoolOption,
  | "name"
  | "nameAr"
  | "shortName"
  | "shortNameAr"
  | "initials"
  | "status"
  | "plan"
  | "health"
  | "academicYear"
  | "curriculum"
  | "curriculumAr"
  | "principal"
  | "principalAr"
  | "contactEmail"
  | "contactPhone"
  | "city"
  | "cityAr"
  | "address"
  | "addressAr"
  | "locationLabel"
  | "locationLabelAr"
> & {
  loginEmail: string;
  temporaryPassword: string;
  authEnabled: boolean;
};
type EditableSchoolProfileField = keyof EditableSchoolProfile;
type EditProfileErrors = Partial<Record<EditableSchoolProfileField, string>>;

const healthClassName: Record<PlatformSchoolHealth, string> = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watch: "border-amber-200 bg-amber-50 text-amber-700",
  setup: "border-indigo-200 bg-indigo-50 text-indigo-700",
  critical: "border-red-200 bg-red-50 text-red-700",
};

const statusClassName: Record<PlatformSchoolOption["status"], string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  onboarding: "border-blue-200 bg-blue-50 text-blue-700",
  suspended: "border-red-200 bg-red-50 text-red-700",
};

const configurationClassName: Record<ConfigurationHealthStatus, string> = {
  complete: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  missing: "border-red-200 bg-red-50 text-red-700",
};

const moduleClassName: Record<PlatformModuleHealth, string> = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watch: "border-amber-200 bg-amber-50 text-amber-700",
  setup: "border-indigo-200 bg-indigo-50 text-indigo-700",
};

const activityClassName: Record<PlatformActivityStatus, string> = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  info: "bg-blue-50 text-blue-700",
};

const auditSeverityClassName: Record<PlatformAuditSeverity, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  critical: "border-red-200 bg-red-50 text-red-700",
};

const schoolUserStatusClassName: Record<PlatformSchoolUserStatus, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  invited: "border-blue-200 bg-blue-50 text-blue-700",
  disabled: "border-gray-200 bg-gray-50 text-gray-500",
};

const schoolUserRoleClassName: Record<PlatformSchoolUserRole, string> = {
  owner: "border-purple-200 bg-purple-50 text-purple-700",
  admin: "border-indigo-200 bg-indigo-50 text-indigo-700",
  teacher: "border-emerald-200 bg-emerald-50 text-emerald-700",
  staff: "border-amber-200 bg-amber-50 text-amber-700",
  viewer: "border-gray-200 bg-gray-50 text-gray-500",
};

const schoolUserRoleOptions: (PlatformSchoolUserRole | "all")[] = [
  "all",
  "owner",
  "admin",
  "teacher",
  "staff",
  "viewer",
];

const schoolUserStatusOptions: (PlatformSchoolUserStatus | "all")[] = [
  "all",
  "active",
  "invited",
  "disabled",
];

const auditCategoryOptions: (PlatformAuditCategory | "all")[] = [
  "all",
  "profile",
  "modules",
  "users",
  "security",
  "system",
];

const auditSeverityOptions: (PlatformAuditSeverity | "all")[] = [
  "all",
  "info",
  "success",
  "warning",
  "critical",
];

const configurationIcon = {
  branding: Building2,
  academicYear: CalendarDays,
  users: Users,
  modules: SlidersHorizontal,
  documents: FileText,
  notifications: MessageSquare,
};

const moduleIcon = {
  attendance: CheckCircle2,
  admissions: GraduationCap,
  academics: BookOpen,
  nedaa: MessageSquare,
  reinforcement: ShieldCheck,
  reports: FileText,
};

const quickActionIcon = {
  editProfile: Settings,
  manageUsers: UserCog,
  configureModules: SlidersHorizontal,
  viewAuditLog: ShieldCheck,
  suspendSchool: Power,
};

const statusOptions: PlatformSchoolOption["status"][] = [
  "active",
  "onboarding",
  "suspended",
];

const planOptions: PlatformSchoolOption["plan"][] = [
  "enterprise",
  "growth",
  "core",
];

const healthOptions: PlatformSchoolOption["health"][] = [
  "good",
  "watch",
  "setup",
  "critical",
];

function StatusIcon({ status }: { status: ConfigurationHealthStatus }) {
  if (status === "complete") {
    return <CheckCircle2 className="h-4 w-4" />;
  }

  if (status === "missing") {
    return <XCircle className="h-4 w-4" />;
  }

  return <Clock3 className="h-4 w-4" />;
}

interface ConfigureModulesModalProps {
  isOpen: boolean;
  modules: ModuleUsageItem[];
  originalModules: ModuleUsageItem[];
  isArabic: boolean;
  onClose: () => void;
  onSave: (modules: ModuleUsageItem[]) => void;
  t: ReturnType<typeof useTranslations>;
}

function cloneModules(modules: ModuleUsageItem[]) {
  return modules.map((module) => ({ ...module }));
}

function cloneSchoolUsers(users: SchoolUserItem[]) {
  return users.map((user) => ({ ...user }));
}

function getEditableProfile(profile: PlatformSchoolOption): EditableSchoolProfile {
  return {
    name: profile.name,
    nameAr: profile.nameAr,
    shortName: profile.shortName,
    shortNameAr: profile.shortNameAr,
    initials: profile.initials,
    status: profile.status,
    plan: profile.plan,
    health: profile.health,
    academicYear: profile.academicYear,
    curriculum: profile.curriculum,
    curriculumAr: profile.curriculumAr,
    principal: profile.principal,
    principalAr: profile.principalAr,
    contactEmail: profile.contactEmail,
    contactPhone: profile.contactPhone,
    city: profile.city,
    cityAr: profile.cityAr,
    address: profile.address,
    addressAr: profile.addressAr,
    locationLabel: profile.locationLabel,
    locationLabelAr: profile.locationLabelAr,
    loginEmail: profile.authDetails.loginEmail,
    temporaryPassword: profile.authDetails.temporaryPassword,
    authEnabled: profile.authDetails.enabled,
  };
}

function applyEditableProfile(
  profile: PlatformSchoolOption,
  draft: EditableSchoolProfile,
): PlatformSchoolOption {
  return {
    ...profile,
    name: draft.name,
    nameAr: draft.nameAr,
    shortName: draft.shortName,
    shortNameAr: draft.shortNameAr,
    initials: draft.initials.trim().toUpperCase(),
    status: draft.status,
    plan: draft.plan,
    health: draft.health,
    academicYear: draft.academicYear,
    curriculum: draft.curriculum,
    curriculumAr: draft.curriculumAr,
    principal: draft.principal,
    principalAr: draft.principalAr,
    contactEmail: draft.contactEmail,
    contactPhone: draft.contactPhone,
    city: draft.city,
    cityAr: draft.cityAr,
    address: draft.address,
    addressAr: draft.addressAr,
    locationLabel: draft.locationLabel,
    locationLabelAr: draft.locationLabelAr,
    authDetails: {
      ...profile.authDetails,
      loginEmail: draft.loginEmail.trim(),
      temporaryPassword: draft.temporaryPassword.trim(),
      enabled: draft.authEnabled,
    },
  };
}

function validateEditableProfile(
  draft: EditableSchoolProfile,
  t: ReturnType<typeof useTranslations>,
): EditProfileErrors {
  const requiredFields: EditableSchoolProfileField[] = [
    "name",
    "shortName",
    "initials",
    "academicYear",
    "principal",
    "contactEmail",
    "contactPhone",
    "loginEmail",
    "temporaryPassword",
    "city",
    "address",
  ];

  return requiredFields.reduce<EditProfileErrors>((errors, field) => {
    const value = draft[field];

    if (typeof value === "string" && value.trim().length === 0) {
      errors[field] = t("editProfile.required");
    }

    return errors;
  }, {});
}

function ConfigureModulesModal({
  isOpen,
  modules,
  originalModules,
  isArabic,
  onClose,
  onSave,
  t,
}: ConfigureModulesModalProps) {
  const [pendingModules, setPendingModules] = useState<ModuleUsageItem[]>(() =>
    cloneModules(modules),
  );

  const toggleModule = (moduleKey: ModuleUsageItem["key"]) => {
    setPendingModules((current) =>
      current.map((module) =>
        module.key === moduleKey
          ? { ...module, enabled: !module.enabled }
          : module,
      ),
    );
  };

  const enabledCount = pendingModules.filter((module) => module.enabled).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("configureModules.title")}
      description={t("configureModules.description")}
      size="xl"
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setPendingModules(cloneModules(originalModules))}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("configureModules.reset")}
          </button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
            >
              {t("configureModules.cancel")}
            </button>
            <button
              type="button"
              onClick={() => onSave(cloneModules(pendingModules))}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-hover"
            >
              {t("configureModules.save")}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 pb-4">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-900">
            {t("configureModules.enabledSummary", {
              enabled: enabledCount,
              total: pendingModules.length,
            })}
          </p>
        </div>

        <div className="space-y-3">
          {pendingModules.map((module) => {
            const Icon = moduleIcon[module.key];
            const usage =
              isArabic && module.usageAr ? module.usageAr : module.usage;
            const switchLabel = module.enabled
              ? t("configureModules.disableModule", {
                  module: t(`modules.items.${module.key}`),
                })
              : t("configureModules.enableModule", {
                  module: t(`modules.items.${module.key}`),
                });

            return (
              <div
                key={module.key}
                className="rounded-lg border border-gray-100 p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {t(`modules.items.${module.key}`)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{usage}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${moduleClassName[module.health]}`}
                        >
                          {t(`modules.health.${module.health}`)}
                        </span>
                        <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
                          {module.enabled
                            ? t("modules.enabled")
                            : t("modules.disabled")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={module.enabled}
                    aria-label={switchLabel}
                    onClick={() => toggleModule(module.key)}
                    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      module.enabled ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        module.enabled
                          ? isArabic
                            ? "-translate-x-6"
                            : "translate-x-6"
                          : isArabic
                            ? "-translate-x-1"
                            : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

interface EditSchoolProfileModalProps {
  isOpen: boolean;
  profile: PlatformSchoolOption;
  originalProfile: PlatformSchoolOption;
  onClose: () => void;
  onSave: (profile: PlatformSchoolOption) => void;
  t: ReturnType<typeof useTranslations>;
  scopeT: ReturnType<typeof useTranslations>;
}

interface AuditLogModalProps {
  isOpen: boolean;
  auditLog: AuditLogItem[];
  isArabic: boolean;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}

interface ManageUsersModalProps {
  isOpen: boolean;
  users: SchoolUserItem[];
  isArabic: boolean;
  onClose: () => void;
  onToggleStatus: (userId: string) => void;
  t: ReturnType<typeof useTranslations>;
}

interface SuspendSchoolModalProps {
  isOpen: boolean;
  profile: PlatformSchoolOption;
  schoolName: string;
  onClose: () => void;
  onConfirm: () => void;
  t: ReturnType<typeof useTranslations>;
  scopeT: ReturnType<typeof useTranslations>;
}

function EditSchoolProfileModal({
  isOpen,
  profile,
  originalProfile,
  onClose,
  onSave,
  t,
  scopeT,
}: EditSchoolProfileModalProps) {
  const [draft, setDraft] = useState<EditableSchoolProfile>(() =>
    getEditableProfile(profile),
  );
  const [errors, setErrors] = useState<EditProfileErrors>({});

  const setField = <Field extends EditableSchoolProfileField>(
    field: Field,
    value: EditableSchoolProfile[Field],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleReset = () => {
    setDraft(getEditableProfile(originalProfile));
    setErrors({});
  };

  const handleSave = () => {
    const nextErrors = validateEditableProfile(draft, t);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(applyEditableProfile(profile, draft));
  };

  const renderTextField = (
    field: EditableSchoolProfileField,
    label: string,
    options?: { multiline?: boolean; dir?: "ltr" | "rtl" },
  ) => {
    const value = draft[field];
    const stringValue = typeof value === "string" ? value : "";

    if (options?.multiline) {
      return (
        <TextArea
          label={label}
          value={stringValue}
          onChange={(event) => setField(field, event.target.value)}
          error={errors[field]}
          dir={options.dir}
          rows={3}
        />
      );
    }

    return (
      <Input
        label={label}
        type="text"
        value={stringValue}
        onChange={(event) => setField(field, event.target.value)}
        error={errors[field]}
        dir={options?.dir}
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("editProfile.title")}
      description={t("editProfile.description")}
      size="xl"
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("editProfile.reset")}
          </button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
            >
              {t("editProfile.cancel")}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-hover"
            >
              {t("editProfile.save")}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 pb-4">
        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("editProfile.sections.identity")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderTextField("name", t("editProfile.fields.name"))}
            {renderTextField("nameAr", t("editProfile.fields.nameAr"), {
              dir: "rtl",
            })}
            {renderTextField("shortName", t("editProfile.fields.shortName"))}
            {renderTextField("shortNameAr", t("editProfile.fields.shortNameAr"), {
              dir: "rtl",
            })}
            {renderTextField("initials", t("editProfile.fields.initials"))}
            {renderTextField(
              "academicYear",
              t("editProfile.fields.academicYear"),
            )}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("editProfile.sections.classification")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Select
              label={t("editProfile.fields.status")}
              value={draft.status}
              onChange={(value) =>
                setField(
                  "status",
                  value as EditableSchoolProfile["status"],
                )
              }
              options={statusOptions.map((status) => ({
                value: status,
                label: scopeT(`status.${status}`),
              }))}
            />
            <Select
              label={t("editProfile.fields.plan")}
              value={draft.plan}
              onChange={(value) =>
                setField(
                  "plan",
                  value as EditableSchoolProfile["plan"],
                )
              }
              options={planOptions.map((plan) => ({
                value: plan,
                label: scopeT(`plan.${plan}`),
              }))}
            />
            <Select
              label={t("editProfile.fields.health")}
              value={draft.health}
              onChange={(value) =>
                setField(
                  "health",
                  value as EditableSchoolProfile["health"],
                )
              }
              options={healthOptions.map((health) => ({
                value: health,
                label: scopeT(`health.${health}`),
              }))}
            />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("editProfile.sections.academic")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderTextField("curriculum", t("editProfile.fields.curriculum"))}
            {renderTextField("curriculumAr", t("editProfile.fields.curriculumAr"), {
              dir: "rtl",
            })}
            {renderTextField("principal", t("editProfile.fields.principal"))}
            {renderTextField("principalAr", t("editProfile.fields.principalAr"), {
              dir: "rtl",
            })}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("editProfile.sections.contact")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderTextField("contactEmail", t("editProfile.fields.email"))}
            {renderTextField("contactPhone", t("editProfile.fields.phone"))}
            {renderTextField("city", t("editProfile.fields.city"))}
            {renderTextField("cityAr", t("editProfile.fields.cityAr"), {
              dir: "rtl",
            })}
            {renderTextField("locationLabel", t("editProfile.fields.locationLabel"))}
            {renderTextField(
              "locationLabelAr",
              t("editProfile.fields.locationLabelAr"),
              { dir: "rtl" },
            )}
            {renderTextField("address", t("editProfile.fields.address"), {
              multiline: true,
            })}
            {renderTextField("addressAr", t("editProfile.fields.addressAr"), {
              multiline: true,
              dir: "rtl",
            })}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("editProfile.sections.auth")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            {renderTextField("loginEmail", t("editProfile.fields.loginEmail"))}
            {renderTextField(
              "temporaryPassword",
              t("editProfile.fields.temporaryPassword"),
            )}
            <Select
              label={t("editProfile.fields.authEnabled")}
              value={String(draft.authEnabled)}
              onChange={(value) => setField("authEnabled", value === "true")}
              options={[
                { value: "true", label: t("loginPanel.enabled") },
                { value: "false", label: t("loginPanel.disabled") },
              ]}
            />
          </div>
        </section>
      </div>
    </Modal>
  );
}

function ManageUsersModal({
  isOpen,
  users,
  isArabic,
  onClose,
  onToggleStatus,
  t,
}: ManageUsersModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<PlatformSchoolUserRole | "all">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<
    PlatformSchoolUserStatus | "all"
  >("all");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (roleFilter !== "all" && user.role !== roleFilter) {
      return false;
    }

    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false;
    }

    if (!normalizedSearchQuery) {
      return true;
    }

    const localizedName = isArabic && user.nameAr ? user.nameAr : user.name;

    return [localizedName, user.name, user.email]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearchQuery);
  });

  const clearFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("manageUsers.title")}
      description={t("manageUsers.description")}
      size="xl"
      footer={
        <div className="flex w-full justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("manageUsers.close")}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pb-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px_auto] lg:items-end">
          <Input
            label={t("manageUsers.searchLabel")}
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("manageUsers.searchPlaceholder")}
            leftIcon={<Search className="h-4 w-4" />}
          />

          <Select
            label={t("manageUsers.roleLabel")}
            value={roleFilter}
            onChange={(value) =>
              setRoleFilter(value as PlatformSchoolUserRole | "all")
            }
            options={schoolUserRoleOptions.map((role) => ({
              value: role,
              label: t(`manageUsers.roles.${role}`),
            }))}
          />

          <Select
            label={t("manageUsers.statusLabel")}
            value={statusFilter}
            onChange={(value) =>
              setStatusFilter(value as PlatformSchoolUserStatus | "all")
            }
            options={schoolUserStatusOptions.map((status) => ({
              value: status,
              label: t(`manageUsers.statuses.${status}`),
            }))}
          />

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("manageUsers.clearFilters")}
          </button>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-900">
            {t("manageUsers.resultSummary", {
              count: filteredUsers.length,
              total: users.length,
            })}
          </p>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="space-y-3">
            {filteredUsers.map((user) => {
              const name = isArabic && user.nameAr ? user.nameAr : user.name;
              const lastActive =
                isArabic && user.lastActiveAr
                  ? user.lastActiveAr
                  : user.lastActive;
              const isInvited = user.status === "invited";
              const isDisabled = user.status === "disabled";

              return (
                <article
                  key={user.id}
                  className="rounded-lg border border-gray-100 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <UserCog className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {name}
                        </h3>
                        <p className="mt-1 break-words text-xs text-gray-500">
                          {user.email}
                        </p>
                        <p className="mt-2 text-xs font-medium text-gray-400">
                          {t("manageUsers.lastActive", {
                            value: lastActive,
                          })}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${schoolUserRoleClassName[user.role]}`}
                          >
                            {t(`manageUsers.roles.${user.role}`)}
                          </span>
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${schoolUserStatusClassName[user.status]}`}
                          >
                            {t(`manageUsers.statuses.${user.status}`)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isInvited}
                      onClick={() => onToggleStatus(user.id)}
                      className={`inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                        isInvited
                          ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                          : isDisabled
                            ? "border-primary bg-primary text-white hover:bg-hover"
                            : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      }`}
                    >
                      {isInvited
                        ? t("manageUsers.actions.resendInvite")
                        : isDisabled
                          ? t("manageUsers.actions.activate")
                          : t("manageUsers.actions.disable")}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
            <p className="text-sm font-semibold text-gray-600">
              {t("manageUsers.empty")}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}

function SuspendSchoolModal({
  isOpen,
  profile,
  schoolName,
  onClose,
  onConfirm,
  t,
  scopeT,
}: SuspendSchoolModalProps) {
  const isSuspended = profile.status === "suspended";
  const nextStatus = isSuspended ? "active" : "suspended";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        isSuspended
          ? t("suspendSchool.reactivateTitle")
          : t("suspendSchool.suspendTitle")
      }
      description={
        isSuspended
          ? t("suspendSchool.reactivateDescription")
          : t("suspendSchool.suspendDescription")
      }
      size="md"
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("suspendSchool.cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
              isSuspended
                ? "bg-primary hover:bg-hover"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isSuspended
              ? t("suspendSchool.confirmReactivate")
              : t("suspendSchool.confirmSuspend")}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pb-4">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase text-gray-400">
            {t("suspendSchool.schoolLabel")}
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            {schoolName}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-100 p-3">
            <p className="text-xs font-medium text-gray-400">
              {t("suspendSchool.currentStatus")}
            </p>
            <span
              className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClassName[profile.status]}`}
            >
              {scopeT(`status.${profile.status}`)}
            </span>
          </div>
          <div className="rounded-lg border border-gray-100 p-3">
            <p className="text-xs font-medium text-gray-400">
              {t("suspendSchool.nextStatus")}
            </p>
            <span
              className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClassName[nextStatus]}`}
            >
              {scopeT(`status.${nextStatus}`)}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {isSuspended
            ? t("suspendSchool.reactivateNote")
            : t("suspendSchool.suspendNote")}
        </p>
      </div>
    </Modal>
  );
}

function AuditLogModal({
  isOpen,
  auditLog,
  isArabic,
  onClose,
  t,
}: AuditLogModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    PlatformAuditCategory | "all"
  >("all");
  const [severityFilter, setSeverityFilter] = useState<
    PlatformAuditSeverity | "all"
  >("all");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredAuditLog = auditLog.filter((event) => {
    if (categoryFilter !== "all" && event.category !== categoryFilter) {
      return false;
    }

    if (severityFilter !== "all" && event.severity !== severityFilter) {
      return false;
    }

    if (!normalizedSearchQuery) {
      return true;
    }

    const localizedActor =
      isArabic && event.actorAr ? event.actorAr : event.actor;
    const localizedAction =
      isArabic && event.actionAr ? event.actionAr : event.action;
    const localizedDescription =
      isArabic && event.descriptionAr
        ? event.descriptionAr
        : event.description ?? "";
    const metadata = event.metadata ? Object.values(event.metadata).join(" ") : "";

    return [
      localizedActor,
      event.actor,
      localizedAction,
      event.action,
      localizedDescription,
      event.description ?? "",
      event.category,
      event.severity,
      metadata,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearchQuery);
  });

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSeverityFilter("all");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("auditLog.title")}
      description={t("auditLog.description")}
      size="xl"
      footer={
        <div className="flex w-full justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("auditLog.close")}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pb-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_180px_180px_auto] lg:items-end">
          <Input
            label={t("auditLog.searchLabel")}
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("auditLog.searchPlaceholder")}
            leftIcon={<Search className="h-4 w-4" />}
          />

          <Select
            label={t("auditLog.categoryLabel")}
            value={categoryFilter}
            onChange={(value) =>
              setCategoryFilter(
                value as PlatformAuditCategory | "all",
              )
            }
            options={auditCategoryOptions.map((category) => ({
              value: category,
              label: t(`auditLog.categories.${category}`),
            }))}
          />

          <Select
            label={t("auditLog.severityLabel")}
            value={severityFilter}
            onChange={(value) =>
              setSeverityFilter(
                value as PlatformAuditSeverity | "all",
              )
            }
            options={auditSeverityOptions.map((severity) => ({
              value: severity,
              label: t(`auditLog.severity.${severity}`),
            }))}
          />

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("auditLog.clearFilters")}
          </button>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-900">
            {t("auditLog.resultSummary", {
              count: filteredAuditLog.length,
              total: auditLog.length,
            })}
          </p>
        </div>

        {filteredAuditLog.length > 0 ? (
          <div className="space-y-3">
            {filteredAuditLog.map((event) => {
              const actor =
                isArabic && event.actorAr ? event.actorAr : event.actor;
              const action =
                isArabic && event.actionAr ? event.actionAr : event.action;
              const description =
                isArabic && event.descriptionAr
                  ? event.descriptionAr
                  : event.description;
              const timestamp =
                isArabic && event.timestampAr
                  ? event.timestampAr
                  : event.timestamp;

              return (
                <article
                  key={event.id}
                  className="rounded-lg border border-gray-100 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${auditSeverityClassName[event.severity]}`}
                        >
                          {t(`auditLog.severity.${event.severity}`)}
                        </span>
                        <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
                          {t(`auditLog.categories.${event.category}`)}
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">
                        {action}
                      </h3>
                      {description ? (
                        <p className="mt-1 text-sm text-gray-500">
                          {description}
                        </p>
                      ) : null}
                      <p className="mt-2 text-xs font-medium text-gray-400">
                        {actor}
                      </p>
                    </div>
                    <p className="shrink-0 text-xs font-semibold text-gray-400">
                      {timestamp}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
            <p className="text-sm font-semibold text-gray-600">
              {t("auditLog.empty")}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default function SchoolProfilePage() {
  const params = useParams<{ schoolId?: string }>();
  const locale = useLocale();
  const t = useTranslations("platform.schoolProfile");
  const scopeT = useTranslations("platform.scopeSwitcher");
  const toast = useToast();
  const { schools, updateSchool } = usePlatformSchools();
  const school = schools.find((item) => item.id === params.schoolId);
  const isArabic = locale === "ar";
  const numberFormatter = new Intl.NumberFormat(locale);
  const percentFormatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
  const [isConfigureModulesOpen, setIsConfigureModulesOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [isSuspendSchoolOpen, setIsSuspendSchoolOpen] = useState(false);
  const [profileState, setProfileState] = useState<{
    schoolId?: string;
    profile?: PlatformSchoolOption;
  }>(() => ({
    schoolId: school?.id,
    profile: school,
  }));
  const [moduleState, setModuleState] = useState<{
    schoolId?: string;
    modules: ModuleUsageItem[];
  }>(() => ({
    schoolId: school?.id,
    modules: school ? cloneModules(school.moduleUsage) : [],
  }));
  const [schoolUserState, setSchoolUserState] = useState<{
    schoolId?: string;
    users: SchoolUserItem[];
  }>(() => ({
    schoolId: school?.id,
    users: school ? cloneSchoolUsers(school.schoolUsers) : [],
  }));

  if (!school) {
    return (
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <Link
          href={`/${locale}/schools`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/25 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <ArrowLeft className={`h-3.5 w-3.5 ${isArabic ? "rotate-180" : ""}`} />
          {t("backToSchools")}
        </Link>
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("unknownSchool")}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{t("unknownDescription")}</p>
        </section>
      </div>
    );
  }

  const profile =
    profileState.schoolId === school.id && profileState.profile
      ? profileState.profile
      : school;
  const schoolName = isArabic && profile.nameAr ? profile.nameAr : profile.name;
  const shortName =
    isArabic && profile.shortNameAr ? profile.shortNameAr : profile.shortName;
  const city = isArabic && profile.cityAr ? profile.cityAr : profile.city;
  const address =
    isArabic && profile.addressAr ? profile.addressAr : profile.address;
  const curriculum =
    isArabic && profile.curriculumAr ? profile.curriculumAr : profile.curriculum;
  const principal =
    isArabic && profile.principalAr ? profile.principalAr : profile.principal;
  const locationLabel =
    isArabic && profile.locationLabelAr
      ? profile.locationLabelAr
      : profile.locationLabel;
  const moduleUsage =
    moduleState.schoolId === school.id
      ? moduleState.modules
      : cloneModules(school.moduleUsage);
  const schoolUsers =
    schoolUserState.schoolId === school.id
      ? schoolUserState.users
      : cloneSchoolUsers(school.schoolUsers);
  const activeUserCount = schoolUsers.filter(
    (user) => user.status === "active" || user.status === "invited",
  ).length;

  const stats = [
    {
      key: "students",
      label: t("stats.students"),
      value: numberFormatter.format(profile.students),
      hint: t("stats.studentsHint"),
      icon: GraduationCap,
    },
    {
      key: "users",
      label: t("stats.users"),
      value: numberFormatter.format(activeUserCount),
      hint: t("stats.usersHint"),
      icon: Users,
    },
    {
      key: "attendance",
      label: t("stats.attendance"),
      value: `${percentFormatter.format(school.operationalSummary.attendanceRate)}%`,
      hint: t("stats.attendanceHint"),
      icon: CheckCircle2,
    },
    {
      key: "admissions",
      label: t("stats.openAdmissions"),
      value: numberFormatter.format(school.operationalSummary.openAdmissions),
      hint: t("stats.openAdmissionsHint"),
      icon: FileText,
    },
    {
      key: "modules",
      label: t("stats.modules"),
      value: `${numberFormatter.format(moduleUsage.filter((module) => module.enabled).length)}/${numberFormatter.format(moduleUsage.length)}`,
      hint: t("stats.modulesHint"),
      icon: ShieldCheck,
    },
  ];

  const details = [
    { label: t("details.shortName"), value: shortName },
    { label: t("details.academicYear"), value: profile.academicYear },
    { label: t("details.curriculum"), value: curriculum },
    { label: t("details.principal"), value: principal },
    { label: t("details.city"), value: city },
    { label: t("details.schoolId"), value: profile.id },
  ];

  const contacts = [
    { label: t("contact.email"), value: profile.contactEmail, icon: Mail },
    { label: t("contact.phone"), value: profile.contactPhone, icon: Phone },
    {
      label: t("contact.lastActivity"),
      value: t(`lastActivityValues.${profile.lastActivity}`),
      icon: Activity,
    },
  ];

  const quickActions = [
    "editProfile",
    "manageUsers",
    "configureModules",
    "viewAuditLog",
    "suspendSchool",
  ] as const;

  const handleSaveModules = (nextModules: ModuleUsageItem[]) => {
    setModuleState({ schoolId: school.id, modules: nextModules });
    setIsConfigureModulesOpen(false);
    toast.showSuccess(t("configureModules.saved"));
  };

  const handleSaveProfile = (nextProfile: PlatformSchoolOption) => {
    updateSchool(nextProfile);
    setProfileState({ schoolId: school.id, profile: nextProfile });
    setIsEditProfileOpen(false);
    toast.showSuccess(t("editProfile.saved"));
  };

  const handleToggleUserStatus = (userId: string) => {
    const targetUser = schoolUsers.find((user) => user.id === userId);

    if (!targetUser || targetUser.status === "invited") {
      return;
    }

    const nextStatus: PlatformSchoolUserStatus =
      targetUser.status === "disabled" ? "active" : "disabled";

    setSchoolUserState({
      schoolId: school.id,
      users: schoolUsers.map((user) =>
        user.id === userId ? { ...user, status: nextStatus } : user,
      ),
    });
    toast.showSuccess(
      nextStatus === "active"
        ? t("manageUsers.activated")
        : t("manageUsers.disabled"),
    );
  };

  const handleToggleSuspension = () => {
    const isSuspended = profile.status === "suspended";
    const nextProfile: PlatformSchoolOption = {
      ...profile,
      status: isSuspended ? "active" : "suspended",
      health: isSuspended ? "watch" : "critical",
    };

    setProfileState({ schoolId: school.id, profile: nextProfile });
    setIsSuspendSchoolOpen(false);
    toast.showSuccess(
      isSuspended
        ? t("suspendSchool.reactivated")
        : t("suspendSchool.suspended"),
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">{t("eyebrow")}</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            {schoolName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClassName[profile.status]}`}
            >
              {scopeT(`status.${profile.status}`)}
            </span>
            <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700">
              {scopeT(`plan.${profile.plan}`)}
            </span>
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${healthClassName[profile.health]}`}
            >
              {scopeT(`health.${profile.health}`)}
            </span>
          </div>
        </div>
        <Link
          href={`/${locale}/schools`}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/25 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <ArrowLeft className={`h-3.5 w-3.5 ${isArabic ? "rotate-180" : ""}`} />
          {t("backToSchools")}
        </Link>
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
              {profile.initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900">
                {t("identityTitle")}
              </h2>
              <p className="mt-1 flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{address}</span>
              </p>
              <p className="mt-2 text-xs font-medium text-gray-400">
                {locationLabel} · {t("coordinates", profile.coordinates)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.key}
                className="rounded-lg border border-gray-100 p-3"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <Icon className="h-4 w-4" />
                  <p className="text-xs font-medium">{stat.label}</p>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-400">{stat.hint}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          {t("quickActions.title")}
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {quickActions.map((action) => {
            const Icon = quickActionIcon[action];
            const isConfigureModules = action === "configureModules";
            const isEditProfile = action === "editProfile";
            const isManageUsers = action === "manageUsers";
            const isAuditLog = action === "viewAuditLog";
            const isSuspendSchool = action === "suspendSchool";
            const isActiveAction =
              isConfigureModules ||
              isEditProfile ||
              isManageUsers ||
              isAuditLog ||
              isSuspendSchool;
            const actionLabel =
              isSuspendSchool && profile.status === "suspended"
                ? t("quickActions.reactivateSchool")
                : t(`quickActions.${action}`);

            return (
              <button
                key={action}
                type="button"
                disabled={!isActiveAction}
                onClick={
                  isConfigureModules
                    ? () => setIsConfigureModulesOpen(true)
                    : isEditProfile
                      ? () => setIsEditProfileOpen(true)
                      : isManageUsers
                        ? () => setIsManageUsersOpen(true)
                        : isAuditLog
                          ? () => setIsAuditLogOpen(true)
                          : isSuspendSchool
                            ? () => setIsSuspendSchoolOpen(true)
                            : undefined
                }
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                  isActiveAction
                    ? "border-primary bg-primary text-white hover:bg-hover"
                    : "border-gray-200 bg-gray-50 text-gray-400 disabled:cursor-not-allowed disabled:opacity-80"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{actionLabel}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("details.title")}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((item) => (
              <div key={item.label} className="border-b border-gray-100 pb-4">
                <p className="text-xs font-medium text-gray-400">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("contact.title")}
          </h2>
          <div className="mt-5 space-y-4">
            {contacts.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-400">
                      {item.label}
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-400">
                {t("contact.location")}
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {locationLabel}
              </p>
              <p className="mt-1 text-xs text-gray-500">{address}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t("loginPanel.title")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {t("loginPanel.description")}
            </p>
          </div>
          <span
            className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-semibold ${
              profile.authDetails.enabled
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-gray-200 bg-gray-50 text-gray-500"
            }`}
          >
            {profile.authDetails.enabled
              ? t("loginPanel.enabled")
              : t("loginPanel.disabled")}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-100 p-3">
            <p className="text-xs font-medium text-gray-400">
              {t("loginPanel.loginEmail")}
            </p>
            <p className="mt-1 break-words text-sm font-semibold text-gray-900">
              {profile.authDetails.loginEmail}
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-3">
            <p className="text-xs font-medium text-gray-400">
              {t("loginPanel.temporaryPassword")}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {"•".repeat(Math.max(profile.authDetails.temporaryPassword.length, 8))}
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-3">
            <p className="text-xs font-medium text-gray-400">
              {t("loginPanel.lastLogin")}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {isArabic && profile.authDetails.lastLoginAr
                ? profile.authDetails.lastLoginAr
                : profile.authDetails.lastLogin ?? t("loginPanel.never")}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("configuration.title")}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {school.configurationHealth.map((item) => {
              const Icon = configurationIcon[item.key];

              return (
                <div
                  key={item.key}
                  className="rounded-lg border border-gray-100 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-gray-400" />
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {t(`configuration.items.${item.key}`)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${configurationClassName[item.status]}`}
                    >
                      <StatusIcon status={item.status} />
                      {t(`configuration.status.${item.status}`)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("activity.title")}
          </h2>
          <div className="mt-5 space-y-3">
            {school.recentActivity.map((item) => {
              const title = isArabic && item.titleAr ? item.titleAr : item.title;
              const timestamp =
                isArabic && item.timestampAr ? item.timestampAr : item.timestamp;

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 p-3"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activityClassName[item.status]}`}
                  >
                    <Activity className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {title}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{timestamp}</p>
                  </div>
                  <span className="rounded-full bg-gray-50 px-2 py-1 text-[11px] font-semibold text-gray-500">
                    {t(`activity.categories.${item.category}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          {t("modules.title")}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {moduleUsage.map((item) => {
            const Icon = moduleIcon[item.key];
            const usage = isArabic && item.usageAr ? item.usageAr : item.usage;

            return (
              <div
                key={item.key}
                className={`rounded-lg border p-4 ${
                  item.enabled
                    ? "border-gray-100 bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {t(`modules.items.${item.key}`)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{usage}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${moduleClassName[item.health]}`}
                  >
                    {t(`modules.health.${item.health}`)}
                  </span>
                </div>
                <p className="mt-3 text-xs font-semibold text-gray-400">
                  {item.enabled ? t("modules.enabled") : t("modules.disabled")}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {isConfigureModulesOpen && (
        <ConfigureModulesModal
          isOpen={isConfigureModulesOpen}
          modules={moduleUsage}
          originalModules={school.moduleUsage}
          isArabic={isArabic}
          onClose={() => setIsConfigureModulesOpen(false)}
          onSave={handleSaveModules}
          t={t}
        />
      )}
      {isEditProfileOpen && (
        <EditSchoolProfileModal
          isOpen={isEditProfileOpen}
          profile={profile}
          originalProfile={school}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleSaveProfile}
          t={t}
          scopeT={scopeT}
        />
      )}
      {isManageUsersOpen && (
        <ManageUsersModal
          isOpen={isManageUsersOpen}
          users={schoolUsers}
          isArabic={isArabic}
          onClose={() => setIsManageUsersOpen(false)}
          onToggleStatus={handleToggleUserStatus}
          t={t}
        />
      )}
      {isAuditLogOpen && (
        <AuditLogModal
          isOpen={isAuditLogOpen}
          auditLog={school.auditLog}
          isArabic={isArabic}
          onClose={() => setIsAuditLogOpen(false)}
          t={t}
        />
      )}
      {isSuspendSchoolOpen && (
        <SuspendSchoolModal
          isOpen={isSuspendSchoolOpen}
          profile={profile}
          schoolName={schoolName}
          onClose={() => setIsSuspendSchoolOpen(false)}
          onConfirm={handleToggleSuspension}
          t={t}
          scopeT={scopeT}
        />
      )}
    </div>
  );
}
