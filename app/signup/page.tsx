"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { WorkspaceProvider, useWorkspace } from "@/lib/store";
import { setSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";

function SignupForm() {
  const router = useRouter();
  const { createDemoWorkspace } = useWorkspace();

  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!restaurantName.trim() || !ownerName.trim() || !email.trim() || !password) {
      setError("Please fill in every field to create your workspace.");
      return;
    }
    if (password.length < 6) {
      setError("Choose a password with at least 6 characters.");
      return;
    }

    setSubmitting(true);
    createDemoWorkspace({ restaurantName, ownerName, email });
    setSession({
      email,
      ownerName,
      restaurantSlug: slugify(restaurantName),
    });
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Input
        label="Restaurant name"
        name="restaurantName"
        placeholder="Bistro du Marché"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        autoComplete="organization"
        required
      />
      <Input
        label="Your name"
        name="ownerName"
        placeholder="Léa Fontaine"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        autoComplete="name"
        required
      />
      <Input
        label="Work email"
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
        placeholder="At least 6 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
      />

      {error && (
        <p className="rounded-card border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={submitting}>
        {submitting ? "Creating your workspace…" : "Create my workspace"}
      </Button>

      <p className="text-xs leading-relaxed text-muted">
        This creates a demo workspace pre-filled with sample data so you can
        explore Monmenu.fr immediately. No card required.
      </p>
    </form>
  );
}

export default function SignupPage() {
  return (
    <WorkspaceProvider>
      <AuthShell
        title="Create your workspace"
        subtitle="Set up a demo restaurant and see your menu editor in seconds."
        footer={
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-accent hover:text-accent-soft">
              Sign in
            </Link>
          </p>
        }
      >
        <SignupForm />
      </AuthShell>
    </WorkspaceProvider>
  );
}
