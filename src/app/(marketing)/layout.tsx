import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
