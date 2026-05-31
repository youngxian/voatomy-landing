"use client";

import { cn } from "@/lib/utils";

type LogoProps = { className?: string };

// ── Individual brand logos ────────────────────────────────────────────────

export function GitHubLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("text-[#24292e]", className)} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function GitLabLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.386 9.449.044 13.587a.924.924 0 00.331 1.023L12 23.054l11.625-8.443a.924.924 0 00.33-1.024" fill="#E24329"/>
      <path d="M12 23.054l4.418-13.605H7.582z" fill="#FC6D26"/>
      <path d="M12 23.054l-4.418-13.605H1.386z" fill="#FCA326"/>
      <path d="M1.386 9.449L.044 13.587a.924.924 0 00.331 1.023L12 23.054z" fill="#E24329"/>
      <path d="M1.386 9.449h6.196L4.918 1.263a.455.455 0 00-.867 0z" fill="#FC6D26"/>
      <path d="M22.614 9.449l1.341 4.138a.924.924 0 01-.33 1.023L12 23.054z" fill="#E24329"/>
      <path d="M22.614 9.449h-6.196l2.664-8.186a.455.455 0 01.867 0z" fill="#FC6D26"/>
    </svg>
  );
}

export function BitbucketLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z" fill="#2684FF"/>
      <path d="M22.23 8.466h-6.48l-1.5 7.064H9.521L3.814 20.888a.782.782 0 00.504.19h15.137a.772.772 0 00.772-.646z" fill="url(#bitbucket-grad)"/>
      <defs>
        <linearGradient id="bitbucket-grad" x1="22.23" x2="9.521" y1="8.466" y2="20.888" gradientUnits="userSpaceOnUse">
          <stop offset="18%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SlackLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z" fill="#E01E5A"/>
      <path d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z" fill="#36C5F0"/>
      <path d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312z" fill="#2EB67D"/>
      <path d="M15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" fill="#ECB22E"/>
    </svg>
  );
}

export function JiraLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="jira-a" x1="100%" x2="55.2%" y1="14.7%" y2="45.7%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
        <linearGradient id="jira-b" x1="0%" x2="44.8%" y1="85.3%" y2="54.3%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
      </defs>
      <path d="M11.976 0C8.19 6.662 9.927 8.55 11.976 10.608L19.104 3.48z" fill="#2684FF"/>
      <path d="M11.976 0L4.848 7.128c2.952 2.952 7.752 2.952 10.704 0L11.976 0z" fill="url(#jira-a)"/>
      <path d="M11.976 24c3.786-6.662 2.049-8.55 0-10.608L4.848 20.52z" fill="#2684FF"/>
      <path d="M11.976 24l7.128-7.128c-2.952-2.952-7.752-2.952-10.704 0L11.976 24z" fill="url(#jira-b)"/>
    </svg>
  );
}

export function LinearLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="linear-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5E6AD2"/>
          <stop offset="100%" stopColor="#7C85E0"/>
        </linearGradient>
      </defs>
      <path
        d="M1.225 61.919L38.08 98.775a51.1 51.1 0 01-36.855-36.856zm.98-11.773L49.853 97.794A50.98 50.98 0 0138.38 99H38a51 51 0 01-36.196-48.854zM5.12 37.3l57.58 57.58a51.115 51.115 0 01-10.08 3.54L1.58 47.38A51.115 51.115 0 015.12 37.3zm8.128-10.847l64.297 64.298a51.03 51.03 0 01-8.696 5.783L7.451 40.53a51.03 51.03 0 015.797-14.076zm12.495-10.525l57.526 57.526a50.978 50.978 0 01-5.12 6.958L20.76 31.621a50.978 50.978 0 014.984-5.693zm14.648-7.865L91.934 80.599a51.079 51.079 0 01-4.37 5.377L34.023 32.435a51.079 51.079 0 015.368-14.372zM53.04 1.22a51.02 51.02 0 0139.74 39.74L52.962 1.14a51.02 51.02 0 01.079.08zm8.922 1.588A51.103 51.103 0 0198.78 38.624L62.115 2.809l-.153.001zM73.39 6.63A51.082 51.082 0 0193.37 26.61L73.39 6.63z"
        fill="url(#linear-g)"
      />
    </svg>
  );
}

export function FigmaLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
      <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
      <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
      <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
      <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
    </svg>
  );
}

export function NotionLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("text-[#000000]", className)} aria-hidden fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
    </svg>
  );
}

