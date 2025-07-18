'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        // Redirect to user dashboard (new users are always 'User' role)
        router.push('/user');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <div className='mx-auto h-12 w-12 bg-emerald-600 rounded-lg flex items-center justify-center'>
            <svg
              className='h-8 w-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
              />
            </svg>
          </div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Join Dr. Syed M Quadri&apos;s platform today
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='bg-white p-8 rounded-lg shadow-md space-y-6'>
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'>
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Full Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                required
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                placeholder='Enter your full name'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email Address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Phone Number <span className='text-gray-400'>(optional)</span>
              </label>
              <input
                id='phone'
                name='phone'
                type='tel'
                value={formData.phone}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                placeholder='Enter your phone number'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                placeholder='Create a password (min. 6 characters)'
              />
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                placeholder='Confirm your password'
              />
            </div>

            <div className='flex items-center'>
              <input
                id='agree-terms'
                name='agree-terms'
                type='checkbox'
                required
                className='h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded'
              />
              <label
                htmlFor='agree-terms'
                className='ml-2 block text-sm text-gray-900'
              >
                I agree to the{' '}
                <Link
                  href='/terms'
                  className='text-emerald-600 hover:text-emerald-500 font-medium'
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href='/privacy'
                  className='text-emerald-600 hover:text-emerald-500 font-medium'
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : null}
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className='text-center'>
            <span className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link
                href='/auth/login'
                className='font-medium text-emerald-600 hover:text-emerald-500'
              >
                Sign in here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
