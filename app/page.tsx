import BrandChapters from "@/components/BrandChapters";
import BrandStory from "@/components/BrandStory";
import FeaturedJacket from "@/components/FeaturedJacket";
import HeritageBuilder from "@/components/HeritageBuilder";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PatchChapters from "@/components/PatchChapters";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen bg-[#1E1F20] text-[#F6F2EA]"
    >
      <Navbar />

      <Hero />

      <BrandChapters />

      <FeaturedJacket />

      <HeritageBuilder />

      <PatchChapters />

      <BrandStory />

      <SiteFooter />
    </main>
  );
}