'use client';

import Link from 'next/link';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  MicrophoneIcon,
  UserIcon,
  CheckBadgeIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
// Social media icons as SVG components
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.297 0-4.163-1.866-4.163-4.163 0-2.297 1.866-4.163 4.163-4.163 2.297 0 4.163 1.866 4.163 4.163 0 2.297-1.866 4.163-4.163 4.163zm7.138 0c-2.297 0-4.163-1.866-4.163-4.163 0-2.297 1.866-4.163 4.163-4.163 2.297 0 4.163 1.866 4.163 4.163 0 2.297-1.866 4.163-4.163 4.163z' />
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Dr. Quadri', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Appointments', href: '/appointments' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Anxiety Treatment', href: '/services/anxiety' },
    { name: 'Depression Therapy', href: '/services/depression' },
    { name: 'Trauma Counseling', href: '/services/trauma' },
    { name: 'Relationship Therapy', href: '/services/relationships' },
    { name: 'Stress Management', href: '/services/stress' },
  ];

  const resources = [
    { name: 'All Books', href: '/books', icon: BookOpenIcon },
    { name: 'Podcast Episodes', href: '/podcast', icon: MicrophoneIcon },
    { name: 'Mental Health Blog', href: '/blog', icon: BookOpenIcon },
    { name: 'Patient Resources', href: '/resources', icon: UserIcon },
    { name: 'FAQ', href: '/faq', icon: BookOpenIcon },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: FacebookIcon, color: 'text-blue-600' },
    { name: 'Twitter', href: '#', icon: TwitterIcon, color: 'text-blue-400' },
    {
      name: 'Instagram',
      href: '#',
      icon: InstagramIcon,
      color: 'text-pink-600',
    },
    { name: 'LinkedIn', href: '#', icon: LinkedInIcon, color: 'text-blue-700' },
    { name: 'YouTube', href: '#', icon: YouTubeIcon, color: 'text-red-600' },
  ];

  return (
    <footer className='bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='w-full h-full bg-repeat'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-blue-200/10 rounded-full blur-xl animate-pulse' />
      <div className='absolute bottom-20 right-10 w-32 h-32 bg-indigo-200/10 rounded-full blur-xl animate-pulse delay-1000' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Main Footer Content */}
        <div className='pt-16 pb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* About Section */}
            <div className='lg:col-span-1'>
              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-slate-900 mb-4'>
                  Dr. Syed M Quadri
                </h3>
                <p className='text-slate-600 mb-6 leading-relaxed'>
                  Board-certified psychiatrist dedicated to providing
                  compassionate, evidence-based mental health care for over 10
                  years.
                </p>
              </div>

              {/* Contact Info */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <PhoneIcon className='w-5 h-5 text-blue-600' />
                  </div>
                  <div>
                    <p className='text-slate-900 font-medium'>(555) 123-4567</p>
                    <p className='text-slate-500 text-sm'>
                      24/7 Emergency Line
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                    <EnvelopeIcon className='w-5 h-5 text-green-600' />
                  </div>
                  <div>
                    <p className='text-slate-900 font-medium'>
                      contact@drSyedquadri.com
                    </p>
                    <p className='text-slate-500 text-sm'>General Inquiries</p>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                    <MapPinIcon className='w-5 h-5 text-purple-600' />
                  </div>
                  <div>
                    <p className='text-slate-900 font-medium'>
                      123 Wellness Street
                    </p>
                    <p className='text-slate-500 text-sm'>New York, NY 10001</p>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
                    <ClockIcon className='w-5 h-5 text-orange-600' />
                  </div>
                  <div>
                    <p className='text-slate-900 font-medium'>
                      Mon-Fri: 9AM-6PM
                    </p>
                    <p className='text-slate-500 text-sm'>
                      Weekend: By Appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className='text-lg font-semibold text-slate-900 mb-6'>
                Quick Links
              </h4>
              <ul className='space-y-3'>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center group'
                    >
                      <span className='w-2 h-2 bg-blue-200 rounded-full mr-3 group-hover:bg-blue-600 transition-colors'></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className='text-lg font-semibold text-slate-900 mb-6'>
                Our Services
              </h4>
              <ul className='space-y-3'>
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className='text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center group'
                    >
                      <span className='w-2 h-2 bg-green-200 rounded-full mr-3 group-hover:bg-green-600 transition-colors'></span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className='text-lg font-semibold text-slate-900 mb-6'>
                Resources
              </h4>
              <ul className='space-y-3'>
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className='text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center group'
                    >
                      <resource.icon className='w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-600 transition-colors' />
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className='mt-12 pt-8 border-t border-slate-200'>
            <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200'>
              <div className='text-center mb-6'>
                <h4 className='text-2xl font-bold text-slate-900 mb-2'>
                  Stay Connected
                </h4>
                <p className='text-slate-600'>
                  Get weekly mental health tips and updates delivered to your
                  inbox
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Stats & Social */}
          <div className='mt-12 pt-8 border-t border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
              {/* Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>5000+</div>
                  <div className='text-slate-600 text-sm'>Patients Helped</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-600'>10+</div>
                  <div className='text-slate-600 text-sm'>Years Experience</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-purple-600'>92%</div>
                  <div className='text-slate-600 text-sm'>Success Rate</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-orange-600'>4.9</div>
                  <div className='text-slate-600 text-sm'>Patient Rating</div>
                </div>
              </div>

              {/* Social Links */}
              <div className='text-center md:text-right'>
                <h4 className='text-lg font-semibold text-slate-900 mb-4'>
                  Follow Us
                </h4>
                <div className='flex justify-center md:justify-end space-x-4'>
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${social.color} hover:scale-110`}
                    >
                      <social.icon className='w-5 h-5' />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-slate-200 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-slate-600 text-sm'>
              <p>&copy; 2024 Dr. Syed M Quadri. All rights reserved.</p>
              <div className='flex items-center space-x-4'>
                <Link
                  href='/privacy'
                  className='hover:text-blue-600 transition-colors'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='hover:text-blue-600 transition-colors'
                >
                  Terms of Service
                </Link>
                <Link
                  href='/hipaa'
                  className='hover:text-blue-600 transition-colors'
                >
                  HIPAA Compliance
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className='flex items-center space-x-4 mt-4 md:mt-0'>
              <div className='flex items-center space-x-2 text-slate-600 text-sm'>
                <CheckBadgeIcon className='w-4 h-4 text-green-600' />
                <span>Licensed Professional</span>
              </div>
              <div className='flex items-center space-x-2 text-slate-600 text-sm'>
                <ShieldCheckIcon className='w-4 h-4 text-blue-600' />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50'
        >
          <ArrowUpIcon className='w-5 h-5' />
        </button>
      </div>
    </footer>
  );
}
