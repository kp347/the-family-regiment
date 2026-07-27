import BrandChapters from "@/components/home/BrandChapters";
import BrandStory from "@/components/home/BrandStory";
import DesignStandard from "@/components/home/DesignStandard";
import FeaturedJacket from "@/components/home/FeaturedJacket";
import HeritageBuilder from "@/components/home/HeritageBuilder";
import Hero from "@/components/home/Hero";
import PatchChapters from "@/components/home/PatchChapters";
import TheJourney from "@/components/home/TheJourney";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <BrandChapters />

        <DesignStandard />

        <TheJourney />

        <FeaturedJacket />

        <HeritageBuilder />

        <PatchChapters />

        <BrandStory />
      </main>

      <SiteFooter />
    </>
  );
}