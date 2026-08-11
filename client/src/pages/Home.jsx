// ==================================================
// PAGE D'ACCUEIL (/)
// ==================================================

import HeroSection from "../components/HeroSection";
import ServicesGrid from "../components/ServicesGrid";
import HowItWorks from "../components/HowItWorks";
import TrustBar from "../components/TrustBar";
import FinalCTA from "../components/FinalCTA";

function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesGrid />
      <HowItWorks />
      <TrustBar />
      <FinalCTA />
    </div>
  );
}

export default Home;
