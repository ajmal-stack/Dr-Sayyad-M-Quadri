'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  ChevronDownIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookOpenIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  NewspaperIcon,
  PencilSquareIcon,
  SparklesIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import MobileNavigation from './MobileNavigation';

interface BookItem {
  id: string;
  title: string;
  image: string;
  description: string;
  href: string;
}

const bookItems: BookItem[] = [
  {
    id: '1',
    title: 'Mind Matters',
    image: '/books/Navy and Pink Illustrated Mind Matters Book Cover.jpg',
    description:
      'Understanding mental health and wellness through comprehensive insights',
    href: '/books/mind-matters',
  },
  {
    id: '2',
    title: 'Public Speaking Mastery',
    image:
      '/books/Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg',
    description: 'Overcome anxiety and speak with confidence in any situation',
    href: '/books/public-speaking',
  },

  {
    id: '3',
    title: 'Simple Food Journal',
    image: '/books/Red Simple Food Journal Book Cover.jpg',
    description: 'Mindful eating practices for better mental health',
    href: '/books/simple-food-journal',
  },
  {
    id: '4',
    title: 'Love & Healing',
    image: '/books/Romantic Doctor Love Story Ebook Cover.png',
    description:
      'A therapeutic journey through relationships and emotional healing',
    href: '/books/love-healing',
  },
  {
    id: '5',
    title: 'Daily Food Journal',
    image:
      '/books/Red and Green Seamless Pattern Printable Daily Food Journal Cover.jpg',
    description: 'Track your nutrition and discover the mind-body connection',
    href: '/books/food-journal',
  },
  {
    id: '6',
    title: 'Modern Psychology Guide',
    image:
      '/books/Black%20and%20White%20Modern%20Psychology%20Book%20Cover.jpg',
    description:
      'Contemporary approaches to understanding human behavior and mental wellness',
    href: '/books/modern-psychology',
  },
];

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

