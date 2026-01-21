
import AboutHero from '../../components/about/AboutHero';
import TeamSection from '../../components/about/TeamSection';
import AboutFeatures from '../../components/about/AboutFeatures';
import AboutStats from '../../components/about/AboutStats';
import Testimonial from '../../components/about/Testimonial';
import TrustedBy from '../../components/about/TrustedBy';
import AboutCTA from '../../components/about/AboutCTA';
import Footer from '../../components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <AboutHero />
      <TeamSection />
      <AboutFeatures />
      <AboutStats />
      <Testimonial />
      <TrustedBy />
      <AboutCTA />
      <Footer />
    </main>
  );
}