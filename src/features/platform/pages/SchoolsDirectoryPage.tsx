"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DataTable, Input, Modal, Select, TextArea } from "@/components/ui";
import type { Column } from "@/components/ui/data-table";
import { useToast } from "@/components/ui/toast/Toast";
import type { PlatformSchoolOption } from "@/features/platform/data/mockSchools";
import {
  type CreatePlatformSchoolInput,
  usePlatformSchools,
} from "@/features/platform/data/platformSchoolStore";

type SchoolDirectoryRow = {
  id: string;
  name: string;
  status: PlatformSchoolOption["status"];
  plan: PlatformSchoolOption["plan"];
  students: number;
  users: number;
  modules: string;
  health: PlatformSchoolOption["health"];
  lastActivity: PlatformSchoolOption["lastActivity"];
  [key: string]: unknown;
};

const badgeClassName = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  onboarding: "bg-blue-50 text-blue-700 border-blue-200",
  suspended: "bg-red-50 text-red-700 border-red-200",
  good: "bg-emerald-50 text-emerald-700 border-emerald-200",
  watch: "bg-amber-50 text-amber-700 border-amber-200",
  setup: "bg-indigo-50 text-indigo-700 border-indigo-200",
  critical: "bg-red-50 text-red-700 border-red-200",
};

const planOptions: PlatformSchoolOption["plan"][] = [
  "enterprise",
  "growth",
  "core",
];

type AddSchoolField = keyof CreatePlatformSchoolInput;
type AddSchoolErrors = Partial<Record<AddSchoolField, string>>;

const emptySchoolDraft: CreatePlatformSchoolInput = {
  name: "",
  nameAr: "",
  shortName: "",
  shortNameAr: "",
  initials: "",
  plan: "growth",
  academicYear: "2025/2026",
  curriculum: "",
  curriculumAr: "",
  principal: "",
  principalAr: "",
  contactEmail: "",
  contactPhone: "",
  loginEmail: "",
  temporaryPassword: "School123!",
  authEnabled: true,
  city: "",
  cityAr: "",
  address: "",
  addressAr: "",
  locationLabel: "",
  locationLabelAr: "",
};

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (draft: CreatePlatformSchoolInput) => void;
  t: ReturnType<typeof useTranslations>;
}

function validateAddSchoolDraft(
  draft: CreatePlatformSchoolInput,
  t: ReturnType<typeof useTranslations>,
) {
  const requiredFields: AddSchoolField[] = [
    "name",
    "nameAr",
    "shortName",
    "shortNameAr",
    "initials",
    "academicYear",
    "curriculum",
    "curriculumAr",
    "principal",
    "principalAr",
    "contactEmail",
    "contactPhone",
    "loginEmail",
    "temporaryPassword",
    "city",
    "cityAr",
    "address",
    "addressAr",
    "locationLabel",
    "locationLabelAr",
  ];

  return requiredFields.reduce<AddSchoolErrors>((errors, field) => {
    const value = draft[field];

    if (typeof value === "string" && value.trim().length === 0) {
      errors[field] = t("addSchool.required");
    }

    return errors;
  }, {});
}

