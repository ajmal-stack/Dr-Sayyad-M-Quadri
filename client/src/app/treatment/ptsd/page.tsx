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
//   { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
//   { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd", active: true },
// ];

const onThisPageItems = [
  { name: "What is PTSD?", href: "#what-is-ptsd" },
  { name: "Where can I learn more about PTSD?", href: "#learn-more" },
  { name: "Why is NIMH studying PTSD?", href: "#why-nimh-studying" },
  { name: "How is NIMH research addressing this critical topic?", href: "#nimh-research" },
  { name: "Explore clinical trials about PTSD", href: "#clinical-trials" },
  { name: "Share outreach materials about PTSD", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional federal resources", href: "#federal-resources" },
];

const ptsdSymptoms = [
  "Re-experiencing symptoms",
  "Avoidance symptoms", 
  "Arousal and reactivity symptoms",
  "Cognition and mood symptoms"
];

const informationCards = [
  {
    title: "Free health information",
    description: "Brochures and fact sheets with more information about PTSD, including signs, symptoms, and treatment options. Available for free in print and online.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Science updates", 
    description: "NIMH news about PTSD, including press releases and highlights on the latest research findings.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Statistics",
    description: "Information about the prevalence and treatment of PTSD in the United States.",
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

export default function PTSDNIMHPage() {
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
            <span className="text-gray-900 font-medium truncate">PTSD</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/ptsd" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Traumatic Events and Post-Traumatic Stress Disorder (PTSD)</h1>
              
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

            {/* What is PTSD? */}
            <section id="what-is-ptsd" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is PTSD?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Post-traumatic stress disorder (PTSD) is a mental health condition that can develop after experiencing 
                      or witnessing a traumatic event. PTSD can occur in people of all ages and affects the brain and body&apos;s 
                      stress response systems.
                    </p>
                    
                    <p className="text-base leading-relaxed">PTSD symptoms fall into four main categories:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {ptsdSymptoms.map((symptom) => (
                        <li key={symptom} className="text-base">
                          <a href="#" className="text-blue-600 hover:text-blue-800">{symptom}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Mental Health Minute: PTSD</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about PTSD?</h2>
              
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

            {/* Why is NIMH studying */}
            <section id="why-nimh-studying" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is NIMH studying PTSD?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  PTSD affects <a href="#" className="text-blue-600 hover:text-blue-800">about 3.5% of U.S. adults</a> each 
                  year, and an estimated 1 in 11 people will be diagnosed with PTSD in their lifetime. PTSD can occur at any age, 
                  including childhood.
                </p>
                <p className="text-base leading-relaxed">
                  Understanding the biological and psychological mechanisms of trauma response, developing more effective 
                  treatments, and improving prevention strategies are crucial for reducing the impact of PTSD on individuals, 
                  families, and communities.
                </p>
              </div>
            </section>

            {/* NIMH Research */}
            <section id="nimh-research" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How is NIMH research addressing this critical topic?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  NIMH supports research on the brain mechanisms underlying trauma and PTSD, including studies of fear memory, 
                  emotional regulation, and stress response systems. Research focuses on both biological and psychosocial factors.
                </p>
                
                <p className="text-base leading-relaxed">
                  Current research areas include developing and testing new psychotherapies, investigating medication treatments, 
                  studying early intervention approaches, and exploring innovative technologies for PTSD treatment.
                </p>
                
                <p className="text-base leading-relaxed">
                  NIMH also supports research on PTSD prevention, treatment of complex trauma, addressing PTSD in specific 
                  populations (such as veterans and first responders), and understanding resilience factors.
                </p>
              </div>
            </section>

            {/* Additional sections placeholders */}
            <section id="clinical-trials" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore clinical trials about PTSD</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Clinical trials are research studies that look at new ways to prevent, detect, or treat diseases and conditions. 
                  To learn more or find a study, visit:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Clinical Trials – Information for Participants</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Clinicaltrials.gov: Current Studies on PTSD</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">NIMH PTSD Studies for Adults</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">NIMH PTSD Studies for Children</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  Learn how to find help for yourself or someone else. You can also find support and locate mental health services 
                  in your area on the Substance Abuse and Mental Health Services Administration website.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  If you or someone you know is struggling or having thoughts of suicide, call or text the 988 Suicide & Crisis Lifeline 
                  at 988 or chat at 988lifeline.org. In life-threatening situations, call 911.
                </p>
              </div>
            </section>

            <section id="federal-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional federal resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">PTSD</a></strong> (MedlinePlus): Information, journal articles, and other resources about PTSD collected by the National Library of Medicine
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about PTSD</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setEmailSignup(true)}
                  className="w-full bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit NIMH Link */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  Official NIMH Information
                </h3>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  Get the complete, official information from the National Institute of Mental Health
                </p>
                <a
                  href="https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Visit NIMH Page
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
