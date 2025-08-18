'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleIcon, ArrowRightIcon, ClockIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const treatmentServices = [
  {
    id: 1,
    name: 'Anxiety Disorders',
    description: 'Evidence-based treatment for panic attacks, social anxiety, generalized anxiety disorders, and phobias using proven therapeutic techniques.',
    detailedDescription: 'Comprehensive treatment approach combining Cognitive Behavioral Therapy (CBT), exposure therapy, and mindfulness techniques to help you overcome anxiety and regain control of your life.',
    image: '/Services/Anxiety Disorders.svg',
    gradient: 'from-blue-500 to-indigo-600',
    duration: '8-16 sessions',
    methods: ['CBT', 'Exposure Therapy', 'Mindfulness'],
    conditions: ['Panic Disorder', 'Social Anxiety', 'GAD', 'Phobias'],
    link: '/treatment/anxiety'
  },
  {
    id: 2,
    name: 'Depression Treatment',
    description: 'Personalized treatment for major depression, dysthymia, and mood-related challenges using evidence-based therapeutic approaches.',
    detailedDescription: 'Integrated approach combining psychotherapy, medication management, and lifestyle interventions to help you overcome depression and find lasting relief.',
    image: '/Services/Depression Treatment.svg',
    gradient: 'from-emerald-500 to-teal-600',
    duration: '12-20 sessions',
    methods: ['CBT', 'IPT', 'Medication Management'],
    conditions: ['Major Depression', 'Dysthymia', 'Seasonal Depression'],
    link: '/treatment/depression'
  },
  {
    id: 3,
    name: 'Stress Management',
    description: 'Master techniques to manage work stress, life transitions, and daily pressures with personalized coping strategies.',
    detailedDescription: 'Learn effective stress management techniques including relaxation training, time management, and cognitive restructuring to improve your quality of life.',
    image: '/Services/Stress Management.svg',
    gradient: 'from-orange-500 to-amber-600',
    duration: '6-12 sessions',
    methods: ['Stress Reduction', 'Relaxation Training', 'Lifestyle Coaching'],
    conditions: ['Work Stress', 'Chronic Stress', 'Burnout'],
    link: '/treatment/stress'
  },
  {
    id: 4,
    name: 'Trauma Therapy',
    description: 'Expert treatment for PTSD, childhood trauma, and traumatic life experiences using specialized therapeutic approaches.',
    detailedDescription: 'Specialized trauma-informed care using EMDR, CPT, and other evidence-based treatments to help you heal from traumatic experiences.',
    image: '/Services/Trauma Therapy.svg',
    gradient: 'from-purple-500 to-violet-600',
    duration: '12-24 sessions',
    methods: ['EMDR', 'CPT', 'Trauma-Focused CBT'],
    conditions: ['PTSD', 'Complex Trauma', 'Childhood Trauma'],
    link: '/treatment/trauma'
  },
  {
    id: 5,
    name: 'Couples Therapy',
    description: 'Improve communication, resolve conflicts, and strengthen emotional connections in your relationships.',
    detailedDescription: 'Relationship-focused therapy to improve communication, rebuild trust, and create stronger emotional bonds between partners.',
    image: '/Services/Couples Therapy.svg',
    gradient: 'from-pink-500 to-rose-600',
    duration: '10-16 sessions',
    methods: ['EFT', 'Gottman Method', 'Communication Training'],
    conditions: ['Relationship Issues', 'Communication Problems', 'Trust Issues'],
    link: '/treatment/couples'
  },
  {
    id: 6,
    name: 'Sleep Disorders',
    description: 'Address insomnia, sleep anxiety, and develop healthy sleep patterns for better mental and physical health.',
    detailedDescription: 'Comprehensive sleep therapy combining CBT-I, sleep hygiene education, and relaxation techniques for better sleep quality.',
    image: '/Services/Sleep Disorders.svg',
    gradient: 'from-indigo-500 to-blue-600',
    duration: '6-10 sessions',
    methods: ['CBT-I', 'Sleep Hygiene', 'Relaxation Training'],
    conditions: ['Insomnia', 'Sleep Anxiety', 'Sleep Schedule Disorders'],
    link: '/treatment/sleep'
  },
  {
    id: 7,
    name: 'Addiction Recovery',
    description: 'Support for substance abuse recovery and behavioral addiction treatment with compassionate, evidence-based care.',
    detailedDescription: 'Comprehensive addiction treatment including detox support, relapse prevention, and long-term recovery planning.',
    image: '/Services/Addiction Recovery.svg',
    gradient: 'from-teal-500 to-cyan-600',
    duration: '16-24+ sessions',
    methods: ['12-Step Support', 'CBT', 'Motivational Interviewing'],
    conditions: ['Substance Abuse', 'Behavioral Addictions', 'Dual Diagnosis'],
    link: '/treatment/addiction'
  },
  {
    id: 8,
    name: 'Life Transitions',
    description: 'Navigate major life changes, career transitions, and personal growth challenges with professional guidance.',
    detailedDescription: 'Support for major life changes including career transitions, relationship changes, and personal growth challenges.',
    image: '/Services/Life Transitions.svg',
    gradient: 'from-violet-500 to-purple-600',
    duration: '8-12 sessions',
    methods: ['Solution-Focused Therapy', 'Life Coaching', 'Goal Setting'],
    conditions: ['Career Changes', 'Relationship Transitions', 'Personal Growth'],
    link: '/treatment/transitions'
  },
];

