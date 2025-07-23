'use client';

import { useState, useEffect } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import {
  // CalendarDaysIcon,
  // BookOpenIcon,
  // ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
// Removed unused solid icons

// Main Hero Carousel Data with Background Images
const heroSlides = [
  {
    id: 1,
    // title: 'Dr. Syed M Quadri',
    // subtitle: 'Licensed Psychiatrist & Mental Health Expert',
    // description:
    //   'Transforming lives through compassionate care, evidence-based therapy, and holistic wellness approaches',
    backgroundImage:
      '/banner/U_White and Black Simple Mental Health Youtube Thumbnail.png',
    // gradient: 'from-blue-900/80 via-blue-800/70 to-indigo-900/80',
    // textGradient: 'from-blue-400 via-indigo-300 to-purple-400',
    // badge: 'Licensed Psychiatrist',
    // stats: { left: '10+ Years', right: '5000+ Lives' },
    // primaryCTA: 'Book Consultation',
    // secondaryCTA: 'Learn More',
  },
  {
    id: 2,
    // title: 'YouTube Channel',
    // subtitle: 'MSental Health Education & Awareness',
    // description:
    //   'Subscribe to our YouTube channel for weekly mental health tips, therapy sessions, and expert guidance on wellness',
    backgroundImage:
      '/banner/White and Black Simple Mental Health Youtube Thumbnail.png',
    // gradient: 'from-red-900/80 via-red-800/70 to-orange-900/80',
    // textGradient: 'from-red-400 via-orange-300 to-yellow-400',
    // badge: 'YouTube Creator',
    // stats: { left: '50K+ Subscribers', right: '200+ Videos' },
    // primaryCTA: 'Subscribe Now',
    // secondaryCTA: 'Watch Videos',
  },
  {
    id: 3,
    // title: 'Mental Health Podcast',
    // subtitle: 'Therapeutic Conversations & Healing',
    // description:
    //   'Listen to our weekly podcast featuring mental health discussions, patient stories, and expert insights for your wellness journey',
    backgroundImage: '/banner/Parenting Unveiled (3).jpg',
    // gradient: 'from-purple-900/80 via-indigo-800/70 to-blue-900/80',
    // textGradient: 'from-purple-400 via-indigo-300 to-blue-400',
    // badge: 'Podcast Host',
    // stats: { left: '100+ Episodes', right: '25K+ Listeners' },
    // primaryCTA: 'Listen Now',
    // secondaryCTA: 'All Episodes',
  },
  {
    id: 4,
    // title: 'Mental Health Awareness',
    // subtitle: 'Breaking Stigma, Building Hope',
    // description:
    //   'Join our mission to promote mental health awareness, reduce stigma, and create a supportive community for healing and growth',
    backgroundImage: '/banner/Parenting Unveiled (4).jpg',
    // gradient: 'from-emerald-900/80 via-teal-800/70 to-cyan-900/80',
    // textGradient: 'from-emerald-400 via-teal-300 to-cyan-400',
    // badge: 'Mental Health Advocate',
    // stats: { left: 'Community Support', right: 'Hope & Healing' },
    // primaryCTA: 'Get Support',
    // secondaryCTA: 'Learn More',
  },
  {
    id: 5,
    // title: 'Trauma & PTSD Specialist',
    // subtitle: 'Healing Through Expert Care',
    // description:
    //   'Specialized trauma therapy using EMDR, cognitive approaches, and innovative healing methodologies',
    backgroundImage: '/banner/Parenting Unveiled (1).jpg',
    // gradient: 'from-slate-900/80 via-gray-800/70 to-zinc-900/80',
    // textGradient: 'from-slate-400 via-gray-300 to-zinc-400',
    // badge: 'Trauma Expert',
    // stats: { left: 'EMDR Certified', right: '600+ Healed' },
    // primaryCTA: 'Get Help Now',
    // secondaryCTA: 'Learn About PTSD',
  },
];

// Testimonials removed as they're not currently used

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Navigation functions
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  const goToSlide = (index: number) => setCurrentSlide(index);

  // currentSlideData removed as it's not currently used

  return (
    <section
      className='relative h-[90vh] w-full overflow-hidden mt-20'
      id='hero'
    >
      {/* Background Image Carousel */}
      <div className='absolute inset-0'>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-110'
            }`}
          >
            {/* Background Image */}
            <div className='absolute inset-0'>
              <Image
                src={slide.backgroundImage}
                alt={`Hero background ${slide.id}`}
                fill
                className='object-cover object-center'
                priority={index === 0}
                quality={95}
              />
            </div>

            {/* Lighter Overlay for Better Background Visibility */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40' />
          </div>
        ))}
      </div>
      {/* Main Content - Centered without navbar conflict */}
      <div className='relative z-10 h-full flex items-center justify-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8'>
          <div className='text-center'>
            {/* Logo */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6 md:mb-8 ${
                isVisible
                  ? 'animate-in fade-in slide-in-from-top duration-1000'
                  : 'opacity-0'
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* <div className='relative'>
                <Image
                  src='/SMQ.png'
                  alt='SMQ - Partner in emotional health'
                  width={140}
                  height={70}
                  className='h-8 sm:h-10 md:h-12 lg:h-16 w-auto object-contain filter brightness-0 invert'
                  priority
                />
              </div> */}
              {/* <div className='hidden sm:block h-6 md:h-8 lg:h-12 w-px bg-white/50'></div>
              <div className='text-white/90 text-xs sm:text-sm md:text-base font-medium text-center sm:text-left'>
                Partner in emotional health
              </div> */}
            </div>

            {/* Badge */}
            {/* <div
              className={`inline-flex items-center bg-white/30 backdrop-blur-md text-white px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-6 md:mb-8 border border-white/40 shadow-lg ${
                isVisible
                  ? 'animate-in fade-in slide-in-from-top duration-1000 delay-200'
                  : 'opacity-0'
              }`}
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              <CheckBadgeIconSolid className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2' />
              {currentSlideData.badge}
            </div> */}

            {/* Main Title */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight px-2 ${
                isVisible
                  ? 'animate-in fade-in slide-in-from-bottom duration-1000 delay-400'
                  : 'opacity-0'
              }`}
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}
            >
              <span
                className={`bg-gradient-to-r ${
                  currentSlide === 0
                    ? 'from-blue-400 via-indigo-300 to-purple-400'
                    : currentSlide === 1
                    ? 'from-red-400 via-orange-400 to-yellow-400'
                    : currentSlide === 2
                    ? 'from-purple-400 via-pink-400 to-blue-400'
                    : currentSlide === 3
                    ? 'from-emerald-400 via-teal-400 to-cyan-400'
                    : 'from-slate-300 via-gray-200 to-zinc-300'
                } bg-clip-text text-transparent font-extrabold`}
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                }}
              >
                Dr. Syed M Quadri
              </span>
            </h1>

            {/* Subtitle */}
            <h2
              className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-white/95 mb-2 sm:mb-3 md:mb-4 lg:mb-6 px-4 ${
                isVisible
                  ? 'animate-in fade-in slide-in-from-bottom duration-1000 delay-600'
                  : 'opacity-0'
              }`}
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              Licensed Psychiatrist & Mental Health Expert
            </h2>

            {/* Description */}
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 ${
                isVisible
                  ? 'animate-in fade-in slide-in-from-bottom duration-1000 delay-800'
                  : 'opacity-0'
              }`}
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
            >
              Transforming lives through compassionate care, evidence-based
              therapy, and holistic wellness approaches
            </p>

            {/* CTA Buttons */}
            {/* <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 ${
                isVisible
                  ? 'animate-in fade-in slide-in-from-bottom duration-1000 delay-1000'
                  : 'opacity-0'
              }`}
            >
              <Link
                href='/about/contact'
                className='group inline-flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-white text-slate-900 rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg lg:text-xl hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 w-full sm:w-auto sm:min-w-[180px] md:min-w-[220px] lg:min-w-[250px]'
              >
                <CalendarDaysIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3' />
                {currentSlideData.primaryCTA}
                <ArrowRightIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform' />
              </Link>

              <Link
                href='/services'
                className='group inline-flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-white/20 backdrop-blur-md text-white rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg lg:text-xl hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50 w-full sm:w-auto sm:min-w-[180px] md:min-w-[220px] lg:min-w-[250px]'
              >
                <BookOpenIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3' />
                {currentSlideData.secondaryCTA}
              </Link>
            </div> */}

            {/* Stats */}
            {/* <div
              className={`flex flex-col xs:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 justify-center items-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 ${
                isVisible
                  ? 'animate-in fade-in slide-in-from-bottom duration-1000 delay-1200'
                  : 'opacity-0'
              }`}
            >
              <div className='text-center'>
                <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 md:mb-2'>
                  {currentSlideData.stats.left}
                </div>
                <div className='text-xs sm:text-sm md:text-base text-white/70 font-medium'>
                  Experience
                </div>
              </div>

              <div className='hidden xs:block w-px h-8 sm:h-10 md:h-12 lg:h-16 bg-white/30'></div>

              <div className='text-center'>
                <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 md:mb-2'>
                  {currentSlideData.stats.right}
                </div>
                <div className='text-xs sm:text-sm md:text-base text-white/70 font-medium'>
                  Transformed
                </div>
              </div>
            </div> */}

            {/* Testimonial Preview */}
            {/* {testimonials[currentSlide % testimonials.length] && (
              <div
                className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/30 mx-4 shadow-lg ${
                  isVisible
                    ? 'animate-in fade-in slide-in-from-bottom duration-1000 delay-1400'
                    : 'opacity-0'
                }`}
              >
                <div className='flex justify-center mb-2 sm:mb-3 md:mb-4'>
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 drop-shadow-lg'
                    />
                  ))}
                </div>
                <blockquote
                  className='text-xs sm:text-sm md:text-base lg:text-lg text-white/95 italic mb-2 sm:mb-3 md:mb-4'
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  &quot;
                  {testimonials[currentSlide % testimonials.length].content}
                  &quot;
                </blockquote>
                <div className='flex flex-col xs:flex-row items-center justify-center space-y-1 xs:space-y-0 xs:space-x-2'>
                  <div
                    className='font-semibold text-white text-xs sm:text-sm md:text-base'
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {testimonials[currentSlide % testimonials.length].name}
                  </div>
                  <span className='hidden xs:inline text-white/60'>•</span>
                  <div
                    className='text-xs sm:text-sm text-white/80'
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                  >
                    {testimonials[currentSlide % testimonials.length].role}
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping' />
        <div className='absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1000' />
        <div className='absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping delay-2000' />
        <div className='absolute top-60 left-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping delay-500' />
        <div className='absolute bottom-60 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-ping delay-1500' />
      </div>

      {/* Navigation Controls */}
      <div className='absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div className='flex items-center space-x-2 sm:space-x-3 md:space-x-4 bg-white/20 backdrop-blur-md rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border border-white/30'>
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className='p-1.5 sm:p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 group'
            aria-label='Previous slide'
          >
            <ChevronLeftIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform' />
          </button>

          {/* Slide Indicators */}
          <div className='flex space-x-1 sm:space-x-2 md:space-x-3'>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-4 sm:w-6 md:w-8 lg:w-12'
                    : 'bg-white/50 w-1.5 sm:w-2 md:w-3 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className='p-1.5 sm:p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 group'
            aria-label='Next slide'
          >
            <ChevronRightIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform' />
          </button>
        </div>
      </div>

      {/* Side Navigation - Hidden on mobile */}
      <div className='absolute right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block'>
        <div className='flex flex-col space-y-3 md:space-y-4'>
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full transition-all duration-300 border-2 ${
                index === currentSlide
                  ? 'bg-white/20 border-white backdrop-blur-md'
                  : 'bg-white/10 border-white/50 hover:bg-white/20 hover:border-white'
              }`}
              title={`Slide ${slide.id}`}
            >
              <span className='sr-only'>{`Slide ${slide.id}`}</span>
              <div
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mx-auto ${
                  index === currentSlide ? 'bg-white' : 'bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Contact - Top Right */}
      {/* <div className='absolute top-4 sm:top-6 md:top-8 right-2 sm:right-4 md:right-8 z-20'>
        <Link
          href='tel:+1234567890'
          className='flex items-center space-x-1 sm:space-x-2 bg-red-600/90 hover:bg-red-600 text-white px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl'
        >
          <PhoneIcon className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' />
          <span className='hidden sm:inline'>Emergency: (123) 456-7890</span>
          <span className='sm:hidden'>Emergency</span>
        </Link>
      </div> */}

      {/* Progress Bar */}
      <div className='absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20 z-20'>
        <div
          className='h-full bg-white transition-all duration-300 ease-linear'
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
