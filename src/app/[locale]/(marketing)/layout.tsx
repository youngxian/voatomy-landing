import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalMarketingAmbient } from "@/components/marketing/global-marketing-ambient";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="relative bg-white">
        <GlobalMarketingAmbient />
        <main className="relative z-10">{children}</main>
      </div>
      <Footer />
    </>
  );
}
