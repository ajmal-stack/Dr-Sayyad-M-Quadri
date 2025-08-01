'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const healthcareOrganizations = [
  {
    name: 'American Psychiatric Association',
    logo: 'https://logo.clearbit.com/psychiatry.org',
  },
  {
    name: 'Mayo Clinic',
    logo: 'https://logo.clearbit.com/mayoclinic.org',
  },
  {
    name: 'Joint Commission',
    logo: 'https://logo.clearbit.com/jointcommission.org',
  },
  {
    name: 'NAMI',
    logo: 'https://logo.clearbit.com/nami.org',
  },
  {
    name: 'Psychology Today',
    logo: 'https://logo.clearbit.com/psychologytoday.com',
  },
  {
    name: 'Healthgrades',
    logo: 'https://logo.clearbit.com/healthgrades.com',
  },
  {
    name: 'WebMD',
    logo: 'https://logo.clearbit.com/webmd.com',
  },
  {
    name: 'Cleveland Clinic',
    logo: 'https://logo.clearbit.com/clevelandclinic.org',
  },
  {
    name: 'Johns Hopkins',
    logo: 'https://logo.clearbit.com/hopkinsmedicine.org',
  },
  {
    name: 'BetterHelp',
    logo: 'https://logo.clearbit.com/betterhelp.com',
  },
];

export default function TrustedBy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className='py-4 sm:py-8 lg:py-12 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-10 left-1/4 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl animate-pulse' />
        <div className='absolute bottom-10 right-1/4 w-24 h-24 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-1000' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 lg:mb-8 ${
            isVisible
              ? 'animate-in slide-in-from-top duration-1000'
              : 'opacity-0'
          }`}
        >
          <p className='text-sm sm:text-base lg:text-lg font-medium text-slate-500 uppercase tracking-wider mb-2'>
            Trusted by Healthcare Organizations
          </p>
          <div className='w-16 sm:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto'></div>
        </div>

        {/* Logo Marquee */}
        <div
          className={`relative ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-300'
              : 'opacity-0'
          }`}
        >
          {/* Gradient Overlays */}
          <div className='absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10'></div>
          <div className='absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10'></div>

          {/* Scrolling Container */}
          <div className='overflow-hidden'>
            <div className='flex animate-scroll'>
              {/* First set of logos */}
              {healthcareOrganizations.map((organization, index) => (
                <div
                  key={`first-${organization.name}`}
                  className='flex-shrink-0 mx-6 sm:mx-8 lg:mx-12 flex flex-col items-center justify-center h-20 sm:h-24 lg:h-28'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={organization.logo}
                    alt={`${organization.name} logo`}
                    width={120}
                    height={48}
                    className='h-8 sm:h-10 lg:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0 mb-2'
                    onError={(e) => {
                      // Fallback to text if logo fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className='text-xs sm:text-sm font-medium text-slate-500 text-center leading-tight max-w-20 sm:max-w-24'>
                    {organization.name}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {healthcareOrganizations.map((organization) => (
                <div
                  key={`second-${organization.name}`}
                  className='flex-shrink-0 mx-6 sm:mx-8 lg:mx-12 flex flex-col items-center justify-center h-20 sm:h-24 lg:h-28'
                >
                  <Image
                    src={organization.logo}
                    alt={`${organization.name} logo`}
                    width={120}
                    height={48}
                    className='h-8 sm:h-10 lg:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0 mb-2'
                    onError={(e) => {
                      // Fallback to text if logo fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className='text-xs sm:text-sm font-medium text-slate-500 text-center leading-tight max-w-20 sm:max-w-24'>
                    {organization.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div
          className={`text-center mt-8 sm:mt-12 lg:mt-8 ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-500'
              : 'opacity-0'
          }`}
        >
          <p className='text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto'>
            Affiliated with leading medical institutions and recognized by top
            healthcare organizations for mental health excellence
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
