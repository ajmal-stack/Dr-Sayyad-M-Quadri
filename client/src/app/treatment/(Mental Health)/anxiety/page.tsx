'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TreatmentSidebar from '@/components/ui/treatment/TreatmentSidebar';
import LoadingAnimation from '@/components/ui/LoadingAnimation';
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
import ContactForm from '@/components/ui/primitives/ContactForm';



const onThisPageItems = [
  { name: "What is anxiety?", href: "#what-is-anxiety" },
  { name: "Where can I learn more about anxiety disorders?", href: "#learn-more" },
  { name: "Why is NIMH studying anxiety disorders?", href: "#why-nimh-studying" },
  { name: "How is NIMH research addressing this critical topic?", href: "#nimh-research" },
  { name: "Explore clinical trials about anxiety disorders", href: "#clinical-trials" },
  { name: "Share outreach materials about anxiety disorders", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional federal resources", href: "#federal-resources" },
];

const anxietyTypes = [
  "Generalized anxiety disorder",
  "Panic disorder", 
  "Social anxiety disorder",
  "Various phobia-related disorders"
];

const informationCards = [
  {
    title: "Free health information",
    description: "Brochures and fact sheets with more information about anxiety disorders, including signs, symptoms, and treatment options. Available for free in print and online.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Science updates", 
    description: "NIMH news about anxiety disorders, including press releases and highlights on the latest research findings.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Statistics",
    description: "Information about the prevalence and treatment of anxiety disorders in the United States.",
    icon: ChartBarIcon,
    bgColor: "bg-blue-500"
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

export default function AnxietyNIMHPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleContactClick = () => {
    setIsContactFormOpen(true);
  };

  const handleCloseContactForm = () => {
    setIsContactFormOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-18 bg-white flex items-center justify-center">
        <div className="text-center">
          <LoadingAnimation className="text-blue-600 scale-150 mb-8" />
          <p className="text-slate-600 text-lg font-medium">Loading Anxiety Disorders Information...</p>
        </div>
      </div>
    );
  }

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
            <span className="text-gray-900 font-medium truncate">Anxiety Disorders</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/anxiety" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Anxiety Disorders</h1>
              
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

            {/* What is anxiety? */}
            <section id="what-is-anxiety" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is anxiety?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Feeling anxious is a normal part of life. Many people worry about things such as health, money, 
                      school, work, or family. But anxiety disorders involve more than occasional worry or fear. For 
                      people with these disorders, anxiety does not go away, is felt in many situations, and can get worse 
                      over time.
                    </p>
                    
                    <p className="text-base leading-relaxed">There are several types of anxiety disorders, including:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {anxietyTypes.map((type) => (
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
                      <p className="text-sm text-gray-600 font-medium">Mental Health Minute: Anxiety</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about anxiety disorders?</h2>
              
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is NIMH studying anxiety disorders?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  About <a href="#" className="text-blue-600 hover:text-blue-800">a third of U.S. adolescents and adults experience an anxiety disorder</a> at 
                  some point in their lives. Anxiety disorder symptoms can interfere with daily life and routine activities, 
                  such as job performance, schoolwork, and relationships. In severe cases, a person might feel intense fear 
                  in common situations, avoid social encounters, or refuse to leave their home.
                </p>
              </div>
            </section>

            {/* NIMH Research */}
            <section id="nimh-research" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How is NIMH research addressing this critical topic?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  NIMH conducts and funds research to examine environmental and genetic factors that contribute to anxiety 
                  disorders. These include studies comparing brain development and biology among people with and without anxiety 
                  disorders. Our supported research also focuses on family and other environmental factors that may influence 
                  the risk for anxiety disorders in infants, children, adolescents, and adults.
                </p>
                
                <p className="text-base leading-relaxed">
                  NIMH-supported research is examining rates and symptoms of anxiety disorders after major life events like 
                  pregnancy or after trauma or illness. Of particular interest are predictors and symptoms of anxiety disorders 
                  among youth, including during the college transition and in relation to social media use.
                </p>
                
                <p className="text-base leading-relaxed">
                  Additionally, NIMH supports research on interventions and treatments for different types of anxiety disorders. 
                  We&apos;re supporting studies that explore the overlap of anxiety with other disorders, such as depression and eating 
                  disorders, as well as how anxiety symptoms, severity, and treatment needs change with age.
                </p>
              </div>
            </section>

            {/* Additional sections placeholders */}
            <section id="clinical-trials" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore clinical trials about anxiety disorders</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Clinical trials are research studies that look at new ways to prevent, detect, or treat diseases and conditions. 
                  To learn more or find a study, visit:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Clinical Trials – Information for Participants</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Clinicaltrials.gov: Current Studies on Anxiety Disorders</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">NIMH Anxiety Disorders Studies for Adults</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">NIMH Anxiety Disorders Studies for Children</a></li>
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
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Anxiety</a></strong> (MedlinePlus): Information, journal articles, and other resources about anxiety disorders collected by the National Library of Medicine
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
              <div className="bg-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-start mb-4">
                  <EnvelopeIcon className="w-8 h-8 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about anxiety disorders</h3>
                  </div>
                </div>
                <button 
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
                  href="https://www.nimh.nih.gov/health/topics/anxiety-disorders"
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

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={handleCloseContactForm} 
      />
    </div>
  );
}