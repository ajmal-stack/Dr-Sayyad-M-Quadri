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

// Removed - using TreatmentSidebar component
// const healthTopics = [
//   { name: "Anxiety Disorders", href: "/treatment/anxiety" },
//   { name: "Attention-Deficit/Hyperactivity Disorder (ADHD)", href: "/treatment/adhd" },
//   { name: "Autism Spectrum Disorder", href: "/treatment/autism" },
//   { name: "Bipolar Disorder", href: "/treatment/bipolar" },
//   { name: "Borderline Personality Disorder", href: "/treatment/borderline" },
//   { name: "COVID-19 and Mental Health", href: "/treatment/covid-mental-health" },
//   { name: "Depression", href: "/treatment/depression" },
//   { name: "Disruptive Mood Dysregulation Disorder (DMDD)", href: "/treatment/dmdd" },
//   { name: "Eating Disorders", href: "/treatment/eating-disorders" },
//   { name: "HIV and Mental Health", href: "/treatment/hiv-mental-health" },
//   { name: "Obsessive-Compulsive Disorder (OCD)", href: "/treatment/ocd" },
//   { name: "Schizophrenia", href: "/treatment/schizophrenia" },
//   { name: "Stress Management", href: "/treatment/stress", active: true },
//   { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
//   { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd" },
// ];

const onThisPageItems = [
  { name: "What is stress?", href: "#what-is-stress" },
  { name: "Where can I learn more about stress management?", href: "#learn-more" },
  { name: "Why is stress management important?", href: "#why-important" },
  { name: "How can stress management help?", href: "#how-helps" },
  { name: "Explore stress management techniques", href: "#techniques" },
  { name: "Share outreach materials about stress", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional resources", href: "#additional-resources" },
];

const stressTypes = [
  "Acute stress",
  "Chronic stress", 
  "Work-related stress",
  "Life transition stress",
  "Traumatic stress"
];

const informationCards = [
  {
    title: "Free health information",
    description: "Brochures and fact sheets with more information about stress management, including signs, symptoms, and coping strategies. Available for free in print and online.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Science updates", 
    description: "Latest news about stress research, including press releases and highlights on stress management findings.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Statistics",
    description: "Information about the prevalence and impact of stress in the United States and effective management strategies.",
    icon: ChartBarIcon,
    bgColor: "bg-blue-500"
  }
];

const socialLinks = [
  { name: "Facebook", icon: "f" },
  { name: "Twitter", icon: "x" },
  { name: "LinkedIn", icon: "in" },
  { name: "Email", icon: "@" },
  { name: "Print", icon: "🖨" }
];

export default function StressManagementPage() {
  const [emailSignup, setEmailSignup] = useState(false);

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
            <span className="text-gray-900 font-medium truncate">Stress Management</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/stress" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Stress Management</h1>
              
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

            {/* What is stress? */}
            <section id="what-is-stress" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is stress?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Stress is the body&apos;s natural response to challenges or demands. While some stress can be helpful and 
                      motivating, chronic or overwhelming stress can negatively impact your physical health, mental well-being, 
                      and daily functioning.
                    </p>
                    
                    <p className="text-base leading-relaxed">There are several types of stress, including:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {stressTypes.map((type) => (
                        <li key={type} className="text-base">
                          <a href="#" className="text-blue-600 hover:text-blue-800">{type}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Mental Health Minute: Stress</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about stress management?</h2>
              
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

            {/* Why is stress management important */}
            <section id="why-important" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is stress management important?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  <a href="#" className="text-blue-600 hover:text-blue-800">About 77% of people</a> regularly 
                  experience physical symptoms caused by stress, and 73% regularly experience psychological symptoms. 
                  Chronic stress can contribute to serious health problems including heart disease, high blood pressure, 
                  diabetes, and mental health conditions.
                </p>
                <p className="text-base leading-relaxed">
                  Learning effective stress management techniques can improve your quality of life, enhance your ability 
                  to cope with challenges, and reduce the risk of stress-related health problems.
                </p>
              </div>
            </section>

            {/* How can stress management help */}
            <section id="how-helps" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How can stress management help?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Effective stress management techniques can help you develop healthy coping strategies, improve your 
                  emotional regulation, and build resilience. These approaches include relaxation techniques, mindfulness 
                  practices, physical exercise, and cognitive strategies.
                </p>
                
                <p className="text-base leading-relaxed">
                  Research shows that stress management programs can significantly reduce stress levels, improve mental 
                  health outcomes, and enhance overall well-being. These interventions are particularly effective when 
                  tailored to individual needs and circumstances.
                </p>
                
                <p className="text-base leading-relaxed">
                  Stress management also focuses on lifestyle modifications, time management skills, and building social 
                  support networks to create a comprehensive approach to stress reduction and prevention.
                </p>
              </div>
            </section>

            {/* Stress management techniques */}
            <section id="techniques" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore stress management techniques</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  There are many evidence-based techniques for managing stress. Some effective approaches include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Deep breathing exercises</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Progressive muscle relaxation</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Mindfulness meditation</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Regular physical exercise</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Time management strategies</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Cognitive behavioral techniques</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  If stress is significantly impacting your daily life, consider seeking professional help. Mental health 
                  professionals can provide personalized stress management strategies and support.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  You can find support and locate mental health services in your area on the Substance Abuse and Mental 
                  Health Services Administration website. If you&apos;re experiencing thoughts of suicide, call or text the 988 
                  Suicide & Crisis Lifeline at 988.
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Stress Management</a></strong> (MedlinePlus): Information, articles, and resources about stress management collected by the National Library of Medicine
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Workplace Stress</a></strong> (CDC): Resources for managing work-related stress and creating healthier work environments
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
                    <button key={social.name} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center">
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about stress management</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setEmailSignup(true)}
                  className="w-full bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit External Resources Link */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  Additional Resources
                </h3>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  Access comprehensive stress management resources and evidence-based techniques
                </p>
                <a
                  href="https://www.stress.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Visit Stress.org
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
