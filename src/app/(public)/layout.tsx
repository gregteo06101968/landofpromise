import { SkyBackground } from "@/components/SkyBackground";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SkyBackground>{children}</SkyBackground>;
}
