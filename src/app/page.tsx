import { TopNavBar } from "@/components/TopNavBar";
import { MainHeader } from "@/components/MainHeader";
import { HeroSlider } from "@/components/HeroSlider";
import { AIChatBlock } from "@/components/AIChatBlock";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CTAButtonsRow } from "@/components/CTAButtonsRow";
import { PromoBanners } from "@/components/PromoBanners";
import { PopularProducts } from "@/components/PopularProducts";
import { NewsSection } from "@/components/NewsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <MainHeader />
      <main>
        <HeroSlider />
        <AIChatBlock />
        <CategoryGrid />
        <CTAButtonsRow />
        <PromoBanners />
        <PopularProducts />
        <NewsSection />
        <ReviewsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
