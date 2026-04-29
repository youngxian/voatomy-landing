import { cn } from "@/lib/utils";

interface BrandIconProps {
  className?: string;
  size?: number;
}

export function GitHubIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function GitLabIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="m23.6 9.593-.033-.086L20.3.98a.851.851 0 0 0-.336-.382.86.86 0 0 0-.992.066.86.86 0 0 0-.285.41l-2.209 6.767H7.525L5.316 1.074a.858.858 0 0 0-.285-.41.86.86 0 0 0-.992-.066.854.854 0 0 0-.336.381L.437 9.507l-.033.086a6.066 6.066 0 0 0 2.012 7.01l.01.009.027.02 4.987 3.734 2.467 1.868 1.502 1.135a1.014 1.014 0 0 0 1.227 0l1.502-1.135 2.467-1.868 5.014-3.754.012-.01a6.068 6.068 0 0 0 2.01-7.01z" />
    </svg>
  );
}

export function BitbucketIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z" />
    </svg>
  );
}

export function JiraIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24.013 12.5V1.005A1.005 1.005 0 0 0 23.013 0z" />
    </svg>
  );
}

export function LinearIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M2.988 15.45a.66.66 0 0 1-.158-.485c.009-.17.082-.332.208-.456L14.51 3.036a.66.66 0 0 1 .942.942L3.978 15.452a.66.66 0 0 1-.99-.002zM1.07 11.682a.66.66 0 0 1-.153-.474 10.267 10.267 0 0 1 .559-2.532.66.66 0 0 1 1.06-.277l12.556 12.556a.66.66 0 0 1-.277 1.06 10.267 10.267 0 0 1-2.532.559.66.66 0 0 1-.474-.153L1.07 11.682zM3.91 6.608a.66.66 0 0 1-.087-.82 10.33 10.33 0 0 1 3.123-3.123.66.66 0 0 1 .82.087l13.482 13.482a.66.66 0 0 1 .087.82 10.33 10.33 0 0 1-3.123 3.123.66.66 0 0 1-.82-.087L3.91 6.608zM8.677 1.345a.66.66 0 0 1 .277-1.06 10.267 10.267 0 0 1 2.532-.559.66.66 0 0 1 .474.153l10.739 10.739a.66.66 0 0 1 .153.474 10.267 10.267 0 0 1-.559 2.532.66.66 0 0 1-1.06.277L8.677 1.345zm7.29-.756a.66.66 0 0 1-.942-.942.66.66 0 0 1 .942 0l8.386 8.386a.66.66 0 0 1-.942.942L15.967.59z" />
    </svg>
  );
}

export function AsanaIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.218S15.898 24 18.78 24s5.22-2.338 5.22-5.22-2.338-5.127-5.22-5.127zm-13.56 0c-2.882 0-5.22 2.336-5.22 5.218S2.338 24 5.22 24s5.22-2.338 5.22-5.22-2.338-5.127-5.22-5.127zM17.61 5.22C17.61 2.338 15.272 0 12.39 0S7.17 2.338 7.17 5.22s2.338 5.22 5.22 5.22 5.22-2.338 5.22-5.22z" />
    </svg>
  );
}

export function FigmaIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 8.943h-4.588V7.51h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.453-4.49 4.453zm-3.117-1.471h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117v6.038zm-1.471 7.509C5.671 22.491 3.657 20.478 3.657 18s2.014-4.49 4.49-4.49h4.588v4.49c0 2.478-2.014 4.491-4.588 4.491zm0-7.51H8.147c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h.001c1.665 0 3.019-1.355 3.019-3.019v-3.02h-.02zm0-1.471c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.981H8.147zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V0H8.147z" />
    </svg>
  );
}

export function SlackIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

export function MicrosoftTeamsIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M20.625 8.073c.995 0 1.801-.806 1.801-1.801S21.62 4.471 20.625 4.471s-1.802.806-1.802 1.801.807 1.801 1.802 1.801zm-4.058-2.156c1.324 0 2.398-1.073 2.398-2.397C18.965 2.196 17.891 1.123 16.567 1.123S14.17 2.196 14.17 3.52s1.073 2.397 2.397 2.397zM20.4 8.904h-2.91a1.69 1.69 0 0 1 .253.874v6.222c0 .16-.023.314-.06.465h3.897a.82.82 0 0 0 .82-.82v-4.86c0-1.035-.839-1.88-2-1.88zm-7.211.874a.87.87 0 0 0-.87-.874H6.48a.87.87 0 0 0-.87.874v6.222a.87.87 0 0 0 .87.874h5.84a.87.87 0 0 0 .87-.874V9.778zM9.4 15.122v-1.685l2.07-.001v-1.317l-2.07.001V10.46l-1.587.001v1.66H5.82v1.316l1.993.001v1.685H9.4zM13.19 8.904h-2.147a2.49 2.49 0 0 1 .578 1.596v5.5c0 .455-.122.882-.334 1.25.026 0 .05.005.076.005h5.203c.83 0 1.503-.674 1.503-1.504V10.9c0-1.104-.893-1.996-1.997-1.996h-2.883z" />
    </svg>
  );
}

