
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import FoundingCharter from "@/components/sections/FoundingCharter";
import FounderInvitation from "@/components/sections/FounderInvitation";
import Mission from "@/components/sections/Mission";
import Journey from "@/components/sections/Journey";
import Craftsmanship from "@/components/sections/Craftsmanship";
import FoundingCollection from "@/components/sections/FoundingCollection";
import HouseInvitation from "@/components/sections/HouseInvitation";
import GreatHall from "@/components/sections/GreatHall";
import FamilyRegistry from "@/components/sections/FamilyRegistry";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <FoundingCharter />
        <FounderInvitation />
        <Mission />
        <Journey />
        <Craftsmanship />
        <HouseInvitation />
        <FoundingCollection />
        <GreatHall />
        <FamilyRegistry />
      </main>
    </>
  );
}
