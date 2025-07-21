'use client';

import { useState } from 'react';
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  NewspaperIcon,
  UserIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SectionItem {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
}

const sectionItems: SectionItem[] = [
  {
    id: 'hero',
    name: 'Home',
    icon: HomeIcon,
    color: 'from-blue-500 to-indigo-600',
    description: 'Welcome section',
  },
  {
    id: 'services',
    name: 'Services',
    icon: WrenchScrewdriverIcon,
    color: 'from-emerald-500 to-teal-600',
    description: 'Our therapeutic services',
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    icon: ChatBubbleLeftRightIcon,
    color: 'from-purple-500 to-violet-600',
    description: 'Client experiences',
  },
  {
    id: 'featured-content',
    name: 'YouTube',
    icon: VideoCameraIcon,
    color: 'from-red-500 to-orange-600',
    description: 'Featured content',
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    icon: NewspaperIcon,
    color: 'from-yellow-500 to-amber-600',
    description: 'Stay updated',
  },
  {
    id: 'about',
    name: 'About',
    icon: UserIcon,
    color: 'from-slate-500 to-gray-600',
    description: 'About Dr. Quadri',
  },
  {
    id: 'cta',
    name: 'Contact',
    icon: PhoneIcon,
    color: 'from-pink-500 to-rose-600',
    description: 'Get in touch',
  },
];

export default function SectionToggle() {
  const [isOpen, setIsOpen] = useState(true); // Open by default
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false); // Close the toggle after clicking
    }
  };

  return (
    <div className='fixed left-6 top-20 z-50'>
      {/* Toggle Button */}
      <div className='relative'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group ${
            isOpen ? 'scale-110' : 'hover:scale-105'
          }`}
        >
          {isOpen ? (
            <XMarkIcon className='w-5 h-5 transition-transform duration-300' />
          ) : (
            <Bars3Icon className='w-5 h-5 transition-transform duration-300 group-hover:rotate-180' />
          )}
        </button>

        {/* Navigation Menu */}
        <div
          className={`absolute top-0 left-14 transition-all duration-500 ease-out ${
            isOpen
              ? 'opacity-100 transform translate-x-0 scale-100'
              : 'opacity-0 transform -translate-x-4 scale-95 pointer-events-none'
          }`}
        >
          <div className='bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-4 min-w-[280px]'>
            <div className='text-center mb-4'>
              <h3 className='text-lg font-bold text-slate-900 mb-1'>
                Quick Navigation
              </h3>
              <p className='text-sm text-slate-600'>Jump to any section</p>
            </div>

            <div className='space-y-2'>
              {sectionItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredSection(item.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 hover:shadow-lg group bg-gradient-to-r ${
                      item.color
                    } hover:shadow-xl transform ${
                      hoveredSection === item.id
                        ? 'translate-x-4 scale-105'
                        : 'hover:scale-105'
                    } ${
                      isOpen ? 'animate-in slide-in-from-left duration-300' : ''
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className='flex items-center text-white w-full'>
                      <div className='w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mr-3 group-hover:bg-white/30 transition-all duration-300'>
                        <IconComponent className='w-4 h-4' />
                      </div>
                      <div className='flex-1 text-left'>
                        <div className='font-semibold text-sm'>{item.name}</div>
                        <div className='text-xs opacity-90'>
                          {item.description}
                        </div>
                      </div>
                      <div className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300'>
                        <svg
                          className='w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className='mt-4 pt-4 border-t border-slate-200/50 text-center'>
              <p className='text-xs text-slate-500'>
                Click to navigate smoothly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
