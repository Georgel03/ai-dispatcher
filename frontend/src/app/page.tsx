import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureRoad from "../components/FeatureRoad";
import FeatureAccordion from "../components/FeatureAccordion";
import Stats from "../components/Stats";
import SatelliteIntegration from "../components/SatelliteIntegration";
import MapFeatures from "../components/MapFeatures";
import BentoGrid from "../components/BentoGrid";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <FeatureRoad />
      <FeatureAccordion />
      <Stats />
      <SatelliteIntegration />
      <MapFeatures />
      <BentoGrid />
      <Testimonial />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}