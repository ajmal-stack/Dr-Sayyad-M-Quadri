'use client';

import Link from 'next/link';
import {
  ShieldCheckIcon,
  BookOpenIcon,
  MicrophoneIcon,
  UserIcon,
  CheckBadgeIcon,
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
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Books', href: '/books' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Contact', href: '/contact' },
  ];

  const resources = [
    { name: 'All Books', href: '/books', icon: BookOpenIcon },
    { name: 'Podcast Episodes', href: '/podcast', icon: MicrophoneIcon },
    { name: 'Patient Resources', href: '/resources', icon: UserIcon },
    { name: 'FAQ', href: '/faq', icon: BookOpenIcon },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: FacebookIcon },
    { name: 'Twitter', href: '#', icon: TwitterIcon },
    { name: 'Instagram', href: '#', icon: InstagramIcon },
    { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
    { name: 'YouTube', href: '#', icon: YouTubeIcon },
  ];

  return (
    <footer className='bg-gradient-to-br from-slate-900 to-slate-800 text-white'>
      <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
        {/* Main Content */}
        <div className='py-8 sm:py-12 lg:py-16'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12'>
            {/* Brand Section */}
            <div className='sm:col-span-2 lg:col-span-2'>
              <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4'>
                <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  Dr. Syed M Quadri
                </span>
              </h3>
              <p className='text-slate-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base max-w-lg'>
                Board-certified psychiatrist providing compassionate,
                evidence-based mental health care for over 10 years.
              </p>
              
              {/* Mobile-first social links - shown on small screens */}
              <div className='flex justify-center sm:justify-start space-x-3 mb-6 sm:hidden'>
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className='w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors'
                    aria-label={social.name}
                  >
                    <social.icon className='w-4 h-4' />
                  </Link>
                ))}   
              </div>

              {/* Contact Info */}
              {/* <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <PhoneIcon className='w-5 h-5 text-blue-400' />
                  <span className='text-slate-300'>(555) 123-4567</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <EnvelopeIcon className='w-5 h-5 text-blue-400' />
                  <span className='text-slate-300'>contact@drquadri.com</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <MapPinIcon className='w-5 h-5 text-blue-400' />
                  <span className='text-slate-300'>
                    123 Wellness Street, NY 10001
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <ClockIcon className='w-5 h-5 text-blue-400' />
                  <span className='text-slate-300'>Mon-Fri: 9AM-6PM</span>
                </div>
              </div> */}
           
            </div>

            {/* Quick Links */}
            <div className='sm:col-span-1'>
              <h4 className='text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white'>
                Quick Links
              </h4>
              <ul className='space-y-2 sm:space-y-3'>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-slate-300 hover:text-white transition-colors duration-200 text-sm sm:text-base block py-1'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className='sm:col-span-1'>
              <h4 className='text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white'>
                Resources
              </h4>
              <ul className='space-y-2 sm:space-y-3'>
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className='text-slate-300 hover:text-white transition-colors duration-200 flex items-center text-sm sm:text-base py-1'
                    >
                      <resource.icon className='w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400 flex-shrink-0' />
                      <span className='truncate'>{resource.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
           
             
          </div>

          {/* Newsletter */}
          <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700'>
            <div className='max-w-md mx-auto sm:mx-0'>
              <h4 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white text-center sm:text-left'>
                Stay Updated
              </h4>
              <p className='text-slate-300 mb-4 text-xs sm:text-sm text-center sm:text-left leading-relaxed'>
                Get weekly mental health tips delivered to your inbox
              </p>
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-colors'
                />
                <button className='bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          {/* <div className='mt-12 pt-8 border-t border-slate-700'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
              <div>
                <div className='text-2xl font-bold text-blue-400 mb-1'>
                  5000+
                </div>
                <div className='text-slate-300 text-sm'>Patients Helped</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-green-400 mb-1'>
                  10+
                </div>
                <div className='text-slate-300 text-sm'>Years Experience</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-purple-400 mb-1'>
                  92%
                </div>
                <div className='text-slate-300 text-sm'>Success Rate</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-orange-400 mb-1'>
                  4.9
                </div>
                <div className='text-slate-300 text-sm'>Patient Rating</div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-slate-700 py-4 sm:py-6'>
          <div className='flex flex-col space-y-4 sm:space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center'>
            {/* Copyright and Legal Links */}
            <div className='flex flex-col space-y-3 sm:space-y-4 lg:space-y-0'>
              <p className='text-slate-400 text-xs sm:text-sm text-center sm:text-left'>
                &copy; 2024 Dr. Syed M Quadri. All rights reserved.
              </p>
              <div className='flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-6'>
                <Link
                  href='/privacy'
                  className='text-slate-400 hover:text-white transition-colors text-xs sm:text-sm'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='text-slate-400 hover:text-white transition-colors text-xs sm:text-sm'
                >
                  Terms
                </Link>
                <Link
                  href='/hipaa'
                  className='text-slate-400 hover:text-white transition-colors text-xs sm:text-sm'
                >
                  HIPAA
                </Link>
              </div>
            </div>

            {/* Social Links - Hidden on mobile, shown on larger screens */}
            <div className='hidden sm:flex justify-center lg:justify-end'>
              <div className='flex space-x-3 sm:space-x-4'>
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className='w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors'
                    aria-label={social.name}
                  >
                    <social.icon className='w-4 h-4 sm:w-5 sm:h-5' />
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-end space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4 text-slate-400 order-first lg:order-last'>
              <div className='flex items-center space-x-1'>
                <CheckBadgeIcon className='w-3 h-3 sm:w-4 sm:h-4 text-green-400' />
                <span className='text-xs sm:text-sm'>Licensed</span>
              </div>
              <div className='flex items-center space-x-1'>
                <ShieldCheckIcon className='w-3 h-3 sm:w-4 sm:h-4 text-blue-400' />
                <span className='text-xs sm:text-sm'>HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
