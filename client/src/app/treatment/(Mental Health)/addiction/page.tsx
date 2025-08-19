'use client';

// import { useState } from 'react';
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
//   { name: "Addiction Recovery", href: "/treatment/addiction", active: true },
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
//   { name: "Life Transitions", href: "/treatment/life-transitions" },
//   { name: "Obsessive-Compulsive Disorder (OCD)", href: "/treatment/ocd" },
//   { name: "Schizophrenia", href: "/treatment/schizophrenia" },
//   { name: "Sleep Disorders", href: "/treatment/sleep" },
//   { name: "Stress Management", href: "/treatment/stress" },
//   { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
//   { name: "Trauma Therapy", href: "/treatment/trauma" },
//   { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd" },
// ];

const onThisPageItems = [
  { name: "What is addiction?", href: "#what-is-addiction" },
  { name: "Where can I learn more about addiction recovery?", href: "#learn-more" },
  { name: "Why is addiction considered a mental health condition?", href: "#why-mental-health" },
  { name: "How does addiction affect mental health?", href: "#how-affects-mental-health" },
  { name: "Explore addiction recovery treatments", href: "#treatment-options" },
  { name: "Share outreach materials about addiction recovery", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional resources", href: "#additional-resources" },
];

const substanceTypes = [
  "Alcohol use disorder",
  "Opioid use disorder", 
  "Cannabis use disorder",
  "Stimulant use disorder (cocaine, methamphetamine)",
  "Tobacco/nicotine use disorder",
  "Prescription drug misuse",
  "Behavioral addictions (gambling, internet, etc.)"
];

const informationCards = [
  {
    title: "Recovery resources",
    description: "Comprehensive guides and fact sheets about addiction recovery, including evidence-based treatment approaches, relapse prevention, and long-term recovery support.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Research updates", 
    description: "Latest scientific findings on addiction neuroscience, treatment effectiveness, and innovative recovery approaches from leading research institutions.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Recovery statistics",
    description: "Data on addiction prevalence, treatment outcomes, recovery rates, and the economic impact of substance use disorders in the United States.",
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

export default function AddictionRecoveryPage() {

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
            <span className="text-gray-900 font-medium truncate">Addiction Recovery</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/addiction" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Addiction Recovery</h1>
              
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

            {/* What is addiction? */}
            <section id="what-is-addiction" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is addiction?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Addiction is a chronic, relapsing disorder characterized by compulsive substance use or behavior 
                      despite harmful consequences. It&apos;s considered a brain disorder that affects the brain&apos;s reward, 
                      motivation, memory, and related circuitry.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Addiction can involve substances or behaviors, and recovery is an ongoing process that often requires 
                      comprehensive treatment and long-term support.
                    </p>
                    
                    <p className="text-base leading-relaxed">Common types of addiction include:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {substanceTypes.map((type) => (
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
                      <p className="text-sm text-gray-600 font-medium">Understanding Addiction: Brain Science</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about addiction recovery?</h2>
              
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

            {/* Why is addiction considered a mental health condition */}
            <section id="why-mental-health" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is addiction considered a mental health condition?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Addiction is recognized as a mental health disorder because it involves complex changes in brain structure 
                  and function. <a href="#" className="text-blue-600 hover:text-blue-800">Research shows</a> that addiction 
                  affects the same brain circuits involved in mood, motivation, memory, and decision-making.
                </p>
                <p className="text-base leading-relaxed">
                  Like other mental health conditions, addiction often co-occurs with disorders such as depression, anxiety, 
                  PTSD, and ADHD. This dual diagnosis requires integrated treatment approaches that address both the addiction 
                  and the co-occurring mental health conditions simultaneously.
                </p>
              </div>
            </section>

            {/* How does addiction affect mental health */}
            <section id="how-affects-mental-health" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How does addiction affect mental health?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Addiction can significantly impact mental health in multiple ways. Substance use can worsen existing 
                  mental health symptoms, trigger new mental health conditions, and interfere with the effectiveness 
                  of mental health medications.
                </p>
                
                <p className="text-base leading-relaxed">
                  The cycle of addiction often involves using substances to cope with difficult emotions or mental health 
                  symptoms, which can provide temporary relief but ultimately worsens both the addiction and underlying 
                  mental health issues. This creates a cycle that can be challenging to break without professional support.
                </p>
                
                <p className="text-base leading-relaxed">
                  Recovery-focused treatment addresses both the addiction and mental health components, leading to better 
                  outcomes for long-term recovery and overall well-being. Integrated treatment approaches are most effective 
                  for individuals with co-occurring disorders.
                </p>
              </div>
            </section>

            {/* Addiction recovery treatments */}
            <section id="treatment-options" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore addiction recovery treatments</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Evidence-based addiction recovery treatments include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Medication-Assisted Treatment (MAT)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Cognitive Behavioral Therapy (CBT)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Motivational Interviewing</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">12-Step facilitation therapy</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Contingency management</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Family therapy and support</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Residential treatment programs</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Intensive outpatient programs (IOP)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Peer support and recovery coaching</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  If you or someone you know is struggling with addiction, help is available. Recovery is possible with 
                  appropriate treatment and support. Many people achieve long-term recovery and lead fulfilling lives.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  Treatment options range from outpatient counseling to residential programs. The best approach depends 
                  on individual needs, the severity of addiction, co-occurring mental health conditions, and personal 
                  circumstances.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  National helplines, local treatment providers, and healthcare professionals can help determine the 
                  most appropriate level of care and connect individuals with resources in their community.
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">SAMHSA National Helpline</a></strong>: 1-800-662-HELP (4357) - Free, confidential, 24/7 treatment referral service
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">National Institute on Drug Abuse (NIDA)</a></strong>: Research-based information on addiction and treatment
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Alcoholics Anonymous (AA)</a></strong>: Peer support group for alcohol addiction recovery
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Narcotics Anonymous (NA)</a></strong>: Peer support group for drug addiction recovery
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">SMART Recovery</a></strong>: Evidence-based addiction recovery support groups
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about addiction recovery</h3>
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
                  Recovery Resources
                </h3>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  Access national helplines and treatment locator services
                </p>
                <a
                  href="https://www.samhsa.gov/find-help/national-helpline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Visit SAMHSA Helpline
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
