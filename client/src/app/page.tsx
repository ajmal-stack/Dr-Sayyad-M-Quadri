import Hero from '@/components/ui/Hero';
import MediaContent from '@/components/ui/MediaContent';
import TrustedBy from '@/components/ui/TrustedBy';
import Services from '@/components/ui/Services';
// import Testimonials from '@/components/ui/Testimonials';
// import FAQ from '@/components/ui/FAQ';
// import FeaturedContent from '@/components/ui/FeaturedContent';
import Newsletter from '@/components/ui/Newsletter';
import About from '@/components/ui/About';
import CTA from '@/components/ui/CTA';
import Footer from '@/components/ui/Footer';
import SectionToggle from '@/components/ui/SectionToggle';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <div id='hero'>
        <Hero />
      </div>

      <div id='media-content'>
        <MediaContent />
      </div>

      <div id='services'>
        <Services />
      </div>

      {/* <div id='featured-content'>
        <FeaturedContent />
      </div> */}

      <div id='newsletter'>
        <Newsletter />
      </div>
      <div id='trusted-by'>
        <TrustedBy />
      </div>
      <div id='about'>
        <About />
      </div>

      <div id='cta'>
        <CTA />
      </div>

      <Footer />

      <SectionToggle />
    </div>
  );
}
