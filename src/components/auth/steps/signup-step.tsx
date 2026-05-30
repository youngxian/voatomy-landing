"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "../auth-page";
import { SocialButtons } from "../social-buttons";
import { OrDivider } from "../or-divider";
import { signupWithMagicLink, APIError } from "@/lib/api";
import { useDictionary } from "@/i18n/locale-provider";

type SignupValues = {
  firstName: string;
  lastName: string;
  email: string;
};

export function SignupStep() {
  const dict = useDictionary();
  const t = dict.auth.signup;
  const v = dict.auth.validation;
  const common = dict.auth.common;
  const { setStep, updateFormData, formData } = useAuth();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const signupSchema = React.useMemo(
    () =>
      z.object({
        firstName: z.string().min(1, v.firstNameRequired),
        lastName: z.string().min(1, v.lastNameRequired),
        email: z.string().email(v.emailInvalid),
      }),
    [v],
  );

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
      const result = await signupWithMagicLink({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      });
      updateFormData(data);
      if (result.dev_magic_link_url) {
        sessionStorage.setItem("voatomy_dev_magic_link", result.dev_magic_link_url);
      } else {
        sessionStorage.removeItem("voatomy_dev_magic_link");
      }
      setStep("verify-email");
    } catch (err) {
      if (err instanceof APIError) {
        if (err.code === "conflict") {
          updateFormData({ email: data.email });
          setStep("login");
          return;
        }
        setSubmitError(err.message);
      } else {
        setSubmitError(common.serverUnreachable);
      }
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-3 text-[46px] font-semibold leading-[1.04] tracking-tight text-[#121312]">
        {t.title}
      </h1>
      <p className="mx-auto mb-8 max-w-[330px] text-[15px] leading-relaxed text-[#121312]/55">
        {t.subtitle}
      </p>

      <SocialButtons />
      <OrDivider />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <Input
            id="signup_first_name"
            label={t.firstName}
            placeholder={t.firstNamePlaceholder}
            error={errors.firstName?.message}
            autoComplete="given-name"
            className="bg-white border-[#121312]/15 text-[#121312] placeholder:text-[#121312]/40 focus-visible:ring-brand/30 focus-visible:border-brand"
            {...register("firstName")}
          />
          <Input
            id="signup_last_name"
            label={t.lastName}
            placeholder={t.lastNamePlaceholder}
            error={errors.lastName?.message}
            autoComplete="family-name"
            className="bg-white border-[#121312]/15 text-[#121312] placeholder:text-[#121312]/40 focus-visible:ring-brand/30 focus-visible:border-brand"
            {...register("lastName")}
          />
        </div>
        <Input
          id="signup_email"
          label={common.workEmail}
          type="email"
          placeholder={common.emailPlaceholder}
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
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t.sendingLink}
            </>
          ) : (
            <>
              {t.sendLink}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-sm text-[#121312]/60">
        {t.hasAccount}{" "}
        <button
          onClick={() => setStep("login")}
          className="font-semibold text-[#121312]/85 hover:text-[#121312] transition-colors cursor-pointer"
        >
          {t.signIn}
        </button>
      </p>
    </div>
  );
}
