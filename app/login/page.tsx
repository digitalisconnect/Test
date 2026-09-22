"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { setSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { seedAccount, seedRestaurant } from "@/lib/seed-data";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter your email and password to sign in.");
      return;
    }

    setSubmitting(true);
    // Demo sign-in: any credentials open the sample workspace so reviewers
    // can explore the dashboard without a real backend.
    setSession({
      email,
      ownerName: seedAccount.ownerName,
      restaurantSlug: slugify(seedRestaurant.name),
    });
    router.push("/dashboard");
  }

  function useDemoCredentials() {
    setEmail(seedAccount.email);
    setPassword("demo1234");
  }

  return (
    <AuthShell
      title="Sign in to Monmenu.fr"
      subtitle="Access your menu dashboard and keep guests up to date."
      footer={
        <p>
          New to Monmenu.fr?{" "}
          <Link href="/signup" className="font-medium text-accent hover:text-accent-soft">
            Create a workspace
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@restaurant.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="rounded-card border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>

        <button
          type="button"
          onClick={useDemoCredentials}
          className="w-full text-center text-xs text-muted hover:text-accent"
        >
          Fill in demo credentials
        </button>
      </form>
    </AuthShell>
  );
}
