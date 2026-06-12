import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/lib/auth";
import { FormField, ErrorMessage } from "@/components/ui/FormField";
import { SubmitButton } from "@/components/ui/SubmitButton";

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
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-16">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        Admin Login
      </h1>
      <form action={login} className="flex flex-col gap-4">
        <FormField label="Email" name="email" type="email" required />
        <FormField label="Password" name="password" type="password" required />
        <ErrorMessage message={errorMessage} />
        <SubmitButton pendingText="Signing in...">Sign in</SubmitButton>
      </form>
    </main>
  );
}
