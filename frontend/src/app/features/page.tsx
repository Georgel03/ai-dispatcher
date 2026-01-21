import Footer from '../../components/layout/Footer';
import Hero from '../../components/layout/Hero';
import FeatureList from '../../components/layout/FeatureList';
import Benefits from '../../components/layout/Benefits';
import FAQ from '../../components/layout/FAQ';
import CTA from '../../components/layout/CTA';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Hero />
      <FeatureList />
      <Benefits />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}