function AddSchoolModal({ isOpen, onClose, onSave, t }: AddSchoolModalProps) {
  const [draft, setDraft] =
    useState<CreatePlatformSchoolInput>(emptySchoolDraft);
  const [errors, setErrors] = useState<AddSchoolErrors>({});

  const setField = <Field extends AddSchoolField>(
    field: Field,
    value: CreatePlatformSchoolInput[Field],
  ) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
      ...(field === "contactEmail" &&
      typeof value === "string" &&
      current.loginEmail.trim().length === 0
        ? { loginEmail: value }
        : {}),
    }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSave = () => {
    const nextErrors = validateAddSchoolDraft(draft, t);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptySchoolDraft);
    setErrors({});
  };

  const handleClose = () => {
    setDraft(emptySchoolDraft);
    setErrors({});
    onClose();
  };

  const renderTextField = (
    field: AddSchoolField,
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
      onClose={handleClose}
      title={t("addSchool.title")}
      description={t("addSchool.description")}
      size="xl"
      footer={
        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {t("addSchool.cancel")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-hover"
          >
            {t("addSchool.save")}
          </button>
        </div>
      }
    >
      <div className="space-y-6 pb-4">
        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("addSchool.sections.identity")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderTextField("name", t("addSchool.fields.name"))}
            {renderTextField("nameAr", t("addSchool.fields.nameAr"), {
              dir: "rtl",
            })}
            {renderTextField("shortName", t("addSchool.fields.shortName"))}
            {renderTextField("shortNameAr", t("addSchool.fields.shortNameAr"), {
              dir: "rtl",
            })}
            {renderTextField("initials", t("addSchool.fields.initials"))}
            <Select
              label={t("addSchool.fields.plan")}
              value={draft.plan}
              onChange={(value) =>
                setField("plan", value as CreatePlatformSchoolInput["plan"])
              }
              options={planOptions.map((plan) => ({
                value: plan,
                label: t(`plans.${plan}`),
              }))}
            />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("addSchool.sections.academic")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderTextField("academicYear", t("addSchool.fields.academicYear"))}
            {renderTextField("curriculum", t("addSchool.fields.curriculum"))}
            {renderTextField("curriculumAr", t("addSchool.fields.curriculumAr"), {
              dir: "rtl",
            })}
            {renderTextField("principal", t("addSchool.fields.principal"))}
            {renderTextField("principalAr", t("addSchool.fields.principalAr"), {
              dir: "rtl",
            })}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("addSchool.sections.contact")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderTextField("contactEmail", t("addSchool.fields.email"))}
            {renderTextField("contactPhone", t("addSchool.fields.phone"))}
            {renderTextField("city", t("addSchool.fields.city"))}
            {renderTextField("cityAr", t("addSchool.fields.cityAr"), {
              dir: "rtl",
            })}
            {renderTextField("locationLabel", t("addSchool.fields.locationLabel"))}
            {renderTextField(
              "locationLabelAr",
              t("addSchool.fields.locationLabelAr"),
              { dir: "rtl" },
            )}
            {renderTextField("address", t("addSchool.fields.address"), {
              multiline: true,
            })}
            {renderTextField("addressAr", t("addSchool.fields.addressAr"), {
              multiline: true,
              dir: "rtl",
            })}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-900">
            {t("addSchool.sections.auth")}
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            {renderTextField("loginEmail", t("addSchool.fields.loginEmail"))}
            {renderTextField(
              "temporaryPassword",
              t("addSchool.fields.temporaryPassword"),
            )}
            <Select
              label={t("addSchool.fields.authEnabled")}
              value={String(draft.authEnabled)}
              onChange={(value) => setField("authEnabled", value === "true")}
              options={[
                { value: "true", label: t("addSchool.auth.enabled") },
                { value: "false", label: t("addSchool.auth.disabled") },
              ]}
            />
          </div>
        </section>
      </div>
    </Modal>
  );
}

export default function SchoolsDirectoryPage() {
  const locale = useLocale();
  const t = useTranslations("platform.schools");
  const toast = useToast();
  const { schools: platformSchools, addSchool } = usePlatformSchools();
  const [isAddSchoolOpen, setIsAddSchoolOpen] = useState(false);
  const isArabic = locale === "ar";
  const schools: SchoolDirectoryRow[] = platformSchools.map((school) => ({
    id: school.id,
    name: isArabic && school.nameAr ? school.nameAr : school.name,
    status: school.status,
    plan: school.plan,
    students: school.students,
    users: school.users,
    modules: school.modules,
    health: school.health,
    lastActivity: school.lastActivity,
  }));

  const handleAddSchool = (draft: CreatePlatformSchoolInput) => {
    addSchool(draft);
    setIsAddSchoolOpen(false);
    toast.showSuccess(t("addSchool.saved"));
  };

  const columns: Column<SchoolDirectoryRow>[] = [
    { key: "name", label: t("columns.schoolName"), searchable: true },
    {
      key: "status",
      label: t("columns.status"),
      render: (value) => {
        const status = value as SchoolDirectoryRow["status"];

        return (
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClassName[status]}`}
          >
            {t(`status.${status}`)}
          </span>
        );
      },
    },
    {
      key: "plan",
      label: t("columns.plan"),
      render: (value) => t(`plans.${value as SchoolDirectoryRow["plan"]}`),
    },
    {
      key: "students",
      label: t("columns.students"),
      sortable: true,
      render: (value) => Number(value).toLocaleString(locale),
    },
    {
      key: "users",
      label: t("columns.users"),
      sortable: true,
      render: (value) => Number(value).toLocaleString(locale),
    },
    { key: "modules", label: t("columns.modules") },
    {
      key: "health",
      label: t("columns.health"),
      render: (value) => {
        const health = value as SchoolDirectoryRow["health"];

        return (
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClassName[health]}`}
          >
            {t(`health.${health}`)}
          </span>
        );
      },
    },
    {
      key: "lastActivity",
      label: t("columns.lastActivity"),
      render: (value) =>
        t(`lastActivity.${value as SchoolDirectoryRow["lastActivity"]}`),
    },
    {
      key: "actions",
      label: t("columns.actions"),
      render: (_value, row) => (
        <Link
          href={`/${locale}/schools/${row.id}`}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/25 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          {t("actions.openSchoolProfile")}
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddSchoolOpen(true)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-hover"
        >
          <Plus className="h-4 w-4" />
          {t("addSchool.trigger")}
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <DataTable
          columns={columns}
          data={schools}
          itemsPerPage={10}
          showPagination
          urlState={{
            keyPrefix: "platformSchools",
            syncPagination: true,
            syncSorting: true,
          }}
        />
      </div>

      {isAddSchoolOpen && (
        <AddSchoolModal
          isOpen={isAddSchoolOpen}
          onClose={() => setIsAddSchoolOpen(false)}
          onSave={handleAddSchool}
          t={t}
        />
      )}
    </div>
  );
}