export function SalesforceIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M10.006 5.15a4.12 4.12 0 0 1 3.3-1.627c1.513 0 2.847.822 3.557 2.044a5.03 5.03 0 0 1 2.084-.453c2.77 0 5.013 2.242 5.013 5.018 0 2.773-2.243 5.023-5.013 5.023-.434 0-.855-.056-1.258-.16a3.88 3.88 0 0 1-3.413 2.03c-.6 0-1.166-.138-1.672-.382a4.555 4.555 0 0 1-4.147 2.66c-1.854 0-3.476-1.108-4.19-2.697a4.003 4.003 0 0 1-.838.088C1.59 17.694 0 16.1 0 14.116c0-1.267.66-2.382 1.654-3.015A4.32 4.32 0 0 1 1.282 9.6c0-2.41 1.952-4.367 4.362-4.367a4.35 4.35 0 0 1 4.362 3.917z" />
    </svg>
  );
}

export function HubSpotIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066A2.2 2.2 0 0 0 17.233.836h-.066a2.2 2.2 0 0 0-2.198 2.198v.066c0 .87.517 1.62 1.261 1.968v2.862a6.27 6.27 0 0 0-2.826 1.269l-7.47-5.822A2.655 2.655 0 0 0 6.04 2.27a2.667 2.667 0 1 0-2.597 3.2 2.653 2.653 0 0 0 1.415-.413l7.377 5.747a6.291 6.291 0 0 0-.107 5.207l-2.153 2.153a2.074 2.074 0 0 0-.606-.098 2.105 2.105 0 1 0 2.105 2.105c0-.213-.04-.416-.098-.612l2.108-2.108a6.3 6.3 0 1 0 4.683-9.521zm-.964 9.6a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42z" />
    </svg>
  );
}

export function DatadogIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M19.882 13.318l-1.6.53-.718-.903-.34-3.032 2.327-1.63.02-.012.007-.02c.024-.064.087-.253-.07-.403a.424.424 0 0 0-.122-.076c-.086-.036-.183-.04-.24-.024l-2.285.703-1.28-1.63c-.094-.08-.199-.127-.302-.125-.132.004-.235.08-.288.215a.6.6 0 0 0-.018.215l.56 2.932-1.762 1.435-.008.013-.022.032c-.04.065-.074.2.036.378a.37.37 0 0 0 .303.167l2.2.073.95 2.87c.06.13.183.22.33.23h.003c.123 0 .245-.06.337-.167l1.711-2.767zM12.04.004L0 2.88l1.58 17.748L12.042 24l10.458-3.372L24.082 2.88zM19.504 18.27l-1.592-1.346-1.103 1.278-.07-.064-.016-2.685-5.053-3.626-2.088 1.028-1.476-.918 5.178-2.62-.004-4.22c.003-.096.06-.275.203-.4.14-.127.28-.158.351-.16h.007c.076.008.223.047.354.186l1.3 1.454 1.54-.468c.087-.02.26-.047.42.07.158.12.203.293.216.37l-.008.093-1.562 1.14.29 2.54.003-.002 1.572 1.874-.007.006c-.003 0 .01.008.024.018a.563.563 0 0 0-.07.036l-.01.006 1.434.178-.674 3.44.547.89z" />
    </svg>
  );
}

export function PagerDutyIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M16.965 1.18C15.085.164 13.769 0 10.683 0H3.73v14.55h6.926c2.743 0 4.8-.164 6.61-1.37 1.975-1.303 3.004-3.47 3.004-6.074C20.27 4.413 19.063 2.31 16.965 1.18zM12.14 10.06c-1.037.547-2.274.603-3.898.603H7.78V3.784h.71c1.624 0 2.723.027 3.706.547 1.073.52 1.703 1.635 1.703 2.823 0 1.3-.71 2.412-1.758 2.905zM7.78 17.67h-4.05V24h4.05z" />
    </svg>
  );
}

export function GongIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.48a6.48 6.48 0 1 1 0-12.96 6.48 6.48 0 0 1 0 12.96z" />
    </svg>
  );
}

export function ZendeskIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M11.088 7.814V24L0 7.814zm1.824 16.186V7.814H24zM11.088 0a5.544 5.544 0 1 1-11.088 0h11.088zM24 24a5.544 5.544 0 1 1-11.088 0H24z" />
    </svg>
  );
}

