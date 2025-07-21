'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const services = [
  {
    id: 1,
    name: 'Anxiety Disorders',
    description:
      'Evidence-based treatment for panic attacks, social anxiety, generalized anxiety disorders, and phobias using proven therapeutic techniques.',
    image: '/Services/Anxiety Disorders.svg',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    name: 'Depression Treatment',
    description:
      'Personalized treatment for major depression, dysthymia, and mood-related challenges using evidence-based therapeutic approaches.',
    image: '/Services/Depression Treatment.svg',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 3,
    name: 'Stress Management',
    description:
      'Master techniques to manage work stress, life transitions, and daily pressures with personalized coping strategies.',
    image: '/Services/Stress Management.svg',
    gradient: 'from-orange-500 to-amber-600',
  },
  {
    id: 4,
    name: 'Trauma Therapy',
    description:
      'Expert treatment for PTSD, childhood trauma, and traumatic life experiences using specialized therapeutic approaches.',
    image: '/Services/Trauma Therapy.svg',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 5,
    name: 'Couples Therapy',
    description:
      'Improve communication, resolve conflicts, and strengthen emotional connections in your relationships.',
    image: '/Services/Couples Therapy.svg',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 6,
    name: 'Sleep Disorders',
    description:
      'Address insomnia, sleep anxiety, and develop healthy sleep patterns for better mental and physical health.',
    image: '/Services/Sleep Disorders.svg',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 7,
    name: 'Addiction Recovery',
    description:
      'Support for substance abuse recovery and behavioral addiction treatment with compassionate, evidence-based care.',
    image: '/Services/Addiction Recovery.svg',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    id: 8,
    name: 'Life Transitions',
    description:
      'Navigate major life changes, career transitions, and personal growth challenges with professional guidance.',
    image: '/Services/Life Transitions.svg',
    gradient: 'from-violet-500 to-purple-600',
  },
];

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5' />
        <div className='absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header */}
        <div
          className={`text-center mb-12 lg:mb-20 ${
            isVisible
              ? 'animate-in slide-in-from-top duration-1000'
              : 'opacity-0'
          }`}
        >
          <div className='inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg'>
            <CheckCircleIcon className='w-5 h-5 mr-2' />
            Comprehensive Mental Health Services
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight'>
            Transform Your Life with{' '}
            <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Expert Care
            </span>
          </h2>
          <p className='text-lg md:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed'>
            Personalized treatment approaches designed to help you overcome
            challenges and achieve lasting mental wellness
          </p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-24'>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 cursor-pointer ${
                isVisible
                  ? 'animate-in slide-in-from-bottom duration-1000'
                  : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className='relative h-64 sm:h-72 lg:h-80 overflow-hidden'>
                {/* SVG Background Image */}
                <div className='w-full h-full relative'>
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className='object-cover object-center'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Hover Text Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition-all duration-500 ${
                    hoveredCard === service.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className='absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white transform transition-all duration-500'>
                    <h3
                      className={`text-xl lg:text-2xl font-bold mb-4 transform transition-all duration-500 ${
                        hoveredCard === service.id
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p
                      className={`text-sm lg:text-base leading-relaxed transform transition-all duration-500 delay-100 ${
                        hoveredCard === service.id
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-0'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Service Name at Bottom (visible when not hovering) */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-500 ${
                    hoveredCard === service.id ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <h3 className='text-white text-lg lg:text-xl font-bold'>
                    {service.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
