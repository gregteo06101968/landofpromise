export function StatCard({
  label,
  value,
  accent = "text-navy-deep",
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`mt-1 font-display text-2xl font-bold ${accent}`}>
        {value}
      </p>
    </div>
  );
}
