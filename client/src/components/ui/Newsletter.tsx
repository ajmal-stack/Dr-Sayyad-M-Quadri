'use client';

import { useState } from 'react';
import {
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
  SparklesIcon,
  GiftIcon,
  ClockIcon,
  ShieldCheckIcon,
  BellIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleIconSolid,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';

interface NewsletterStats {
  subscribers: string;
  articles: string;
  rating: number;
  deliveryRate: string;
}

interface NewsletterBenefit {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
}

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('weekly');

  const stats: NewsletterStats = {
    subscribers: '12,500+',
    articles: '150+',
    rating: 4.9,
    deliveryRate: '99.8%',
  };

  const benefits: NewsletterBenefit[] = [
    {
      icon: SparklesIcon,
      title: 'Expert Insights',
      description: 'Weekly mental health tips from Dr. Quadri',
      color: 'text-yellow-400',
    },
    {
      icon: GiftIcon,
      title: 'Exclusive Content',
      description: 'Subscriber-only resources and guides',
      color: 'text-purple-400',
    },
    {
      icon: BellIcon,
      title: 'Early Access',
      description: 'Be first to know about new content',
      color: 'text-blue-400',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy Protected',
      description: 'Your data is secure and never shared',
      color: 'text-green-400',
    },
  ];

  const plans = [
    {
      id: 'weekly',
      name: 'Weekly Digest',
      description: 'Perfect for busy professionals',
      frequency: 'Every Monday',
      icon: '📅',
      popular: true,
    },
    {
      id: 'biweekly',
      name: 'Bi-Weekly Updates',
      description: 'Balanced approach to stay informed',
      frequency: 'Every other Tuesday',
      icon: '📋',
      popular: false,
    },
    {
      id: 'monthly',
      name: 'Monthly Summary',
      description: 'Comprehensive monthly insights',
      frequency: 'First of each month',
      icon: '📊',
      popular: false,
    },
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 2000);
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      content:
        'The weekly insights have transformed my approach to mental wellness.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      content:
        "Dr. Quadri's tips are practical and easy to implement in daily life.",
      rating: 5,
      avatar: '👨‍💻',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Teacher',
      content:
        'The exclusive content has been invaluable for my personal growth.',
      rating: 5,
      avatar: '👩‍🏫',
    },
  ];

  if (isSubscribed) {
    return (
      <section className='py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
        {/* Animated Background */}
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100/50 via-transparent to-emerald-100/50'></div>
          <div className='absolute top-10 right-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-10 left-10 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        </div>

        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative'>
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-green-100 shadow-2xl'>
            <div className='text-8xl mb-6 animate-bounce'>🎉</div>
            <div className='inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-6'>
              <CheckCircleIconSolid className='w-5 h-5 mr-2 text-green-600' />
              Successfully Subscribed!
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
              Welcome to Our Community!
            </h2>
            <p className='text-xl text-slate-600 mb-8 leading-relaxed'>
              Thank you for joining {stats.subscribers} mental health
              enthusiasts. Your first newsletter will arrive soon!
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='bg-green-50 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg'>
                <div className='text-3xl mb-2'>📧</div>
                <div className='text-sm text-green-600'>What&apos;s Next</div>
                <div className='text-slate-900 font-semibold'>
                  Check your email
                </div>
              </div>
              <div className='bg-green-50 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg'>
                <div className='text-3xl mb-2'>🎁</div>
                <div className='text-sm text-green-600'>Bonus</div>
                <div className='text-slate-900 font-semibold'>
                  Welcome guide included
                </div>
              </div>
              <div className='bg-green-50 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg'>
                <div className='text-3xl mb-2'>⏰</div>
                <div className='text-sm text-green-600'>Frequency</div>
                <div className='text-slate-900 font-semibold'>
                  Weekly insights
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSubscribed(false)}
              className='bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100/50 via-transparent to-emerald-100/50'></div>
        <div className='absolute top-10 right-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 left-10 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Main Newsletter Section */}
        <div className='text-center mb-8'>
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-green-100 shadow-2xl'>
            <div className='inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6'>
              <EnvelopeIcon className='w-4 h-4 mr-2' />
              Newsletter
            </div>

            <div className='text-6xl mb-6 animate-pulse'>📧</div>
            <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
              Stay Connected
            </h2>
            <p className='text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto'>
              Get weekly insights, mental health tips, and exclusive content
              delivered to your inbox
            </p>

            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              <div className='bg-green-50 backdrop-blur-sm rounded-2xl p-4 border border-green-100 shadow-lg'>
                <div className='text-2xl font-bold text-green-600'>
                  {stats.subscribers}
                </div>
                <div className='text-sm text-slate-600'>Subscribers</div>
              </div>
              <div className='bg-blue-50 backdrop-blur-sm rounded-2xl p-4 border border-blue-100 shadow-lg'>
                <div className='text-2xl font-bold text-blue-600'>
                  {stats.articles}
                </div>
                <div className='text-sm text-slate-600'>Articles Sent</div>
              </div>
              <div className='bg-yellow-50 backdrop-blur-sm rounded-2xl p-4 border border-yellow-100 shadow-lg'>
                <div className='flex items-center justify-center'>
                  <div className='text-2xl font-bold text-yellow-600 mr-1'>
                    {stats.rating}
                  </div>
                  <StarIconSolid className='w-5 h-5 text-yellow-500' />
                </div>
                <div className='text-sm text-slate-600'>Avg Rating</div>
              </div>
              <div className='bg-indigo-50 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100 shadow-lg'>
                <div className='text-2xl font-bold text-indigo-600'>
                  {stats.deliveryRate}
                </div>
                <div className='text-sm text-slate-600'>Delivery Rate</div>
              </div>
            </div>

            {/* Subscription Plans */}
            <div className='mb-8'>
              <h3 className='text-2xl font-bold text-slate-900 mb-6'>
                Choose Your Frequency
              </h3>
              <div className='grid md:grid-cols-3 gap-4'>
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-blue-50 border-blue-200 scale-105 shadow-lg'
                        : 'bg-white/70 border-slate-200 hover:bg-blue-50/50 hover:border-blue-200'
                    } backdrop-blur-sm rounded-2xl p-6 border shadow-md`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                        Most Popular
                      </div>
                    )}
                    <div className='text-4xl mb-4'>{plan.icon}</div>
                    <h4 className='text-lg font-bold text-slate-900 mb-2'>
                      {plan.name}
                    </h4>
                    <p className='text-slate-600 text-sm mb-2'>
                      {plan.description}
                    </p>
                    <div className='text-xs text-slate-500'>
                      {plan.frequency}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className='max-w-lg mx-auto mb-8'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex-1'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email address'
                    className='w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-300'
                    disabled={isLoading}
                  />
                  {error && (
                    <div className='flex items-center mt-2 text-red-600 text-sm'>
                      <ExclamationCircleIcon className='w-4 h-4 mr-1' />
                      {error}
                    </div>
                  )}
                </div>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {isLoading ? (
                    <div className='flex items-center'>
                      <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>

            <p className='text-sm text-slate-600'>
              Join {stats.subscribers} subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className='grid md:grid-cols-2 gap-8 mb-8'>
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-xl'>
            <h3 className='text-2xl font-bold text-slate-900 mb-6 flex items-center'>
              <SparklesIcon className='w-6 h-6 mr-2 text-yellow-500' />
              Why Subscribe?
            </h3>
            <div className='space-y-4'>
              {benefits.map((benefit, index) => (
                <div key={index} className='flex items-start gap-4'>
                  <div
                    className={`p-3 bg-slate-100 rounded-xl ${benefit.color}`}
                  >
                    <benefit.icon className='w-5 h-5' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-slate-900'>
                      {benefit.title}
                    </h4>
                    <p className='text-slate-600 text-sm'>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-xl'>
            <h3 className='text-2xl font-bold text-slate-900 mb-6 flex items-center'>
              <HeartIcon className='w-6 h-6 mr-2 text-red-500' />
              What Subscribers Say
            </h3>
            <div className='space-y-4'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className='bg-slate-50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200 shadow-md'
                >
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='text-2xl'>{testimonial.avatar}</div>
                    <div>
                      <div className='font-semibold text-slate-900 text-sm'>
                        {testimonial.name}
                      </div>
                      <div className='text-slate-600 text-xs'>
                        {testimonial.role}
                      </div>
                    </div>
                    <div className='ml-auto flex'>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className='w-4 h-4 text-yellow-400'
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-slate-700 text-sm italic'>
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className='text-center'>
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-xl'>
            <div className='flex flex-wrap justify-center items-center gap-8 text-slate-600'>
              <div className='flex items-center'>
                <ShieldCheckIcon className='w-5 h-5 mr-2 text-green-500' />
                <span className='text-sm'>GDPR Compliant</span>
              </div>
              <div className='flex items-center'>
                <CheckCircleIcon className='w-5 h-5 mr-2 text-blue-500' />
                <span className='text-sm'>No Spam Promise</span>
              </div>
              <div className='flex items-center'>
                <ClockIcon className='w-5 h-5 mr-2 text-purple-500' />
                <span className='text-sm'>2-Minute Read</span>
              </div>
              <div className='flex items-center'>
                <UserGroupIcon className='w-5 h-5 mr-2 text-indigo-500' />
                <span className='text-sm'>Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
