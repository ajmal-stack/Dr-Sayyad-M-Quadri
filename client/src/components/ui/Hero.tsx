'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlayIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  MicrophoneIcon,
  ArrowRightIcon,
  HeartIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
} from '@heroicons/react/24/solid';

const achievements = [
  {
    icon: <AcademicCapIcon className='w-6 h-6' />,
    title: 'Licensed Psychiatrist',
    description: 'Board-certified mental health specialist',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <HeartIcon className='w-6 h-6' />,
    title: '10+ Years Experience',
    description: 'Helping thousands transform their lives',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <BookOpenIcon className='w-6 h-6' />,
    title: 'Published Author',
    description: 'Mental wellness books & research',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <MicrophoneIcon className='w-6 h-6' />,
    title: 'Podcast Host',
    description: 'Weekly therapeutic discussions',
    color: 'from-orange-500 to-red-500',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Anxiety Recovery',
    content:
      'Dr. Quadri helped me overcome panic attacks and find peace again.',
    rating: 5,
  },
  {
    name: 'Michael R.',
    role: 'Depression Treatment',
    content: 'Professional, compassionate, and truly life-changing therapy.',
    rating: 5,
  },
  {
    name: 'Lisa K.',
    role: 'Relationship Counseling',
    content: 'Saved my marriage and taught us healthy communication skills.',
    rating: 5,
  },
];

const specializations = [
  'Anxiety & Panic Disorders',
  'Depression & Mood Disorders',
  'Trauma & PTSD',
  'Relationship Issues',
  'Stress Management',
  'Sleep Disorders',
  'Addiction Recovery',
  'Life Transitions',
];

