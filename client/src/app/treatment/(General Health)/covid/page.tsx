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
  { name: "About COVID-19", href: "#about-covid" },
  { name: "Prevention strategies", href: "#prevention" },
  { name: "Vaccination information", href: "#vaccination" },
  { name: "Testing and diagnosis", href: "#testing" },
  { name: "Treatment options", href: "#treatment" },
  { name: "Managing symptoms at home", href: "#home-care" },
  { name: "Long COVID support", href: "#long-covid" },
  { name: "When to seek medical care", href: "#seek-care" },
  { name: "Mental health during COVID", href: "#mental-health" },
];

const preventionStrategies = [
  {
    title: "Vaccination",
    description: "Stay up to date with COVID-19 vaccines and boosters as recommended by healthcare professionals.",
    icon: ShieldCheckIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Hygiene practices", 
    description: "Regular handwashing, using hand sanitizer, and avoiding touching your face help prevent transmission.",
    icon: BookOpenIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Social measures",
    description: "Maintaining distance in crowded areas and wearing masks when appropriate or required.",
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

export default function COVIDCarePage() {
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
            <span className="text-gray-900 font-medium truncate">COVID-19 Care</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/covid" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">COVID-19 Care</h1>
              
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

            {/* About COVID-19 */}
            <section id="about-covid" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About COVID-19</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus. While many people experience 
                      mild symptoms, the virus can cause serious illness, especially in older adults and people with 
                      underlying health conditions.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      The virus spreads primarily through respiratory droplets when an infected person coughs, sneezes, 
                      talks, or breathes. Understanding prevention, testing, and treatment options is crucial for 
                      protecting yourself and others.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-teal-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <ShieldCheckIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-teal-800 font-medium">Stay Protected</p>
                      <p className="text-xs text-teal-600 mt-1">Prevention is key</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prevention strategies */}
            <section id="prevention" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Prevention strategies</h2>
              
              <div className="grid gap-6 mb-8">
                {preventionStrategies.map((strategy) => (
                  <div key={strategy.title} className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className={`${strategy.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <strategy.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{strategy.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{strategy.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Vaccination */}
            <section id="vaccination" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vaccination information</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  COVID-19 vaccines are the best protection against severe illness, hospitalization, and death. 
                  Current recommendations include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Primary vaccine series for all eligible individuals</li>
                  <li>Updated boosters as recommended</li>
                  <li>Special considerations for immunocompromised individuals</li>
                  <li>Timing considerations with other vaccines</li>
                </ul>
              </div>
            </section>

            {/* Testing */}
            <section id="testing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing and diagnosis</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  COVID-19 testing helps identify infections and prevent spread. Testing options include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li><strong>PCR tests:</strong> Most accurate, processed in laboratories</li>
                  <li><strong>Rapid antigen tests:</strong> Quick results, less sensitive than PCR</li>
                  <li><strong>At-home tests:</strong> Convenient self-testing options</li>
                </ul>
                <p className="text-base leading-relaxed">
                  Test if you have symptoms, have been exposed, or before gathering with vulnerable individuals.
                </p>
              </div>
            </section>

            {/* Treatment */}
            <section id="treatment" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatment options</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Treatment depends on symptom severity and risk factors:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><strong>Mild symptoms:</strong> Rest, hydration, over-the-counter medications</li>
                  <li><strong>High-risk patients:</strong> Antiviral medications (Paxlovid, others)</li>
                  <li><strong>Severe illness:</strong> Hospitalization and specialized treatments</li>
                  <li><strong>Long COVID:</strong> Multidisciplinary care approaches</li>
                </ul>
              </div>
            </section>

            {/* Home care */}
            <section id="home-care" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing symptoms at home</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Most people with mild COVID-19 can recover at home:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Get plenty of rest and stay hydrated</li>
                  <li>Isolate to prevent spreading the virus</li>
                  <li>Monitor symptoms and oxygen levels if recommended</li>
                  <li>Use over-the-counter medications for fever and pain</li>
                  <li>Contact healthcare providers if symptoms worsen</li>
                </ul>
              </div>
            </section>

            {/* Long COVID */}
            <section id="long-covid" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Long COVID support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Some people experience symptoms weeks or months after initial infection. Long COVID may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Fatigue and brain fog</li>
                  <li>Breathing difficulties</li>
                  <li>Heart palpitations</li>
                  <li>Joint and muscle pain</li>
                  <li>Sleep disturbances</li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  Long COVID clinics and specialists can provide comprehensive care and support.
                </p>
              </div>
            </section>

            {/* When to seek care */}
            <section id="seek-care" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">When to seek medical care</h2>
              <div className="text-gray-600">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">Seek emergency care immediately if you have:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Difficulty breathing or shortness of breath</li>
                    <li>• Persistent chest pain or pressure</li>
                    <li>• Confusion or inability to stay awake</li>
                    <li>• Bluish lips or face</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Contact your healthcare provider if symptoms are worsening or if you have risk factors for severe illness.
                </p>
              </div>
            </section>

            <section id="mental-health" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mental health during COVID</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  The pandemic has affected mental health worldwide. It's normal to feel anxious, stressed, or isolated. 
                  Seek support from mental health professionals, maintain social connections, and practice self-care 
                  strategies to protect your mental well-being.
                </p>
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
                    <h3 className="font-semibold text-sm leading-tight">Get COVID-19 updates and health alerts</h3>
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
                  CDC COVID-19 Information
                </h3>
                <p className="text-sm text-teal-700 mb-3 leading-relaxed">
                  Get the latest COVID-19 information, guidelines, and updates from the Centers for Disease Control
                </p>
                <a
                  href="https://www.cdc.gov/covid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Visit CDC COVID Page
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
