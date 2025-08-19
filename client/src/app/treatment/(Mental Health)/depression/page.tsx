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


const onThisPageItems = [
  { name: "What is depression?", href: "#what-is-depression" },
  { name: "Where can I learn more about depression?", href: "#learn-more" },
  { name: "Why is NIMH studying depression?", href: "#why-nimh-studying" },
  { name: "How is NIMH research addressing this critical topic?", href: "#nimh-research" },
  { name: "Explore clinical trials about depression", href: "#clinical-trials" },
  { name: "Share outreach materials about depression", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional federal resources", href: "#federal-resources" },
];

const depressionTypes = [
  "Major depressive disorder",
  "Persistent depressive disorder (dysthymia)", 
  "Seasonal affective disorder (SAD)",
  "Depression with psychotic features",
  "Bipolar disorder"
];

const informationCards = [
  {
    title: "Free health information",
    description: "Brochures and fact sheets with more information about depression, including signs, symptoms, and treatment options. Available for free in print and online.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Science updates", 
    description: "NIMH news about depression, including press releases and highlights on the latest research findings.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Statistics",
    description: "Information about the prevalence and treatment of depression in the United States.",
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

export default function DepressionNIMHPage() {

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
            <span className="text-gray-900 font-medium truncate">Depression</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/depression" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Depression</h1>
              
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

            {/* What is depression? */}
            <section id="what-is-depression" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is depression?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Depression is a common but serious mood disorder. It causes severe symptoms that affect how you feel, 
                      think, and handle daily activities, such as sleeping, eating, or working. Depression affects people 
                      differently and can range from mild to severe.
                    </p>
                    
                    <p className="text-base leading-relaxed">There are several forms of depression, including:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {depressionTypes.map((type) => (
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
                      <p className="text-sm text-gray-600 font-medium">Mental Health Minute: Depression</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about depression?</h2>
              
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is NIMH studying depression?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Depression is one of the most common mental health conditions in the United States. 
                  <a href="#" className="text-blue-600 hover:text-blue-800"> About 1 in 15 adults experience depression</a> in 
                  any given year, and 1 in 6 people will experience depression at some time in their life. Depression can occur 
                  at any time but often first appears during the late teens to mid-twenties.
                </p>
                <p className="text-base leading-relaxed">
                  Depression can cause significant impairment in daily functioning and can lead to suicide if left untreated. 
                  Understanding the causes, developing better treatments, and improving access to care are critical public health priorities.
                </p>
              </div>
            </section>

            {/* NIMH Research */}
            <section id="nimh-research" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How is NIMH research addressing this critical topic?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  NIMH conducts and supports research to better understand the causes of depression, develop new treatments, 
                  and improve existing interventions. Our research focuses on biological, psychological, and social factors 
                  that contribute to depression.
                </p>
                
                <p className="text-base leading-relaxed">
                  Current research areas include studying brain circuits involved in depression, developing personalized 
                  treatment approaches, investigating the role of genetics and environment, and testing innovative therapies 
                  including digital health interventions.
                </p>
                
                <p className="text-base leading-relaxed">
                  NIMH also supports research on prevention strategies, early intervention approaches, and ways to improve 
                  treatment outcomes for people with depression and co-occurring conditions.
                </p>
              </div>
            </section>

            {/* Additional sections placeholders */}
            <section id="clinical-trials" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore clinical trials about depression</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Clinical trials are research studies that look at new ways to prevent, detect, or treat diseases and conditions. 
                  To learn more or find a study, visit:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Clinical Trials – Information for Participants</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Clinicaltrials.gov: Current Studies on Depression</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">NIMH Depression Studies for Adults</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">NIMH Depression Studies for Children</a></li>
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
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Depression</a></strong> (MedlinePlus): Information, journal articles, and other resources about depression collected by the National Library of Medicine
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about depression</h3>
                  </div>
                </div>
                <button 
                  // onClick={() => setEmailSignup(true)}
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
                  href="https://www.nimh.nih.gov/health/topics/depression"
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