const treatmentApproaches = [
  {
    name: 'Evidence-Based Practice',
    description: 'All treatments are grounded in scientific research and proven clinical outcomes.',
    icon: AcademicCapIcon
  },
  {
    name: 'Personalized Care',
    description: 'Treatment plans tailored to your specific needs, goals, and circumstances.',
    icon: UserGroupIcon
  },
  {
    name: 'Flexible Scheduling',
    description: 'Convenient appointment times including evenings and weekends.',
    icon: ClockIcon
  }
];

export default function TreatmentPage() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleServiceInteraction = (serviceId: number, isInteracting: boolean) => {
    if (!isMobile) {
      setActiveService(isInteracting ? serviceId : null);
    }
  };

  const handleMobileServiceTap = (serviceId: number) => {
    if (isMobile) {
      setActiveService(activeService === serviceId ? null : serviceId);
    }
  };

  return (
    <div className="min-h-screen pt-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {/* Treatment Services Grid */}
      <section id="services" className="py-4 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Specialized{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Treatment Services
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive mental health care tailored to your specific needs and circumstances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {treatmentServices.map((service, index) => (
              <div
                key={service.id}
                className={`group relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 cursor-pointer ${
                  isVisible ? 'animate-in slide-in-from-bottom duration-1000' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => handleServiceInteraction(service.id, true)}
                onMouseLeave={() => handleServiceInteraction(service.id, false)}
                onClick={() => handleMobileServiceTap(service.id)}
              >
                {/* Service Card */}
                <div className="bg-white h-full">
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={index < 4}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition-all duration-500 ${
                      activeService === service.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 text-white">
                        <h3 className={`text-lg sm:text-xl font-bold mb-3 transform transition-all duration-500 ${
                          activeService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                          {service.name}
                        </h3>
                        <p className={`text-sm leading-relaxed transform transition-all duration-500 delay-100 ${
                          activeService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                          {service.detailedDescription}
                        </p>
                      </div>
                    </div>

                    {/* Service Name at Bottom */}
                   
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Treatment Details */}
                   

                    {/* Learn More Button */}
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group/link"
                    >
                      Learn More
                      <ArrowRightIcon className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile instruction */}
          <div className="block md:hidden text-center mt-8">
            <p className="text-sm text-slate-500">
              Tap on any service card to learn more about our treatment approaches
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 leading-relaxed">
            Take the first step towards better mental health with personalized treatment designed just for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Schedule Consultation
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Learn About Dr. Quadri
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