export function HubSpotLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M18.164 7.931V5.085a1.56 1.56 0 00.887-1.408v-.046A1.56 1.56 0 0017.5 2.08h-.047a1.56 1.56 0 00-1.552 1.552v.047a1.56 1.56 0 00.887 1.408v2.846A4.418 4.418 0 0014.6 8.826L7.29 3.376a1.748 1.748 0 00.043-.358 1.77 1.77 0 10-1.77 1.77c.235 0 .456-.047.66-.127l7.156 5.326a4.395 4.395 0 00-.668 2.339c0 .85.24 1.643.657 2.317L11.23 16.59a1.554 1.554 0 00-.456-.073 1.56 1.56 0 00-1.553 1.553 1.56 1.56 0 001.553 1.553 1.56 1.56 0 001.553-1.553c0-.17-.028-.334-.077-.487l2.122-2.57a4.42 4.42 0 002.808.99 4.427 4.427 0 004.427-4.427 4.426 4.426 0 00-3.443-4.345zm-.664 6.765a2.394 2.394 0 110-4.789 2.394 2.394 0 010 4.789z" fill="#FF7A59"/>
    </svg>
  );
}

export function SalesforceLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M10.002 4.102a4.34 4.34 0 013.13-1.334 4.374 4.374 0 013.936 2.453 3.282 3.282 0 011.44-.333 3.32 3.32 0 013.322 3.32 3.322 3.322 0 01-3.32 3.322H5.002a3.002 3.002 0 110-6.004 2.985 2.985 0 01.763.1 4.347 4.347 0 014.237-3.524z" fill="#00A1E0"/>
    </svg>
  );
}

export function ZendeskLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M11.185.956C11.185.428 10.754 0 10.22 0H2.25C1.005 0 0 1 0 2.235v7.942c0 .528.43.956.965.956.534 0 .965-.428.965-.956V2.235c0-.165.136-.3.305-.3H10.22c.534 0 .965-.428.965-.956zM14.85.956c0-.528.43-.956.965-.956h7.935C24.994 0 24 1 24 2.235v7.942c0 .528-.43.956-.965.956s-.965-.428-.965-.956V2.235c0-.165-.136-.3-.305-.3H15.815c-.535 0-.965-.428-.965-.956zM11.185 23.044c0 .528-.43.956-.965.956H2.25C1.006 24 0 23 0 21.765v-7.942c0-.528.43-.956.965-.956.534 0 .965.428.965.956v7.442c0 .165.136.3.305.3H10.22c.534 0 .965.428.965.956zM14.85 23.044c0 .528.43.956.965.956h7.935C24.994 24 24 23 24 21.765v-7.942c0-.528-.43-.956-.965-.956s-.965.428-.965.956v7.442c0 .165-.136.3-.305.3H15.815c-.535 0-.965.428-.965.956z" fill="#03363D"/>
    </svg>
  );
}

export function AsanaLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M19.15 13.37a4.85 4.85 0 100 9.7 4.85 4.85 0 000-9.7M4.85 13.37a4.85 4.85 0 100 9.7 4.85 4.85 0 000-9.7m12.15-8.52a4.85 4.85 0 10-9.7 0 4.85 4.85 0 009.7 0" fill="#F06A6A"/>
    </svg>
  );
}

export function LinearLogoSimple({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M0 14.448L9.552 24a12 12 0 01-9.552-9.552zm0-2.768L11.32 24H9.928L0 14.072v-2.392zM.622 9.1L14.9 23.378a12.033 12.033 0 01-2.38.565L.057 11.48A12.033 12.033 0 01.622 9.1zm2.195-3.082l15.165 15.165a11.993 11.993 0 01-2.073 1.366L1.25 8.49a11.993 11.993 0 011.567-2.472zm3.31-2.8L21.782 18.873a12.048 12.048 0 01-1.546 1.763L4.38 4.78a12.048 12.048 0 011.747-1.563zm4.114-2.13l13.87 13.87A12 12 0 0012 0c-.96 0-1.895.117-2.79.338L9.24 1.09z" fill="#5E6AD2"/>
    </svg>
  );
}

export function DatadogLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M23.982 13.26l-1.038-6.44L15.705.025 8.36 1.828.004 6.817v10.308l6.97 6.851H14.5l9.482-10.716zM12.39 18.804l-4.5-1.017-1.06-3.35 2.01-.655 1.296 1.61 3.85-.834-.065 1.34zm7.3-7.124l-4.95 5.78-.42-8.54 2.71.43 1.024-.82 1.636 3.15zm-3.82-6.4l.456-1.46 2.006 1.94-.466.98-1.996-1.46zM7.555 9.315L5.46 7.866l.13-1.93 3.356 2.35-.5 1.365-2.226.64.624 1.05-2.37 1.484-.15-1.866 1.232-2.63zm6.498 2.34l-.39-2.55 1.946.23.066 4.25-1.623-1.93z" fill="#632CA6"/>
    </svg>
  );
}

