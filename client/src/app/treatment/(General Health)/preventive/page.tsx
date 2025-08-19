'use client';

import Link from 'next/link';
import TreatmentSidebar from '@/components/ui/treatment/TreatmentSidebar';
import { 
  ShareIcon,
  EnvelopeIcon,
  BookOpenIcon,
  NewspaperIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ContactForm from '@/components/ui/primitives/ContactForm';

const onThisPageItems = [
  { name: "What are preventive screenings?", href: "#what-are-screenings" },
  { name: "Age-based screening guidelines", href: "#age-guidelines" },
  { name: "Cancer screening tests", href: "#cancer-screenings" },
  { name: "Cardiovascular health screenings", href: "#cardiovascular" },
  { name: "Bone health and osteoporosis", href: "#bone-health" },
  { name: "Mental health screenings", href: "#mental-health" },
  { name: "Preparing for screenings", href: "#preparing" },
  { name: "Understanding results", href: "#understanding-results" },
  { name: "Find screening providers", href: "#find-providers" },
];

const screeningCategories = [
  {
    title: "Cancer screenings",
    description: "Early detection tests for breast, cervical, colorectal, lung, and other cancers based on age and risk factors.",
    icon: ClipboardDocumentCheckIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Cardiovascular health", 
    description: "Blood pressure, cholesterol, and heart disease risk assessments to prevent cardiovascular complications.",
    icon: ChartBarIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Routine health checks",
    description: "Regular physical exams, lab work, and preventive care to maintain overall health and catch issues early.",
    icon: BookOpenIcon,
    bgColor: "bg-teal-500"
  }
];

const ageBasedScreenings = {
  "20s-30s": [
    "Blood pressure check annually",
    "Cholesterol screening every 5 years",
    "Cervical cancer screening (21+)",
    "Mental health screening",
    "STI testing as appropriate"
  ],
  "40s-50s": [
    "Breast cancer screening (mammography)",
    "Colorectal cancer screening (45+)",
    "Diabetes screening every 3 years",
    "Eye exam every 2-4 years",
    "Skin cancer check annually"
  ],
  "60s+": [
    "Bone density screening",
    "Lung cancer screening (if smoking history)",
    "Annual eye exams",
    "Hearing tests",
    "Fall risk assessment"
  ]
};

const socialLinks = [
  { name: "Facebook", icon: "f" },
  { name: "Twitter", icon: "x" },
  { name: "LinkedIn", icon: "in" },
  { name: "Email", icon: "@" },
  { name: "Print", icon: "🖨" },
  {name: "Contact Us", icon: "📞"}
];

export default function PreventiveHealthPage() {
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
            <span className="text-gray-900 font-medium truncate">Preventive Health Screenings</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/preventive" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Preventive Health Screenings</h1>
              
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

            {/* What are preventive screenings? */}
            <section id="what-are-screenings" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What are preventive health screenings?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Preventive health screenings are medical tests and examinations that help detect diseases or 
                      risk factors before symptoms appear. These screenings can identify conditions in their early 
                      stages when treatment is most effective.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Regular screenings are one of the most important steps you can take to stay healthy. They can 
                      help prevent disease, detect problems early, and guide you toward making healthier lifestyle choices.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      The specific screenings you need depend on your age, gender, family history, and personal risk factors.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-teal-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <ClipboardDocumentCheckIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-teal-800 font-medium">Early Detection</p>
                      <p className="text-xs text-teal-600 mt-1">Prevention is key</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Screening categories */}
            <section id="age-guidelines" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Types of preventive screenings</h2>
              
              <div className="grid gap-6 mb-8">
                {screeningCategories.map((category) => (
                  <div key={category.title} className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className={`${category.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="prose prose-lg text-gray-600 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Age-based screening guidelines</h3>
                
                <div className="grid gap-6">
                  {Object.entries(ageBasedScreenings).map(([ageGroup, screenings]) => (
                    <div key={ageGroup} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">{ageGroup}</h4>
                      <ul className="space-y-1">
                        {screenings.map((screening, index) => (
                          <li key={index} className="text-gray-700 text-sm flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            {screening}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cancer screenings */}
            <section id="cancer-screenings" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancer screening tests</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Cancer screenings can detect cancer before you have symptoms. Common cancer screenings include:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li><strong>Mammography:</strong> Breast cancer screening for women 40+ (some start at 50)</li>
                  <li><strong>Pap smear:</strong> Cervical cancer screening starting at age 21</li>
                  <li><strong>Colonoscopy:</strong> Colorectal cancer screening starting at age 45</li>
                  <li><strong>Low-dose CT:</strong> Lung cancer screening for high-risk individuals</li>
                  <li><strong>Skin examination:</strong> Melanoma and skin cancer detection</li>
                  <li><strong>PSA test:</strong> Prostate cancer screening discussion with men 50+</li>
                </ul>
                
                <p className="text-base leading-relaxed">
                  Screening recommendations may vary based on your risk factors, family history, and personal health history.
                </p>
              </div>
            </section>

            {/* Cardiovascular */}
            <section id="cardiovascular" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cardiovascular health screenings</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Cardiovascular screenings help assess your risk for heart disease and stroke:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li><strong>Blood pressure:</strong> Check annually, more frequently if elevated</li>
                  <li><strong>Cholesterol panel:</strong> Every 4-6 years starting at age 20</li>
                  <li><strong>Blood glucose:</strong> Diabetes screening every 3 years after age 35</li>
                  <li><strong>BMI and waist circumference:</strong> Weight and metabolic health assessment</li>
                  <li><strong>ECG/stress test:</strong> As recommended based on risk factors</li>
                </ul>
              </div>
            </section>

            {/* Bone health */}
            <section id="bone-health" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bone health and osteoporosis</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Bone density screenings help detect osteoporosis and fracture risk:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>DEXA scan for women 65+ and men 70+</li>
                  <li>Earlier screening for those with risk factors</li>
                  <li>Post-menopausal women with risk factors</li>
                  <li>Adults with previous fractures</li>
                </ul>
              </div>
            </section>

            {/* Mental health */}
            <section id="mental-health" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mental health screenings</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Mental health screenings are important for overall well-being:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Depression screening for all adults</li>
                  <li>Anxiety and stress assessments</li>
                  <li>Substance use disorder screening</li>
                  <li>Cognitive assessments for older adults</li>
                </ul>
              </div>
            </section>

            {/* Preparing for screenings */}
            <section id="preparing" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preparing for screenings</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  To get the most accurate results from your screenings:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Follow pre-screening instructions (fasting, medication adjustments)</li>
                  <li>Bring your insurance card and ID</li>
                  <li>Compile your family health history</li>
                  <li>List current medications and supplements</li>
                  <li>Prepare questions for your healthcare provider</li>
                </ul>
              </div>
            </section>

            {/* Understanding results */}
            <section id="understanding-results" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding results</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  After your screening:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Ask for explanation of results</li>
                  <li>Understand what normal ranges mean for you</li>
                  <li>Discuss next steps if results are abnormal</li>
                  <li>Schedule follow-up appointments as needed</li>
                  <li>Keep copies of your results for your records</li>
                </ul>
              </div>
            </section>

            <section id="find-providers" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find screening providers</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  Preventive screenings are available through primary care providers, specialists, community health 
                  centers, and screening programs. Many screenings are covered by insurance under preventive care benefits. 
                  Check with your insurance provider about coverage and find in-network providers.
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
                    <h3 className="font-semibold text-sm leading-tight">Get screening reminders and health tips</h3>
                  </div>
                </div>
                <button 
                  className="w-full bg-white text-teal-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit USPSTF Link */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h3 className="font-semibold text-teal-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  USPSTF Recommendations
                </h3>
                <p className="text-sm text-teal-700 mb-3 leading-relaxed">
                  Get official preventive care recommendations from the U.S. Preventive Services Task Force
                </p>
                <a
                  href="https://www.uspreventiveservicestaskforce.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Visit USPSTF Website
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
