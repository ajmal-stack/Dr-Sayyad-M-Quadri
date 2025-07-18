'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      (!user || (user.role !== 'Admin' && user.role !== 'SuperAdmin'))
    ) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  if (!user || (user.role !== 'Admin' && user.role !== 'SuperAdmin')) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Books Management', href: '/admin/books', icon: '📚' },
    { name: 'Podcasts Management', href: '/admin/podcasts', icon: '🎙️' },
    { name: 'Contacts', href: '/admin/contacts', icon: '💬' },
    ...(user.permissions.canManageUsers
      ? [{ name: 'User Management', href: '/admin/users', icon: '👥' }]
      : []),
    ...(user.permissions.canAccessAnalytics
      ? [{ name: 'Analytics', href: '/admin/analytics', icon: '📈' }]
      : []),
    { name: 'File Uploads', href: '/admin/uploads', icon: '📁' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? '' : 'hidden'
        }`}
      >
        <div
          className='fixed inset-0 bg-gray-600 bg-opacity-75'
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className='relative flex-1 flex flex-col max-w-xs w-full bg-white'>
          <div className='absolute top-0 right-0 -mr-12 pt-2'>
            <button
              className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              onClick={() => setSidebarOpen(false)}
            >
              <span className='sr-only'>Close sidebar</span>
              <svg
                className='h-6 w-6 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <SidebarContent navigation={navigation} user={user} logout={logout} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
        <SidebarContent navigation={navigation} user={user} logout={logout} />
      </div>

      {/* Main content */}
      <div className='md:pl-64 flex flex-col flex-1'>
        {/* Top bar */}
        <div className='sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50'>
          <button
            className='-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
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

        {/* Page content */}
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  navigation,
  user,
  logout,
}: {
  navigation: any[];
  user: any;
  logout: () => void;
}) {
  return (
    <div className='flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200'>
      {/* Logo */}
      <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
        <div className='flex items-center flex-shrink-0 px-4'>
          <div className='h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>DQ</span>
          </div>
          <h1 className='ml-3 text-xl font-semibold text-gray-900'>
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className='mt-8 flex-1 px-2 space-y-1'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className='group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            >
              <span className='mr-3 text-lg'>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* User profile */}
      <div className='flex-shrink-0 flex border-t border-gray-200 p-4'>
        <div className='flex-shrink-0 group block'>
          <div className='flex items-center'>
            <div>
              <div className='h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center'>
                <span className='text-indigo-600 font-medium text-sm'>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                {user.name}
              </p>
              <div className='flex items-center space-x-2'>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    user.role === 'SuperAdmin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {user.role}
                </span>
                <button
                  onClick={logout}
                  className='text-xs text-red-600 hover:text-red-900'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
