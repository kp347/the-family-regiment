
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import FoundingCharter from "@/components/sections/FoundingCharter";
import Mission from "@/components/sections/Mission";
import Journey from "@/components/sections/Journey";
import Craftsmanship from "@/components/sections/Craftsmanship";
import GreatHall from "@/components/sections/GreatHall";
import FamilyRegistry from "@/components/sections/FamilyRegistry";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <FoundingCharter />
        <Mission />
        <Journey />
        <Craftsmanship />
        <GreatHall />
        <FamilyRegistry />
      </main>
    </>
  );
}
