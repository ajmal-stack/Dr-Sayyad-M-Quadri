'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  StarIcon,
  PlayCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckBadgeIcon,
  HeartIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarIconSolid,
  PlayCircleIcon as PlayCircleIconSolid,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Executive',
    company: 'Tech Innovations Inc.',
    image: '👩‍💼',
    content:
      'Dr. Quadri transformed my understanding of anxiety. His compassionate approach and practical strategies helped me regain control of my life. The techniques I learned have been life-changing.',
    detailedContent:
      'I came to Dr. Quadri dealing with severe panic attacks that were affecting my work performance. Through his patient guidance and evidence-based approach, I learned to understand my triggers and develop coping strategies. Six months later, I feel like a completely different person.',
    rating: 5,
    condition: 'Anxiety Recovery',
    duration: '6 months',
    treatmentType: 'CBT & Mindfulness',
    improvement: '95%',
    beforeScore: 2,
    afterScore: 9,
    featured: true,
    videoTestimonial: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    company: 'StartupFlow',
    image: '👨‍💻',
    content:
      'The therapy sessions were life-changing. I learned to manage depression and now feel more confident and motivated than ever before.',
    detailedContent:
      'Depression had taken over my life for years. Dr. Quadri helped me understand that recovery was possible. Through consistent therapy and the right treatment plan, I rediscovered my passion for life and work.',
    rating: 5,
    condition: 'Depression Treatment',
    duration: '8 months',
    treatmentType: 'IPT & Medication',
    improvement: '90%',
    beforeScore: 3,
    afterScore: 8,
    featured: false,
    videoTestimonial: false,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'High School Teacher',
    company: 'Lincoln High School',
    image: '👩‍🏫',
    content:
      'Professional, empathetic, and truly understanding. Dr. Quadri helped me through my trauma with patience and expertise.',
    detailedContent:
      'After a difficult life event, I struggled with PTSD symptoms. Dr. Quadri created a safe space where I could process my trauma. His specialized approach helped me heal and move forward with confidence.',
    rating: 5,
    condition: 'Trauma Therapy',
    duration: '1 year',
    treatmentType: 'EMDR & CBT',
    improvement: '88%',
    beforeScore: 2,
    afterScore: 8,
    featured: true,
    videoTestimonial: true,
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Business Owner',
    company: 'Thompson Consulting',
    image: '👨‍💼',
    content:
      'The stress management techniques I learned have improved both my personal life and business relationships significantly.',
    detailedContent:
      'Running a business was consuming my life. Dr. Quadri taught me practical stress management techniques that not only improved my mental health but also made me a better leader and partner.',
    rating: 5,
    condition: 'Stress Management',
    duration: '4 months',
    treatmentType: 'Mindfulness & CBT',
    improvement: '92%',
    beforeScore: 4,
    afterScore: 9,
    featured: false,
    videoTestimonial: false,
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Nurse Practitioner',
    company: 'City Medical Center',
    image: '👩‍⚕️',
    content:
      'Dr. Quadri helped me overcome burnout and rediscover my passion for healthcare. His approach is both professional and deeply caring.',
    detailedContent:
      "Healthcare burnout was affecting every aspect of my life. Through therapy, I learned to set boundaries, practice self-care, and find meaning in my work again. I'm now thriving both personally and professionally.",
    rating: 5,
    condition: 'Burnout Recovery',
    duration: '5 months',
    treatmentType: 'ACT & Wellness Coaching',
    improvement: '94%',
    beforeScore: 3,
    afterScore: 9,
    featured: true,
    videoTestimonial: false,
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'College Student',
    company: 'State University',
    image: '👨‍🎓',
    content:
      'Therapy helped me navigate the challenges of college life and develop healthy coping mechanisms for academic stress.',
    detailedContent:
      'College was overwhelming, and I was struggling with anxiety and depression. Dr. Quadri helped me develop study strategies, manage social anxiety, and build confidence. My grades improved dramatically.',
    rating: 5,
    condition: 'Academic Anxiety',
    duration: '7 months',
    treatmentType: 'CBT & Study Skills',
    improvement: '87%',
    beforeScore: 3,
    afterScore: 8,
    featured: false,
    videoTestimonial: true,
  },
];

