import { StarBackground } from "@/components/StarBackground";

export function SkyBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-navy-deep to-navy-light px-4 py-12">
      <StarBackground />
      {children}
    </div>
  );
}
