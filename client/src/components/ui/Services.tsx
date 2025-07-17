'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  SunIcon,
  UserGroupIcon,
  MoonIcon,
  ArrowPathIcon,
  StarIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  CpuChipIcon as CpuChipIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  SunIcon as SunIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  MoonIcon as MoonIconSolid,
  ArrowPathIcon as ArrowPathIconSolid,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';

const specializations = [
  {
    name: 'Anxiety Disorders',
    icon: CpuChipIcon,
    iconSolid: CpuChipIconSolid,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'from-blue-50 to-indigo-50',
    hoverColor: 'hover:from-blue-100 hover:to-indigo-100',
    description:
      'Evidence-based treatment for panic attacks, social anxiety, and generalized anxiety disorders',
    features: [
      'Cognitive Behavioral Therapy',
      'Exposure Therapy',
      'Mindfulness Techniques',
      'Medication Management',
    ],
    duration: '8-16 sessions',
    successRate: '92%',
  },
  {
    name: 'Depression',
    icon: HeartIcon,
    iconSolid: HeartIconSolid,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'from-emerald-50 to-teal-50',
    hoverColor: 'hover:from-emerald-100 hover:to-teal-100',
    description:
      'Comprehensive care for major depression, dysthymia, and mood-related challenges',
    features: [
      'Interpersonal Therapy',
      'Behavioral Activation',
      'Support Groups',
      'Lifestyle Coaching',
    ],
    duration: '12-20 sessions',
    successRate: '89%',
  },
  {
    name: 'Stress Management',
    icon: SunIcon,
    iconSolid: SunIconSolid,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'from-orange-50 to-amber-50',
    hoverColor: 'hover:from-orange-100 hover:to-amber-100',
    description:
      'Learn effective strategies to manage work stress, life transitions, and daily pressures',
    features: [
      'Stress Reduction Techniques',
      'Time Management',
      'Relaxation Training',
      'Coping Strategies',
    ],
    duration: '6-12 sessions',
    successRate: '95%',
  },
  {
    name: 'Trauma Therapy',
    icon: ShieldCheckIcon,
    iconSolid: ShieldCheckIconSolid,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'from-purple-50 to-violet-50',
    hoverColor: 'hover:from-purple-100 hover:to-violet-100',
    description:
      'Specialized treatment for PTSD, childhood trauma, and traumatic life experiences',
    features: [
      'EMDR Therapy',
      'Trauma-Focused CBT',
      'Safety Planning',
      'Resilience Building',
    ],
    duration: '16-24 sessions',
    successRate: '87%',
  },
  {
    name: 'Relationship Issues',
    icon: UserGroupIcon,
    iconSolid: UserGroupIconSolid,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50',
    hoverColor: 'hover:from-pink-100 hover:to-rose-100',
    description:
      'Improve communication, resolve conflicts, and strengthen emotional connections',
    features: [
      'Couples Therapy',
      'Communication Skills',
      'Conflict Resolution',
      'Family Counseling',
    ],
    duration: '10-18 sessions',
    successRate: '88%',
  },
  {
    name: 'Sleep Disorders',
    icon: MoonIcon,
    iconSolid: MoonIconSolid,
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'from-indigo-50 to-blue-50',
    hoverColor: 'hover:from-indigo-100 hover:to-blue-100',
    description:
      'Address insomnia, sleep anxiety, and develop healthy sleep patterns',
    features: [
      'Sleep Hygiene Education',
      'CBT for Insomnia',
      'Relaxation Techniques',
      'Sleep Schedule Planning',
    ],
    duration: '6-10 sessions',
    successRate: '93%',
  },
  {
    name: 'Addiction Recovery',
    icon: ArrowPathIcon,
    iconSolid: ArrowPathIconSolid,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'from-teal-50 to-cyan-50',
    hoverColor: 'hover:from-teal-100 hover:to-cyan-100',
    description:
      'Support for substance abuse recovery and behavioral addiction treatment',
    features: [
      'Motivational Interviewing',
      'Relapse Prevention',
      'Support Groups',
      'Family Therapy',
    ],
    duration: '16-32 sessions',
    successRate: '84%',
  },
  {
    name: 'Life Transitions',
    icon: StarIcon,
    iconSolid: StarIconSolid,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'from-violet-50 to-purple-50',
    hoverColor: 'hover:from-violet-100 hover:to-purple-100',
    description:
      'Navigate major life changes, career transitions, and personal growth challenges',
    features: [
      'Goal Setting',
      'Decision Making',
      'Adaptability Skills',
      'Personal Development',
    ],
    duration: '8-14 sessions',
    successRate: '91%',
  },
];

