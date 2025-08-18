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
//   { name: "Couples Therapy", href: "/treatment/couples" },
//   { name: "Depression", href: "/treatment/depression" },
//   { name: "Disruptive Mood Dysregulation Disorder (DMDD)", href: "/treatment/dmdd" },
//   { name: "Eating Disorders", href: "/treatment/eating-disorders" },
//   { name: "HIV and Mental Health", href: "/treatment/hiv-mental-health" },
//   { name: "Obsessive-Compulsive Disorder (OCD)", href: "/treatment/ocd" },
//   { name: "Schizophrenia", href: "/treatment/schizophrenia" },
//   { name: "Sleep Disorders", href: "/treatment/sleep", active: true },
//   { name: "Stress Management", href: "/treatment/stress" },
//   { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
//   { name: "Trauma Therapy", href: "/treatment/trauma" },
//   { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd" },
// ];

const onThisPageItems = [
  { name: "What are sleep disorders?", href: "#what-are-sleep-disorders" },
  { name: "Where can I learn more about sleep disorders?", href: "#learn-more" },
  { name: "Why are sleep disorders important to mental health?", href: "#why-important" },
  { name: "How do sleep disorders affect mental health?", href: "#how-affects-mental-health" },
  { name: "Explore sleep disorder treatments", href: "#treatment-options" },
  { name: "Share outreach materials about sleep disorders", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional resources", href: "#additional-resources" },
];

const sleepDisorders = [
  "Insomnia",
  "Sleep apnea", 
  "Restless leg syndrome",
  "Narcolepsy",
  "Circadian rhythm disorders",
  "Night terrors and nightmares"
];

const informationCards = [
  {
    title: "Free health information",
    description: "Brochures and fact sheets with more information about sleep disorders, including symptoms, causes, and treatment options. Available for free in print and online.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Science updates", 
    description: "Latest news about sleep disorder research, including press releases and highlights on sleep medicine advances and treatment effectiveness studies.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Statistics",
    description: "Information about the prevalence of sleep disorders and their impact on mental health and overall well-being in the United States.",
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

export default function SleepDisordersPage() {
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
            <span className="text-gray-900 font-medium truncate">Sleep Disorders</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/sleep" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Sleep Disorders</h1>
              
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

            {/* What are sleep disorders? */}
            <section id="what-are-sleep-disorders" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What are sleep disorders?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Sleep disorders are conditions that affect the ability to sleep well on a regular basis. They can 
                      significantly impact physical health, mental well-being, and daily functioning. Quality sleep is 
                      essential for overall health and plays a crucial role in mental health maintenance.
                    </p>
                    
                    <p className="text-base leading-relaxed">Common sleep disorders include:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {sleepDisorders.map((disorder) => (
                        <li key={disorder} className="text-base">
                          <a href="#" className="text-blue-600 hover:text-blue-800">{disorder}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Mental Health Minute: Sleep & Mental Health</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about sleep disorders?</h2>
              
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

            {/* Why are sleep disorders important to mental health */}
            <section id="why-important" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why are sleep disorders important to mental health?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Sleep and mental health are closely connected. <a href="#" className="text-blue-600 hover:text-blue-800">About 50-80% of people</a> with 
                  mental health conditions also experience sleep problems, compared to 10-18% of the general population. 
                  Poor sleep can worsen mental health symptoms, while mental health conditions can disrupt sleep patterns.
                </p>
                <p className="text-base leading-relaxed">
                  Adequate sleep is essential for emotional regulation, cognitive function, and overall mental well-being. 
                  Addressing sleep disorders is often a crucial component of comprehensive mental health treatment.
                </p>
              </div>
            </section>

            {/* How do sleep disorders affect mental health */}
            <section id="how-affects-mental-health" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How do sleep disorders affect mental health?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Sleep disorders can significantly impact mental health in various ways. Chronic sleep deprivation can 
                  increase the risk of developing depression, anxiety, and other mental health conditions. It can also 
                  worsen existing symptoms and make treatment more challenging.
                </p>
                
                <p className="text-base leading-relaxed">
                  Poor sleep affects the brain&apos;s ability to regulate emotions, process information, and make decisions. 
                  It can lead to increased irritability, difficulty concentrating, memory problems, and impaired judgment.
                </p>
                
                <p className="text-base leading-relaxed">
                  Conversely, treating sleep disorders often leads to improvements in mental health symptoms, better 
                  treatment outcomes, and enhanced quality of life. Sleep hygiene and sleep disorder treatment are 
                  important components of comprehensive mental health care.
                </p>
              </div>
            </section>

            {/* Sleep disorder treatments */}
            <section id="treatment-options" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore sleep disorder treatments</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Treatment for sleep disorders varies depending on the specific condition but may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Cognitive Behavioral Therapy for Insomnia (CBT-I)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Sleep hygiene education</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Continuous Positive Airway Pressure (CPAP) therapy</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Light therapy for circadian rhythm disorders</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Medication management</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Relaxation techniques and mindfulness</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Sleep study evaluation</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  If you&apos;re experiencing persistent sleep problems that affect your daily life, consider consulting 
                  with a healthcare provider or sleep specialist. Many sleep disorders can be effectively treated with 
                  proper diagnosis and intervention.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  Sleep studies conducted at accredited sleep centers can help diagnose various sleep disorders. 
                  Your primary care physician can provide referrals to sleep specialists or sleep disorder centers 
                  in your area.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  If sleep problems are related to mental health conditions, working with a mental health professional 
                  who understands the sleep-mental health connection can be particularly beneficial.
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">National Sleep Foundation</a></strong>: Comprehensive sleep health information and resources for better sleep
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">American Academy of Sleep Medicine</a></strong>: Professional organization with sleep disorder information and provider directory
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Sleep Disorders (MedlinePlus)</a></strong>: Information and resources collected by the National Library of Medicine
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">CDC Sleep and Sleep Disorders</a></strong>: Public health information on sleep health and disorders
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about sleep disorders</h3>
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
                  Sleep Resources
                </h3>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  Access comprehensive sleep health information and find sleep specialists
                </p>
                <a
                  href="https://www.sleepfoundation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Visit Sleep Foundation
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