export default function Hero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for cursor effects
  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const imageContainer = document.querySelector(
        '.hero-image-container'
      ) as HTMLElement;
      if (imageContainer) {
        const rect = imageContainer.getBoundingClientRect();
        const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;

        imageContainer.style.setProperty('--mouse-x', `${x}%`);
        imageContainer.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    const imageContainer = document.querySelector(
      '.hero-image-container'
    ) as HTMLElement;
    if (imageContainer) {
      imageContainer.addEventListener('mousemove', handleMouseMove);
      return () =>
        imageContainer.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isVisible]);

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className='relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5' />
        <div
          className='w-full h-full bg-repeat opacity-40'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse' />
        <div className='absolute top-40 right-20 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-1000' />
        <div className='absolute bottom-20 left-20 w-24 h-24 bg-purple-200/25 rounded-full blur-xl animate-pulse delay-2000' />
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20'>
        <div className='grid lg:grid-cols-2 gap-12 items-start lg:items-center'>
          {/* Left Column - Content */}
          <div
            className={`space-y-8 flex flex-col justify-center min-h-[600px] lg:min-h-[700px] ${
              isVisible
                ? 'animate-in slide-in-from-left duration-1000'
                : 'opacity-0'
            }`}
          >
            <div className='space-y-8'>
              {/* Logo */}
              <div className='flex items-center space-x-4 mb-4'>
                <div className='relative'>
                  <Image
                    src='/SMQ.png'
                    alt='SMQ - Partner in emotional health'
                    width={120}
                    height={60}
                    className='h-12 w-auto object-contain'
                    priority
                  />
                </div>
                <div className='h-8 w-px bg-slate-300'></div>
                <div className='text-slate-600 text-sm font-medium'>
                  Partner in emotional health
                </div>
              </div>

              {/* Badge */}
              <div className='inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-8 py-3 rounded-full text-sm font-semibold shadow-lg'>
                <CheckBadgeIconSolid className='w-5 h-5 mr-2 text-blue-600' />
                Licensed Psychiatrist & Mental Health Expert
              </div>

              {/* Main Heading */}
              <div className='space-y-4'>
                <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight'>
                  Dr. Syed M{' '}
                  <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                    Quadri
                  </span>
                </h1>
                <p className='text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl'>
                  Transforming lives through{' '}
                  <span className='text-blue-600 font-semibold'>
                    compassionate care
                  </span>
                  ,{' '}
                  <span className='text-indigo-600 font-semibold'>
                    evidence-based therapy
                  </span>
                  , and{' '}
                  <span className='text-purple-600 font-semibold'>
                    holistic wellness
                  </span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/about/contact'
                  className='group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  <CalendarDaysIcon className='w-5 h-5 mr-2' />
                  Book Consultation
                  <ArrowRightIcon className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                </Link>
                <Link
                  href='/podcast'
                  className='group inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200 hover:border-slate-300'
                >
                  <PlayIcon className='w-5 h-5 mr-2 text-blue-600' />
                  Listen to Podcast
                </Link>
              </div>

              {/* Testimonial Carousel */}
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50'>
                <div className='flex items-center mb-3'>
                  <div className='flex space-x-1'>
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className='w-5 h-5 text-yellow-400'
                      />
                    ))}
                  </div>
                  <span className='ml-2 text-sm text-slate-600'>
                    {currentTestimonialData.rating}/5
                  </span>
                </div>
                <p className='text-slate-700 mb-3 italic'>
                  &quot;{currentTestimonialData.content}&quot;
                </p>
                <div className='flex items-center'>
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                    {currentTestimonialData.name[0]}
                  </div>
                  <div className='ml-3'>
                    <div className='font-semibold text-slate-800'>
                      {currentTestimonialData.name}
                    </div>
                    <div className='text-sm text-slate-600'>
                      {currentTestimonialData.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Stats */}
          <div
            className={`space-y-8 flex flex-col justify-center min-h-[600px] lg:min-h-[700px] ${
              isVisible
                ? 'animate-in slide-in-from-right duration-1000 delay-300'
                : 'opacity-0'
            }`}
          >
            {/* Professional Image with Interactive Effects */}
            <div className='relative group cursor-none hero-image-container flex-1 flex items-center justify-center'>
              <div className='relative w-full max-w-md mx-auto'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 transform rotate-6 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500'></div>
                <div className='relative bg-white p-2 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]'>
                  <div className='relative overflow-hidden rounded-2xl'>
                    <Image
                      src='/sayyed-quadri1.png'
                      alt='Dr. Syed M Quadri - Licensed Psychiatrist'
                      width={400}
                      height={500}
                      className='w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110'
                      priority
                    />
                    {/* Gradient Overlay on Hover */}
                    <div className='absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                    {/* Interactive Light Effect */}
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                      <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-xl animate-pulse'></div>
                      <div className='absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-400/30 to-transparent rounded-full blur-xl animate-pulse delay-300'></div>
                    </div>

                    {/* Sparkle Effects */}
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700'>
                      <div className='absolute top-1/6 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping'></div>
                      <div className='absolute top-2/3 left-1/6 w-1 h-1 bg-indigo-400 rounded-full animate-ping delay-200'></div>
                      <div className='absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-500'></div>
                      <div className='absolute bottom-1/4 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping delay-700'></div>
                    </div>
                  </div>
                </div>

                {/* Custom Cursor Follower */}
                <div
                  className='absolute pointer-events-none z-10 w-8 h-8 border-2 border-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-difference'
                  style={{
                    transform: 'translate(-50%, -50%)',
                    left: 'var(--mouse-x, 50%)',
                    top: 'var(--mouse-y, 50%)',
                  }}
                >
                  <div className='w-full h-full bg-blue-500/20 rounded-full animate-pulse'></div>
                </div>

                {/* Magnetic Effect Border */}
                <div className='absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <div className='absolute inset-0 rounded-3xl border-2 border-blue-400/50 animate-pulse'></div>
                  <div className='absolute inset-2 rounded-3xl border border-indigo-400/30 animate-pulse delay-300'></div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className='absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-200/50'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>10+</div>
                  <div className='text-sm text-slate-600'>Years Experience</div>
                </div>
              </div>

              <div className='absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-200/50'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-emerald-600'>
                    5000+
                  </div>
                  <div className='text-sm text-slate-600'>
                    Lives Transformed
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className='grid grid-cols-2 gap-4'>
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    isVisible
                      ? 'animate-in slide-in-from-bottom duration-1000'
                      : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} text-white mb-3`}
                  >
                    {achievement.icon}
                  </div>
                  <h3 className='font-semibold text-slate-800 mb-1'>
                    {achievement.title}
                  </h3>
                  <p className='text-sm text-slate-600'>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div
          className={`mt-20 text-center ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-700'
              : 'opacity-0'
          }`}
        >
          <h2 className='text-2xl md:text-3xl font-bold text-slate-900 mb-8'>
            Areas of Expertise
          </h2>
          <div className='flex flex-wrap justify-center gap-3'>
            {specializations.map((spec, index) => (
              <span
                key={index}
                className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200/50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105'
              >
                <ShieldCheckIcon className='w-4 h-4 mr-2' />
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
}
