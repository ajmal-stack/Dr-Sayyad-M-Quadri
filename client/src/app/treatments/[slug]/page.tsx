'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import TreatmentSidebar from '@/components/ui/treatment/TreatmentSidebar';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { 
  ShareIcon,
  EnvelopeIcon,
  BookOpenIcon,
  HeartIcon,
  PhoneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import ContactForm from '@/components/ui/primitives/ContactForm';
import { treatmentsApi, type Treatment } from '@/services/api/treatmentsApi';

export default function TreatmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadTreatment();
    }
  }, [slug]);

  const loadTreatment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Track view
      await treatmentsApi.trackEngagement(slug, 'view');

      // Fetch treatment data
      const response = await treatmentsApi.getById(slug);

      if (response.success) {
        setTreatment(response.data);
      } else {
        setError('Treatment not found');
      }
    } catch (err: any) {
      console.error('Error loading treatment:', err);
      setError(err.message || 'Failed to load treatment');
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = async () => {
    if (treatment) {
      await treatmentsApi.trackEngagement(treatment.slug, 'inquiry');
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error || !treatment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Treatment Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The treatment you are looking for does not exist.'}</p>
          <Link
            href="/treatment"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View All Treatments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${treatment.gradient || 'from-blue-500 to-indigo-600'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {treatment.category}
            </span>
            {treatment.featured && (
              <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{treatment.name}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{treatment.description}</p>
          
          {treatment.duration && (
            <div className="mt-6 flex items-center gap-2 text-white/90">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{treatment.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <TreatmentSidebar 
              onThisPage={treatment.onThisPage || []}
              relatedTreatments={[]}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Detailed Description */}
            {treatment.detailedDescription && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {treatment.detailedDescription}
                </p>
              </div>
            )}

            {/* Treatment Methods */}
            {treatment.methods && treatment.methods.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment Methods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {treatment.methods.map((method, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conditions Treated */}
            {treatment.conditions && treatment.conditions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
                <div className="flex flex-wrap gap-2">
                  {treatment.conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content Sections */}
            {treatment.sections && treatment.sections.length > 0 && (
              <div className="space-y-8 mb-8">
                {treatment.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <div key={section.id} id={section.id} className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                      <div 
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Key Points */}
            {treatment.keyPoints && treatment.keyPoints.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Points</h2>
                <ul className="space-y-3">
                  {treatment.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Information Cards */}
            {treatment.informationCards && treatment.informationCards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {treatment.informationCards.map((card, index) => (
                  <div
                    key={index}
                    className={`${card.bgColor || 'bg-blue-500'} text-white rounded-lg p-6 hover:shadow-lg transition`}
                  >
                    <div className="flex items-start gap-4">
                      <BookOpenIcon className="w-8 h-8 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-white/90">{card.description}</p>
                        {card.link && (
                          <a
                            href={card.link}
                            className="inline-block mt-3 text-white underline hover:no-underline"
                          >
                            Learn more →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAQs */}
            {treatment.faqs && treatment.faqs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {treatment.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            {treatment.pricing && (treatment.pricing.sessionCost || treatment.pricing.packageCost) && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
                <div className="space-y-3">
                  {treatment.pricing.sessionCost && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Per Session:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${treatment.pricing.sessionCost}
                      </span>
                    </div>
                  )}
                  {treatment.pricing.packageCost && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Package:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${treatment.pricing.packageCost}
                      </span>
                    </div>
                  )}
                  {treatment.pricing.insuranceAccepted && (
                    <div className="flex items-center gap-2 text-green-600 mt-4">
                      <CheckCircleIcon className="w-5 h-5" />
                      <span>Insurance Accepted</span>
                    </div>
                  )}
                  {treatment.pricing.notes && (
                    <p className="text-sm text-gray-600 mt-4">{treatment.pricing.notes}</p>
                  )}
                </div>
              </div>
            )}

            {/* Availability */}
            {treatment.availability && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Availability</h2>
                <div className="space-y-2">
                  {treatment.availability.inPerson && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span>In-Person Appointments Available</span>
                    </div>
                  )}
                  {treatment.availability.telehealth && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span>Telehealth Available</span>
                    </div>
                  )}
                  {treatment.availability.emergency && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span>Emergency Services Available</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h2>
              <p className="text-gray-600 mb-6">
                Contact us to schedule a consultation or learn more about this treatment.
              </p>
              <ContactForm onSubmit={handleInquiry} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
