import Link from "next/link";

const tabs = [
  { key: "edit", label: "Details" },
  { key: "objectives", label: "Weekly Objectives" },
  { key: "attendance", label: "Attendance" },
  { key: "media", label: "Photos & Videos" },
] as const;

export function SessionTabs({
  sessionId,
  active,
}: {
  sessionId: number;
  active: (typeof tabs)[number]["key"];
}) {
  return (
    <div className="scrollbar-hide overflow-x-auto border-b border-slate-200">
      <div className="flex w-max min-w-full gap-4">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={`/admin/dashboard/sessions/${sessionId}/${tab.key}`}
            className={`-mb-px border-b-2 px-1 py-2 text-sm font-medium whitespace-nowrap ${
              active === tab.key
                ? "border-gold text-navy-deep"
                : "border-transparent text-slate-500 hover:text-navy-deep"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
