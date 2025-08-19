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
//   { name: "Addiction Recovery", href: "/treatment/addiction" },
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
//   { name: "Life Transitions", href: "/treatment/life-transitions", active: true },
//   { name: "Obsessive-Compulsive Disorder (OCD)", href: "/treatment/ocd" },
//   { name: "Schizophrenia", href: "/treatment/schizophrenia" },
//   { name: "Sleep Disorders", href: "/treatment/sleep" },
//   { name: "Stress Management", href: "/treatment/stress" },
//   { name: "Suicide Prevention", href: "/treatment/suicide-prevention" },
//   { name: "Trauma Therapy", href: "/treatment/trauma" },
//   { name: "Traumatic Events and Post-Traumatic Stress Disorder (PTSD)", href: "/treatment/ptsd" },
// ];

const onThisPageItems = [
  { name: "What are life transitions?", href: "#what-are-life-transitions" },
  { name: "Where can I learn more about life transitions?", href: "#learn-more" },
  { name: "Why do life transitions affect mental health?", href: "#why-affect-mental-health" },
  { name: "How can therapy help with life transitions?", href: "#how-therapy-helps" },
  { name: "Explore life transition support", href: "#support-options" },
  { name: "Share resources about life transitions", href: "#share-materials" },
  { name: "Find help and support", href: "#find-help" },
  { name: "Additional resources", href: "#additional-resources" },
];

const lifeTransitions = [
  "Career changes and job loss",
  "Relationship changes (marriage, divorce, breakups)", 
  "Major moves and relocation",
  "Educational transitions (graduation, starting school)",
  "Health challenges and chronic illness",
  "Loss and grief (death of loved ones, pets)",
  "Parenthood and empty nest syndrome",
  "Retirement and aging",
  "Financial changes and economic stress"
];

const informationCards = [
  {
    title: "Transition guidance",
    description: "Comprehensive resources and strategies for navigating major life changes, including coping skills, adaptation techniques, and building resilience during transitions.",
    icon: BookOpenIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Research insights", 
    description: "Latest research on life transitions, psychological adaptation, and evidence-based approaches to supporting individuals through significant life changes.",
    icon: NewspaperIcon,
    bgColor: "bg-blue-500"
  },
  {
    title: "Transition statistics",
    description: "Data on how life transitions impact mental health, stress levels, and overall well-being, along with information about successful adaptation strategies.",
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

export default function LifeTransitionsPage() {

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
            <span className="text-gray-900 font-medium truncate">Life Transitions</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/life-transitions" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Life Transitions</h1>
              
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

            {/* What are life transitions? */}
            <section id="what-are-life-transitions" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What are life transitions?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Life transitions are significant changes or shifts that occur throughout our lives, requiring us 
                      to adapt to new circumstances, roles, or environments. These changes can be planned or unexpected, 
                      positive or challenging, and often involve a period of adjustment and adaptation.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Even positive transitions can create stress and emotional challenges as we navigate new situations 
                      and adjust our sense of identity, routines, and relationships.
                    </p>
                    
                    <p className="text-base leading-relaxed">Common life transitions include:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      {lifeTransitions.map((transition) => (
                        <li key={transition} className="text-base">
                          <a href="#" className="text-blue-600 hover:text-blue-800">{transition}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <BeakerIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Navigating Life Changes</p>
                      <p className="text-xs text-gray-500 mt-1">Video content placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Where can I learn more */}
            <section id="learn-more" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Where can I learn more about life transitions?</h2>
              
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

            {/* Why do life transitions affect mental health */}
            <section id="why-affect-mental-health" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why do life transitions affect mental health?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Life transitions can significantly impact mental health because they often involve loss, uncertainty, 
                  and the need to develop new coping strategies. <a href="#" className="text-blue-600 hover:text-blue-800">Research shows</a> that 
                  transitions can trigger stress responses and may lead to symptoms of anxiety, depression, or adjustment disorders.
                </p>
                <p className="text-base leading-relaxed">
                  Even positive changes can be stressful because they require us to let go of familiar patterns and 
                  adapt to new roles, relationships, or environments. The uncertainty and adjustment period can be 
                  emotionally challenging, regardless of whether the change was wanted or unwanted.
                </p>
              </div>
            </section>

            {/* How can therapy help with life transitions */}
            <section id="how-therapy-helps" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How can therapy help with life transitions?</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Therapy can provide valuable support during life transitions by offering a safe space to process 
                  emotions, develop coping strategies, and navigate the challenges of change. A trained therapist can 
                  help individuals understand their reactions to change and develop healthy adaptation strategies.
                </p>
                
                <p className="text-base leading-relaxed">
                  Therapeutic approaches often focus on building resilience, improving emotional regulation, and 
                  developing problem-solving skills. Therapy can also help individuals identify their strengths and 
                  resources, process grief or loss associated with change, and create meaning from their experiences.
                </p>
                
                <p className="text-base leading-relaxed">
                  Support during transitions can help prevent the development of more serious mental health issues and 
                  can improve overall adjustment and well-being. Many people find that working with a therapist during 
                  transitions leads to personal growth and increased self-awareness.
                </p>
              </div>
            </section>

            {/* Life transition support */}
            <section id="support-options" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore life transition support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Support options for life transitions include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Individual counseling and therapy</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Support groups for specific transitions</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Career counseling and coaching</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Grief counseling and bereavement support</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Couples and family therapy</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Stress management and coping skills training</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Mindfulness and meditation practices</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Life coaching and goal setting</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Community resources and social support</a></li>
                </ul>
              </div>
            </section>

            <section id="find-help" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find help and support</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  If you&apos;re struggling with a life transition, remember that seeking support is a sign of strength, 
                  not weakness. Professional counselors, therapists, and support groups can provide valuable guidance 
                  and tools for navigating change successfully.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  Many communities offer support groups for specific types of transitions, such as divorce support 
                  groups, career transition workshops, or grief counseling groups. Online resources and virtual 
                  support groups are also available for those who prefer remote assistance.
                </p>
                <p className="text-base leading-relaxed mt-4">
                  Your primary care physician, employee assistance programs, or local mental health centers can 
                  provide referrals to appropriate resources in your area. Many insurance plans cover mental health 
                  services, including counseling for adjustment and life transition issues.
                </p>
              </div>
            </section>

            <section id="additional-resources" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional resources</h2>
              <div className="text-gray-600">
                <ul className="space-y-2">
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Psychology Today</a></strong>: Find therapists specializing in life transitions and adjustment issues
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">National Alliance on Mental Illness (NAMI)</a></strong>: Support and resources for mental health during life changes
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">American Counseling Association</a></strong>: Professional resources and information about counseling services
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">Crisis Text Line</a></strong>: Text HOME to 741741 for free, confidential crisis support
                  </li>
                  <li className="text-base">
                    <strong><a href="#" className="text-blue-600 hover:text-blue-800">211</a></strong>: Dial 2-1-1 for local community resources and support services
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
                    <h3 className="font-semibold text-sm leading-tight">Sign up for email updates about life transitions</h3>
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
                  Transition Support
                </h3>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  Find professional counselors and support resources for life changes
                </p>
                <a
                  href="https://www.psychologytoday.com/us/therapists"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium text-sm"
                >
                  Find a Therapist
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
