'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/user', icon: '🏠' },
    { name: 'Browse Books', href: '/books', icon: '📚' },
    { name: 'Listen Podcasts', href: '/podcast', icon: '🎙️' },
    { name: 'About Dr. Quadri', href: '/about', icon: '👨‍⚕️' },
    { name: 'Contact', href: '/contact', icon: '📞' },
    { name: 'Profile Settings', href: '/user/profile', icon: '⚙️' },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo and main nav */}
            <div className='flex items-center'>
              <div className='flex-shrink-0 flex items-center'>
                <div className='h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>DQ</span>
                </div>
                <h1 className='ml-3 text-xl font-semibold text-gray-900 hidden sm:block'>
                  Dr. Syed M Quadri
                </h1>
              </div>

              {/* Desktop navigation */}
              <nav className='hidden md:flex md:ml-8 md:space-x-8'>
                {navigation.slice(0, -1).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
                  >
                    <span className='mr-2'>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* User menu */}
            <div className='flex items-center space-x-4'>
              {/* Profile dropdown */}
              <div className='relative group'>
                <button className='flex items-center text-sm rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  <span className='sr-only'>Open user menu</span>
                  <div className='h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <span className='text-blue-600 font-medium text-sm'>
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className='ml-2 text-gray-700 hidden sm:block'>
                    {user.name}
                  </span>
                  <svg
                    className='ml-1 h-4 w-4 text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div className='hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                  <Link
                    href='/user/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    ⚙️ Profile Settings
                  </Link>
                  <button
                    onClick={logout}
                    className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                  >
                    🚪 Sign out
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                className='md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className='md:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className='mr-3'>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className='text-red-600 hover:text-red-800 block w-full text-left px-3 py-2 rounded-md text-base font-medium'
                >
                  🚪 Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className='bg-white border-t border-gray-200'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='col-span-1 md:col-span-2'>
              <div className='flex items-center'>
                <div className='h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>DQ</span>
                </div>
                <h3 className='ml-3 text-lg font-semibold text-gray-900'>
                  Dr. Syed M Quadri
                </h3>
              </div>
              <p className='mt-4 text-gray-600'>
                Professional psychiatric care, therapy sessions, and mental
                health guidance from a trusted healthcare provider.
              </p>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-gray-900 tracking-wider uppercase'>
                Resources
              </h4>
              <ul className='mt-4 space-y-2'>
                <li>
                  <Link
                    href='/books'
                    className='text-gray-600 hover:text-blue-600'
                  >
                    Books
                  </Link>
                </li>
                <li>
                  <Link
                    href='/podcast'
                    className='text-gray-600 hover:text-blue-600'
                  >
                    Podcasts
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-gray-600 hover:text-blue-600'
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-gray-900 tracking-wider uppercase'>
                Support
              </h4>
              <ul className='mt-4 space-y-2'>
                <li>
                  <Link
                    href='/contact'
                    className='text-gray-600 hover:text-blue-600'
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href='/user/profile'
                    className='text-gray-600 hover:text-blue-600'
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href='/privacy'
                    className='text-gray-600 hover:text-blue-600'
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-8 border-t border-gray-200 pt-8'>
            <p className='text-center text-gray-400 text-sm'>
              © 2024 Dr. Syed M Quadri. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
