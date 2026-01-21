import PricingHero from '../../components/prices/PricingHero';
import PricingPlans from '../../components/prices/PricingPlans';
import PricingHelp from '../../components/prices/PricingHelp';
import PricingCTA from '../../components/prices/PricingCTA';
import Footer from '../../components/layout/Footer'; // Reusing existing footer

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <PricingHero />
      <PricingPlans />
      <PricingHelp />
      <PricingCTA />
      <Footer />
    </main>
  );
}