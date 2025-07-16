'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  XMarkIcon,
  ChevronDownIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  UserCircleIcon,
  BellIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

interface BookItem {
  id: string;
  title: string;
  image: string;
  description: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
  dropdownItems?: {
    name: string;
    href: string;
    description?: string;
    featured?: boolean;
    icon?: React.ReactNode;
  }[];
  isBooks?: boolean;
  color?: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navItems: NavItem[];
  bookItems: BookItem[];
}

export default function MobileNavigation({
  isOpen,
  setIsOpen,
  navItems,
  bookItems,
}: MobileNavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    closeDropdown();
    setShowProfile(false);
  };

  const renderMobileBooksDropdown = () => (
    <div className='mt-3 space-y-3 animate-in slide-in-from-top-3 duration-500'>
      {/* Search Books */}
      <div className='px-4'>
        <div className='relative group'>
          <MagnifyingGlassIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors' />
          <input
            type='text'
            placeholder='Search books...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-12 pr-4 py-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm border-2 border-emerald-200/50 rounded-2xl text-sm focus:outline-none focus:ring-0 focus:border-emerald-400 focus:bg-white/90 transition-all duration-300 placeholder:text-emerald-600/60 shadow-inner'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
        </div>
      </div>

      {/* Books Grid */}
      <div className='px-4'>
        <div className='space-y-3'>
          {bookItems
            .filter(
              (book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .slice(0, 4)
            .map((book, index) => (
              <Link
                key={book.id}
                href={book.href}
                onClick={handleLinkClick}
                className={`group flex items-center space-x-4 bg-gradient-to-r from-white/90 to-emerald-50/80 backdrop-blur-sm rounded-2xl p-4 hover:shadow-xl transition-all duration-500 border border-emerald-100/60 hover:border-emerald-300/80 hover:scale-[1.02] animate-in slide-in-from-bottom-3 duration-700`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className='relative w-14 h-18 flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={56}
                    height={72}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='font-bold text-sm text-slate-800 mb-1 line-clamp-1 group-hover:text-emerald-700 transition-colors duration-300'>
                    {book.title}
                  </h4>
                  <p className='text-xs text-slate-600/80 line-clamp-2 leading-relaxed'>
                    {book.description}
                  </p>
                  <div className='flex items-center mt-2 space-x-1'>
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className='w-3 h-3 text-yellow-400'
                      />
                    ))}
                    <span className='text-xs text-slate-500 ml-2'>4.9</span>
                  </div>
                </div>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110'>
                    <BookOpenIcon className='w-5 h-5 text-white' />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* View All Books Button */}
      <div className='px-4'>
        <Link
          href='/books'
          onClick={handleLinkClick}
          className='relative group flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-2xl text-sm font-bold hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] overflow-hidden'
        >
          <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          <BookOpenIcon className='w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300' />
          <span className='relative z-10'>
            Explore All Books ({bookItems.length})
          </span>
          <SparklesIcon className='w-5 h-5 ml-3 text-emerald-200 group-hover:text-white transition-colors duration-300' />
        </Link>
      </div>
    </div>
  );

  const renderMobileDropdown = (item: NavItem) => (
    <div className='mt-3 space-y-2 animate-in slide-in-from-top-3 duration-500'>
      {item.dropdownItems?.map((dropdownItem, index) => (
        <Link
          key={dropdownItem.name}
          href={dropdownItem.href}
          onClick={handleLinkClick}
          className={`group flex items-center space-x-4 px-4 py-4 text-sm rounded-2xl transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-left-3 duration-700 ${
            dropdownItem.featured
              ? 'text-blue-700 hover:text-blue-800 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm hover:from-blue-100/90 hover:to-indigo-100/90 border-2 border-blue-200/50 hover:border-blue-300/80 shadow-lg hover:shadow-xl'
              : 'text-slate-600 hover:text-slate-800 bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm hover:from-white/90 hover:to-slate-50/90 border-2 border-slate-200/50 hover:border-blue-300/60 shadow-md hover:shadow-lg'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300 ${
              dropdownItem.featured
                ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110'
                : 'bg-gradient-to-r from-slate-200 to-gray-300 text-slate-600 group-hover:from-blue-400 group-hover:to-indigo-500 group-hover:text-white shadow-md group-hover:shadow-lg group-hover:scale-110'
            }`}
          >
            {dropdownItem.icon}
          </div>
          <div className='flex-1 min-w-0'>
            <div className='font-bold mb-1 text-base'>{dropdownItem.name}</div>
            {dropdownItem.description && (
              <div
                className={`text-xs leading-relaxed ${
                  dropdownItem.featured
                    ? 'text-blue-600/80'
                    : 'text-slate-500/80'
                }`}
              >
                {dropdownItem.description}
              </div>
            )}
          </div>
          {dropdownItem.featured && (
            <div className='flex-shrink-0'>
              <SparklesIcon className='w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors duration-300' />
            </div>
          )}
        </Link>
      ))}
    </div>
  );

  return (
    <div
      className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}
    >
      {/* Enhanced Backdrop with Blur */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/60 to-indigo-900/80 backdrop-blur-xl transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Animated Background Elements */}
        <div className='absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-40 right-16 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-32 left-20 w-28 h-28 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/95 backdrop-blur-2xl shadow-2xl overflow-y-auto transform transition-all duration-500 ${
          isOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
        }`}
      >
        {/* Modern Header */}
        <div className='sticky top-0 z-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl'>
          {/* Profile Section */}
          <div className='relative px-6 pt-6 pb-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='relative'>
                  <div className='w-14 h-14 bg-gradient-to-r from-white/30 to-blue-200/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg'>
                    <HeartIconSolid className='w-8 h-8 text-white' />
                  </div>
                  <div className='absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg'>
                    <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                  </div>
                </div>
                <div>
                  <div className='font-bold text-xl text-white'>Dr. Quadri</div>
                  <div className='text-sm text-blue-100 font-medium'>
                    Mental Wellness Expert
                  </div>
                  <div className='flex items-center mt-1 space-x-1'>
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className='w-3 h-3 text-yellow-300'
                      />
                    ))}
                    <span className='text-xs text-blue-200 ml-1'>
                      4.9 Rating
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className='p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group'
                >
                  <UserCircleIcon className='w-6 h-6 text-white group-hover:scale-110 transition-transform' />
                </button>
                <button className='p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group relative'>
                  <BellIcon className='w-6 h-6 text-white group-hover:scale-110 transition-transform' />
                  <div className='absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse'></div>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className='p-2 hover:bg-white/10 rounded-xl transition-all duration-300 group'
                >
                  <XMarkIcon className='w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300' />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className='px-6 pb-4'>
            <div className='flex space-x-3'>
              <div className='flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10'>
                <div className='text-lg font-bold text-white'>10+</div>
                <div className='text-xs text-blue-100'>Years Exp.</div>
              </div>
              <div className='flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10'>
                <div className='text-lg font-bold text-white'>5K+</div>
                <div className='text-xs text-blue-100'>Lives Helped</div>
              </div>
              <div className='flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10'>
                <div className='text-lg font-bold text-white'>100K+</div>
                <div className='text-xs text-blue-100'>Followers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search */}
        <div className='p-6 border-b border-slate-200/50'>
          <div className='relative group'>
            <MagnifyingGlassIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 group-focus-within:text-blue-600 transition-colors' />
            <input
              type='text'
              placeholder='Search everything...'
              className='w-full pl-12 pr-4 py-4 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm border-2 border-blue-200/50 rounded-2xl text-sm focus:outline-none focus:ring-0 focus:border-blue-400 focus:bg-white/90 transition-all duration-300 placeholder:text-blue-600/60 shadow-inner'
            />
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
              <SparklesIcon className='w-5 h-5 text-blue-300 animate-pulse' />
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className='p-6 space-y-4'>
          {navItems.map((item, index) => (
            <div
              key={item.name}
              className={`animate-in slide-in-from-right-3 duration-700`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='group'>
                <div className='flex items-center justify-between'>
                  <Link
                    href={item.href}
                    onClick={() => !item.hasDropdown && handleLinkClick()}
                    className={`flex-1 flex items-center space-x-4 px-5 py-4 rounded-2xl text-base font-bold transition-all duration-500 relative overflow-hidden ${
                      item.hasDropdown
                        ? 'cursor-default'
                        : 'hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                    style={{
                      background: item.hasDropdown
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)'
                        : `linear-gradient(135deg, ${
                            item.color?.includes('from-')
                              ? item.color
                                  .replace('from-', '')
                                  .replace('to-', ', ')
                              : 'rgba(71,85,105,0.1), rgba(148,163,184,0.1)'
                          })`,
                    }}
                  >
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${
                        item.color || 'from-slate-500 to-gray-500'
                      } text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div className='flex-1'>
                      <div
                        className={`bg-gradient-to-r ${
                          item.color || 'from-slate-500 to-gray-500'
                        } bg-clip-text text-transparent text-lg`}
                      >
                        {item.name}
                      </div>
                      <div className='text-xs text-slate-500 mt-1'>
                        {item.name === 'PODCAST' && 'Listen & Learn'}
                        {item.name === 'BOOKS' && 'Read & Grow'}
                        {item.name === 'LIVE' && 'Join Sessions'}
                        {item.name === 'NEWSLETTER' && 'Stay Updated'}
                        {item.name === 'ABOUT' && 'Know More'}
                        {item.name === 'JOURNAL' && 'Write & Reflect'}
                      </div>
                    </div>
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className='p-3 text-slate-600 hover:text-blue-700 transition-all duration-300 hover:bg-blue-50 rounded-xl group-hover:bg-blue-100'
                    >
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-all duration-500 ${
                          activeDropdown === item.name
                            ? 'rotate-180 text-blue-600'
                            : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className='ml-4 mt-3'>
                    {item.isBooks
                      ? renderMobileBooksDropdown()
                      : renderMobileDropdown(item)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className='p-6 border-t border-slate-200/50 bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm'>
          <div className='text-center space-y-4'>
            <div className='flex items-center justify-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg'>
                <HeartIconSolid className='w-5 h-5 text-white' />
              </div>
              <div>
                <span className='font-bold text-slate-800 text-lg'>
                  Dr. Sayyed M Quadri
                </span>
                <div className='text-xs text-slate-500'>
                  Licensed Psychiatrist
                </div>
              </div>
            </div>
            <p className='text-sm text-slate-600 font-medium'>
              Mental Health & Wellness Expert
            </p>
            <p className='text-xs text-slate-500 leading-relaxed'>
              Transforming lives through therapeutic guidance and compassionate
              care
            </p>

            {/* Quick Actions */}
            <div className='flex space-x-2 pt-3'>
              <Link
                href='/about/contact'
                onClick={handleLinkClick}
                className='flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl text-sm font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              >
                Book Now
              </Link>
              <button className='p-3 bg-gradient-to-r from-slate-200 to-gray-300 rounded-xl hover:from-slate-300 hover:to-gray-400 transition-all duration-300 shadow-md hover:shadow-lg'>
                <Cog6ToothIcon className='w-5 h-5 text-slate-600' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
