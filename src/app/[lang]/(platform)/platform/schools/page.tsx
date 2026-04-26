import Link from "next/link";
import { ExternalLink } from "lucide-react";

const schools = [
  {
    id: "school_123",
    name: "Al Noor International School",
    status: "Active",
    plan: "Enterprise",
    students: "1,248",
    users: "184",
    modules: "12/14",
    health: "Good",
    lastActivity: "12 minutes ago",
  },
  {
    id: "school_204",
    name: "Future Leaders Academy",
    status: "Active",
    plan: "Growth",
    students: "842",
    users: "96",
    modules: "10/14",
    health: "Watch",
    lastActivity: "1 hour ago",
  },
  {
    id: "school_317",
    name: "Cairo STEM School",
    status: "Onboarding",
    plan: "Enterprise",
    students: "516",
    users: "62",
    modules: "7/14",
    health: "Setup",
    lastActivity: "Yesterday",
  },
  {
    id: "school_411",
    name: "Green Valley School",
    status: "Active",
    plan: "Core",
    students: "693",
    users: "78",
    modules: "8/14",
    health: "Good",
    lastActivity: "2 days ago",
  },
];

const columns = [
  "School Name",
  "Status",
  "Plan",
  "Students",
  "Users",
  "Modules",
  "Health",
  "Last Activity",
  "Actions",
];

const statusClassName: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Onboarding: "bg-blue-50 text-blue-700 border-blue-200",
};

const healthClassName: Record<string, string> = {
  Good: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Watch: "bg-amber-50 text-amber-700 border-amber-200",
  Setup: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

interface SchoolsDirectoryPageProps {
  params: Promise<{ lang: string }>;
}

export default async function SchoolsDirectoryPage({
  params,
}: SchoolsDirectoryPageProps) {
  const { lang } = await params;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-primary">Platform</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Schools Directory
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-gray-500">
          Static school records for the platform admin foundation.
        </p>
      </div>

      <section className="overflow-hidden rounded-[8px] border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-gray-900">
                    {school.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClassName[school.status]}`}
                    >
                      {school.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {school.plan}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {school.students}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {school.users}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {school.modules}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${healthClassName[school.health]}`}
                    >
                      {school.health}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {school.lastActivity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <Link
                      href={`/${lang}/dashboard?schoolId=${school.id}`}
                      className="inline-flex items-center gap-2 rounded-[6px] border border-primary/25 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      Open School Dashboard
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
