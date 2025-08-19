'use client';

import Link from 'next/link';
import TreatmentSidebar from '@/components/ui/treatment/TreatmentSidebar';
import { 
  ShareIcon,
  EnvelopeIcon,
  BookOpenIcon,
  NewspaperIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ContactForm from '@/components/ui/primitives/ContactForm';

const onThisPageItems = [
  { name: "What are adult vaccinations?", href: "#what-are-vaccinations" },
  { name: "Recommended vaccines for adults", href: "#recommended-vaccines" },
  { name: "Who should get vaccinated?", href: "#who-should-get-vaccinated" },
  { name: "Vaccine safety and effectiveness", href: "#safety-effectiveness" },
  { name: "Where to get vaccinated", href: "#where-to-get-vaccinated" },
  { name: "Insurance and cost information", href: "#insurance-cost" },
  { name: "Travel vaccinations", href: "#travel-vaccinations" },
  { name: "Additional resources", href: "#additional-resources" },
];

const recommendedVaccines = [
  "Annual influenza (flu) vaccine",
  "COVID-19 vaccine and boosters", 
  "Tdap (Tetanus, Diphtheria, Pertussis)",
  "MMR (Measles, Mumps, Rubella)",
  "Varicella (Chickenpox)",
  "Zoster (Shingles) - for adults 50+",
  "Pneumococcal - for adults 65+",
  "Hepatitis A and B"
];

const informationCards = [
  {
    title: "Vaccination schedules",
    description: "Comprehensive vaccination schedules and timing recommendations for adults of all ages.",
    icon: BookOpenIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Vaccine safety updates", 
    description: "Latest information about vaccine safety, effectiveness, and any updates to recommendations.",
    icon: NewspaperIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Coverage statistics",
    description: "Data on vaccination coverage rates and public health impact of immunization programs.",
    icon: ChartBarIcon,
    bgColor: "bg-teal-500"
  }
];

const socialLinks = [
  { name: "Facebook", icon: "f" },
  { name: "Twitter", icon: "x" },
  { name: "LinkedIn", icon: "in" },
  { name: "Email", icon: "@" },
  { name: "Print", icon: "🖨" },
  {name: "Contact Us", icon: "📞"}
];

export default function AdultVaccinationsPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactFormOpen(true);
  };

  const handleCloseContactForm = () => {
    setIsContactFormOpen(false);
  };
  return (
    <div className="min-h-screen pt-18 bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/treatment" className="text-blue-500 hover:text-blue-700 ">
              Treatment
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">Adult Vaccinations</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/vaccinations" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Adult Vaccinations</h1>
              
              {/* On this page */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">On this page</h3>
                <ul className="space-y-2">
                  {onThisPageItems.map((item) => (
                    <li key={item.name} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <a href={item.href} className="text-blue-600 hover:text-blue-800 text-sm">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What are adult vaccinations? */}
            <section id="what-are-vaccinations" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What are adult vaccinations?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Adult vaccinations are immunizations that help protect you from serious diseases throughout your life. 
                      Many people think vaccines are just for children, but adults need certain vaccines to stay healthy and 
                      protect their communities from preventable diseases.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Vaccines work by training your immune system to recognize and fight specific diseases. They contain 
                      antigens that stimulate your body to produce antibodies, providing protection without causing the actual disease.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Some vaccines provide lifelong protection, while others require periodic boosters to maintain immunity.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-teal-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <ShieldCheckIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-teal-800 font-medium">Vaccine Protection</p>
                      <p className="text-xs text-teal-600 mt-1">Building immunity together</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recommended vaccines */}
            <section id="recommended-vaccines" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended vaccines for adults</h2>
              
              <div className="prose prose-lg text-gray-600 space-y-4 mb-6">
                <p className="text-base leading-relaxed">
                  The CDC recommends several vaccines for adults based on age, health conditions, lifestyle, and other factors:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  {recommendedVaccines.map((vaccine) => (
                    <li key={vaccine} className="text-base">
                      {vaccine}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="who-should-get-vaccinated" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Who should get vaccinated?</h2>
              
              <div className="grid gap-6">
                {informationCards.map((card) => (
                  <div key={card.title} className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className={`${card.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Most adults should follow the routine vaccination schedule. However, some people may need additional vaccines or 
                  should avoid certain vaccines based on:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base">
                  <li>Age and health conditions</li>
                  <li>Pregnancy status</li>
                  <li>Occupation or lifestyle</li>
                  <li>Travel plans</li>
                  <li>Previous vaccination history</li>
                </ul>
              </div>
            </section>

            {/* Safety and effectiveness */}
            <section id="safety-effectiveness" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vaccine safety and effectiveness</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Vaccines are among the safest medical products available. Before approval, vaccines undergo rigorous testing 
                  in clinical trials involving thousands of participants. The safety and effectiveness of vaccines continue 
                  to be monitored even after they are approved and in use.
                </p>
                
                <p className="text-base leading-relaxed">
                  Serious side effects from vaccines are rare. Most people experience only mild side effects, such as soreness 
                  at the injection site or low-grade fever. The benefits of vaccination far outweigh the risks for most people.
                </p>
              </div>
            </section>

            {/* Where to get vaccinated */}
            <section id="where-to-get-vaccinated" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Where to get vaccinated</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Adult vaccines are available at many locations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Your doctor's office or clinic</li>
                  <li>Pharmacies (CVS, Walgreens, etc.)</li>
                  <li>Community health centers</li>
                  <li>Local health departments</li>
                  <li>Workplace health clinics</li>
                  <li>Urgent care centers</li>
                </ul>
              </div>
            </section>

            {/* Insurance and cost */}
            <section id="insurance-cost" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance and cost information</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Most insurance plans, including Medicare and Medicaid, cover recommended adult vaccines at no cost to you. 
                  Check with your insurance provider to confirm coverage details.
                </p>
                <p className="text-base leading-relaxed">
                  If you don't have insurance, you may be able to get vaccines at reduced cost through federal programs or 
                  community health centers.
                </p>
              </div>
            </section>

            {/* Travel vaccinations */}
            <section id="travel-vaccinations" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel vaccinations</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  If you're planning to travel internationally, you may need additional vaccines depending on your destination. 
                  Consult with a travel medicine specialist or your healthcare provider at least 4-6 weeks before your trip to 
                  discuss recommended vaccines for your specific travel plans.
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">CDC Adult Vaccination Schedule</a></strong> - Official vaccination recommendations
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Vaccine Finder</a></strong> - Locate vaccination providers near you
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">VaccinateAdults.org</a></strong> - Educational resources for adult vaccination
                  </li>
                </ul>
              </div>
            </section>

            {/* Last Reviewed */}
            <div className="border-t pt-6 mt-12">
              <p className="text-sm text-gray-500">
                <strong>Last Reviewed:</strong> December 2024
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Share Page */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShareIcon className="w-5 h-5 mr-2" />
                  Share Page
                </h3>
                <div className="space-y-2">
                  {socialLinks.map((social) => (
                    <button 
                      key={social.name} 
                      onClick={social.name === 'Contact Us' ? handleContactClick : undefined}
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center"
                    >
                      <span className="mr-2 text-blue-600">{social.icon}</span>
                      {social.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Signup */}
              <div className="bg-teal-600 rounded-lg p-6 text-white">
                <div className="flex items-start mb-4">
                  <EnvelopeIcon className="w-8 h-8 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Get vaccination reminders and updates</h3>
                  </div>
                </div>
                <button 
                  className="w-full bg-white text-teal-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit CDC Link */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h3 className="font-semibold text-teal-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  Official CDC Information
                </h3>
                <p className="text-sm text-teal-700 mb-3 leading-relaxed">
                  Get the complete, official vaccination information from the Centers for Disease Control and Prevention
                </p>
                <a
                  href="https://www.cdc.gov/vaccines/adults/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Visit CDC Page
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={handleCloseContactForm} 
      />
    </div>
  );
}