export function IntercomIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M20.546 3.29C18.89 1.533 16.266 0 12.011 0 7.748 0 5.125 1.533 3.467 3.29 1.607 5.252.624 8.006.624 11.09v1.823c0 3.084.983 5.838 2.843 7.8C5.125 22.468 7.748 24 12.011 24c4.255 0 6.879-1.533 8.535-3.29 1.86-1.96 2.843-4.715 2.843-7.799V11.09c0-3.084-.983-5.838-2.843-7.8zM19.5 15.475a.499.499 0 0 1-.329.468c-.066.024-1.607.564-7.16.564-5.553 0-7.094-.54-7.16-.564a.499.499 0 0 1-.329-.468V8.525c0-.203.122-.386.308-.462C4.896 7.76 6.6 7.2 12.011 7.2c5.412 0 7.115.56 7.181.863.186.076.308.26.308.462v6.95z" />
    </svg>
  );
}

export function GoogleDriveIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z" />
    </svg>
  );
}

export function GmailIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

export function MicrosoftOutlookIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M7.88 12.04q0 .72-.34 1.26t-.9.85-1.24.43-1.4.14-1.4-.14-1.24-.43-.9-.85-.34-1.26.34-1.26.9-.85 1.24-.43 1.4-.14 1.4.14 1.24.43.9.85.34 1.26zm12.24 0v7.92q0 .44-.32.76t-.76.32H12.6v-2.96h3.6v-1.68h-3.6V9.36h6.44q.44 0 .76.32t.32.76v1.6zm-2.96 4.08v-2.16h-2.4v2.16h2.4zm0-3.12V10.8h-2.4v2.2h2.4zm-1.2-3.36q.88 0 1.6.32t1.32.88.84 1.32.32 1.6-.32 1.6-.84 1.32-1.32.88-1.6.32-1.6-.32-1.32-.88-.84-1.32-.32-1.6.32-1.6.84-1.32 1.32-.88 1.6-.32zM24 11.28v9.44q0 1.68-1.2 2.88t-2.88 1.2H4.8q-1.68 0-2.88-1.2T.72 20.72v-9.44q0-1.68 1.2-2.88t2.88-1.2h14.4q1.68 0 2.88 1.2t1.2 2.88z" />
    </svg>
  );
}

export function FramerIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  );
}

export function FreshdeskIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm4.5 16.5h-9v-1.5h9v1.5zm0-3h-9v-1.5h9v1.5zm0-3h-9V9h9v1.5z" />
    </svg>
  );
}

export function GoogleCalendarIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632z" />
    </svg>
  );
}

export function AdobeCreativeCloudIcon({ className, size = 24 }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13v6l4-3-4-3zm2 0l4 3-4 3V7z" />
    </svg>
  );
}

const BRAND_COLOR_MAP: Record<string, string> = {
  GitHub: "#181717",
  GitLab: "#FC6D26",
  Bitbucket: "#0052CC",
  Jira: "#2684FF",
  Linear: "#5E6AD2",
  Asana: "#F06A6A",
  Figma: "#F24E1E",
  Slack: "#4A154B",
  "Microsoft Teams": "#6264A7",
  Salesforce: "#00A1E0",
  HubSpot: "#FF7A59",
  Datadog: "#632CA6",
  PagerDuty: "#06AC38",
  Gong: "#7A41E0",
  Zendesk: "#03363D",
  Intercom: "#6AFDEF",
  "Google Drive": "#4285F4",
  Gmail: "#EA4335",
  "Microsoft Outlook": "#0078D4",
  Framer: "#0055FF",
  Freshdesk: "#21B453",
  "Google Calendar": "#4285F4",
  "Adobe Creative Cloud": "#DA1F26",
};

const ICON_MAP: Record<string, React.FC<BrandIconProps>> = {
  GitHub: GitHubIcon,
  GitLab: GitLabIcon,
  Bitbucket: BitbucketIcon,
  Jira: JiraIcon,
  Linear: LinearIcon,
  Asana: AsanaIcon,
  Figma: FigmaIcon,
  Slack: SlackIcon,
  "Microsoft Teams": MicrosoftTeamsIcon,
  Salesforce: SalesforceIcon,
  HubSpot: HubSpotIcon,
  Datadog: DatadogIcon,
  PagerDuty: PagerDutyIcon,
  Gong: GongIcon,
  Zendesk: ZendeskIcon,
  Intercom: IntercomIcon,
  "Google Drive": GoogleDriveIcon,
  Gmail: GmailIcon,
  "Microsoft Outlook": MicrosoftOutlookIcon,
  Framer: FramerIcon,
  Freshdesk: FreshdeskIcon,
  "Google Calendar": GoogleCalendarIcon,
  "Adobe Creative Cloud": AdobeCreativeCloudIcon,
};

export function BrandIcon({
  name,
  className,
  size = 20,
  colored = true,
}: {
  name: string;
  className?: string;
  size?: number;
  colored?: boolean;
}) {
  const IconComponent = ICON_MAP[name];
  const color = colored ? BRAND_COLOR_MAP[name] : undefined;

  if (!IconComponent) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center text-xs font-bold",
          className,
        )}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return <IconComponent className={className} size={size} />;
}

export function getBrandColor(name: string): string {
  return BRAND_COLOR_MAP[name] ?? "#888888";
}
