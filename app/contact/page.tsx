"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

type FormState = {
  name: string;
  email: string;
  restaurant: string;
  topic: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  restaurant: "",
  topic: "question",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please add a short message.";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // Seam for a real backend: send this payload to a contact API route
      // that emails the team or creates a lead in a CRM.
      setSubmitted(true);
    }
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6 sm:pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Talk to us
            </h1>
            <p className="mt-4 text-lg text-muted">
              Ask a question about the product, request a guided setup call,
              or tell us what your restaurant needs from a digital menu.
            </p>
          </div>

          <div className="mt-12 pb-24">
            <Card>
              <CardBody className="p-6 sm:p-10">
                {submitted ? (
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                      ✓
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-paper">
                      Message sent
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      Thanks for reaching out. We usually reply within one
                      business day.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <Button href="/pricing" variant="secondary">
                        Back to pricing
                      </Button>
                      <Button href="/signup">Create your account</Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Input
                        label="Your name"
                        name="name"
                        placeholder="Léa Fontaine"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        error={errors.name}
                      />
                      <Input
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="you@restaurant.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        error={errors.email}
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Input
                        label="Restaurant name"
                        name="restaurant"
                        placeholder="Bistro du Marché"
                        hint="Optional"
                        value={form.restaurant}
                        onChange={(e) => update("restaurant", e.target.value)}
                      />
                      <Select
                        label="What is this about?"
                        name="topic"
                        value={form.topic}
                        onChange={(e) => update("topic", e.target.value)}
                        options={[
                          { value: "question", label: "General question" },
                          { value: "setup", label: "Guided setup call" },
                          { value: "billing", label: "Billing" },
                          { value: "other", label: "Something else" },
                        ]}
                      />
                    </div>

                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Tell us about your restaurant and what you'd like help with."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      error={errors.message}
                    />

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send message
                    </Button>
                  </form>
                )}
              </CardBody>
            </Card>

            <p className="mt-6 text-center text-sm text-muted">
              Prefer to explore first?{" "}
              <Link href="/pricing" className="text-accent hover:underline">
                See pricing
              </Link>{" "}
              or{" "}
              <Link href="/signup" className="text-accent hover:underline">
                create a demo workspace
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
