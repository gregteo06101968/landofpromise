import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/lib/auth";
import { FormField, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { SkyBackground } from "@/components/SkyBackground";
import { LandingCard } from "@/components/LandingCard";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; detail?: string }>;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin/dashboard");
  }

  const { error, detail } = await searchParams;

  async function login(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin/dashboard",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.type === "CredentialsSignin") {
          redirect("/admin/login?error=invalid");
        }
        console.error("Admin login error:", err.type, err.cause);
        const cause = err.cause as { err?: Error & { cause?: Error } } | undefined;
        const detail =
          cause?.err?.cause?.message ?? cause?.err?.message ?? err.message;
        redirect(
          `/admin/login?error=${encodeURIComponent(err.type)}&detail=${encodeURIComponent(detail)}`,
        );
      }
      throw err;
    }
  }

  const errorMessage =
    error === "invalid"
      ? "Invalid email or password"
      : error
        ? `Sign-in error: ${error}${detail ? ` — ${detail}` : ""}`
        : undefined;

  return (
    <SkyBackground>
      <LandingCard className="max-w-sm">
        <Link
          href="/"
          className="mb-4 flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-navy-deep"
        >
          ← Back to home
        </Link>
        <h1 className="font-display text-3xl font-bold text-navy-deep">
          Admin Login
        </h1>
        <form action={login} className="mt-6 flex flex-col gap-4">
          <FormField label="Email" name="email" type="email" required />
          <FormField label="Password" name="password" type="password" required />
          <ErrorMessage message={errorMessage} />
          <SubmitButton pendingText="Signing in...">Sign in</SubmitButton>
        </form>
      </LandingCard>
    </SkyBackground>
  );
}
