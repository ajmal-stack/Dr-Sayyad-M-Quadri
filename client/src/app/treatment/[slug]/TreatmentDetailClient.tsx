'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CalendarIcon, 
  ClockIcon, 
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  PrinterIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
import { Treatment } from '@/services/api/treatmentsApi';

interface TreatmentDetailClientProps {
  treatment: Treatment;
}

export default function TreatmentDetailClient({ treatment }: TreatmentDetailClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedTreatments, setRelatedTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch related treatments from the same category
    const fetchRelatedTreatments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/treatments?category=${encodeURIComponent(treatment.category)}&status=published&limit=10`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Filter out the current treatment and limit to 8 items
            const filtered = data.data.filter((t: Treatment) => t._id !== treatment._id).slice(0, 8);
            setRelatedTreatments(filtered);
          }
        }
      } catch (error) {
        console.error('Error fetching related treatments:', error);
      }
    };

    fetchRelatedTreatments();
  }, [treatment.category, treatment._id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 bg-white flex items-center justify-center">
        <div className="text-center">
          <LoadingAnimation className="text-blue-600 scale-150 mb-8" />
          <p className="text-slate-600 text-lg font-medium">Loading Treatment...</p>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = treatment.name;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`);
        break;
    }
  };

  const handleContact = () => {
    // Navigate to contact page
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/treatments" className="text-blue-500 hover:text-blue-700">
              Treatments
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{treatment.name}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar - Category Navigation */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                  {treatment.category === 'Mental Health' ? 'MENTAL HEALTH TOPICS' : 'GENERAL HEALTH TOPICS'}
                </h2>
                
                <nav className="space-y-1">
                  {/* Current treatment - highlighted */}
                  <div className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium text-sm">
                    {treatment.name}
                  </div>
                  
                  {/* Related treatments from the same category */}
                  {relatedTreatments.length > 0 ? (
                    relatedTreatments.map((relatedTreatment) => (
                      <Link 
                        key={relatedTreatment._id}
                        href={`/treatment/${relatedTreatment.slug}`} 
                        className="block px-3 py-2 text-slate-600 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                      >
                        {relatedTreatment.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-slate-400 text-sm">
                      Loading treatments...
                    </div>
                  )}
                </nav>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link 
                    href="/treatments"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <span>← Browse All Categories</span>
                  </Link>
                  
                  {treatment.category === 'Mental Health' && (
                    <Link 
                      href="/treatments?category=General+Health"
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-700 text-sm mt-2"
                    >
                      View General Health Topics
                    </Link>
                  )}
                  
                  {treatment.category === 'General Health' && (
                    <Link 
                      href="/treatments?category=Mental+Health"
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-700 text-sm mt-2"
                    >
                      View Mental Health Topics
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:col-span-10">
            {/* Header */}
            <header className="mb-8">
              {/* Back Button */}
              <Link
                href="/treatments"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Treatments
              </Link>

              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  treatment.category === 'Mental Health' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-teal-100 text-teal-800'
                }`}>
                  {treatment.category}
                </span>
                {treatment.featured && (
                  <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {treatment.name}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-600 mb-6">
                {treatment.duration && (
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {treatment.duration}
                  </div>
                )}
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Updated: {new Date(treatment.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkSolidIcon className="w-5 h-5" />
                  ) : (
                    <BookmarkIcon className="w-5 h-5" />
                  )}
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>

                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    Share
                  </button>
                  
                  {/* Share Dropdown */}
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[200px]">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Share on LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Share via Email
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <PrinterIcon className="w-5 h-5" />
                  Print
                </button>
              </div>

              {/* Featured Image */}
              {treatment.image && (
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
                  {treatment.image?.endsWith('.svg') || treatment.image?.includes('.svg') ? (
                    // Use regular img tag for SVG files
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Use Next.js Image for other formats
                    <Image
                      src={treatment.image}
                      alt={treatment.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-6 mb-8">
                {treatment.description}
              </p>
            </header>

            {/* Detailed Description */}
            {treatment.detailedDescription && (
              <div className="mb-8">
                <div 
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-slate-900 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:mb-3 sm:prose-h2:mb-4 prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-4 sm:prose-h3:mt-6 prose-h3:mb-2 sm:prose-h3:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-slate-900 prose-img:rounded-lg prose-img:w-full"
                  dangerouslySetInnerHTML={{ __html: treatment.detailedDescription }}
                />
              </div>
            )}

            {/* Sections */}
            {treatment.sections && treatment.sections.length > 0 && (
              <div className="mb-8 space-y-8">
                {treatment.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <div key={section.id} id={section.id}>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{section.title}</h2>
                      <div 
                        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-slate-700 prose-img:rounded-lg prose-img:w-full"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  ))}
              </div>
            )}

            {/* Key Points */}
            {treatment.keyPoints && treatment.keyPoints.length > 0 && (
              <div className="mb-8 bg-blue-50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Points</h2>
                <ul className="space-y-3">
                  {treatment.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Methods */}
            {treatment.methods && treatment.methods.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Treatment Methods</h2>
                <div className="flex flex-wrap gap-2">
                  {treatment.methods.map((method, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Conditions Treated */}
            {treatment.conditions && treatment.conditions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Conditions Treated</h2>
                <div className="flex flex-wrap gap-2">
                  {treatment.conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-teal-100 text-teal-800"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {treatment.faqs && treatment.faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {treatment.faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Resources */}
            {treatment.relatedResources && treatment.relatedResources.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Resources</h2>
                <div className="space-y-3">
                  {treatment.relatedResources.map((resource, index) => (
                    <Link
                      key={index}
                      href={resource.url}
                      target={resource.type === 'external' ? '_blank' : '_self'}
                      className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-slate-900 mb-1">{resource.title}</h3>
                      {resource.description && (
                        <p className="text-sm text-slate-600">{resource.description}</p>
                      )}
                      <span className="text-xs text-blue-600 mt-2 inline-block">
                        {resource.type === 'external' ? 'External Link' : 'Learn More'} →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Doctor Bio Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                DS
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Dr. Syed M Quadri
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Dr. Syed M Quadri is a board-certified physician specializing in mental health and general medicine. 
                  With over 15 years of experience, he is dedicated to providing evidence-based care and helping 
                  patients achieve optimal health and wellness.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn more about Dr. Quadri
                  <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
            Related Treatments
          </h2>
          <div className="text-center">
            <Link
              href="/treatments"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Treatments
              <ArrowLeftIcon className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
