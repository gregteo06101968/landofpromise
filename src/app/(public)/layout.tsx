import { SkyBackground } from "@/components/SkyBackground";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SkyBackground>
      <div className="relative z-10 w-full max-w-2xl">{children}</div>
    </SkyBackground>
  );
}
