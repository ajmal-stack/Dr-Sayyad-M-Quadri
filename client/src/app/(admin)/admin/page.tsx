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

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalPodcasts: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats (mock data for now)
    setStats({
      totalUsers: 156,
      totalBooks: 5,
      totalPodcasts: 12,
      totalContacts: 23,
    });
  }, []);

  return (
    <div className='p-6'>
      {/* Welcome Section */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Dashboard Overview</h1>
        <p className='mt-2 text-gray-600'>
          Welcome to the admin panel. Here's what's happening with your platform
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
        {/* Users */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                  />
                </svg>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Total Users
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {stats.totalUsers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Books */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-gray-400'
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
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Published Books
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {stats.totalBooks}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Podcasts */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-gray-400'
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
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    Podcast Episodes
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {stats.totalPodcasts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='p-5'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <div className='ml-5 w-0 flex-1'>
                <dl>
                  <dt className='text-sm font-medium text-gray-500 truncate'>
                    New Contacts
                  </dt>
                  <dd className='text-lg font-medium text-gray-900'>
                    {stats.totalContacts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Recent Users */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
              Recent Users
            </h3>
            <div className='space-y-3'>
              {[
                {
                  name: 'John Doe',
                  email: 'john@example.com',
                  role: 'User',
                  time: '2 hours ago',
                },
                {
                  name: 'Jane Smith',
                  email: 'jane@example.com',
                  role: 'User',
                  time: '5 hours ago',
                },
                {
                  name: 'Bob Wilson',
                  email: 'bob@example.com',
                  role: 'User',
                  time: '1 day ago',
                },
              ].map((user, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center'>
                      <span className='text-gray-600 font-medium text-sm'>
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-900'>
                        {user.name}
                      </p>
                      <p className='text-xs text-gray-500'>{user.email}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800'>
                      {user.role}
                    </span>
                    <p className='text-xs text-gray-500 mt-1'>{user.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className='bg-white overflow-hidden shadow rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
              Recent Contacts
            </h3>
            <div className='space-y-3'>
              {[
                {
                  name: 'Sarah Johnson',
                  subject: 'Book Collaboration Inquiry',
                  status: 'new',
                  time: '1 hour ago',
                },
                {
                  name: 'Michael Chen',
                  subject: 'Speaking Engagement Request',
                  status: 'read',
                  time: '3 hours ago',
                },
                {
                  name: 'Emily Rodriguez',
                  subject: 'Podcast Guest Interest',
                  status: 'replied',
                  time: '6 hours ago',
                },
              ].map((contact, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>
                      {contact.name}
                    </p>
                    <p className='text-xs text-gray-500'>{contact.subject}</p>
                  </div>
                  <div className='text-right'>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        contact.status === 'new'
                          ? 'bg-green-100 text-green-800'
                          : contact.status === 'read'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {contact.status}
                    </span>
                    <p className='text-xs text-gray-500 mt-1'>{contact.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-white overflow-hidden shadow rounded-lg'>
        <div className='px-4 py-5 sm:p-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
            Quick Actions
          </h3>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <button className='relative group bg-blue-50 p-4 focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg hover:bg-blue-100 transition-colors text-left'>
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
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </span>
              </div>
              <div className='mt-4'>
                <h4 className='text-lg font-medium text-gray-900'>
                  Add New Book
                </h4>
                <p className='mt-2 text-sm text-gray-500'>
                  Create and publish new books to the platform.
                </p>
              </div>
            </button>

            <button className='relative group bg-green-50 p-4 focus:ring-2 focus:ring-inset focus:ring-green-500 rounded-lg hover:bg-green-100 transition-colors text-left'>
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
                  Upload Podcast
                </h4>
                <p className='mt-2 text-sm text-gray-500'>
                  Upload and publish new podcast episodes.
                </p>
              </div>
            </button>

            <button className='relative group bg-purple-50 p-4 focus:ring-2 focus:ring-inset focus:ring-purple-500 rounded-lg hover:bg-purple-100 transition-colors text-left'>
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
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                    />
                  </svg>
                </span>
              </div>
              <div className='mt-4'>
                <h4 className='text-lg font-medium text-gray-900'>
                  Manage Users
                </h4>
                <p className='mt-2 text-sm text-gray-500'>
                  View, edit, and manage user accounts.
                </p>
              </div>
            </button>

            <button className='relative group bg-yellow-50 p-4 focus:ring-2 focus:ring-inset focus:ring-yellow-500 rounded-lg hover:bg-yellow-100 transition-colors text-left'>
              <div>
                <span className='rounded-lg inline-flex p-3 bg-yellow-600 text-white'>
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
                      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                    />
                  </svg>
                </span>
              </div>
              <div className='mt-4'>
                <h4 className='text-lg font-medium text-gray-900'>
                  View Analytics
                </h4>
                <p className='mt-2 text-sm text-gray-500'>
                  Access platform analytics and insights.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
