import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Set up your Voatomy workspace and generate your first AI sprint plan in under 3 minutes.",
};

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
