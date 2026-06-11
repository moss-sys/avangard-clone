import { TopNavBar } from "@/components/TopNavBar";
import { MainHeader } from "@/components/MainHeader";
import { HeroSlider } from "@/components/HeroSlider";
import { AIChatBlockV2 } from "@/components/AIChatBlockV2";
import { FloatingChatV2 } from "@/components/FloatingChatV2";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CTAButtonsRow } from "@/components/CTAButtonsRow";
import { PromoBanners } from "@/components/PromoBanners";
import { PopularProducts } from "@/components/PopularProducts";
import { NewsSection } from "@/components/NewsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Рабочая одежда — AI-подбор спецодежды с ценами по городам | Авангард",
};

export default function HomeV2() {
  return (
    <>
      <FloatingChatV2 />
      <TopNavBar />
      <MainHeader />
      <main>
        <HeroSlider />
        <AIChatBlockV2 />
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
