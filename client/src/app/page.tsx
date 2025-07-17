import Hero from '@/components/ui/Hero';
import Services from '@/components/ui/Services';
import Testimonials from '@/components/ui/Testimonials';
import FAQ from '@/components/ui/FAQ';
import FeaturedContent from '@/components/ui/FeaturedContent';
import Newsletter from '@/components/ui/Newsletter';
import About from '@/components/ui/About';
import CTA from '@/components/ui/CTA';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Hero />

      <Services />

      <Testimonials />

      <FAQ />

      <FeaturedContent />

      <Newsletter />

      <About />

      <CTA />

      <Footer />
    </div>
  );
}
