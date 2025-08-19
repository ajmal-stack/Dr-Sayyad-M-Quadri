'use client';

import Link from 'next/link';
import TreatmentSidebar from '@/components/ui/treatment/TreatmentSidebar';
import { 
  ShareIcon,
  EnvelopeIcon,
  BookOpenIcon,
  NewspaperIcon,
  ChartBarIcon,
  ScaleIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const onThisPageItems = [
  { name: "Understanding healthy weight", href: "#healthy-weight" },
  { name: "Setting realistic goals", href: "#setting-goals" },
  { name: "Nutrition fundamentals", href: "#nutrition" },
  { name: "Physical activity guidelines", href: "#physical-activity" },
  { name: "Behavioral strategies", href: "#behavioral-strategies" },
  { name: "Medical interventions", href: "#medical-interventions" },
  { name: "Maintaining weight loss", href: "#maintaining-loss" },
  { name: "Professional support", href: "#professional-support" },
];

const weightManagementPillars = [
  {
    title: "Balanced nutrition",
    description: "Focus on whole foods, portion control, and creating a sustainable caloric balance for your goals.",
    icon: BookOpenIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Regular physical activity", 
    description: "Combine cardiovascular exercise with strength training for optimal health and weight management.",
    icon: ChartBarIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Behavioral changes",
    description: "Develop healthy habits, manage emotional eating, and create sustainable lifestyle modifications.",
    icon: ScaleIcon,
    bgColor: "bg-teal-500"
  }
];

const socialLinks = [
  { name: "Facebook", icon: "f" },
  { name: "Twitter", icon: "x" },
  { name: "LinkedIn", icon: "in" },
  { name: "Email", icon: "@" },
  { name: "Print", icon: "🖨" }
];

export default function WeightManagementPage() {

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
            <span className="text-gray-900 font-medium truncate">Healthy Weight Management</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/weight" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Healthy Weight Management</h1>
              
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

            {/* Understanding healthy weight */}
            <section id="healthy-weight" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding healthy weight</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Healthy weight management is about more than just the number on the scale. It's about achieving 
                      and maintaining a weight that supports your overall health, energy levels, and quality of life.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      A healthy approach focuses on gradual, sustainable changes rather than quick fixes. The goal is 
                      to develop lasting habits that support both physical and mental well-being.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Remember that healthy weight varies for each individual based on factors like genetics, age, 
                      muscle mass, and overall health status.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-teal-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <ScaleIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-teal-800 font-medium">Balanced Approach</p>
                      <p className="text-xs text-teal-600 mt-1">Health over numbers</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Setting goals */}
            <section id="setting-goals" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Setting realistic goals</h2>
              
              <div className="prose prose-lg text-gray-600 space-y-4 mb-6">
                <p className="text-base leading-relaxed mb-4">
                  Successful weight management starts with setting SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound):
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Aim for 1-2 pounds of weight loss per week</li>
                  <li>Focus on behavior changes, not just weight loss</li>
                  <li>Set both short-term and long-term objectives</li>
                  <li>Include non-scale victories (energy, sleep, fitness)</li>
                  <li>Be flexible and adjust goals as needed</li>
                </ul>
              </div>
            </section>

            {/* Weight management pillars */}
            <section id="nutrition" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Core principles of weight management</h2>
              
              <div className="grid gap-6 mb-8">
                {weightManagementPillars.map((pillar) => (
                  <div key={pillar.title} className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className={`${pillar.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <pillar.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="prose prose-lg text-gray-600 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nutrition fundamentals</h3>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Create a moderate caloric deficit for weight loss</li>
                  <li>Eat plenty of fruits, vegetables, and whole grains</li>
                  <li>Include lean proteins at each meal</li>
                  <li>Choose healthy fats in moderation</li>
                  <li>Stay hydrated with water</li>
                  <li>Practice mindful eating and portion control</li>
                </ul>
              </div>
            </section>

            {/* Physical activity */}
            <section id="physical-activity" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Physical activity guidelines</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Regular physical activity is essential for weight management and overall health:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li><strong>Cardiovascular exercise:</strong> 150-300 minutes of moderate intensity per week</li>
                  <li><strong>Strength training:</strong> 2 or more days per week targeting all major muscle groups</li>
                  <li><strong>Flexibility and balance:</strong> Activities like yoga or stretching</li>
                  <li><strong>Daily movement:</strong> Take stairs, walk during breaks, reduce sitting time</li>
                </ul>
                
                <p className="text-base leading-relaxed">
                  Start slowly and gradually increase intensity and duration. Find activities you enjoy to make 
                  exercise a sustainable part of your lifestyle.
                </p>
              </div>
            </section>

            {/* Behavioral strategies */}
            <section id="behavioral-strategies" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Behavioral strategies</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Successful weight management involves changing behaviors and mindset:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li><strong>Self-monitoring:</strong> Track food intake, physical activity, and weight</li>
                  <li><strong>Meal planning:</strong> Prepare healthy meals and snacks in advance</li>
                  <li><strong>Environmental changes:</strong> Stock healthy foods, remove temptations</li>
                  <li><strong>Stress management:</strong> Find healthy ways to cope with emotions</li>
                  <li><strong>Sleep hygiene:</strong> Aim for 7-9 hours of quality sleep</li>
                  <li><strong>Social support:</strong> Engage family and friends in your journey</li>
                </ul>
              </div>
            </section>

            {/* Medical interventions */}
            <section id="medical-interventions" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical interventions</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  For some individuals, medical interventions may be appropriate:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><strong>Prescription medications:</strong> FDA-approved weight loss medications</li>
                  <li><strong>Bariatric surgery:</strong> For severe obesity when other methods haven't worked</li>
                  <li><strong>Medical monitoring:</strong> Regular check-ups to assess progress and health</li>
                  <li><strong>Addressing underlying conditions:</strong> Treating thyroid disorders, insulin resistance, etc.</li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  Always consult with healthcare professionals to determine the best approach for your individual situation.
                </p>
              </div>
            </section>

            {/* Maintaining weight loss */}
            <section id="maintaining-loss" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Maintaining weight loss</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Maintaining weight loss can be more challenging than losing weight initially:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Continue regular physical activity (often more than during weight loss)</li>
                  <li>Maintain healthy eating patterns</li>
                  <li>Monitor weight regularly but not obsessively</li>
                  <li>Stay connected with support systems</li>
                  <li>Be prepared for plateaus and minor setbacks</li>
                  <li>Focus on overall health, not just weight</li>
                </ul>
              </div>
            </section>

            <section id="professional-support" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  Consider working with healthcare professionals who can provide personalized guidance: 
                  registered dietitians, exercise physiologists, behavioral therapists, and physicians 
                  who specialize in weight management. They can help create a comprehensive plan 
                  tailored to your individual needs and health status.
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
                    <button key={social.name} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center">
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
                    <h3 className="font-semibold text-sm leading-tight">Get weight management tips and motivation</h3>
                  </div>
                </div>
                <button 
                  className="w-full bg-white text-teal-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit NIH Link */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h3 className="font-semibold text-teal-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  NIH Weight Management
                </h3>
                <p className="text-sm text-teal-700 mb-3 leading-relaxed">
                  Get evidence-based weight management information from the National Institutes of Health
                </p>
                <a
                  href="https://www.nhlbi.nih.gov/health/educational/lose_wt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Visit NIH Website
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
