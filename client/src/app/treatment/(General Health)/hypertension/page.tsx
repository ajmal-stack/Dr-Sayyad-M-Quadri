'use client';

import Link from 'next/link';
import TreatmentSidebar from '@/components/ui/treatment/TreatmentSidebar';
import { 
  ShareIcon,
  EnvelopeIcon,
  BookOpenIcon,
  NewspaperIcon,
  ChartBarIcon,
  HeartIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ContactForm from '@/components/ui/primitives/ContactForm';

const onThisPageItems = [
  { name: "What is high blood pressure?", href: "#what-is-hypertension" },
  { name: "Understanding blood pressure numbers", href: "#blood-pressure-numbers" },
  { name: "Risk factors and causes", href: "#risk-factors" },
  { name: "Lifestyle modifications", href: "#lifestyle-modifications" },
  { name: "Dietary approaches (DASH diet)", href: "#dietary-approaches" },
  { name: "Exercise and physical activity", href: "#exercise-activity" },
  { name: "Medication management", href: "#medication-management" },
  { name: "Monitoring and tracking", href: "#monitoring-tracking" },
  { name: "Find cardiovascular care", href: "#find-care" },
];

const bpCategories = [
  "Normal: Less than 120/80 mmHg",
  "Elevated: 120-129 systolic, less than 80 diastolic", 
  "Stage 1 Hypertension: 130-139/80-89 mmHg",
  "Stage 2 Hypertension: 140/90 mmHg or higher",
  "Hypertensive Crisis: Higher than 180/120 mmHg"
];

const lifestyleStrategies = [
  {
    title: "DASH Diet",
    description: "Dietary Approaches to Stop Hypertension - emphasizes fruits, vegetables, whole grains, and lean proteins.",
    icon: BookOpenIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Regular Exercise", 
    description: "Aerobic activity and strength training can help lower blood pressure and improve heart health.",
    icon: HeartIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Stress Management",
    description: "Techniques like meditation, deep breathing, and yoga can help manage stress-related blood pressure spikes.",
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

export default function HypertensionPage() {
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
            <span className="text-gray-900 font-medium truncate">High Blood Pressure</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/hypertension" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">High Blood Pressure (Hypertension)</h1>
              
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

            {/* What is high blood pressure? */}
            <section id="what-is-hypertension" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is high blood pressure?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      High blood pressure, also called hypertension, is a condition where the force of blood against 
                      your artery walls is consistently too high. This puts extra strain on your heart and blood vessels, 
                      increasing your risk of serious health problems.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Often called the "silent killer" because it usually has no symptoms, high blood pressure affects 
                      nearly half of adults in the United States. Many people don't know they have it until complications arise.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      The good news is that high blood pressure can often be prevented and controlled with lifestyle changes 
                      and, when necessary, medication.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-teal-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <HeartIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-teal-800 font-medium">Heart Health</p>
                      <p className="text-xs text-teal-600 mt-1">Protect your cardiovascular system</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Blood pressure numbers */}
            <section id="blood-pressure-numbers" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding blood pressure numbers</h2>
              
              <div className="prose prose-lg text-gray-600 space-y-4 mb-6">
                <p className="text-base leading-relaxed">
                  Blood pressure is measured in millimeters of mercury (mmHg) and recorded as two numbers:
                </p>
                
                <ul className="list-disc pl-6 space-y-1 text-base mb-6">
                  <li><strong>Systolic pressure</strong> (top number): Pressure when your heart beats</li>
                  <li><strong>Diastolic pressure</strong> (bottom number): Pressure when your heart rests between beats</li>
                </ul>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                  <h4 className="font-semibold text-teal-800 mb-3">Blood Pressure Categories</h4>
                  <ul className="space-y-2">
                    {bpCategories.map((category) => (
                      <li key={category} className="text-teal-700 text-sm">
                        • {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Risk factors */}
            <section id="risk-factors" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk factors and causes</h2>
              
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Several factors can increase your risk of developing high blood pressure:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Modifiable Risk Factors:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-base">
                      <li>Poor diet (high sodium, low potassium)</li>
                      <li>Physical inactivity</li>
                      <li>Excess weight</li>
                      <li>Excessive alcohol consumption</li>
                      <li>Smoking and tobacco use</li>
                      <li>Chronic stress</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Non-modifiable Risk Factors:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-base">
                      <li>Age (risk increases with age)</li>
                      <li>Family history</li>
                      <li>Race/ethnicity</li>
                      <li>Gender (varies by age)</li>
                      <li>Chronic conditions (diabetes, kidney disease)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Lifestyle modifications */}
            <section id="lifestyle-modifications" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Lifestyle modifications</h2>
              
              <div className="grid gap-6 mb-8">
                {lifestyleStrategies.map((strategy) => (
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

            {/* DASH Diet */}
            <section id="dietary-approaches" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dietary approaches (DASH diet)</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  The DASH (Dietary Approaches to Stop Hypertension) diet has been proven effective in lowering blood pressure. 
                  Key principles include:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li>Eat plenty of fruits and vegetables (8-10 servings daily)</li>
                  <li>Choose whole grains over refined grains</li>
                  <li>Include lean proteins (poultry, fish, beans)</li>
                  <li>Limit sodium to less than 2,300 mg daily (ideally 1,500 mg)</li>
                  <li>Reduce saturated fat and eliminate trans fats</li>
                  <li>Include low-fat dairy products</li>
                  <li>Eat nuts, seeds, and legumes</li>
                  <li>Limit added sugars and sugary beverages</li>
                </ul>
              </div>
            </section>

            {/* Exercise */}
            <section id="exercise-activity" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Exercise and physical activity</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Regular physical activity can lower blood pressure by 4-9 mmHg, which is as effective as some medications. 
                  Recommended activities include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li><strong>Aerobic exercise:</strong> 150 minutes of moderate intensity per week</li>
                  <li><strong>Strength training:</strong> 2 or more days per week</li>
                  <li><strong>Flexibility exercises:</strong> Yoga, tai chi, or stretching</li>
                </ul>
                <p className="text-base leading-relaxed">
                  Start slowly and gradually increase intensity. Even small amounts of activity can make a difference.
                </p>
              </div>
            </section>

            {/* Medication management */}
            <section id="medication-management" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Medication management</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  When lifestyle changes aren't enough, medications may be necessary. Common blood pressure medications include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><strong>ACE inhibitors</strong> - Help relax blood vessels</li>
                  <li><strong>ARBs (Angiotensin receptor blockers)</strong> - Similar to ACE inhibitors</li>
                  <li><strong>Diuretics</strong> - Help remove excess sodium and water</li>
                  <li><strong>Calcium channel blockers</strong> - Relax blood vessel muscles</li>
                  <li><strong>Beta blockers</strong> - Reduce heart rate and workload</li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  Work with your healthcare provider to find the right medication(s) for you. Take medications as prescribed 
                  and don't stop without medical supervision.
                </p>
              </div>
            </section>

            {/* Monitoring */}
            <section id="monitoring-tracking" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Monitoring and tracking</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Regular monitoring is essential for managing high blood pressure:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Check blood pressure regularly at home</li>
                  <li>Keep a blood pressure log</li>
                  <li>Use a validated home blood pressure monitor</li>
                  <li>Follow proper measurement techniques</li>
                  <li>Share readings with your healthcare provider</li>
                </ul>
              </div>
            </section>

            <section id="find-care" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find cardiovascular care</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  Managing high blood pressure often requires a team approach including your primary care provider, 
                  cardiologist, pharmacist, and possibly a registered dietitian. Regular check-ups and monitoring 
                  are essential for preventing complications.
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
                    <h3 className="font-semibold text-sm leading-tight">Get heart health tips and updates</h3>
                  </div>
                </div>
                <button 
                  className="w-full bg-white text-teal-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit AHA Link */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h3 className="font-semibold text-teal-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  American Heart Association
                </h3>
                <p className="text-sm text-teal-700 mb-3 leading-relaxed">
                  Get comprehensive heart health and blood pressure information from the leading cardiovascular organization
                </p>
                <a
                  href="https://www.heart.org/en/health-topics/high-blood-pressure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Visit AHA Website
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
