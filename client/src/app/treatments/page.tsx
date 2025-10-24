'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { treatmentsApi, type Treatment } from '@/services/api/treatmentsApi';

// Removed static data - now fetching from API

export default function TreatmentPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch treatments from API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await treatmentsApi.getAll({ 
          status: 'published',
          active: true 
        });
        
        if (response.success && response.data) {
          setTreatments(response.data);
        }
      } catch (err: any) {
        console.error('Error fetching treatments:', err);
        setError(err.message || 'Failed to load treatments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  // Categorize treatment services
  const mentalHealthServices = treatments.filter(treatment => 
    treatment.category === 'Mental Health'
  );

  const generalHealthServices = treatments.filter(treatment => 
    treatment.category === 'General Health'
  );

  // Get filtered services for both categories
  const getFilteredServices = (services: Treatment[]) => {
    if (!searchTerm.trim()) {
      return services;
    }
    
    return services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.conditions && service.conditions.some(condition => 
        condition.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
      (service.methods && service.methods.some(method => 
        method.toLowerCase().includes(searchTerm.toLowerCase())
      ))
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

  const handleServiceInteraction = (serviceId: string, isInteracting: boolean) => {
    if (!isMobile) {
      setActiveService(isInteracting ? serviceId : null);
    }
  };

  const handleMobileServiceTap = (serviceId: string) => {
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
                        key={service._id}
                        className={`group relative rounded-t-2xl lg:rounded-t-3xl rounded-b-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 cursor-pointer ${
                          isVisible ? 'animate-in slide-in-from-bottom duration-1000' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onMouseEnter={() => handleServiceInteraction(service._id, true)}
                        onMouseLeave={() => handleServiceInteraction(service._id, false)}
                        onClick={() => handleMobileServiceTap(service._id)}
                      >
                        {/* Service Card */}
                        <div className="bg-white h-full">
                          {/* Image Container */}
                          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
                            {(service.imageCloudinary?.url || service.image) && (
                              (service.imageCloudinary?.url || service.image)?.endsWith('.svg') || (service.imageCloudinary?.url || service.image)?.includes('.svg') ? (
                                // Use regular img tag for SVG files
                                <img
                                  src={service.imageCloudinary?.url || service.image}
                                  alt={service.name}
                                  className="w-full h-full object-cover object-center"
                                />
                              ) : (
                                // Use Next.js Image for other formats
                                <Image
                                  src={service.imageCloudinary?.url || service.image || '/Services/default.svg'}
                                  alt={service.name}
                                  fill
                                  className="object-cover object-center"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                  priority={index < 4}
                                />
                              )
                            )}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                            
                            {/* Hover Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition-all duration-500 ${
                              activeService === service._id ? 'opacity-100' : 'opacity-0'
                            }`}>
                                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center p-2 sm:p-4 lg:p-6 text-white transform transition-all duration-700 ease-out ${
                                  activeService === service._id ? 'translate-y-0' : 'translate-y-8'
                                }`}>
                                  <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 transform transition-all duration-600 ease-out ${
                                    activeService === service._id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}>
                                  {service.name}
                                </h3>
                                  <div 
                                    className={`text-xs sm:text-sm leading-tight sm:leading-relaxed transform transition-all duration-600 ease-out delay-150 prose prose-sm prose-invert max-w-none ${
                                      activeService === service._id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: service.detailedDescription || service.description }}
                                  />
                              </div>
                            </div>

                              {/* Service Name at Bottom (visible when not hovering) */}
                              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 lg:p-6 transition-opacity duration-500 ${
                                activeService === service._id ? 'opacity-0' : 'opacity-100'
                              }`}>
                                <h3 className='text-white text-sm sm:text-lg lg:text-xl font-bold leading-tight'>
                                  {service.name}
                                </h3>
                              </div>
                           
                          </div>

                          <div className="p-3 sm:p-4 lg:p-6">
                            <Link
                              href={`/treatments/${service.slug}`}
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
                      Comprehensive healthcare services for your physical wellbeing
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {filteredGeneralHealthServices.map((service, index) => (
                      <div
                        key={service._id}
                        className={`group relative rounded-t-2xl lg:rounded-t-3xl rounded-b-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 cursor-pointer ${
                          isVisible ? 'animate-in slide-in-from-bottom duration-1000' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${(filteredMentalHealthServices.length + index) * 100}ms` }}
                        onMouseEnter={() => handleServiceInteraction(service._id, true)}
                        onMouseLeave={() => handleServiceInteraction(service._id, false)}
                        onClick={() => handleMobileServiceTap(service._id)}
                      >
                        {/* Service Card */}
                        <div className="bg-white h-full">
                          {/* Image Container */}
                          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
                            {(service.imageCloudinary?.url || service.image) && (
                              (service.imageCloudinary?.url || service.image)?.endsWith('.svg') || (service.imageCloudinary?.url || service.image)?.includes('.svg') ? (
                                // Use regular img tag for SVG files
                                <img
                                  src={service.imageCloudinary?.url || service.image}
                                  alt={service.name}
                                  className="w-full h-full object-cover object-center"
                                />
                              ) : (
                                // Use Next.js Image for other formats
                                <Image
                                  src={service.imageCloudinary?.url || service.image || '/Services/default.svg'}
                                  alt={service.name}
                                  fill
                                  className="object-cover object-center"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                  priority={false}
                                />
                              )
                            )}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                            
                            {/* Hover Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition-all duration-500 ${
                              activeService === service._id ? 'opacity-100' : 'opacity-0'
                            }`}>
                                <div className={`absolute inset-0 flex flex-col justify-center items-center text-center p-2 sm:p-4 lg:p-6 text-white transform transition-all duration-700 ease-out ${
                                  activeService === service._id ? 'translate-y-0' : 'translate-y-8'
                                }`}>
                                  <h3 className={`text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 transform transition-all duration-600 ease-out ${
                                    activeService === service._id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}>
                                  {service.name}
                                </h3>
                                  <div 
                                    className={`text-xs sm:text-sm leading-tight sm:leading-relaxed transform transition-all duration-600 ease-out delay-150 prose prose-sm prose-invert max-w-none ${
                                      activeService === service._id ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: service.detailedDescription || service.description }}
                                  />
                              </div>
                            </div>

                              {/* Service Name at Bottom (visible when not hovering) */}
                              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 lg:p-6 transition-opacity duration-500 ${
                                activeService === service._id ? 'opacity-0' : 'opacity-100'
                              }`}>
                                <h3 className='text-white text-sm sm:text-lg lg:text-xl font-bold leading-tight'>
                                  {service.name}
                                </h3>
                              </div>
                           
                          </div>

                          <div className="p-3 sm:p-4 lg:p-6">
                            <Link
                              href={`/treatments/${service.slug}`}
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
