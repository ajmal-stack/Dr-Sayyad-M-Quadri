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
  HeartIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import ContactForm from '@/components/ui/primitives/ContactForm';

const onThisPageItems = [
  { name: "What is diabetes?", href: "#what-is-diabetes" },
  { name: "Types of diabetes", href: "#types-of-diabetes" },
  { name: "Diabetes management strategies", href: "#management-strategies" },
  { name: "Blood sugar monitoring", href: "#blood-sugar-monitoring" },
  { name: "Nutrition and diet planning", href: "#nutrition-diet" },
  { name: "Exercise and physical activity", href: "#exercise-activity" },
  { name: "Medication management", href: "#medication-management" },
  { name: "Preventing complications", href: "#preventing-complications" },
  { name: "Find diabetes care", href: "#find-care" },
];

const diabetesTypes = [
  "Type 1 diabetes - Autoimmune condition requiring insulin",
  "Type 2 diabetes - Most common form, often lifestyle-related", 
  "Gestational diabetes - Develops during pregnancy",
  "Prediabetes - Higher than normal blood sugar levels"
];

const managementStrategies = [
  {
    title: "Blood glucose monitoring",
    description: "Regular monitoring helps track how food, activity, and medications affect your blood sugar levels.",
    icon: ChartBarIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Healthy eating plan", 
    description: "Working with a dietitian to create a personalized meal plan that helps manage blood sugar levels.",
    icon: BookOpenIcon,
    bgColor: "bg-teal-500"
  },
  {
    title: "Regular physical activity",
    description: "Exercise helps lower blood sugar levels and improves insulin sensitivity for better diabetes management.",
    icon: HeartIcon,
    bgColor: "bg-teal-500"
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

export default function DiabetesManagementPage() {
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
          <LoadingAnimation className="text-teal-600 scale-150 mb-8" />
          <p className="text-slate-600 text-lg font-medium">Loading Diabetes Management Information...</p>
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
            <span className="text-gray-900 font-medium truncate">Diabetes Management</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <TreatmentSidebar currentPage="/treatment/diabetes" />

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Diabetes Management</h1>
              
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

            {/* What is diabetes? */}
            <section id="what-is-diabetes" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is diabetes?</h2>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-base leading-relaxed">
                      Diabetes is a group of metabolic disorders characterized by high blood glucose (blood sugar) levels. 
                      This occurs when your body either doesn't make enough insulin, can't use insulin effectively, or both.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      Insulin is a hormone that helps glucose get into your cells to be used for energy. When this process 
                      doesn't work properly, glucose builds up in your blood instead of being used by your cells.
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      With proper management, people with diabetes can live healthy, active lives and prevent or delay complications.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-teal-100 rounded-lg p-4 aspect-video flex items-center justify-center border">
                    <div className="text-center">
                      <ChartBarIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-teal-800 font-medium">Blood Sugar Monitoring</p>
                      <p className="text-xs text-teal-600 mt-1">Track your levels daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Types of diabetes */}
            <section id="types-of-diabetes" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of diabetes</h2>
              
              <div className="prose prose-lg text-gray-600 space-y-4 mb-6">
                <p className="text-base leading-relaxed">
                  There are several types of diabetes, each with different causes and management approaches:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  {diabetesTypes.map((type) => (
                    <li key={type} className="text-base">
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Management strategies */}
            <section id="management-strategies" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Diabetes management strategies</h2>
              
              <div className="grid gap-6 mb-8">
                {managementStrategies.map((strategy) => (
                  <div key={strategy.title} className="flex items-start space-x-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className={`${strategy.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <strategy.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{strategy.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{strategy.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Successful diabetes management requires a comprehensive approach that includes medical care, 
                  self-management education, and lifestyle modifications. Working closely with your healthcare team 
                  is essential for developing an effective management plan.
                </p>
              </div>
            </section>

            {/* Blood sugar monitoring */}
            <section id="blood-sugar-monitoring" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Blood sugar monitoring</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-base leading-relaxed">
                  Regular blood glucose monitoring is a cornerstone of diabetes management. It helps you understand how 
                  food, physical activity, medications, stress, and illness affect your blood sugar levels.
                </p>
                
                <p className="text-base leading-relaxed">
                  Your healthcare team will help you determine how often to check your blood sugar and what your target 
                  ranges should be. Modern continuous glucose monitors (CGMs) can provide real-time data and trends.
                </p>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-teal-800 mb-2">Target Blood Sugar Levels (for most adults)</h4>
                  <ul className="text-teal-700 text-sm space-y-1">
                    <li>• Before meals: 80-130 mg/dL</li>
                    <li>• 2 hours after meals: Less than 180 mg/dL</li>
                    <li>• A1C: Less than 7%</li>
                  </ul>
                  <p className="text-xs text-teal-600 mt-2">*Targets may vary based on individual circumstances</p>
                </div>
              </div>
            </section>

            {/* Nutrition and diet */}
            <section id="nutrition-diet" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition and diet planning</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  A healthy eating plan is crucial for diabetes management. Key principles include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li>Eating regular, balanced meals</li>
                  <li>Controlling portion sizes</li>
                  <li>Choosing complex carbohydrates over simple sugars</li>
                  <li>Including plenty of fiber from vegetables and whole grains</li>
                  <li>Limiting saturated and trans fats</li>
                  <li>Staying hydrated with water</li>
                </ul>
                <p className="text-base leading-relaxed">
                  Consider working with a registered dietitian who specializes in diabetes to create a personalized meal plan 
                  that fits your lifestyle, preferences, and health goals.
                </p>
              </div>
            </section>

            {/* Exercise and activity */}
            <section id="exercise-activity" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Exercise and physical activity</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Regular physical activity offers many benefits for people with diabetes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base mb-4">
                  <li>Lowers blood glucose levels</li>
                  <li>Improves insulin sensitivity</li>
                  <li>Helps with weight management</li>
                  <li>Reduces risk of heart disease</li>
                  <li>Improves mood and energy levels</li>
                </ul>
                <p className="text-base leading-relaxed">
                  Aim for at least 150 minutes of moderate-intensity aerobic activity per week, plus strength training 
                  exercises twice weekly. Always check your blood sugar before, during, and after exercise.
                </p>
              </div>
            </section>

            {/* Medication management */}
            <section id="medication-management" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Medication management</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Many people with diabetes require medications to help manage their blood sugar levels. Common medications include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li><strong>Insulin</strong> - Essential for Type 1 diabetes, sometimes needed for Type 2</li>
                  <li><strong>Metformin</strong> - Often first-line treatment for Type 2 diabetes</li>
                  <li><strong>Sulfonylureas</strong> - Help the pancreas produce more insulin</li>
                  <li><strong>SGLT2 inhibitors</strong> - Help remove excess glucose through urine</li>
                  <li><strong>GLP-1 agonists</strong> - Help regulate blood sugar and may aid weight loss</li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  Work with your healthcare provider to find the right medication regimen for you. Never adjust or stop 
                  medications without medical supervision.
                </p>
              </div>
            </section>

            {/* Preventing complications */}
            <section id="preventing-complications" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preventing complications</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed mb-4">
                  Good diabetes management can prevent or delay complications. Important preventive measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Regular eye exams to screen for diabetic retinopathy</li>
                  <li>Annual kidney function tests</li>
                  <li>Daily foot care and regular foot exams</li>
                  <li>Blood pressure and cholesterol monitoring</li>
                  <li>Dental care and regular cleanings</li>
                  <li>Staying up to date with vaccinations</li>
                </ul>
              </div>
            </section>

            <section id="find-care" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find diabetes care</h2>
              <div className="text-gray-600">
                <p className="text-base leading-relaxed">
                  Building a strong healthcare team is essential for effective diabetes management. Your team may include 
                  an endocrinologist, certified diabetes educator, registered dietitian, ophthalmologist, podiatrist, 
                  and other specialists as needed.
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
              <div className="bg-teal-600 rounded-lg p-6 text-white">
                <div className="flex items-start mb-4">
                  <EnvelopeIcon className="w-8 h-8 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Get diabetes management tips and updates</h3>
                  </div>
                </div>
                <button 
                  className="w-full bg-white text-teal-600 px-4 py-2 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>

              {/* Visit ADA Link */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h3 className="font-semibold text-teal-800 mb-3 flex items-center text-sm">
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  American Diabetes Association
                </h3>
                <p className="text-sm text-teal-700 mb-3 leading-relaxed">
                  Get comprehensive diabetes information and resources from the leading diabetes organization
                </p>
                <a
                  href="https://www.diabetes.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium text-sm"
                >
                  Visit ADA Website
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
