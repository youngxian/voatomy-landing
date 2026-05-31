"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "../auth-page";
import { SocialButtons } from "../social-buttons";
import { OrDivider } from "../or-divider";
import { initSSO, loginWithPassword, verifyLoginOTP, resendMagicLink, APIError } from "@/lib/api";
import { AUTH_REDIRECT_KEY } from "../auth-page";
import { resolvePostAuthDestinationAsync } from "@/lib/auth-redirect";
import { useDictionary } from "@/i18n/locale-provider";

type EmailValues = { email: string };
type PasswordValues = { password: string };
type OTPValues = { code: string };

type LoginPhase = "email" | "password" | "otp";
type LoginMode = "email" | "sso";

export function LoginStep() {
  const dict = useDictionary();
  const t = dict.auth.login;
  const common = dict.auth.common;
  const v = dict.auth.validation;

  const emailSchema = React.useMemo(
    () => z.object({ email: z.string().email(v.emailInvalid) }),
    [v.emailInvalid],
  );
  const passwordSchema = React.useMemo(
    () => z.object({ password: z.string().min(1, v.passwordRequired) }),
    [v.passwordRequired],
  );
  const otpSchema = React.useMemo(
    () => z.object({ code: z.string().length(6, v.otpLength) }),
    [v.otpLength],
  );

  const { setStep, updateFormData, formData } = useAuth();
  const router = useRouter();

  const prefilled = formData.email?.trim() || "";
  const [phase, setPhase] = React.useState<LoginPhase>(prefilled ? "password" : "email");
  const [mode, setMode] = React.useState<LoginMode>("email");
  const [email, setEmail] = React.useState(prefilled);
  const [loginToken, setLoginToken] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const [infoMessage, setInfoMessage] = React.useState("");
  const [resending, setResending] = React.useState(false);
  const [sendingMagicLink, setSendingMagicLink] = React.useState(false);
  const [otpExpiry, setOtpExpiry] = React.useState(0);
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (prefilled) setInfoMessage(t.accountExistsHint);
  }, [prefilled, t.accountExistsHint]);

  // SSO state
  const [ssoEmail, setSsoEmail] = React.useState("");
  const [ssoLoading, setSsoLoading] = React.useState(false);
  const [ssoError, setSsoError] = React.useState("");

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: prefilled },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  const otpForm = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  // OTP countdown timer
  React.useEffect(() => {
    if (phase !== "otp" || otpExpiry <= 0) return;
    const interval = setInterval(() => {
      setOtpExpiry((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, otpExpiry]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Phase 1: Email submission
  const onEmailSubmit = (data: EmailValues) => {
    setEmail(data.email);
    setApiError("");
    setPhase("password");
  };

  // Phase 2: Password submission
  const onPasswordSubmit = async (data: PasswordValues) => {
    setApiError("");
    try {
      const result = await loginWithPassword(email, data.password);
      if (result.otp_required) {
        setLoginToken(result.login_token);
        setOtpExpiry(5 * 60);
        setPhase("otp");
      }
    } catch (err) {
      if (err instanceof APIError) {
        setApiError(
          err.code === "unauthorized"
            ? t.invalidCredentials
            : err.message,
        );
      } else {
        setApiError(common.somethingWrong);
      }
    }
  };

  // Phase 3: OTP verification
  const onOtpSubmit = async (data: OTPValues) => {
    setApiError("");
    try {
      const result = await verifyLoginOTP(loginToken, data.code);
      const storedRedirect = localStorage.getItem(AUTH_REDIRECT_KEY);
      localStorage.removeItem(AUTH_REDIRECT_KEY);
      const destination = await resolvePostAuthDestinationAsync(result.session_token, storedRedirect);
      if (destination.startsWith("http")) {
        window.location.href = destination;
      } else {
        router.push(destination);
      }
    } catch (err) {
      if (err instanceof APIError) {
        setApiError(
          err.code === "invalid_otp"
            ? t.invalidOtp
            : err.message,
        );
      } else {
        setApiError(common.somethingWrong);
      }
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setResending(true);
    setApiError("");
    try {
      const result = await loginWithPassword(
        email,
        passwordForm.getValues("password"),
      );
      if (result.otp_required) {
        setLoginToken(result.login_token);
        setOtpExpiry(5 * 60);
        otpForm.reset({ code: "" });
        otpRefs.current[0]?.focus();
      }
    } catch {
      setApiError(t.resendFailed);
    } finally {
      setResending(false);
    }
  };

  // OTP digit input handler
  const handleOtpInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const current = otpForm.getValues("code").split("");
    while (current.length < 6) current.push("");

    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, 6);
      for (let i = 0; i < 6; i++) {
        current[i] = digits[i] ?? "";
      }
      otpForm.setValue("code", current.join(""));
      const nextIdx = Math.min(digits.length, 5);
      otpRefs.current[nextIdx]?.focus();
      if (digits.length === 6) {
        otpForm.handleSubmit(onOtpSubmit)();
      }
      return;
    }

    current[index] = value;
    const newCode = current.join("");
    otpForm.setValue("code", newCode);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    if (newCode.length === 6 && !newCode.includes("")) {
      otpForm.handleSubmit(onOtpSubmit)();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpForm.getValues("code")[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSsoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ssoEmail.trim()) return;

    setSsoLoading(true);
    setSsoError("");

    try {
      const result = await initSSO(ssoEmail.trim());
      window.location.href = result.redirect_url;
    } catch (err) {
      if (err instanceof APIError) {
        if (err.code === "sso_not_configured") {
          setSsoError(t.ssoNotConfigured);
        } else {
          setSsoError(err.message);
        }
      } else {
        setSsoError(common.somethingWrong);
      }
      setSsoLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-2 text-[clamp(26px,7.5vw,46px)] font-semibold leading-[1.08] tracking-tight text-[#121312] sm:mb-3">
        {phase === "otp" ? t.titleOtp : t.title}
      </h1>
      <p className="mx-auto mb-5 max-w-[330px] text-[14px] sm:mb-8 sm:text-[15px] leading-relaxed text-[#121312]/55">
        {phase === "otp"
          ? t.subtitleOtp.replace("{email}", email)
          : t.subtitle}
      </p>

      {phase === "email" && (
        <>
          {/* Social auth */}
          <SocialButtons />
          <OrDivider />

          {mode === "email" ? (
            <React.Fragment key="email-mode">
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                noValidate
                className="space-y-3 text-left"
              >
                <div>
                  <label
                    htmlFor="login_email"
                    className="mb-2 block text-sm font-semibold text-[#121312]/70"
                  >
                    {common.workEmail}
                  </label>
                  <input
                    id="login_email"
                    type="email"
                    placeholder={common.emailPlaceholder}
                    autoComplete="email"
                    className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 text-base font-medium text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
                    {...emailForm.register("email")}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {emailForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={emailForm.formState.isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
                >
                  {t.signInEmail}
                </button>
              </form>

              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={() => setStep("forgot-password")}
                  className="text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
                >
                  {t.forgotPassword}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    const currentEmail = emailForm.getValues("email") ?? "";
                    if (currentEmail && !ssoEmail) setSsoEmail(currentEmail);
                    setMode("sso");
                  }}
                  className="inline-flex items-center gap-1.5 font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  {common.sso}
                </button>
                <span className="h-3 w-px bg-[#121312]/15" />
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-1.5 font-medium text-[#121312]/50 hover:text-[#121312] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  {common.demo}
                </Link>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment key="sso-mode">
              <form onSubmit={handleSsoSubmit} noValidate className="space-y-3 text-left">
                <div>
                  <label htmlFor="sso_email" className="mb-2 block text-sm font-semibold text-[#121312]/70">
                    {t.ssoEmailLabel}
                  </label>
                  <input
                    id="sso_email"
                    type="email"
                    placeholder={common.ssoEmailPlaceholder}
                    value={ssoEmail}
                    onChange={(e) => {
                      setSsoEmail(e.target.value);
                      if (ssoError) setSsoError("");
                    }}
                    disabled={ssoLoading}
                    className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 text-base font-medium text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand disabled:opacity-50"
                  />
                  {ssoError && <p className="mt-1 text-sm text-red-500">{ssoError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={ssoLoading}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
                >
                  {ssoLoading ? t.redirectingSso : t.continueSso}
                </button>

                <p className="text-center text-xs text-[#121312]/40">
                  {t.ssoHint}
                </p>
              </form>

              <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    if (ssoEmail) emailForm.setValue("email", ssoEmail);
                    setMode("email");
                  }}
                  className="inline-flex items-center gap-1.5 font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {t.signInWithEmail}
                </button>
                <span className="h-3 w-px bg-[#121312]/15" />
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-1.5 font-medium text-[#121312]/50 hover:text-[#121312] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  {common.demo}
                </Link>
              </div>
            </React.Fragment>
          )}
        </>
      )}

      {phase === "password" && (
        <>
          <div className="mb-4 flex items-center justify-center gap-2 text-sm text-[#121312]/70">
            <span className="font-medium">{email}</span>
            <button
              type="button"
              onClick={() => {
                setPhase("email");
                setApiError("");
                setInfoMessage("");
              }}
              className="text-[#121312]/40 hover:text-[#121312] transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>

          {infoMessage && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-800">
              {infoMessage}
            </div>
          )}

          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            noValidate
            className="space-y-3 text-left"
          >
            <div>
              <label
                htmlFor="login_password"
                className="mb-2 block text-sm font-semibold text-[#121312]/70"
              >
                {common.password}
              </label>
              <div className="relative">
                <input
                  id="login_password"
                  type={showPassword ? "text" : "password"}
                  placeholder={common.passwordPlaceholder}
                  autoComplete="current-password"
                  autoFocus
                  className="flex h-12 w-full rounded-md border border-[#121312]/15 bg-white px-3.5 pr-12 text-base font-medium text-[#121312] transition-colors placeholder:text-[#121312]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
                  {...passwordForm.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121312]/40 hover:text-[#121312] transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {passwordForm.formState.errors.password.message}
                </p>
              )}
              {apiError && <p className="mt-1 text-sm text-red-500">{apiError}</p>}
            </div>

            <button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
            >
              {passwordForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.signingIn}
                </>
              ) : (
                t.logIn
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={async () => {
              if (!email?.trim()) {
                setApiError(t.enterEmailFirst);
                return;
              }
              setSendingMagicLink(true);
              setApiError("");
              try {
                const result = await resendMagicLink(email.trim());
                updateFormData({ email: email.trim() });
                if (result.dev_magic_link_url) {
                  sessionStorage.setItem("voatomy_dev_magic_link", result.dev_magic_link_url);
                } else {
                  sessionStorage.removeItem("voatomy_dev_magic_link");
                }
                setStep("verify-email");
              } catch (err) {
                if (err instanceof APIError) {
                  if (err.code === "not_found") {
                    setApiError(t.noAccountFound);
                  } else {
                    setApiError(err.message);
                  }
                } else {
                  setApiError(common.serverUnreachable);
                }
              } finally {
                setSendingMagicLink(false);
              }
            }}
            disabled={sendingMagicLink}
            className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#121312]/15 bg-white text-sm font-semibold text-[#121312] transition-all duration-200 hover:bg-[#121312]/5 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {sendingMagicLink ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {t.emailSignInLink}
              </>
            )}
          </button>

          <div className="mt-3 text-right">
            <button
              type="button"
              onClick={() => setStep("forgot-password")}
              className="text-sm font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
            >
              {t.forgotPassword}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => {
                if (email && !ssoEmail) setSsoEmail(email);
                setPhase("email");
                setInfoMessage("");
                setMode("sso");
              }}
              className="inline-flex items-center gap-1.5 font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              {common.sso}
            </button>
            <span className="h-3 w-px bg-[#121312]/15" />
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 font-medium text-[#121312]/50 hover:text-[#121312] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              {common.demo}
            </Link>
          </div>
        </>
      )}

      {phase === "otp" && (
        <>
          <form
            onSubmit={otpForm.handleSubmit(onOtpSubmit)}
            noValidate
            className="space-y-4 text-left"
          >
            <div className="flex justify-center gap-1.5 sm:gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  autoFocus={i === 0}
                  value={otpForm.watch("code")[i] ?? ""}
                  onChange={(e) => handleOtpInput(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                    handleOtpInput(0, pasted);
                  }}
                  className="h-11 w-10 rounded-lg border border-[#121312]/15 bg-white text-center text-lg font-bold text-[#121312] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand sm:h-14 sm:w-12 sm:text-xl"
                />
              ))}
            </div>

            {apiError && (
              <p className="text-center text-sm text-red-500">{apiError}</p>
            )}

            {otpExpiry > 0 && (
              <p className="text-center text-xs text-[#121312]/40">
                {t.codeExpires.replace("{time}", formatTimer(otpExpiry))}
              </p>
            )}
            {otpExpiry === 0 && phase === "otp" && (
              <p className="text-center text-xs text-red-500">
                {t.codeExpired}{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="font-semibold underline hover:no-underline cursor-pointer"
                >
                  {t.resendNewCode}
                </button>
              </p>
            )}

            <button
              type="submit"
              disabled={otpForm.formState.isSubmitting || otpForm.watch("code").length < 6}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#121312] text-sm font-semibold text-white transition-all duration-200 hover:bg-[#121312]/90 active:scale-[0.98] disabled:opacity-50"
            >
              {otpForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.verifying}
                </>
              ) : (
                t.verify
              )}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-1.5 font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer disabled:opacity-50"
            >
              {resending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {resending ? t.sending : t.resendCode}
            </button>
            <span className="h-3 w-px bg-[#121312]/15" />
            <button
              type="button"
              onClick={() => {
                setPhase("password");
                setApiError("");
              }}
              className="font-medium text-[#121312]/50 hover:text-[#121312] transition-colors cursor-pointer"
            >
              {common.back}
            </button>
          </div>
        </>
      )}

      <p className="mt-6 text-sm text-[#121312]/60">
        {t.noAccount}{" "}
        <button
          onClick={() => setStep("signup")}
          className="font-semibold text-[#121312]/85 hover:text-[#121312] transition-colors cursor-pointer"
        >
          {t.signUp}
        </button>
      </p>
    </div>
  );
}
