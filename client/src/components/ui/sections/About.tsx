'use client';

import { useState } from 'react';
import Link from 'next/link';
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
      number: '7000+',
      label: 'Patients Helped',
      color: 'text-blue-600',
      description:
        'Successfully treated patients across children, adolescents, and adults',
    },
    {
      number: '18+',
      label: 'Years Experience',
      color: 'text-indigo-600',
      description:
        'Dedicated years of practice in psychiatric care since 2006',
    },
    {
      number: 'Same Day',
      label: 'Urgent Care',
      color: 'text-emerald-600',
      description: 'Walk-in psychiatric urgent care within 24 hours',
    },
    {
      number: '3',
      label: 'Locations',
      color: 'text-purple-600',
      description: 'Richardson TX, Billings MT, and telehealth services',
    },
  ];

  const achievements: Achievement[] = [
    {
      year: '2017',
      title: 'Founded Innovated Minds',
      description:
        'Established first walk-in psychiatric urgent care clinic in Richardson, TX',
      icon: TrophyIcon,
      color: 'text-yellow-600',
    },
    {
      year: '2018',
      title: 'Yellowstone Boys and Girls Ranch',
      description: 'Appointed as Psychiatrist serving youth in Billings, Montana',
      icon: HeartIcon,
      color: 'text-red-600',
    },
    {
      year: '2016',
      title: 'Texas Psychiatry Association',
      description: 'Joined as practicing psychiatrist in Richardson, Texas',
      icon: ShieldCheckIcon,
      color: 'text-blue-600',
    },
    {
      year: '2006',
      title: 'Medical Director at THR Springwood',
      description: 'Led inpatient and outpatient adolescent psychiatric services for 11+ years',
      icon: UserGroupIcon,
      color: 'text-green-600',
    },
    {
      year: '2006',
      title: 'Child & Adolescent Fellowship',
      description: 'Completed specialized fellowship at University of Kansas',
      icon: AcademicCapIcon,
      color: 'text-indigo-600',
    },
  ];

  const qualifications: Qualification[] = [
    {
      degree: 'Child and Adolescent Psychiatry Fellowship',
      institution: 'University of Kansas School of Medicine',
      year: '2004-2006',
      description:
        'Specialized training in psychiatric care for children and adolescents',
    },
    {
      degree: 'Adult Psychiatry Residency',
      institution: 'University of Kansas School of Medicine',
      year: '2001-2004',
      description: 'Comprehensive training in adult psychiatric care and treatment',
    },
    {
      degree: 'Doctor of Medicine (MD)',
      institution: 'Medical School',
      year: '2001',
      description: 'Foundation in medical sciences and clinical practice',
    },
  ];

  const specializations: Specialization[] = [
    {
      name: 'Psychiatric Urgent Care',
      description: 'Same-day psychiatric evaluations and crisis intervention',
      icon: ClockIcon,
      color: 'text-blue-600',
      experience: '8+ years',
    },
    {
      name: 'Child & Adolescent Psychiatry',
      description: 'Specialized care for children and teenagers',
      icon: UserGroupIcon,
      color: 'text-indigo-600',
      experience: '18+ years',
    },
    {
      name: 'Adult Psychiatry',
      description: 'Comprehensive psychiatric care for adults',
      icon: HeartIcon,
      color: 'text-green-600',
      experience: '20+ years',
    },
    {
      name: 'Inpatient & Outpatient Services',
      description: 'Medical director experience in both settings',
      icon: ShieldCheckIcon,
      color: 'text-purple-600',
      experience: '15+ years',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserGroupIcon },
    { id: 'achievements', label: 'Achievements', icon: TrophyIcon },
    { id: 'qualifications', label: 'Qualifications', icon: AcademicCapIcon },
    { id: 'specializations', label: 'Specializations', icon: BeakerIcon },
  ];

  return (
    <section className='py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
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
            Pioneer of psychiatric urgent care in Texas, providing same-day mental health services for children, adolescents, and adults
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
                  Dr. Syed M Quadri is an innovative psychiatrist who founded Innovated Minds, 
                  the first walk-in psychiatric urgent care clinic in Richardson, Texas. With over 
                  18 years of experience, he eliminates the traditional weeks-to-months wait times 
                  for psychiatric care.
                </p>
                <p>
                  As an attending psychiatrist in Richardson and at Yellowstone Boys and Girls Ranch 
                  in Montana, Dr. Quadri specializes in providing immediate psychiatric evaluations 
                  and treatment for children, adolescents, and adults within 24 hours.
                </p>
                <p>
                  His extensive background includes serving as Medical Director of inpatient and 
                  outpatient adolescent services at THR Springwood for over 11 years, bringing 
                  both clinical excellence and administrative expertise to patient care.
                </p>
              </div>

              {/* Credentials */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-green-100 rounded-xl mr-4'>
                    <CheckCircleIcon className='w-5 h-5 text-green-600' />
                  </div>
                  <span className='font-semibold'>
                    Fellowship Trained Psychiatrist
                  </span>
                </div>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-blue-100 rounded-xl mr-4'>
                    <ClockIcon className='w-5 h-5 text-blue-600' />
                  </div>
                  <span className='font-semibold'>18+ Years Experience</span>
                </div>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-indigo-100 rounded-xl mr-4'>
                    <UserGroupIcon className='w-5 h-5 text-indigo-600' />
                  </div>
                  <span className='font-semibold'>Medical Director</span>
                </div>
                <div className='flex items-center text-slate-700 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <div className='p-2 bg-yellow-100 rounded-xl mr-4'>
                    <TrophyIcon className='w-5 h-5 text-yellow-600' />
                  </div>
                  <span className='font-semibold'>Urgent Care Pioneer</span>
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
                <Link
                  href='/books'
                  className='inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-200'
                >
                  View Publications
                </Link>
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
        {/* <div className='mt-16 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200 shadow-lg'>
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
        </div> */}
      </div>
    </section>
  );
};

export default About;
