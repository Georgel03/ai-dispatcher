'use client';

import { useState } from 'react';
import PricingHero from '../../components/prices/PricingHero';
import PricingPlans from '../../components/prices/PricingPlans';
import PricingHelp from '../../components/prices/PricingHelp';
import PricingCTA from '../../components/prices/PricingCTA';
import Footer from '../../components/layout/Footer';

export default function PricingPage() {
 
  const [isYearly, setIsYearly] = useState(false);
  const [trucks, setTrucks] = useState(40);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <PricingHero 
        isYearly={isYearly} 
        setIsYearly={setIsYearly} 
        trucks={trucks} 
        setTrucks={setTrucks} 
      />
      <PricingPlans 
        isYearly={isYearly} 
        trucks={trucks} 
      />
      <PricingHelp />
      <PricingCTA />
      <Footer />
    </main>
  );
}