const treatmentApproaches = [
  {
    name: 'Cognitive Behavioral Therapy',
    acronym: 'CBT',
    description:
      'Evidence-based approach focusing on thought patterns and behaviors',
    conditions: ['Anxiety', 'Depression', 'PTSD'],
  },
  {
    name: 'Dialectical Behavior Therapy',
    acronym: 'DBT',
    description:
      'Skills-based therapy for emotional regulation and interpersonal effectiveness',
    conditions: [
      'Borderline Personality',
      'Self-harm',
      'Emotional Dysregulation',
    ],
  },
  {
    name: 'Eye Movement Desensitization',
    acronym: 'EMDR',
    description: 'Specialized trauma therapy using bilateral stimulation',
    conditions: ['PTSD', 'Trauma', 'Phobias'],
  },
  {
    name: 'Acceptance & Commitment Therapy',
    acronym: 'ACT',
    description: 'Mindfulness-based approach for psychological flexibility',
    conditions: ['Chronic Pain', 'Anxiety', 'Depression'],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5' />
        <div
          className='w-full h-full bg-repeat opacity-30'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl animate-pulse' />
        <div className='absolute top-40 right-20 w-32 h-32 bg-indigo-200/15 rounded-full blur-2xl animate-pulse delay-1000' />
        <div className='absolute bottom-20 left-20 w-24 h-24 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-2000' />
        <div className='absolute bottom-40 right-10 w-28 h-28 bg-emerald-200/15 rounded-full blur-2xl animate-pulse delay-3000' />
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
            <CheckCircleIcon className='w-5 h-5 mr-2' />
            Comprehensive Mental Health Services
          </div>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight'>
            Transform Your Life with{' '}
            <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Expert Care
            </span>
          </h2>
          <p className='text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed'>
            Personalized treatment approaches designed to help you overcome
            challenges and achieve lasting mental wellness through{' '}
            <span className='text-blue-600 font-semibold'>
              evidence-based therapy
            </span>
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'>
          {specializations.map((service, index) => {
            const IconComponent =
              hoveredCard === index ? service.iconSolid : service.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 border border-slate-200/50 hover:border-slate-300/50 transform hover:scale-105 hover:-rotate-1 cursor-pointer ${
                  isVisible
                    ? 'animate-in slide-in-from-bottom duration-1000'
                    : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() =>
                  setSelectedService(selectedService === index ? null : index)
                }
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card Content */}
                <div className='relative z-10'>
                  {/* Icon with Dynamic Background */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
                  >
                    <IconComponent className='w-8 h-8' />
                  </div>

                  {/* Service Name */}
                  <h3 className='text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors'>
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className='text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-slate-700 transition-colors'>
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className='flex items-center justify-between mb-4'>
                    <div className='text-center'>
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                      >
                        {service.successRate}
                      </div>
                      <div className='text-xs text-slate-500'>Success Rate</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-lg font-semibold text-slate-700'>
                        {service.duration}
                      </div>
                      <div className='text-xs text-slate-500'>Duration</div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      selectedService === index
                        ? 'max-h-48 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className='pt-4 border-t border-slate-200/50'>
                      <h4 className='font-semibold text-slate-800 mb-3'>
                        Treatment Includes:
                      </h4>
                      <ul className='space-y-2'>
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className='flex items-center text-sm text-slate-600'
                          >
                            <CheckCircleIcon
                              className={`w-4 h-4 mr-2 text-gradient bg-gradient-to-r ${service.color}`}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full mt-4 py-3 px-4 bg-gradient-to-r ${service.color} text-white rounded-2xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100`}
                  >
                    Learn More
                  </button>

                  {/* Expand Indicator */}
                  <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                        service.color
                      } flex items-center justify-center text-white transform ${
                        selectedService === index ? 'rotate-45' : ''
                      } transition-transform duration-300`}
                    >
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 4v16m8-8H4'
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                />
              </div>
            );
          })}
        </div>

        {/* Treatment Approaches Section */}
        <div
          className={`bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/50 mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-500'
              : 'opacity-0'
          }`}
        >
          <div className='text-center mb-12'>
            <h3 className='text-3xl md:text-4xl font-bold text-slate-900 mb-4'>
              Evidence-Based{' '}
              <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                Treatment Approaches
              </span>
            </h3>
            <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
              Our therapeutic methods are grounded in scientific research and
              proven clinical effectiveness
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {treatmentApproaches.map((approach, index) => (
              <div
                key={index}
                className='group bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200/50 hover:border-blue-200/50 transform hover:scale-105'
              >
                <div className='text-center mb-4'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold text-lg mb-3 group-hover:scale-110 transition-transform duration-300'>
                    {approach.acronym}
                  </div>
                  <h4 className='font-bold text-slate-800 mb-2'>
                    {approach.name}
                  </h4>
                  <p className='text-sm text-slate-600 leading-relaxed mb-4'>
                    {approach.description}
                  </p>
                </div>

                <div className='space-y-2'>
                  <div className='text-xs font-semibold text-slate-700 mb-2'>
                    Effective for:
                  </div>
                  {approach.conditions.map((condition, conditionIndex) => (
                    <span
                      key={conditionIndex}
                      className='inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-1'
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
      </div>
    </section>
  );
}
