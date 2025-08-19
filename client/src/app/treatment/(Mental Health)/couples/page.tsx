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
import ContactForm from '@/components/ui/primitives/ContactForm';

// Removed - using TreatmentSidebar component
// const healthTopics = [
//   { name: "Anxiety Disorders", href: "/treatment/anxiety" },
//   { name: "Attention-Deficit/Hyperactivity Disorder (ADHD)", href: "/treatment/adhd" },
//   { name: "Autism Spectrum Disorder", href: "/treatment/autism" },
//   { name: "Bipolar Disorder", href: "/treatment/bipolar" },
//   { name: "Borderline Personality Disorder", href: "/treatment/borderline" },
//   { name: "COVID-19 and Mental Health", href: "/treatment/covid-mental-health" },
//   { name: "Couples Therapy", href: "/treatment/couples", active: true },
//   { name: "Depression", href: "/treatment/depression" },
//   { name: "Disruptive Mood Dysregulation Disorder (DMDD)", href: "/treatment/dmdd" },
//   { name: "Eating Disorders", href: "/treatment/eating-disorders" },
//   { name: "HIV and Mental Health", href: "/treatment/hiv-mental-health" },
//   { name: "Obsessive-Compulsive Disorder (OCD)", href: "/treatment/ocd" },
//   { name: "Schizophrenia", href: "/treatment/schizophrenia" },
//   { name: "Stress Management", href: "/treatment/stress" },
//   { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
//   { name: "Trauma Therapy", href: "/treatment/trauma" },
//   { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd" },
// ];

const onThisPageItems = [
  { name: "What is couples therapy?", href: "#what-is-couples-therapy" },
  { name: "Where can I learn more about couples therapy?", href: "#learn-more" },
  { name: "Why is couples therapy important?", href: "#why-important" },
  { name: "How does couples therapy work?", href: "#how-it-works" },
  { name: "Explore couples therapy approaches", href: "#therapy-approaches" },
  { name: "Share outreach materials about couples therapy", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional resources", href: "#additional-resources" },
];

const relationshipIssues = [
  "Communication problems",
  "Trust and infidelity issues", 
  "Conflict resolution difficulties",
  "Intimacy and sexual concerns",
  "Financial disagreements",
  "Parenting differences"
];

const informationCards = [
  {
    title: "Free health information",
    description: "Brochures and fact sheets with more information about couples therapy, including relationship skills and communication strategies. Available for free in print and online.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Science updates", 
    description: "Latest news about couples therapy research, including press releases and highlights on relationship intervention effectiveness and outcomes.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Statistics",
    description: "Information about relationship satisfaction, divorce rates, and the effectiveness of couples therapy interventions in the United States.",
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

export default function CouplesTherapyPage() {
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
            <Link href="/treatment" className="text-blue-500 hover:text-blue-700">
              Treatment
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">Couples Therapy</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/couples" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Couples Therapy</h1>
              
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

            {/* What is couples therapy? */}
            <section id="what-is-couples-therapy" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is couples therapy?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Couples therapy, also known as marriage counseling or relationship therapy, is a form of psychotherapy 
                      that helps partners improve their relationship satisfaction, communication skills, and resolve conflicts. 
                      It provides a safe space for couples to address issues and strengthen their emotional connection.
                    </p>
                    
                    <p className="text-base leading-relaxed">Couples therapy can address various relationship challenges, including:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {relationshipIssues.map((issue) => (
                        <li key={issue} className="text-base">
                          <a href="#" className="text-blue-600 hover:text-blue-800">{issue}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Mental Health Minute: Couples Therapy</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about couples therapy?</h2>
              
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

            {/* Why is couples therapy important */}
            <section id="why-important" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why is couples therapy important?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Healthy relationships are fundamental to mental and physical well-being. Research shows that 
                  <a href="#" className="text-blue-600 hover:text-blue-800"> couples therapy is effective</a> for 
                  70-80% of couples who participate, leading to improved relationship satisfaction and communication skills.
                </p>
                <p className="text-base leading-relaxed">
                  Relationship distress can contribute to depression, anxiety, and other mental health issues. Couples 
                  therapy not only helps improve the relationship but can also positively impact individual mental health 
                  and overall quality of life for both partners.
                </p>
              </div>
            </section>

            {/* How does couples therapy work */}
            <section id="how-it-works" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How does couples therapy work?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Couples therapy typically involves both partners meeting with a trained therapist in a neutral, 
                  supportive environment. The therapist helps couples identify patterns of communication and behavior 
                  that may be contributing to relationship problems.
                </p>
                
                <p className="text-base leading-relaxed">
                  Sessions focus on improving communication skills, developing conflict resolution strategies, 
                  rebuilding trust and intimacy, and strengthening the emotional bond between partners. Therapists 
                  may assign homework exercises to practice new skills outside of sessions.
                </p>
                
                <p className="text-base leading-relaxed">
                  The therapy process is collaborative, with both partners actively participating in identifying 
                  goals and working toward positive changes in their relationship dynamics.
                </p>
              </div>
            </section>

            {/* Couples therapy approaches */}
            <section id="therapy-approaches" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore couples therapy approaches</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  There are several evidence-based approaches to couples therapy that have shown effectiveness:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Emotionally Focused Therapy (EFT)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Gottman Method Couples Therapy</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Cognitive Behavioral Couples Therapy (CBCT)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Imago Relationship Therapy</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Solution-Focused Brief Therapy (SFBT)</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Narrative Therapy for Couples</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Integrative Behavioral Couples Therapy (IBCT)</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  When looking for a couples therapist, it&apos;s important to find someone who is licensed and has 
                  specialized training in relationship therapy. Many therapists offer initial consultations to help 
                  you determine if they&apos;re a good fit for your needs.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  You can find qualified couples therapists through professional directories, referrals from your 
                  healthcare provider, or mental health organizations. Some insurance plans cover couples therapy, 
                  so check with your provider about coverage options.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  If you&apos;re experiencing domestic violence or abuse, please contact the National Domestic Violence 
                  Hotline at 1-800-799-7233 for immediate support and safety planning.
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">American Association for Marriage and Family Therapy (AAMFT)</a></strong>: Professional organization with therapist directory and educational resources
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">The Gottman Institute</a></strong>: Research-based resources for relationship improvement and therapist training
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">International Centre for Excellence in EFT (ICEEFT)</a></strong>: Resources for Emotionally Focused Therapy
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">National Domestic Violence Hotline</a></strong>: 24/7 support for those experiencing domestic violence: 1-800-799-7233
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about couples therapy</h3>
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
                  Find qualified couples therapists and relationship resources
                </p>
                <a
                  href="https://www.aamft.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Visit AAMFT
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
