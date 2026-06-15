const colorStyles = {
  green: { badge: "bg-green-100 text-green-700", dot: "bg-green-500" },
  yellow: { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  red: { badge: "bg-red-100 text-red-700", dot: "bg-red-500" },
  slate: { badge: "bg-slate-100 text-slate-500", dot: "bg-slate-400" },
} as const;

export function StatusBadge({
  label,
  color,
  className = "",
}: {
  label: string;
  color: keyof typeof colorStyles;
  className?: string;
}) {
  const styles = colorStyles[color];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles.badge} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {label}
    </span>
  );
}
