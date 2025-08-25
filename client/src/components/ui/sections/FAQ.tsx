'use client';

import { useState, useEffect } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  HeartIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import {
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from '@heroicons/react/24/solid';

const faqData = [
  {
    id: 1,
    category: 'Getting Started',
    question: 'How do I know if I need therapy?',
    answer:
      "Consider therapy if you're experiencing persistent sadness, anxiety, relationship issues, or difficulty coping with daily life. It's also beneficial for personal growth and self-improvement.",
    detailedAnswer:
      'Therapy can be beneficial for anyone looking to improve their mental health and overall well-being. Some signs that therapy might be helpful include: persistent feelings of sadness or anxiety, difficulty managing stress, relationship problems, major life transitions, trauma or grief, substance use concerns, or simply wanting to develop better coping strategies and self-awareness.',
    icon: QuestionMarkCircleIcon,
    color: 'from-blue-500 to-indigo-600',
    popular: true,
  },
  {
    id: 2,
    category: 'First Session',
    question: 'What should I expect in my first session?',
    answer:
      "Your first session will focus on understanding your concerns, medical history, and goals. We'll discuss treatment options and create a personalized plan for your mental health journey.",
    detailedAnswer:
      "During your first session, we'll spend time getting to know each other and understanding what brought you to therapy. I'll ask about your current concerns, symptoms, personal history, and goals for treatment. We'll discuss confidentiality, treatment approaches that might be helpful, and answer any questions you have about the therapeutic process. This session is also an opportunity for you to see if we're a good fit to work together.",
    icon: ChatBubbleLeftRightIcon,
    color: 'from-emerald-500 to-teal-600',
    popular: true,
  },
  {
    id: 3,
    category: 'Treatment Duration',
    question: 'How long does therapy typically take?',
    answer:
      "The duration varies based on individual needs. Some see improvement in 6-12 sessions, while others benefit from longer-term therapy. We'll regularly assess progress together.",
    detailedAnswer:
      "Treatment length depends on several factors including the nature of your concerns, your goals, and how you respond to therapy. Some people find significant relief in 8-16 sessions for specific issues like anxiety or depression, while others prefer longer-term therapy for deeper personal growth or complex trauma. We'll regularly check in about your progress and adjust our approach as needed.",
    icon: ClockIcon,
    color: 'from-purple-500 to-violet-600',
    popular: false,
  },
  {
    id: 4,
    category: 'Online Services',
    question: 'Do you offer online consultations?',
    answer:
      'Yes, I offer secure video consultations for your convenience. Online therapy can be just as effective as in-person sessions for many conditions.',
    detailedAnswer:
      "I provide secure, HIPAA-compliant video therapy sessions that offer the same quality of care as in-person meetings. Online therapy is particularly convenient for busy schedules, those with mobility concerns, or during times when in-person meetings aren't possible. Research shows that online therapy can be just as effective as traditional face-to-face therapy for many mental health conditions.",
    icon: PhoneIcon,
    color: 'from-orange-500 to-amber-600',
    popular: true,
  },
  {
    id: 5,
    category: 'Locations',
    question: 'Where are you located?',
    answer:
      'Dr. Quadri practices at Innovated Minds in Richardson, Texas (3417 Spectrum Blvd Suite 200) and also serves patients at Yellowstone Boys and Girls Ranch in Montana.',
    detailedAnswer:
      "The main Innovated Minds urgent care clinic is located at 3417 Spectrum Blvd Suite 200, Richardson TX 75082. Dr. Quadri also serves as an attending psychiatrist at Yellowstone Boys and Girls Ranch in Billings, Montana. Additionally, he is affiliated with Texas Psychiatry Association. The Richardson location is easily accessible and designed specifically for urgent psychiatric care needs.",
    icon: CheckCircleIcon,
    color: 'from-rose-500 to-pink-600',
    popular: false,
  },
  {
    id: 6,
    category: 'Experience',
    question: 'What is Dr. Quadri\'s background and experience?',
    answer:
      'Dr. Quadri has 18+ years of psychiatric experience, including fellowship training in child and adolescent psychiatry and over 11 years as a medical director.',
    detailedAnswer:
      "Dr. Syed M Quadri completed his Adult Psychiatry Residency (2001-2004) and Child & Adolescent Psychiatry Fellowship (2004-2006) at the University of Kansas School of Medicine. He served as Medical Director of inpatient and outpatient adolescent services at THR Springwood for over 11 years (2006-2018). He founded Innovated Minds in 2017, pioneering the psychiatric urgent care model in Texas, and has been serving at Yellowstone Boys and Girls Ranch since 2018.",
    icon: ShieldCheckIcon,
    color: 'from-cyan-500 to-blue-600',
    popular: true,
  },
  {
    id: 7,
    category: 'Urgent Care',
    question: 'What makes this different from regular psychiatry appointments?',
    answer:
      'Unlike traditional psychiatry with weeks-to-months wait times, our urgent care model provides same-day or next-day access when you need mental health support most.',
    detailedAnswer:
      "Traditional psychiatric appointments often require waiting weeks or months, which can be problematic during mental health crises. Innovated Minds bridges the gap between your regular doctor and emergency room visits. We provide immediate access to comprehensive psychiatric evaluation, medication management, and therapeutic support. This model is particularly valuable during acute anxiety, depression episodes, medication adjustments, or when life circumstances require prompt psychiatric intervention.",
    icon: HeartIcon,
    color: 'from-indigo-500 to-purple-600',
    popular: false,
  },
  {
    id: 8,
    category: 'Emergency',
    question: 'What if I have a mental health emergency?',
    answer:
      'For immediate mental health crises, call 911 or go to your nearest emergency room. For urgent but non-emergency concerns, our urgent care model can see you within 24 hours.',
    detailedAnswer:
      'If you are having thoughts of harming yourself or others, or experiencing a severe mental health crisis, please call 911 or go to your nearest emergency room immediately. For urgent mental health concerns that are not life-threatening - such as severe anxiety, depression episodes, medication issues, or acute stress - our psychiatric urgent care can typically see you the same day or within 24 hours. You can call 972-478-0322 or walk in during business hours.',
    icon: PhoneIcon,
    color: 'from-red-500 to-pink-600',
    popular: true,
  },
];

const categories = [
  'All',
  'Urgent Care',
  'Scheduling',
  'Services',
  'Locations',
  'Experience',
  'Emergency',
];

const quickStats = [
  {
    icon: ClockIcon,
    label: 'Appointment Wait Time',
    value: '1-2 Days',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: PhoneIcon,
    label: 'Urgent Care Hours',
    value: 'M-F 5-8pm',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: HeartIcon,
    label: 'Age Groups Served',
    value: 'All Ages',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: CheckCircleIcon,
    label: 'Years Experience',
    value: '18+',
    color: 'from-rose-500 to-pink-600',
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [showDetailed, setShowDetailed] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleDetailed = (id: number) => {
    setShowDetailed((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqData.filter((faq) => faq.popular);

  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5' />
        <div
          className='w-full h-full bg-repeat opacity-30'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 w-24 h-24 bg-blue-200/20 rounded-full blur-xl animate-pulse' />
        <div className='absolute top-40 right-20 w-32 h-32 bg-indigo-200/15 rounded-full blur-2xl animate-pulse delay-1000' />
        <div className='absolute bottom-20 left-20 w-28 h-28 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-2000' />
        <div className='absolute bottom-40 right-10 w-20 h-20 bg-emerald-200/15 rounded-full blur-2xl animate-pulse delay-3000' />
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header */}
        <div
          className={`text-center mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-top duration-1000'
              : 'opacity-0'
          }`}
        >
          <div className='inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg'>
            <QuestionMarkCircleIconSolid className='w-5 h-5 mr-2' />
            Frequently Asked Questions
          </div>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight'>
            Get Your{' '}
            <span className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Questions Answered
            </span>
          </h2>
          <p className='text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed'>
            Find answers about our psychiatric urgent care services, same-day appointments, and what to expect from{' '}
            <span className='text-blue-600 font-semibold'>
              Dr. Quadri's innovative approach
            </span>
          </p>
        </div>

        {/* Quick Stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-300'
              : 'opacity-0'
          }`}
        >
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200/50 hover:border-slate-300/50 text-center group hover:scale-105'
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className='w-6 h-6' />
              </div>
              <div className='text-2xl font-bold text-slate-800 mb-2'>
                {stat.value}
              </div>
              <div className='text-sm text-slate-600'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div
          className={`mb-12 ${
            isVisible
              ? 'animate-in slide-in-from-left duration-1000 delay-500'
              : 'opacity-0'
          }`}
        >
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-slate-200/50'>
            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              {/* Search Bar */}
              <div className='relative flex-1'>
                <MagnifyingGlassIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  placeholder='Search questions...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                />
              </div>

              {/* Category Filter */}
              <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Questions */}
        {selectedCategory === 'All' && searchTerm === '' && (
          <div
            className={`mb-16 ${
              isVisible
                ? 'animate-in slide-in-from-right duration-1000 delay-700'
                : 'opacity-0'
            }`}
          >
            <div className='text-center mb-8'>
              <h3 className='text-2xl md:text-3xl font-bold text-slate-900 mb-4'>
                Most Popular Questions
              </h3>
              <p className='text-lg text-slate-600'>
                Quick answers to our most frequently asked questions
              </p>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              {popularFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className='group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200/50 hover:border-blue-200/50 hover:scale-[1.02]'
                >
                  <div className='flex items-start space-x-4'>
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r ${faq.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      <faq.icon className='w-6 h-6' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-lg text-slate-800 mb-2 group-hover:text-blue-700 transition-colors'>
                        {faq.question}
                      </h4>
                      <p className='text-slate-600 text-sm leading-relaxed'>
                        {faq.answer}
                      </p>
                      <div className='mt-4'>
                        <span className='inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All FAQ Items */}
        <div
          className={`mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-900'
              : 'opacity-0'
          }`}
        >
          <div className='text-center mb-8'>
            <h3 className='text-2xl md:text-3xl font-bold text-slate-900 mb-4'>
              {searchTerm
                ? `Search Results (${filteredFAQs.length})`
                : 'All Questions'}
            </h3>
            {!searchTerm && (
              <p className='text-lg text-slate-600'>
                Comprehensive answers to help you understand our services
              </p>
            )}
          </div>

          <div className='space-y-4'>
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className='group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200/50 hover:border-blue-200/50 overflow-hidden'
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className='w-full p-6 text-left hover:bg-blue-50/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4 flex-1'>
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r ${faq.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        <faq.icon className='w-6 h-6' />
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors'>
                          {faq.question}
                        </h3>
                        <div className='flex items-center space-x-3'>
                          <span className='text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                            {faq.category}
                          </span>
                          {faq.popular && (
                            <span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full'>
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex-shrink-0 ml-4'>
                      {openItems.includes(faq.id) ? (
                        <ChevronUpIcon className='w-6 h-6 text-blue-500 transform transition-transform duration-300' />
                      ) : (
                        <ChevronDownIcon className='w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors duration-300' />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openItems.includes(faq.id)
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='px-6 pb-6 border-t border-slate-200/50'>
                    <div className='pt-4'>
                      <div className='text-slate-700 leading-relaxed mb-4'>
                        {showDetailed.includes(faq.id)
                          ? faq.detailedAnswer
                          : faq.answer}
                      </div>

                      {faq.detailedAnswer && (
                        <button
                          onClick={() => toggleDetailed(faq.id)}
                          className='inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300'
                        >
                          {showDetailed.includes(faq.id)
                            ? 'Show Less'
                            : 'Show More Details'}
                          <ChevronDownIcon
                            className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                              showDetailed.includes(faq.id) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className='text-center py-12'>
              <QuestionMarkCircleIcon className='w-16 h-16 text-slate-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-slate-600 mb-2'>
                No questions found
              </h3>
              <p className='text-slate-500'>
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div
          className={`text-center ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-1100'
              : 'opacity-0'
          }`}
        >
          <div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-20'>
              <div
                className='w-full h-full bg-repeat'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className='relative z-10'>
              <h3 className='text-3xl md:text-4xl font-bold mb-4'>
                Still Have Questions?
              </h3>
              <p className='text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
                Need immediate psychiatric care? Call 972-478-0322 or visit our urgent care clinic for same-day appointments
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <a
                  href='tel:972-478-0322'
                  className='group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  <PhoneIcon className='w-5 h-5 mr-2' />
                  Call 972-478-0322
                  <ChevronDownIcon className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform rotate-[-90deg]' />
                </a>
                <a
                  href='/about'
                  className='inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20'
                >
                  Learn About Dr. Quadri
                </a>
              </div>

              {/* Trust Indicators */}
              <div className='mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80'>
                <div className='flex items-center'>
                  <ClockIcon className='w-5 h-5 mr-2' />
                  Same Day Appointments
                </div>
                <div className='flex items-center'>
                  <ShieldCheckIcon className='w-5 h-5 mr-2' />
                  18+ Years Experience
                </div>
                <div className='flex items-center'>
                  <CheckCircleIconSolid className='w-5 h-5 mr-2' />
                  Walk-ins Welcome
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
