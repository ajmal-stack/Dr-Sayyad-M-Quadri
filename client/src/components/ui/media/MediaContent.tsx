'use client';

import { useState, useEffect } from 'react';
import MediaContentMobile from './MediaContentMobile';
import MediaContentDesktop from './MediaContentDesktop';
import { ContentLoader } from '../primitives/Loader';



export default function MediaContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);


  // Loading state
  if (isLoading) {
    return (
      <section className='pt-8 pb-12 bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 relative overflow-hidden'>
        <div className="absolute inset-0 z-40 bg-white/80 backdrop-blur-sm">
          <ContentLoader 
            variant="dots" 
            size="xl" 
            message="Loading media content..." 
            className="min-h-[400px]"
          />
        </div>
      </section>
    );
  }

  // Render mobile or desktop component based on screen size
  return isMobile ? <MediaContentMobile /> : <MediaContentDesktop />;
}