export function GoogleDriveLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4.433 22.396l2-3.465H24l-2 3.465z" fill="#0066DA"/>
      <path d="M15.567 8.535L13.567 5.07 7.134 16.08l2 3.465z" fill="#00AC47"/>
      <path d="M13.567 5.07H10.433L0 22.396h6.134z" fill="#EA4335"/>
      <path d="M17.566 16.08H6.434l-2 3.465h15.133z" fill="#00832D"/>
      <path d="M24 22.396L17.567 11.07l-2 3.465 4 6.93z" fill="#2684FC"/>
      <path d="M13.567 5.07l6.434 11.01 2-3.465L15.567 1.605z" fill="#FFBA00"/>
    </svg>
  );
}

export function IntercomLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M20 0H4a4 4 0 00-4 4v16a4 4 0 004 4h16a4 4 0 004-4V4a4 4 0 00-4-4zm-3.875 13.625a6.63 6.63 0 01-8.25 0 .75.75 0 011-1.125 5.128 5.128 0 006.25 0 .75.75 0 011 1.125zM6 10a1 1 0 112 0 1 1 0 01-2 0zm10 0a1 1 0 112 0 1 1 0 01-2 0z" fill="#286EFA"/>
    </svg>
  );
}

export function PagerDutyLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M16.965 1.18C15.085.164 13.839 0 10.983 0H2.67v14.25h8.27c2.624 0 4.593-.164 6.24-1.277 1.745-1.18 2.76-3.1 2.76-5.954 0-2.986-1.146-4.97-2.975-5.84zM10.25 11.4H5.77V2.85h4.416c3.61 0 5.324 1.244 5.324 4.2 0 3.15-1.843 4.35-5.258 4.35zM2.67 16.8H5.8V24H2.67z" fill="#06AC38"/>
    </svg>
  );
}

export function SentryLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 72 66" className={className} aria-hidden>
      <path d="M29.8 31.3L42 10.4A5.1 5.1 0 0050.5 13l-4.4 7.6A31.7 31.7 0 0167 52.2H56.8A21.5 21.5 0 0042.3 35L37 44.4a12.8 12.8 0 016.7 11.4v.4H32.4A2.5 2.5 0 0030 53.8v-1.4A2.7 2.7 0 0132.7 50h3.6A8.8 8.8 0 0030.6 42a2.5 2.5 0 01-2.2-3.6l1.3-2.3a25.2 25.2 0 00-17.3 19.9H2.2a35.5 35.5 0 0119.7-27.1l7.9-13.7a5.1 5.1 0 013.3-2.4A5.1 5.1 0 0135 14a5.1 5.1 0 01.8 7.1z" fill="#362D59"/>
    </svg>
  );
}

export function ConfluenceLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="conf-a" x1="100%" x2="25.4%" y1="16%" y2="69.6%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
        <linearGradient id="conf-b" x1="0%" x2="74.6%" y1="84%" y2="30.4%">
          <stop offset="0%" stopColor="#0052CC"/>
          <stop offset="100%" stopColor="#2684FF"/>
        </linearGradient>
      </defs>
      <path d="M.88 17.794c-.233.365-.496.787-.72 1.105a.635.635 0 00.208.913l3.832 2.338a.637.637 0 00.877-.194c.196-.308.425-.672.673-1.063C7.458 18.137 8.574 18.55 10.5 18.55H17v-4.3H10.5c-2.26 0-3.735-1.55-5.167-3.745L.882 17.794z" fill="url(#conf-a)"/>
      <path d="M23.12 6.206c.233-.365.496-.787.72-1.105a.635.635 0 00-.208-.913L19.8 1.85a.637.637 0 00-.877.194c-.196.308-.425.672-.673 1.063-1.71 2.756-2.826 2.344-4.752 2.344H7v4.3h6.5c2.26 0 3.735 1.55 5.167 3.745L23.118 6.206z" fill="url(#conf-b)"/>
    </svg>
  );
}

export function TrelloLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="3" fill="#0052CC"/>
      <rect x="3" y="3" width="7" height="14" rx="1.5" fill="white"/>
      <rect x="14" y="3" width="7" height="9" rx="1.5" fill="white"/>
    </svg>
  );
}

