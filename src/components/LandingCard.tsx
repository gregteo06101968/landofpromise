export function LandingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative z-10 w-full max-w-md rounded-3xl bg-cream p-8 shadow-2xl shadow-black/30 sm:p-10 ${className}`}
    >
      {children}
    </div>
  );
}
