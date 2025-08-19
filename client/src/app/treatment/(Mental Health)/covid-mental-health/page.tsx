'use client';

import { useState } from 'react';
import Link from 'next/link';
import TreatmentSidebar from '@/components/ui/treatment/TreatmentSidebar';
import { 
  ShareIcon,
  EnvelopeIcon,
  BookOpenIcon,
  NewspaperIcon,
  ChartBarIcon,
  BeakerIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import ContactForm from '@/components/ui/primitives/ContactForm';

const onThisPageItems = [
  { name: "How has COVID-19 affected mental health?", href: "#covid-mental-health-impact" },
  { name: "Where can I learn more about COVID-19 and mental health?", href: "#learn-more" },
  { name: "Why is mental health important during pandemics?", href: "#why-important" },
  { name: "How can we support mental health during COVID-19?", href: "#support-strategies" },
  { name: "Explore COVID-19 mental health resources", href: "#resources" },
  { name: "Share information about COVID-19 and mental health", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional resources", href: "#additional-resources" },
];

const covidMentalHealthImpacts = [
  "Increased anxiety and depression rates",
  "Social isolation and loneliness", 
  "Grief and loss from COVID-19 deaths",
  "Economic stress and job loss anxiety",
  "Healthcare worker burnout and trauma",
  "Substance use increase during lockdowns",
  "Domestic violence and family stress",
  "Educational disruption for children and adolescents",
  "Fear and uncertainty about the future"
];

const informationCards = [
  {
    title: "COVID-19 mental health guidance",
    description: "Comprehensive resources and strategies for managing mental health during the pandemic, including coping skills, stress management, and adaptation techniques.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Pandemic research updates", 
    description: "Latest research on COVID-19's impact on mental health, including studies on anxiety, depression, and psychological effects of social distancing measures.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Mental health statistics",
    description: "Data on mental health trends during COVID-19, including prevalence rates of anxiety and depression, and the impact on different populations.",
    icon: ChartBarIcon,
    bgColor: "bg-blue-500"
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

export default function CovidMentalHealthPage() {
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
            <Link href="/treatment" className="text-blue-500 hover:text-blue-700">
              Treatment
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">COVID-19 and Mental Health</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/covid-mental-health" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">COVID-19 and Mental Health</h1>
              
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

            {/* How has COVID-19 affected mental health? */}
            <section id="covid-mental-health-impact" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How has COVID-19 affected mental health?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      The COVID-19 pandemic has had unprecedented impacts on mental health worldwide. Social distancing 
                      measures, economic uncertainty, health fears, and significant life disruptions have contributed 
                      to increased rates of anxiety, depression, and other mental health challenges.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      The pandemic has affected different populations in various ways, with some groups experiencing 
                      disproportionate mental health impacts due to increased exposure, economic hardship, or 
                      pre-existing vulnerabilities.
                    </p>
                    
                    <p className="text-base leading-relaxed">Key mental health impacts include:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {covidMentalHealthImpacts.map((impact) => (
                        <li key={impact} className="text-base">
                          <a href="#" className="text-blue-600 hover:text-blue-800">{impact}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Mental Health During COVID-19</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about COVID-19 and mental health?</h2>
              
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
            </section>

            {/* Why is mental health important during pandemics */}
            <section id="why-important" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is mental health important during pandemics?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Mental health is crucial during pandemics because psychological well-being directly affects physical health, 
                  immune function, and the ability to cope with stress. <a href="#" className="text-blue-600 hover:text-blue-800">Research shows</a> that 
                  chronic stress and poor mental health can weaken the immune system, making individuals more vulnerable to infections.
                </p>
                <p className="text-base leading-relaxed">
                  Additionally, good mental health supports better decision-making, adherence to public health measures, 
                  and overall community resilience. During times of crisis, maintaining mental wellness helps individuals 
                  and communities adapt, recover, and support one another more effectively.
                </p>
              </div>
            </section>

            {/* How can we support mental health during COVID-19 */}
            <section id="support-strategies" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How can we support mental health during COVID-19?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Supporting mental health during the pandemic requires a multi-faceted approach that addresses individual, 
                  community, and systemic needs. Strategies include maintaining social connections through virtual means, 
                  establishing healthy routines, and accessing professional mental health services when needed.
                </p>
                
                <p className="text-base leading-relaxed">
                  It&apos;s important to recognize that pandemic-related stress and mental health challenges are normal responses 
                  to an abnormal situation. Seeking help and support is a sign of strength and self-care, not weakness.
                </p>
                
                <p className="text-base leading-relaxed">
                  Community support, workplace mental health programs, and accessible mental health services play crucial 
                  roles in supporting population mental health during and after the pandemic.
                </p>
              </div>
            </section>

            {/* COVID-19 mental health resources */}
            <section id="resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore COVID-19 mental health resources</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Resources for managing mental health during COVID-19 include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Telehealth and virtual therapy services</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Crisis counseling and emotional support hotlines</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Mental health apps and digital wellness tools</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Online support groups and peer networks</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Stress management and mindfulness resources</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Workplace employee assistance programs</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Community mental health services</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Educational resources about pandemic stress</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Self-care strategies and coping skills training</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  If you&apos;re experiencing mental health challenges related to COVID-19, you&apos;re not alone. Many people 
                  have experienced increased anxiety, depression, or stress during the pandemic. Professional help and 
                  support are available, even during times of social distancing.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  Telehealth services have made mental health care more accessible during the pandemic. Many therapists 
                  and counselors now offer virtual sessions, and some insurance plans have expanded coverage for 
                  telehealth mental health services.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  Crisis support is available 24/7 through national hotlines and text services. Local mental health 
                  centers and community organizations also provide resources specifically designed to address pandemic-related 
                  mental health needs.
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">CDC Mental Health and Coping During COVID-19</a></strong>: Official guidance on mental health during the pandemic
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">SAMHSA Disaster Distress Helpline</a></strong>: 1-800-985-5990 - Crisis counseling and support for pandemic-related stress
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">National Alliance on Mental Illness (NAMI) COVID-19 Resource Hub</a></strong>: Information and support for mental health during COVID-19
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">American Psychological Association COVID-19 Resources</a></strong>: Professional resources and public information about pandemic mental health
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">WHO Mental Health and COVID-19</a></strong>: Global perspective on mental health considerations during the pandemic
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
              <div className="bg-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-start mb-4">
                  <EnvelopeIcon className="w-8 h-8 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about COVID-19 and mental health</h3>
                  </div>
                </div>
                <button 
                  className="w-full bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit External Resources Link */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  COVID-19 Mental Health
                </h3>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  Access official CDC guidance on mental health and coping during COVID-19
                </p>
                <a
                  href="https://www.cdc.gov/mentalhealth/stress-coping/cope-with-stress/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Visit CDC Resources
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
