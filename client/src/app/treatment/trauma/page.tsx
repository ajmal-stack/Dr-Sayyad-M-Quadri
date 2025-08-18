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
//   { name: "Stress Management", href: "/treatment/stress" },
//   { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
//   { name: "Trauma Therapy", href: "/treatment/trauma", active: true },
//   { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd" },
// ];

const onThisPageItems = [
  { name: "What is trauma therapy?", href: "#what-is-trauma-therapy" },
  { name: "Where can I learn more about trauma therapy?", href: "#learn-more" },
  { name: "Why is trauma therapy important?", href: "#why-important" },
  { name: "How does trauma therapy work?", href: "#how-it-works" },
  { name: "Explore trauma therapy approaches", href: "#therapy-approaches" },
  { name: "Share outreach materials about trauma therapy", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional resources", href: "#additional-resources" },
];

const traumaTypes = [
  "Acute trauma",
  "Complex trauma", 
  "Childhood trauma",
  "Developmental trauma",
  "Historical trauma",
  "Secondary trauma"
];

const informationCards = [
  {
    title: "Free health information",
    description: "Brochures and fact sheets with more information about trauma therapy, including therapeutic approaches and recovery resources. Available for free in print and online.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Science updates", 
    description: "Latest news about trauma therapy research, including press releases and highlights on innovative treatment approaches and effectiveness studies.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Statistics",
    description: "Information about trauma prevalence and the effectiveness of trauma-informed therapeutic interventions in the United States.",
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

export default function TraumaTherapyPage() {

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
            <span className="text-gray-900 font-medium truncate">Trauma Therapy</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/trauma" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Trauma Therapy</h1>
              
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

            {/* What is trauma therapy? */}
            <section id="what-is-trauma-therapy" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is trauma therapy?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Trauma therapy is a specialized form of psychotherapy designed to help individuals process and heal 
                      from traumatic experiences. It uses evidence-based approaches to address the psychological, emotional, 
                      and physical effects of trauma while promoting recovery and resilience.
                    </p>
                    
                    <p className="text-base leading-relaxed">Trauma therapy addresses various types of trauma, including:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {traumaTypes.map((type) => (
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
                      <p className="text-sm text-gray-600 font-medium">Mental Health Minute: Trauma Therapy</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about trauma therapy?</h2>
              
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

            {/* Why is trauma therapy important */}
            <section id="why-important" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is trauma therapy important?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  <a href="#" className="text-blue-600 hover:text-blue-800">About 70% of adults worldwide</a> have 
                  experienced at least one traumatic event in their lifetime. Without proper treatment, trauma can lead 
                  to lasting psychological effects including PTSD, depression, anxiety, and difficulties with relationships 
                  and daily functioning.
                </p>
                <p className="text-base leading-relaxed">
                  Trauma therapy provides a safe, structured environment for processing traumatic experiences and developing 
                  healthy coping mechanisms. It helps individuals regain a sense of control, reduce symptoms, and rebuild 
                  their lives with greater resilience and well-being.
                </p>
              </div>
            </section>

            {/* How does trauma therapy work */}
            <section id="how-it-works" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How does trauma therapy work?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Trauma therapy uses specialized techniques to help the brain process traumatic memories in a safe way. 
                  Therapists create a secure therapeutic relationship and use evidence-based methods to help clients 
                  gradually work through their trauma without becoming overwhelmed.
                </p>
                
                <p className="text-base leading-relaxed">
                  The therapy process typically involves establishing safety and stabilization, processing traumatic 
                  memories, and integration of the experience into the person&apos;s life story. This phased approach 
                  ensures that healing occurs at a pace that feels manageable for each individual.
                </p>
                
                <p className="text-base leading-relaxed">
                  Trauma therapy also focuses on building coping skills, addressing trauma-related symptoms, and 
                  helping clients develop healthy relationships and a positive sense of self-worth.
                </p>
              </div>
            </section>

            {/* Trauma therapy approaches */}
            <section id="therapy-approaches" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore trauma therapy approaches</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  There are several evidence-based trauma therapy approaches that have shown effectiveness:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Eye Movement Desensitization and Reprocessing (EMDR)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Cognitive Processing Therapy (CPT)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Prolonged Exposure Therapy</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Somatic Experiencing</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Internal Family Systems (IFS)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Narrative Exposure Therapy</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  If you&apos;ve experienced trauma, it&apos;s important to work with a qualified mental health professional 
                  who specializes in trauma therapy. Look for therapists who are trained in trauma-informed care and 
                  evidence-based trauma treatments.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  You can find support and locate mental health services in your area on the Substance Abuse and Mental 
                  Health Services Administration website. For immediate crisis support, call or text the 988 Suicide & 
                  Crisis Lifeline at 988.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  For sexual assault survivors, the National Sexual Assault Hotline provides 24/7 support: 1-800-656-HOPE (4673).
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Trauma and PTSD</a></strong> (National Center for PTSD): Comprehensive information about trauma and evidence-based treatments
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Trauma-Informed Care</a></strong> (SAMHSA): Resources on trauma-informed approaches in healthcare and community settings
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">International Society for Traumatic Stress Studies</a></strong> (ISTSS): Professional resources and public education materials
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about trauma therapy</h3>
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
                  Professional Resources
                </h3>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  Access comprehensive trauma therapy resources and training information
                </p>
                <a
                  href="https://www.istss.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Visit ISTSS
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
