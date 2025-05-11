
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ValuesHero } from "@/components/values/ValuesHero";
import { ValuesGrid } from "@/components/values/ValuesGrid";
import { MissionSection } from "@/components/values/MissionSection";
import { StorySection } from "@/components/values/StorySection";
import { TeamSection } from "@/components/values/TeamSection";
import { JoinCta } from "@/components/values/JoinCta";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const Values = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className={`flex-1 ${isMobile ? "pb-16" : ""}`}>
        <ValuesHero />
        <MissionSection />
        <ValuesGrid />
        <StorySection />
        <TeamSection />
        <JoinCta />
      </div>

      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Values;
