'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

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
  // General Health Topics
  {
    id: 9,
    name: 'Adult Vaccinations',
    description: 'Comprehensive vaccination guidance and immunization schedules for adults to prevent serious diseases.',
    detailedDescription: 'Stay protected with up-to-date vaccinations including flu shots, COVID-19 boosters, and travel immunizations.',
    image: '/Services/Adult Vaccinations.jpg',
    gradient: 'from-green-500 to-emerald-600',
    duration: 'Consultation',
    methods: ['Preventive Care', 'Immunization', 'Health Screening'],
    conditions: ['Flu Prevention', 'COVID-19', 'Travel Health'],
    link: '/treatment/vaccinations'
  },
  {
    id: 10,
    name: 'Diabetes Management',
    description: 'Comprehensive diabetes care including blood sugar monitoring, lifestyle modifications, and medication management.',
    detailedDescription: 'Expert diabetes management with personalized treatment plans, nutritional guidance, and ongoing monitoring.',
    image: '/Services/Diabetes Management.jpg',
    gradient: 'from-red-500 to-pink-600',
    duration: 'Ongoing Care',
    methods: ['Medication Management', 'Lifestyle Coaching', 'Blood Sugar Monitoring'],
    conditions: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Prediabetes'],
    link: '/treatment/diabetes'
  },
  {
    id: 11,
    name: 'High Blood Pressure',
    description: 'Effective hypertension management through lifestyle changes, medication, and regular monitoring.',
    detailedDescription: 'Comprehensive hypertension care with personalized treatment plans to reduce cardiovascular risk.',
    image: '/Services/High Blood Pressure.jpg',
    gradient: 'from-blue-500 to-cyan-600',
    duration: 'Ongoing Care',
    methods: ['Medication Management', 'Lifestyle Modification', 'Regular Monitoring'],
    conditions: ['Essential Hypertension', 'Secondary Hypertension', 'Cardiovascular Risk'],
    link: '/treatment/hypertension'
  },
  {
    id: 12,
    name: 'COVID-19 Care',
    description: 'Comprehensive COVID-19 prevention, testing, treatment, and post-COVID care services.',
    detailedDescription: 'Complete COVID-19 healthcare including prevention strategies, testing, treatment, and long-COVID management.',
    image: '/Services/COVID-19 Care.jpg',
    gradient: 'from-purple-500 to-indigo-600',
    duration: 'As Needed',
    methods: ['Prevention', 'Testing', 'Treatment'],
    conditions: ['COVID-19 Prevention', 'Active Infection', 'Long COVID'],
    link: '/treatment/covid'
  },
  {
    id: 13,
    name: 'Healthy Weight Management',
    description: 'Personalized weight management programs combining nutrition, exercise, and behavioral changes.',
    detailedDescription: 'Achieve and maintain a healthy weight through evidence-based nutrition and lifestyle interventions.',
    image: '/Services/Healthy Weight Management.jpg',
    gradient: 'from-orange-500 to-yellow-600',
    duration: '3-6 months',
    methods: ['Nutritional Counseling', 'Exercise Planning', 'Behavioral Support'],
    conditions: ['Weight Loss', 'Weight Gain', 'Obesity Management'],
    link: '/treatment/weight'
  },
  {
    id: 14,
    name: 'Preventive Health Screenings',
    description: 'Regular health screenings and preventive care to detect and prevent serious health conditions.',
    detailedDescription: 'Comprehensive preventive care including cancer screenings, heart health assessments, and wellness checkups.',
    image: '/Services/Preventive Health Screenings.jpg',
    gradient: 'from-teal-500 to-green-600',
    duration: 'Annual/Periodic',
    methods: ['Health Screenings', 'Preventive Care', 'Risk Assessment'],
    conditions: ['Cancer Screening', 'Heart Health', 'General Wellness'],
    link: '/treatment/preventive'
  },
];

// Removed unused treatmentApproaches array