const stats = [
  {
    icon: UsersIcon,
    label: 'Patients Helped',
    value: '5000+',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: StarIcon,
    label: 'Average Rating',
    value: '4.9/5',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: HeartIcon,
    label: 'Success Rate',
    value: '92%',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: CheckBadgeIcon,
    label: 'Years Experience',
    value: '10+',
    color: 'from-purple-500 to-violet-600',
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlay(false);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5' />
        <div
          className='w-full h-full bg-repeat opacity-30'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-20 right-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000' />
        <div className='absolute top-40 right-20 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-2000' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header */}
        <div
          className={`text-center mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-top duration-1000'
              : 'opacity-0'
          }`}
        >
          <div className='inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg'>
            <HeartIconSolid className='w-5 h-5 mr-2 text-pink-500' />
            Patient Success Stories
          </div>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight'>
            Lives{' '}
            <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Transformed
            </span>
          </h2>
          <p className='text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed'>
            Real stories from real people who found their path to wellness
            through{' '}
            <span className='text-blue-600 font-semibold'>
              compassionate care
            </span>{' '}
            and{' '}
            <span className='text-indigo-600 font-semibold'>
              evidence-based treatment
            </span>
          </p>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-300'
              : 'opacity-0'
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200/50 hover:border-slate-300/50 text-center group hover:scale-105'
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className='w-7 h-7' />
              </div>
              <div className='text-3xl font-bold text-slate-800 mb-2'>
                {stat.value}
              </div>
              <div className='text-sm text-slate-600'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial Carousel */}
        <div
          className={`mb-20 ${
            isVisible
              ? 'animate-in slide-in-from-left duration-1000 delay-500'
              : 'opacity-0'
          }`}
        >
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200/50 relative overflow-hidden'>
            {/* Background Gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30' />

            <div className='relative z-10'>
              <div className='grid lg:grid-cols-3 gap-8 items-center'>
                {/* Testimonial Content */}
                <div className='lg:col-span-2 space-y-6'>
                  {/* Rating */}
                  <div className='flex items-center space-x-1'>
                    {[...Array(currentTestimonialData.rating)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className='w-6 h-6 text-yellow-400'
                      />
                    ))}
                    <span className='ml-3 text-sm text-slate-600 font-medium'>
                      {currentTestimonialData.rating}/5 · Verified Patient
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className='text-xl md:text-2xl text-slate-700 leading-relaxed font-medium'>
                    &quot;{currentTestimonialData.detailedContent}&quot;
                  </blockquote>

                  {/* Patient Info */}
                  <div className='flex items-center space-x-4'>
                    <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg'>
                      {currentTestimonialData.image}
                    </div>
                    <div>
                      <div className='font-bold text-lg text-slate-800'>
                        {currentTestimonialData.name}
                      </div>
                      <div className='text-slate-600'>
                        {currentTestimonialData.role} at{' '}
                        {currentTestimonialData.company}
                      </div>
                    </div>
                    {currentTestimonialData.videoTestimonial && (
                      <button className='ml-auto group flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300'>
                        <PlayCircleIconSolid className='w-5 h-5 group-hover:scale-110 transition-transform' />
                        <span className='text-sm font-medium'>Watch Video</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Treatment Stats */}
                <div className='space-y-4'>
                  <div className='bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200/50'>
                    <h4 className='font-semibold text-slate-800 mb-4'>
                      Treatment Details
                    </h4>
                    <div className='space-y-3'>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm text-slate-600'>
                          Condition:
                        </span>
                        <span className='font-medium text-slate-800'>
                          {currentTestimonialData.condition}
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm text-slate-600'>
                          Duration:
                        </span>
                        <span className='font-medium text-slate-800'>
                          {currentTestimonialData.duration}
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm text-slate-600'>
                          Treatment:
                        </span>
                        <span className='font-medium text-slate-800'>
                          {currentTestimonialData.treatmentType}
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <span className='text-sm text-slate-600'>
                          Improvement:
                        </span>
                        <span className='font-bold text-emerald-600'>
                          {currentTestimonialData.improvement}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className='mt-6'>
                      <div className='flex justify-between text-xs text-slate-600 mb-2'>
                        <span>Before Treatment</span>
                        <span>After Treatment</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <div className='text-xs text-slate-500'>
                          {currentTestimonialData.beforeScore}/10
                        </div>
                        <div className='flex-1 bg-slate-200 rounded-full h-2'>
                          <div
                            className='bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-1000'
                            style={{
                              width: `${
                                (currentTestimonialData.afterScore / 10) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <div className='text-xs font-medium text-emerald-600'>
                          {currentTestimonialData.afterScore}/10
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className='flex items-center justify-between mt-8'>
                <div className='flex items-center space-x-4'>
                  <button
                    onClick={prevTestimonial}
                    className='w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105'
                  >
                    <ChevronLeftIcon className='w-5 h-5' />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className='w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all duration-300 hover:scale-105'
                  >
                    <ChevronRightIcon className='w-5 h-5' />
                  </button>
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isAutoPlay
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isAutoPlay ? 'Pause' : 'Play'} Auto
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className='flex space-x-2'>
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentTestimonial(index);
                        setIsAutoPlay(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-blue-500 scale-125'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div
          className={`mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-700'
              : 'opacity-0'
          }`}
        >
          <div className='text-center mb-12'>
            <h3 className='text-3xl md:text-4xl font-bold text-slate-900 mb-4'>
              What Our Patients Say
            </h3>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              Discover more success stories from patients who have transformed
              their lives
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 border border-slate-200/50 hover:border-blue-200/50 transform hover:scale-[1.02] cursor-pointer ${
                  index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
                }`}
                onClick={() =>
                  setSelectedTestimonial(
                    selectedTestimonial === testimonial.id
                      ? null
                      : testimonial.id
                  )
                }
              >
                {/* Featured Badge */}
                {testimonial.featured && (
                  <div className='absolute -top-3 left-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                    Featured
                  </div>
                )}

                <div className='flex items-start space-x-4 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
                    {testimonial.image}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-bold text-lg text-slate-800 mb-1'>
                      {testimonial.name}
                    </h4>
                    <p className='text-slate-600 text-sm mb-2'>
                      {testimonial.role}
                    </p>
                    <div className='flex items-center space-x-1'>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className='w-4 h-4 text-yellow-400'
                        />
                      ))}
                    </div>
                  </div>
                  {testimonial.videoTestimonial && (
                    <PlayCircleIcon className='w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors' />
                  )}
                </div>

                <blockquote className='text-slate-700 leading-relaxed mb-4 italic'>
                  &quot;
                  {selectedTestimonial === testimonial.id
                    ? testimonial.detailedContent
                    : testimonial.content}
                  &quot;
                </blockquote>

                <div className='flex items-center justify-between pt-4 border-t border-slate-200/50'>
                  <div className='flex items-center space-x-2'>
                    <div className='bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 rounded-full'>
                      <span className='text-xs font-semibold text-emerald-700'>
                        {testimonial.condition}
                      </span>
                    </div>
                  </div>
                  <div className='text-xs text-slate-500 flex items-center space-x-1'>
                    <ClockIcon className='w-3 h-3' />
                    <span>{testimonial.duration}</span>
                  </div>
                </div>

                {/* Expanded Content */}
                {selectedTestimonial === testimonial.id && (
                  <div className='mt-4 pt-4 border-t border-slate-200/50 animate-in slide-in-from-top duration-300'>
                    <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div>
                        <span className='text-slate-500'>Treatment:</span>
                        <div className='font-medium text-slate-700'>
                          {testimonial.treatmentType}
                        </div>
                      </div>
                      <div>
                        <span className='text-slate-500'>Improvement:</span>
                        <div className='font-bold text-emerald-600'>
                          {testimonial.improvement}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
      </div>
    </section>
  );
}
