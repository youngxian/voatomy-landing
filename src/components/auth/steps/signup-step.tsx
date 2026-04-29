"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useAuth } from "../auth-page";
import { SocialButtons } from "../social-buttons";
import { OrDivider } from "../or-divider";
// import { isWorkEmail } from "@/lib/utils";
import { signupWithMagicLink, APIError } from "@/lib/api";

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .email("Please enter a valid email"),
    // .refine(isWorkEmail, "Please use your work email (e.g. jane@yourcompany.com)"),
});

type SignupValues = z.infer<typeof signupSchema>;

export function SignupStep() {
  const { setStep, updateFormData, formData } = useAuth();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    },
  });

  const onSubmit = async (data: SignupValues) => {
    setSubmitError(null);
    try {
      await signupWithMagicLink({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      });
      updateFormData(data);
      setStep("verify-email");
    } catch (err) {
      if (err instanceof APIError && err.code === "conflict") {
        updateFormData({ email: data.email });
        setStep("login");
        return;
      }
      if (err instanceof APIError) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-3 text-[46px] font-semibold leading-[1.04] tracking-tight text-[#121312]">
        Create your account
      </h1>
      <p className="mx-auto mb-8 max-w-[330px] text-[15px] leading-relaxed text-[#121312]/55">
        Enter your work email and we&apos;ll send you a secure sign-in link.
      </p>

      <SocialButtons />
      <OrDivider />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <Input
            id="signup_first_name"
            label="First name"
            placeholder="Your first name"
            error={errors.firstName?.message}
            autoComplete="given-name"
            className="bg-white border-[#121312]/15 text-[#121312] placeholder:text-[#121312]/40 focus-visible:ring-brand/30 focus-visible:border-brand"
            {...register("firstName")}
          />
          <Input
            id="signup_last_name"
            label="Last name"
            placeholder="Your last name"
            error={errors.lastName?.message}
            autoComplete="family-name"
            className="bg-white border-[#121312]/15 text-[#121312] placeholder:text-[#121312]/40 focus-visible:ring-brand/30 focus-visible:border-brand"
            {...register("lastName")}
          />
        </div>
        <Input
          id="signup_email"
          label="Work email"
          type="email"
          placeholder="jane@yourcompany.com"
          error={errors.email?.message}
          autoComplete="email"
          className="bg-white border-[#121312]/15 text-[#121312] placeholder:text-[#121312]/40 focus-visible:ring-brand/30 focus-visible:border-brand"
          {...register("email")}
        />

        {submitError && (
          <p className="text-sm text-red-500 text-left">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? "Sending link…" : "Send sign-in link"}
          {!isSubmitting && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </button>
      </form>

      <p className="mt-6 text-sm text-[#121312]/60">
        Already have an account?{" "}
        <button
          onClick={() => setStep("login")}
          className="font-semibold text-[#121312]/85 hover:text-[#121312] transition-colors cursor-pointer"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