export function MondayLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="4.5" cy="16.5" r="4.5" fill="#F62B54"/>
      <circle cx="12" cy="16.5" r="4.5" fill="#FFCC00"/>
      <circle cx="19.5" cy="16.5" r="4.5" fill="#00CA72"/>
    </svg>
  );
}

export function ClickUpLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M1.929 17.234l3.373-2.576c1.76 2.304 3.604 3.36 5.696 3.36 2.08 0 3.87-1.04 5.589-3.317l3.41 2.53C17.589 20.293 15.01 22 11.002 22c-4.048 0-6.646-1.741-9.073-4.766z" fill="url(#clickup-a)"/>
      <path d="M11 2l4.59 4.245C13.712 8.047 12.29 8.815 11 8.815c-1.268 0-2.68-.749-4.59-2.57z" fill="url(#clickup-b)"/>
      <defs>
        <linearGradient id="clickup-a" x1="1.929" y1="17.234" x2="19.997" y2="17.234" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8930FD"/>
          <stop offset="1" stopColor="#49CCF9"/>
        </linearGradient>
        <linearGradient id="clickup-b" x1="6.41" y1="5.407" x2="15.59" y2="5.407" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8930FD"/>
          <stop offset="1" stopColor="#49CCF9"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GrafanaLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M17.714 11.365c-.047-.47-.141-.94-.282-1.362a4.72 4.72 0 00-.188-.517 5.573 5.573 0 00-1.785-2.209 6.155 6.155 0 00-.517-.328 5.68 5.68 0 00-.611-.282A5.82 5.82 0 0012 6.256a5.917 5.917 0 00-4.376 1.926 5.74 5.74 0 00-1.455 4.235A5.838 5.838 0 0012 17.744a5.84 5.84 0 005.714-5.737 6.128 6.128 0 00-.047-.641zm-5.666 4.236a4.26 4.26 0 01-4.236-4.236A4.26 4.26 0 0112 7.129a4.26 4.26 0 014.236 4.236A4.26 4.26 0 0112 15.6z" fill="#F46800"/>
      <path d="M12 9.647a2.353 2.353 0 100 4.706 2.353 2.353 0 000-4.706z" fill="#F46800"/>
    </svg>
  );
}

export function AzureDevOpsLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M0 6.424l2.298-3.04L9.578 1.2l4.96 4.33-9.5 3.748z" fill="#0078D4"/>
      <path d="M24 9.45L20.51 0l-5.97 5.53L8.93 8.66l-8.93 4.51v5.54l4.39.8 9.42-3.66z" fill="#0078D4"/>
      <path d="M9.578 22.8l5.09-1.29V11.33l-5.09 1.29z" fill="#0078D4"/>
      <path d="M14.668 22.8l-5.09-1.29V12.62l5.09 1.45z" fill="#004578"/>
    </svg>
  );
}

export function TeamsLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="4" fill="#5059C9"/>
      <path d="M17.5 7.5a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z" fill="#7B83EB"/>
      <path d="M19.8 9.2c-.2-1.1-1.1-2-2.3-2h-3.3c-1.5 0-2.7 1.2-2.7 2.7v5.1c0 .4.3.7.7.7h6.9c.8 0 1.5-.6 1.6-1.4l.4-3.2c.1-.6-.2-1.2-.7-1.5-.3-.2-.6-.3-1-.3" fill="#fff"/>
      <rect x="3" y="7" width="8.5" height="10" rx="1.2" fill="#7B83EB"/>
      <circle cx="7.25" cy="5.2" r="2.4" fill="#5059C9"/>
    </svg>
  );
}

export function DiscordLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037 12.3 12.3 0 00-.608 1.25 18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2"/>
    </svg>
  );
}

export function PipedriveLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#017737"/>
      <path d="M7.5 8.5h3.2c1.8 0 3.1 1.1 3.1 2.7 0 1.1-.6 2-1.6 2.4l2.2 3.4h-2.4l-1.9-3h-1.6v3H7.5V8.5zm3 4.1c.9 0 1.4-.5 1.4-1.3s-.5-1.3-1.4-1.3H9.4v2.6H10.5z" fill="#fff"/>
    </svg>
  );
}

export function GongLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="5" fill="#7B61FF"/>
      <path d="M7 16V8h2.2l2.8 4.6L14.8 8H17v8h-1.8v-4.8L12.1 16h-1.4L8.8 11.2V16H7z" fill="#fff"/>
    </svg>
  );
}

export function FreshdeskLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="5" fill="#25C16F"/>
      <path d="M12 6c-2.8 0-5 2-5 4.5 0 1.4.7 2.6 1.8 3.4L8 18h8l-.8-4.1c1.1-.8 1.8-2 1.8-3.4 0-2.5-2.2-4.5-5-4.5z" fill="#fff"/>
    </svg>
  );
}

