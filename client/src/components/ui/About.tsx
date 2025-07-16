'use client';

import { useState } from 'react';
import {
  CheckCircleIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon,
  HeartIcon,
  TrophyIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  BeakerIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface Qualification {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface Specialization {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  experience: string;
}

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(
    null
  );

  const stats = [
    {
      number: '5000+',
      label: 'Patients Helped',
      color: 'text-blue-600',
      description:
        'Successfully treated patients across various mental health conditions',
    },
    {
      number: '15+',
      label: 'Years Experience',
      color: 'text-indigo-600',
      description:
        'Dedicated years of practice in psychiatric care and mental health',
    },
    {
      number: '98%',
      label: 'Success Rate',
      color: 'text-emerald-600',
      description: 'Patient satisfaction and treatment success rate',
    },
    {
      number: '24/7',
      label: 'Support Available',
      color: 'text-purple-600',
      description: 'Round-the-clock emergency support and consultation',
    },
  ];

  const achievements: Achievement[] = [
    {
      year: '2024',
      title: 'Mental Health Innovation Award',
      description:
        'Recognized for innovative approaches in digital mental health therapy',
      icon: TrophyIcon,
      color: 'text-yellow-600',
    },
    {
      year: '2023',
      title: 'Published "Mind Matters" Book',
      description: 'Bestselling book on modern mental health approaches',
      icon: BookOpenIcon,
      color: 'text-blue-600',
    },
    {
      year: '2022',
      title: 'Excellence in Patient Care',
      description: 'Award for outstanding patient care and treatment outcomes',
      icon: HeartIcon,
      color: 'text-red-600',
    },
    {
      year: '2021',
      title: 'Research Publication',
      description: 'Published groundbreaking research on anxiety treatment',
      icon: BeakerIcon,
      color: 'text-green-600',
    },
    {
      year: '2020',
      title: 'Board Certification',
      description: 'Achieved board certification in psychiatry',
      icon: ShieldCheckIcon,
      color: 'text-indigo-600',
    },
  ];

  const qualifications: Qualification[] = [
    {
      degree: 'MD in Psychiatry',
      institution: 'Harvard Medical School',
      year: '2018',
      description:
        'Specialized in clinical psychiatry and mental health disorders',
    },
    {
      degree: 'Residency in Psychiatry',
      institution: 'Johns Hopkins Hospital',
      year: '2015-2018',
      description: 'Comprehensive training in psychiatric care and treatment',
    },
    {
      degree: 'Bachelor of Medicine',
      institution: 'Stanford University',
      year: '2015',
      description: 'Foundation in medical sciences and clinical practice',
    },
  ];

  const specializations: Specialization[] = [
    {
      name: 'Anxiety Disorders',
      description: 'Comprehensive treatment for various anxiety conditions',
      icon: HeartIcon,
      color: 'text-blue-600',
      experience: '10+ years',
    },
    {
      name: 'Depression',
      description: 'Evidence-based approaches for depression management',
      icon: LightBulbIcon,
      color: 'text-indigo-600',
      experience: '12+ years',
    },
    {
      name: 'Trauma Therapy',
      description: 'EMDR and trauma-focused cognitive behavioral therapy',
      icon: ShieldCheckIcon,
      color: 'text-green-600',
      experience: '8+ years',
    },
    {
      name: 'Relationship Counseling',
      description: 'Couples and family therapy for relationship issues',
      icon: UserGroupIcon,
      color: 'text-purple-600',
      experience: '9+ years',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserGroupIcon },
    { id: 'achievements', label: 'Achievements', icon: TrophyIcon },
    { id: 'qualifications', label: 'Qualifications', icon: AcademicCapIcon },
    { id: 'specializations', label: 'Specializations', icon: BeakerIcon },
  ];

  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/50'></div>
        <div className='absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6'>
            <CheckCircleIcon className='w-4 h-4 mr-2' />
            About Dr. Quadri
          </div>
          <h2 className='text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6'>
            Dedicated to Your{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Mental Wellness
            </span>
          </h2>
          <p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
            Combining clinical expertise with genuine compassion to help
            individuals navigate their mental health journey
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className='flex flex-wrap justify-center gap-2 mb-12'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border border-blue-100 hover:border-blue-200'
              }`}
            >
              <tab.icon className='w-4 h-4 mr-2' />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left Content */}
            <div className='space-y-8'>
              <div className='space-y-6 text-lg text-slate-600 leading-relaxed'>
                <p>
                  With over a decade of experience in psychiatric care, Dr.
                  Sayyed M Quadri combines clinical expertise with genuine
                  compassion to help individuals navigate their mental health
                  journey.
                </p>
                <p>
                  Specializing in anxiety, depression, trauma, and relationship
                  issues, Dr. Quadri uses evidence-based approaches tailored to
                  each person&apos;s unique needs and circumstances.
                </p>
                <p>
                  His holistic approach integrates traditional psychiatric
                  methods with modern therapeutic techniques, ensuring
                  comprehensive care for every patient.
                </p>
              </div>

              {/* Credentials */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-green-100 rounded-xl mr-4'>
                    <CheckCircleIcon className='w-5 h-5 text-green-600' />
                  </div>
                  <span className='font-semibold'>
                    Board Certified Psychiatrist
                  </span>
                </div>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-blue-100 rounded-xl mr-4'>
                    <ClockIcon className='w-5 h-5 text-blue-600' />
                  </div>
                  <span className='font-semibold'>15+ Years Experience</span>
                </div>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-indigo-100 rounded-xl mr-4'>
                    <BookOpenIcon className='w-5 h-5 text-indigo-600' />
                  </div>
                  <span className='font-semibold'>Published Author</span>
                </div>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-yellow-100 rounded-xl mr-4'>
                    <TrophyIcon className='w-5 h-5 text-yellow-600' />
                  </div>
                  <span className='font-semibold'>Award Winner</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <a
                  href='/about'
                  className='inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  Learn More About Dr. Quadri
                  <ArrowRightIcon className='w-5 h-5 ml-2' />
                </a>
                <a
                  href='/books'
                  className='inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200'
                >
                  View Publications
                </a>
              </div>
            </div>

            {/* Right Stats Card */}
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-3xl opacity-20 transform rotate-6'></div>
              <div className='relative bg-white p-8 rounded-3xl shadow-2xl'>
                <div className='grid grid-cols-2 gap-6'>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className='text-center group cursor-pointer'
                    >
                      <div
                        className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.number}
                      </div>
                      <div className='text-slate-600 font-medium mb-2'>
                        {stat.label}
                      </div>
                      <div className='text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        {stat.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className='max-w-4xl mx-auto'>
            <div className='space-y-6'>
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    selectedAchievement === achievement.year
                      ? 'ring-2 ring-blue-500/30 scale-105'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedAchievement(
                      selectedAchievement === achievement.year
                        ? null
                        : achievement.year
                    )
                  }
                >
                  <div className='flex items-start gap-6'>
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 ${achievement.color}`}
                    >
                      <achievement.icon className='w-8 h-8' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-4 mb-3'>
                        <span className='text-2xl font-bold text-slate-900'>
                          {achievement.title}
                        </span>
                        <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold'>
                          {achievement.year}
                        </span>
                      </div>
                      <p className='text-slate-600 leading-relaxed'>
                        {achievement.description}
                      </p>
                      {selectedAchievement === achievement.year && (
                        <div className='mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100'>
                          <p className='text-sm text-slate-700'>
                            This achievement represents a significant milestone
                            in Dr. Quadri&apos;s career, demonstrating his
                            commitment to excellence in mental health care and
                            innovation.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Qualifications Tab */}
        {activeTab === 'qualifications' && (
          <div className='max-w-4xl mx-auto'>
            <div className='space-y-6'>
              {qualifications.map((qual, index) => (
                <div
                  key={index}
                  className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  <div className='flex items-start gap-6'>
                    <div className='p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100'>
                      <AcademicCapIcon className='w-8 h-8 text-blue-600' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-4 mb-3'>
                        <h3 className='text-2xl font-bold text-slate-900'>
                          {qual.degree}
                        </h3>
                        <span className='bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold'>
                          {qual.year}
                        </span>
                      </div>
                      <p className='text-lg text-blue-600 font-semibold mb-2'>
                        {qual.institution}
                      </p>
                      <p className='text-slate-600 leading-relaxed'>
                        {qual.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specializations Tab */}
        {activeTab === 'specializations' && (
          <div className='grid md:grid-cols-2 gap-8'>
            {specializations.map((spec, index) => (
              <div
                key={index}
                className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                <div className='flex items-start gap-6'>
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 ${spec.color}`}
                  >
                    <spec.icon className='w-8 h-8' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-3'>
                      <h3 className='text-xl font-bold text-slate-900'>
                        {spec.name}
                      </h3>
                      <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold'>
                        {spec.experience}
                      </span>
                    </div>
                    <p className='text-slate-600 leading-relaxed'>
                      {spec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Information */}
        <div className='mt-16 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200 shadow-lg'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-bold text-slate-900 mb-4'>
              Ready to Start Your Journey?
            </h3>
            <p className='text-slate-600'>
              Get in touch to schedule a consultation and take the first step
              towards better mental health.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            <div className='flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100'>
              <PhoneIcon className='w-6 h-6 text-blue-600' />
              <div>
                <div className='font-semibold text-slate-900'>Call</div>
                <div className='text-slate-600 text-sm'>+1 (555) 123-4567</div>
              </div>
            </div>
            <div className='flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100'>
              <EnvelopeIcon className='w-6 h-6 text-indigo-600' />
              <div>
                <div className='font-semibold text-slate-900'>Email</div>
                <div className='text-slate-600 text-sm'>
                  dr.quadri@example.com
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100'>
              <CalendarIcon className='w-6 h-6 text-green-600' />
              <div>
                <div className='font-semibold text-slate-900'>Schedule</div>
                <div className='text-slate-600 text-sm'>Book Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
