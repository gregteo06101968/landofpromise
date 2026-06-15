export function StatCard({
  label,
  value,
  accent = "text-navy-deep",
}: {
  label: string;
  value: number | string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-5 sm:py-4">
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
        {label}
      </p>
      <p className={`mt-1 font-display text-xl font-bold sm:text-2xl ${accent}`}>
        {value}
      </p>
    </div>
  );
}
