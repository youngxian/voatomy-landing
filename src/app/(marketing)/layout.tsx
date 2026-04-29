import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { GlobalMarketingAmbient } from "@/components/marketing/global-marketing-ambient";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="relative">
        <GlobalMarketingAmbient />
        <main className="relative z-10">{children}</main>
      </div>
      <Footer />
    </>
  );
}