export default function TreatmentPage() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // Categorize treatment services
  const mentalHealthServices = treatmentServices.filter(service => 
    ['Anxiety Disorders', 'Depression Treatment', 'Stress Management', 'Sleep Disorders', 'Trauma Therapy', 'Couples Therapy', 'Addiction Recovery', 'Life Transitions'].includes(service.name)
  );

  const generalHealthServices = treatmentServices.filter(service => 
    ['Adult Vaccinations', 'Diabetes Management', 'High Blood Pressure', 'COVID-19 Care', 'Healthy Weight Management', 'Preventive Health Screenings'].includes(service.name)
  );

  // Get filtered services for both categories
  const getFilteredServices = (services: typeof treatmentServices) => {
    if (!searchTerm.trim()) {
      return services;
    }
    
    return services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.conditions.some(condition => 
        condition.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      service.methods.some(method => 
        method.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredMentalHealthServices = getFilteredServices(mentalHealthServices);
  const filteredGeneralHealthServices = getFilteredServices(generalHealthServices);
  const totalFilteredServices = filteredMentalHealthServices.length + filteredGeneralHealthServices.length;

  const clearSearch = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    setIsVisible(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-18 bg-white flex items-center justify-center">
        <div className="text-center">
          <LoadingAnimation className="text-blue-600 scale-150 mb-8" />
          <p className="text-slate-600 text-lg font-medium">Loading Treatment Services...</p>
        </div>
      </div>
    ); 
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header Section */}
      <section className="py-6 pb-0 sm:py-4 lg:py-6"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
         

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-2 sm:mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search treatments, conditions, or methods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-12 py-4 text-sm sm:text-base border border-gray-200 rounded-2xl bg-white shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="mt-3 text-sm text-gray-600 text-center">
                {totalFilteredServices === 0 ? (
                  <span className="text-red-600">No treatments found for "{searchTerm}"</span>
                ) : (
                  <span>
                    Found {totalFilteredServices} treatment{totalFilteredServices !== 1 ? 's' : ''} for "{searchTerm}"
                  </span>
                )}
              </div>
            )}
          </div>


        </div>
      </section>

      {/* Treatment Services Grid */}
      <section id="services" className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* No Results Message */}
          {totalFilteredServices === 0 && searchTerm ? (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No treatments found</h3>
                <p className="mt-2 text-gray-500">
                  We couldn't find any treatments matching "{searchTerm}". Try adjusting your search terms.
                </p>
                <button
                  onClick={clearSearch}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                >
                  Clear search
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Mental Health Services Section */}
              {filteredMentalHealthServices.length > 0 && (
                <div>
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Mental Health Treatments
                      </span>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                      Professional psychological support and therapy services to improve your mental wellbeing
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {filteredMentalHealthServices.map((service, index) => (
                      <div
                        key={service.id}
                        className={`group relative rounded-t-2xl lg:rounded-t-3xl rounded-b-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 cursor-pointer ${
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
                          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
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
                                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center p-2 sm:p-4 lg:p-6 text-white transform transition-all duration-700 ease-out ${
                                  activeService === service.id ? 'translate-y-0' : 'translate-y-8'
                                }`}>
                                  <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 transform transition-all duration-600 ease-out ${
                                    activeService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}>
                                  {service.name}
                                </h3>
                                  <p className={`text-xs sm:text-sm leading-tight sm:leading-relaxed transform transition-all duration-600 ease-out delay-150 ${
                                    activeService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}>
                                  {service.detailedDescription}
                                </p>
                              </div>
                            </div>

                              {/* Service Name at Bottom (visible when not hovering) */}
                              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 lg:p-6 transition-opacity duration-500 ${
                                activeService === service.id ? 'opacity-0' : 'opacity-100'
                              }`}>
                                <h3 className='text-white text-sm sm:text-lg lg:text-xl font-bold leading-tight'>
                                  {service.name}
                                </h3>
                              </div>
                           
                          </div>

                          <div className="p-3 sm:p-4 lg:p-6">
                            <Link
                              href={service.link}
                              className="inline-flex items-center font-semibold text-xs sm:text-sm group/link transition-colors duration-200 text-blue-600 hover:text-blue-700"
                            >
                              Learn More
                              <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Health Services Section */}
              {filteredGeneralHealthServices.length > 0 && (
                <div>
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        General Health Treatments
                      </span>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                      Comprehensive medical care and preventive health services for your overall wellbeing
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {filteredGeneralHealthServices.map((service, index) => (
                      <div
                        key={service.id}
                        className={`group relative rounded-t-2xl lg:rounded-t-3xl rounded-b-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 cursor-pointer ${
                          isVisible ? 'animate-in slide-in-from-bottom duration-1000' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${(filteredMentalHealthServices.length + index) * 100}ms` }}
                        onMouseEnter={() => handleServiceInteraction(service.id, true)}
                        onMouseLeave={() => handleServiceInteraction(service.id, false)}
                        onClick={() => handleMobileServiceTap(service.id)}
                      >
                        {/* Service Card */}
                        <div className="bg-white h-full">
                          {/* Image Container */}
                          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
                            <Image
                              src={service.image}
                              alt={service.name}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                              priority={false}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                            
                            {/* Hover Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition-all duration-500 ${
                              activeService === service.id ? 'opacity-100' : 'opacity-0'
                            }`}>
                                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center p-2 sm:p-4 lg:p-6 text-white transform transition-all duration-700 ease-out ${
                                  activeService === service.id ? 'translate-y-0' : 'translate-y-8'
                                }`}>
                                  <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 transform transition-all duration-600 ease-out ${
                                    activeService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}>
                                  {service.name}
                                </h3>
                                  <p className={`text-xs sm:text-sm leading-tight sm:leading-relaxed transform transition-all duration-600 ease-out delay-150 ${
                                    activeService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}>
                                  {service.detailedDescription}
                                </p>
                              </div>
                            </div>

                              {/* Service Name at Bottom (visible when not hovering) */}
                              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 lg:p-6 transition-opacity duration-500 ${
                                activeService === service.id ? 'opacity-0' : 'opacity-100'
                              }`}>
                                <h3 className='text-white text-sm sm:text-lg lg:text-xl font-bold leading-tight'>
                                  {service.name}
                                </h3>
                              </div>
                           
                          </div>

                          <div className="p-3 sm:p-4 lg:p-6">
                            <Link
                              href={service.link}
                              className="inline-flex items-center font-semibold text-xs sm:text-sm group/link transition-colors duration-200 text-blue-600 hover:text-blue-700"
                            >
                              Learn More
                              <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile instruction */}
          <div className="block lg:hidden text-center mt-8 sm:mt-12">
            <p className="text-sm text-slate-500 px-4">
              Tap on any service card to see more details about our treatment approaches
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
}