export function SketchLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2.5L3 8.5l9 13 9-13-9-6z" fill="#F7B500"/>
      <path d="M12 2.5v19l9-13-9-6z" fill="#EA6C00"/>
      <path d="M12 2.5L3 8.5l9 6 9-6-9-6z" fill="#FDAD00"/>
    </svg>
  );
}

export function OpsGenieLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="5" fill="#172B4D"/>
      <path d="M12 5l5.5 9.5H6.5L12 5z" fill="#2684FF"/>
      <circle cx="12" cy="16.5" r="2.2" fill="#fff"/>
    </svg>
  );
}

export function CsvUploadLogo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#64748B"/>
      <path d="M8 9h8M8 12h8M8 15h5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16 15l2 2 2-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 13v4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

// ── Central map: integration key → logo component ─────────────────────────
const LOGO_MAP: Record<string, (props: LogoProps) => React.ReactElement> = {
  github:        GitHubLogo,
  gitlab:        GitLabLogo,
  bitbucket:     BitbucketLogo,
  "azure-devops": AzureDevOpsLogo,
  slack:         SlackLogo,
  jira:          JiraLogo,
  linear:        LinearLogoSimple,
  figma:         FigmaLogo,
  notion:        NotionLogo,
  hubspot:       HubSpotLogo,
  salesforce:    SalesforceLogo,
  zendesk:       ZendeskLogo,
  asana:         AsanaLogo,
  trello:        TrelloLogo,
  monday:        MondayLogo,
  clickup:       ClickUpLogo,
  intercom:      IntercomLogo,
  datadog:       DatadogLogo,
  pagerduty:     PagerDutyLogo,
  sentry:        SentryLogo,
  grafana:       GrafanaLogo,
  "google-drive": GoogleDriveLogo,
  confluence:    ConfluenceLogo,
  teams:         TeamsLogo,
  discord:       DiscordLogo,
  pipedrive:     PipedriveLogo,
  gong:          GongLogo,
  freshdesk:     FreshdeskLogo,
  sketch:        SketchLogo,
  opsgenie:      OpsGenieLogo,
  csv:           CsvUploadLogo,
};

// ── Brand color map for fallback boxes ───────────────────────────────────
const BRAND_COLORS: Record<string, string> = {
  gong:      "#7B61FF",
  opsgenie:  "#172B4D",
  pipedrive: "#00793A",
  freshdesk: "#25C16F",
  sketch:    "#F7B500",
  teams:     "#6264A7",
  discord:   "#5865F2",
  csv:       "#64748B",
};

// ── Public component ──────────────────────────────────────────────────────
export function IntegrationLogo({
  integrationKey,
  name,
  className,
  size = "md",
}: {
  integrationKey: string;
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const Logo = LOGO_MAP[integrationKey];

  if (Logo) {
    return <Logo className={cn(sizeClass, className)} />;
  }

  // Fallback: colored circle with abbrev
  const bgColor = BRAND_COLORS[integrationKey] ?? "#94A3B8";
  const abbrev  = name.slice(0, 2).toUpperCase();
  const textSize = size === "sm" ? "text-[8px]" : size === "lg" ? "text-[13px]" : "text-[10px]";

  return (
    <span
      className={cn("flex shrink-0 items-center justify-center rounded-full font-bold text-white", sizeClass, textSize, className)}
      style={{ backgroundColor: bgColor }}
      aria-hidden
    >
      {abbrev}
    </span>
  );
}

/** Overlapping brand logos for connect-step header */
export function ConnectToolsIconCluster({
  keys,
  names,
  className,
}: {
  keys: string[];
  names?: string[];
  className?: string;
}) {
  const display = keys.slice(0, 3);
  if (display.length === 0) {
    return (
      <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10B981]/10 ring-1 ring-[#10B981]/20", className)}>
        <SlackLogo className="h-6 w-6" />
      </div>
    );
  }

  const width = 28 + (display.length - 1) * 22;

  return (
    <div className={cn("relative h-11 shrink-0", className)} style={{ width }}>
      {display.map((key, i) => (
        <span
          key={key}
          className="absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl border-2 border-white bg-white shadow-sm ring-1 ring-black/[0.05]"
          style={{ left: i * 22, zIndex: display.length - i }}
        >
          <IntegrationLogo
            integrationKey={key}
            name={names?.[i] ?? key}
            size="sm"
          />
        </span>
      ))}
    </div>
  );
}