const navItems: NavItem[] = [
  {
    name: 'PODCAST',
    href: '/podcast',
    icon: <MicrophoneIcon className='w-5 h-5' />,
    color: 'from-blue-500 to-indigo-600',
    hasDropdown: true,
    dropdownItems: [
      {
        name: 'All Podcast Episodes',
        href: '/podcast/all-episodes',
        featured: true,
        description: 'Browse all therapeutic podcast episodes',
        icon: <PlayIcon className='w-4 h-4' />,
      },
      {
        name: 'Trending Episodes',
        href: '/podcast/trending',
        description: 'Most popular mental health discussions',
        featured: true,
        icon: <SparklesIcon className='w-4 h-4' />,
      },
      {
        name: 'Podcast Topics',
        href: '/podcast/topics',
        description: 'Browse by therapeutic categories',
        featured: true,
        icon: <BookOpenIcon className='w-4 h-4' />,
      },
      {
        name: 'Episode Search',
        href: '/podcast/search',
        description: 'Find specific mental health topics',
        featured: true,
        icon: <MagnifyingGlassIcon className='w-4 h-4' />,
      },
      {
        name: 'Podcast Membership',
        href: '/podcast/membership',
        description: 'Join our therapeutic community',
        featured: true,
        icon: <ShieldCheckIcon className='w-4 h-4' />,
      },
    ],
  },
  {
    name: 'BOOKS',
    href: '/books',
    icon: <BookOpenIcon className='w-5 h-5' />,
    color: 'from-blue-500 to-indigo-600',
    hasDropdown: true,
    isBooks: true,
  },
  {
    name: 'YOUTUBE',
    href: '/youtube',
    icon: <VideoCameraIcon className='w-5 h-5' />,
    color: 'from-blue-500 to-indigo-600',
    hasDropdown: true,
    dropdownItems: [
      {
        name: 'Latest Videos',
        href: '/youtube/latest',
        description: 'Recent mental health videos and tutorials',
        featured: true,
        icon: <VideoCameraIcon className='w-4 h-4' />,
      },
      {
        name: 'Popular Videos',
        href: '/youtube/popular',
        featured: true,
        description: 'Most watched therapeutic content',
        icon: <PlayIcon className='w-4 h-4' />,
      },
      {
        name: 'Playlists',
        href: '/youtube/playlists',
        featured: true,
        description: 'Organized video collections by topic',
        icon: <SparklesIcon className='w-4 h-4' />,
      },
      {
        name: 'YouTube Channel',
        href: '/youtube/channel',
        featured: true,
        description: 'Visit our official YouTube channel',
        icon: <ShieldCheckIcon className='w-4 h-4' />,
      },
    ],
  },
  {
    name: 'NEWSLETTER',
    href: '/newsletter',
    icon: <NewspaperIcon className='w-5 h-5' />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'ABOUT',
    href: '/about',
    icon: <UserIcon className='w-5 h-5' />,
    color: 'from-blue-500 to-indigo-600',
    hasDropdown: true,
    dropdownItems: [
      {
        name: 'Biography',
        href: '/about/bio',
        featured: true,
        description: 'Learn about Dr. Quadri',
        icon: <UserIcon className='w-4 h-4' />,
      },
      {
        name: 'Contact',
        href: '/about/contact',
        featured: true,
        description: 'Get professional consultation',
        icon: <HeartIcon className='w-4 h-4' />,
      },
      {
        name: 'Press Kit',
        href: '/about/press',
        featured: true,
        description: 'Media and professional resources',
        icon: <ShieldCheckIcon className='w-4 h-4' />,
      },
    ],
  },
  {
    name: 'JOURNAL',
    href: '/journal',
    icon: <PencilSquareIcon className='w-5 h-5' />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'FAQ',
    href: '/faq',
    icon: <ShieldCheckIcon className='w-5 h-5' />,
    color: 'from-blue-500 to-indigo-600',
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const renderBooksDropdown = () => {
    return (
      <div className='absolute left-1/2 -translate-x-1/2 mt-0 w-[800px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-blue-200/60 hover:border-blue-300/80 py-6 z-10 animate-in slide-in-from-top-2 duration-300 transition-all'>
        <div className='absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-blue-200/60 rotate-45'></div>

        <div className='px-8 mb-6'>
          <div className='flex items-center space-x-3 mb-2'>
            <div className='p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white'>
              <BookOpenIcon className='w-6 h-6' />
            </div>
            <h3 className='text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
              Dr. Quadri&apos;s Books
            </h3>
          </div>
          <p className='text-sm text-slate-600 ml-14'>
            Therapeutic literature for mental wellness and personal growth
          </p>
        </div>

        {bookItems.length === 0 ? (
          <div className='px-8 py-12 text-center'>
            <div className='text-slate-400 mb-4'>
              <BookOpenIcon className='w-20 h-20 mx-auto mb-4' />
            </div>
            <h4 className='text-xl font-semibold text-slate-700 mb-2'>
              No Books Available
            </h4>
            <p className='text-slate-500'>New publications coming soon!</p>
          </div>
        ) : (
          <div className='relative books-swiper'>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              navigation={{
                nextEl: '.books-swiper-next',
                prevEl: '.books-swiper-prev',
              }}
              pagination={{
                clickable: true,
                el: '.books-swiper-pagination',
              }}
              autoplay={
                bookItems.length > 4
                  ? {
                      delay: 4000,
                      disableOnInteraction: false,
                    }
                  : false
              }
              loop={bookItems.length > 4}
              className='px-8'
            >
              {bookItems.map((book) => (
                <SwiperSlide key={book.id}>
                  <Link
                    href={book.href}
                    className='group block bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 rounded-2xl p-5 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-blue-200/60 hover:border-blue-300'
                  >
                    <div className='aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={200}
                        height={267}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                        onError={(e) => {
                          console.error('Failed to load image:', book.image);
                          e.currentTarget.src = '/placeholder-book.jpg';
                        }}
                      />
                    </div>
                    <h4 className='font-bold text-sm text-slate-800 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors'>
                      {book.title}
                    </h4>
                    <p className='text-xs text-slate-600 line-clamp-2 leading-relaxed'>
                      {book.description}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {bookItems.length > 4 && (
              <>
                <button className='books-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl border border-emerald-100/50 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-all duration-300 hover:scale-110'>
                  <ChevronLeftIcon className='w-6 h-6' />
                </button>
                <button className='books-swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl border border-emerald-100/50 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-all duration-300 hover:scale-110'>
                  <ChevronRightIcon className='w-6 h-6' />
                </button>
              </>
            )}
          </div>
        )}

        {bookItems.length > 4 && (
          <div className='books-swiper-pagination flex justify-center mt-6 space-x-2'></div>
        )}

        {bookItems.length > 0 && (
          <div className='px-8 mt-4 pt-4 border-t border-emerald-100/50'>
            <Link
              href='/books'
              className='flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 hover:shadow-lg hover:scale-105'
            >
              <BookOpenIcon className='w-4 h-4 mr-2' />
              Explore All Books
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-gradient-to-r from-blue-50/95 via-indigo-50/95 to-purple-50/95 backdrop-blur-xl shadow-2xl border-b border-blue-200/50'
            : 'bg-gradient-to-r from-blue-100/80 via-indigo-100/70 to-purple-100/60 backdrop-blur-sm'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            {/* Logo */}
            <div className='flex-shrink-0 flex items-center'>
              <Link href='/'>
                <Image
                  src='/SMQ.png'
                  alt='SMQ - Partner in emotional health'
                  width={200}
                  height={100}
                  className='h-24 w-auto object-contain'
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:block'>
              <div className='flex items-center space-x-2'>
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className='relative group'
                    onMouseEnter={() =>
                      item.hasDropdown && handleMouseEnter(item.name)
                    }
                    onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                  >
                    <div
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer hover:shadow-lg border border-transparent hover:border-white/50 bg-gradient-to-r ${
                        item.color || 'from-slate-500 to-gray-500'
                      } bg-clip-text text-transparent hover:from-blue-600 hover:to-indigo-600 hover:bg-white/10`}
                    >
                      <div
                        className={`p-1.5 rounded-lg bg-gradient-to-r ${
                          item.color || 'from-slate-500 to-gray-500'
                        } text-white`}
                      >
                        {item.icon}
                      </div>
                      {item.hasDropdown ? (
                        <Link href={item.href} className='mr-1'>
                          {item.name}
                        </Link>
                      ) : (
                        <Link href={item.href}>{item.name}</Link>
                      )}
                      {item.hasDropdown && (
                        <ChevronDownIcon
                          className={`w-4 h-4 transition-all duration-300 ${
                            activeDropdown === item.name
                              ? 'rotate-180 text-blue-600'
                              : 'text-slate-500'
                          }`}
                        />
                      )}
                    </div>

                    {/* Dropdown Menu */}
                    {item.hasDropdown && activeDropdown === item.name && (
                      <>
                        {/* Invisible bridge to prevent dropdown from disappearing */}
                        <div className='absolute left-0 top-full w-full h-2 bg-transparent z-10'></div>
                        {item.isBooks ? (
                          renderBooksDropdown()
                        ) : (
                          <div className='absolute left-0 mt-0 w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-blue-200/60 hover:border-blue-300/80 py-4 z-10 animate-in slide-in-from-top-2 duration-300 transition-all'>
                            <div className='absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-blue-200/60 rotate-45'></div>
                            <div className='px-6 mb-4'>
                              <div className='flex items-center space-x-3'>
                                <div
                                  className={`p-2 rounded-xl bg-gradient-to-r ${
                                    item.color || 'from-slate-500 to-gray-500'
                                  } text-white`}
                                >
                                  {item.icon}
                                </div>
                                <h3
                                  className={`text-lg font-bold bg-gradient-to-r ${
                                    item.color || 'from-slate-500 to-gray-500'
                                  } bg-clip-text text-transparent`}
                                >
                                  {item.name}
                                </h3>
                              </div>
                            </div>
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`group flex items-start mt-1 px-6 py-4 text-sm transition-all duration-300 mx-2 rounded-2xl ${
                                  dropdownItem.featured
                                    ? 'text-blue-700 bg-blue-100/60 hover:bg-blue-200/90 hover:text-blue-800 border-l-4 border-blue-500 shadow-sm'
                                    : 'text-slate-700 bg-transparent hover:bg-blue-100/70 hover:text-blue-800 border-l-4 border-transparent hover:border-blue-400 hover:shadow-md'
                                }`}
                              >
                                <div
                                  className={`mr-4 mt-0.5 p-2 rounded-xl transition-all duration-300 ${
                                    dropdownItem.featured
                                      ? 'bg-blue-200 text-blue-700 group-hover:bg-blue-300 group-hover:text-blue-800'
                                      : 'bg-slate-100 text-slate-600 group-hover:bg-blue-200 group-hover:text-blue-700'
                                  }`}
                                >
                                  {dropdownItem.icon}
                                </div>
                                <div className='flex-1'>
                                  <div className='font-bold mb-1'>
                                    {dropdownItem.name}
                                  </div>
                                  {dropdownItem.description && (
                                    <div
                                      className={`text-xs leading-relaxed ${
                                        dropdownItem.featured
                                          ? 'text-blue-600/80'
                                          : 'text-slate-500'
                                      }`}
                                    >
                                      {dropdownItem.description}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Search and Mobile Menu */}
            <div className='flex items-center space-x-3'>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className='relative text-slate-600 hover:text-blue-700 p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-100'
              >
                <MagnifyingGlassIcon className='w-5 h-5' />
                {searchOpen && (
                  <div className='absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-100/50 p-4 z-10'>
                    <input
                      type='text'
                      placeholder='Search podcasts, books, topics...'
                      className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                      autoFocus
                    />
                  </div>
                )}
              </button>

              <div className='lg:hidden'>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='text-slate-600 hover:text-blue-700 p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-md border border-transparent hover:border-blue-100'
                >
                  <Bars3Icon className='w-6 h-6' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navItems={navItems}
        bookItems={bookItems}
      />
    </>
  );
}
