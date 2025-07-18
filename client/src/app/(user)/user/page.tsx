'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canManageUsers: boolean;
    canManageRoles: boolean;
    canAccessAnalytics: boolean;
  };
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* Welcome Section */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>
          Welcome back, {user.name}!
        </h1>
        <p className='mt-2 text-gray-600'>
          Explore Dr. Syed M Quadri's resources and continue your wellness
          journey.
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8'>
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    className='h-5 w-5 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  </svg>
                </div>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Books Available
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>5</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='h-8 w-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <svg
                    className='h-5 w-5 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                    />
                  </svg>
                </div>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Podcast Episodes
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>12</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <div className='h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center'>
                  <svg
                    className='h-5 w-5 text-purple-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Member Since
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className='bg-white overflow-hidden shadow rounded-lg mb-8'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
            Your Account
          </h3>
          <dl className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
            <div>
              <dt className='text-sm font-medium text-gray-500'>Full name</dt>
              <dd className='mt-1 text-sm text-gray-900'>{user.name}</dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500'>
                Email address
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>{user.email}</dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500'>
                Account Status
              </dt>
              <dd className='mt-1'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500'>
                Email Verified
              </dt>
              <dd className='mt-1'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.isEmailVerified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Featured Content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Featured Books */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
              Featured Books
            </h3>
            <div className='space-y-4'>
              {[
                {
                  title: 'Mind Matters',
                  description:
                    'A comprehensive guide to mental health and wellness',
                  category: 'Health & Wellness',
                },
                {
                  title: 'Public Speaking Mastery',
                  description: 'Learn the art of effective public speaking',
                  category: 'Self-Help',
                },
              ].map((book, index) => (
                <div key={index} className='border-l-4 border-blue-500 pl-4'>
                  <h4 className='text-sm font-medium text-gray-900'>
                    {book.title}
                  </h4>
                  <p className='text-sm text-gray-500 mt-1'>
                    {book.description}
                  </p>
                  <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-2'>
                    {book.category}
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-4'>
              <a
                href='/books'
                className='text-blue-600 hover:text-blue-500 text-sm font-medium'
              >
                View all books →
              </a>
            </div>
          </div>
        </div>

        {/* Recent Podcasts */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
              Recent Podcasts
            </h3>
            <div className='space-y-4'>
              {[
                {
                  title: 'Mental Health Awareness',
                  description:
                    'Understanding the importance of mental health in modern society',
                  duration: '45:30',
                },
                {
                  title: 'Nutrition and Wellness',
                  description:
                    'How proper nutrition impacts your overall well-being',
                  duration: '38:15',
                },
              ].map((podcast, index) => (
                <div key={index} className='border-l-4 border-green-500 pl-4'>
                  <h4 className='text-sm font-medium text-gray-900'>
                    {podcast.title}
                  </h4>
                  <p className='text-sm text-gray-500 mt-1'>
                    {podcast.description}
                  </p>
                  <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-2'>
                    {podcast.duration}
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-4'>
              <a
                href='/podcast'
                className='text-green-600 hover:text-green-500 text-sm font-medium'
              >
                Listen to all episodes →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-white overflow-hidden shadow rounded-lg'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
            Explore More
          </h3>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <a
              href='/books'
              className='relative group bg-blue-50 p-6 focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg hover:bg-blue-100 transition-colors'
            >
              <div>
                <span className='rounded-lg inline-flex p-3 bg-blue-600 text-white'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  </svg>
                </span>
              </div>
              <div className='mt-4'>
                <h4 className='text-lg font-medium text-gray-900'>
                  Browse Books
                </h4>
                <p className='mt-2 text-sm text-gray-500'>
                  Explore Dr. Quadri's collection of health and wellness books.
                </p>
              </div>
            </a>

            <a
              href='/podcast'
              className='relative group bg-green-50 p-6 focus:ring-2 focus:ring-inset focus:ring-green-500 rounded-lg hover:bg-green-100 transition-colors'
            >
              <div>
                <span className='rounded-lg inline-flex p-3 bg-green-600 text-white'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                    />
                  </svg>
                </span>
              </div>
              <div className='mt-4'>
                <h4 className='text-lg font-medium text-gray-900'>
                  Listen to Podcasts
                </h4>
                <p className='mt-2 text-sm text-gray-500'>
                  Discover insightful podcast episodes on health and wellness
                  topics.
                </p>
              </div>
            </a>

            <a
              href='/about'
              className='relative group bg-purple-50 p-6 focus:ring-2 focus:ring-inset focus:ring-purple-500 rounded-lg hover:bg-purple-100 transition-colors'
            >
              <div>
                <span className='rounded-lg inline-flex p-3 bg-purple-600 text-white'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </span>
              </div>
              <div className='mt-4'>
                <h4 className='text-lg font-medium text-gray-900'>
                  About Dr. Quadri
                </h4>
                <p className='mt-2 text-sm text-gray-500'>
                  Learn more about Dr. Syed M Quadri's background and expertise.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
