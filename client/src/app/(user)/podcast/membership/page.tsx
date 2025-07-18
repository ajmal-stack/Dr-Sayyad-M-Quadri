export default function PodcastMembershipPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Access to all public episodes',
        'Basic podcast player',
        'Episode descriptions',
        'Community comments',
      ],
      limitations: [
        'Ads in episodes',
        'No offline downloads',
        'No exclusive content',
      ],
      buttonText: 'Current Plan',
      buttonStyle: 'bg-gray-600 text-white cursor-not-allowed',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      features: [
        'Ad-free listening experience',
        'Offline downloads',
        'Exclusive bonus episodes',
        'Early access to new episodes',
        'Premium community access',
        'Monthly live Q&A sessions',
        'Episode transcripts',
      ],
      limitations: [],
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-emerald-600 text-white hover:bg-emerald-700',
      popular: true,
    },
    {
      name: 'Supporter',
      price: '$19.99',
      period: 'month',
      features: [
        'All Premium features',
        'Monthly 1-on-1 mentoring call',
        'Access to private Discord community',
        'Monthly book recommendations',
        'Behind-the-scenes content',
        'Personal development resources',
        'Direct access to Dr. Quadri',
      ],
      limitations: [],
      buttonText: 'Join Supporters',
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700',
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Premium Member',
      content:
        'The exclusive content and ad-free experience have transformed my spiritual journey. The monthly Q&A sessions are incredibly valuable.',
      avatar: '👩‍💼',
    },
    {
      name: 'Michael Chen',
      role: 'Supporter',
      content:
        'The 1-on-1 mentoring calls have been life-changing. Dr. Quadri&apos;s guidance has helped me find my true purpose.',
      avatar: '👨‍💻',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Premium Member',
      content:
        'Being able to download episodes for offline listening during my commute has been a game-changer for my daily mindfulness practice.',
      avatar: '👩‍🎨',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Podcast Membership
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto mb-8'>
            Deepen your spiritual journey with exclusive content, ad-free
            listening, and direct access to transformative wisdom.
          </p>
          <div className='bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full inline-block font-medium'>
            🎁 Start with a 14-day free trial
          </div>
        </div>

        {/* Pricing Plans */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${
                plan.popular
                  ? 'ring-2 ring-emerald-500 transform scale-105'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className='absolute top-0 left-0 right-0 bg-emerald-600 text-white text-center py-2 text-sm font-medium'>
                  Most Popular
                </div>
              )}
              <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                <div className='text-center mb-6'>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {plan.name}
                  </h3>
                  <div className='text-4xl font-bold text-gray-900 mb-1'>
                    {plan.price}
                    {plan.price !== '$0' && (
                      <span className='text-lg text-gray-600'>
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className='space-y-3 mb-6'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='flex items-start'>
                      <svg
                        className='w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-gray-700'>{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className='flex items-start'>
                      <svg
                        className='w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='text-gray-500'>{limitation}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Highlight */}
        <div className='bg-white rounded-xl shadow-lg p-8 mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Premium Features
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-emerald-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Ad-Free Experience
              </h3>
              <p className='text-gray-600'>
                Enjoy uninterrupted listening without any advertisements
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Offline Downloads
              </h3>
              <p className='text-gray-600'>
                Download episodes for offline listening anytime, anywhere
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Exclusive Content
              </h3>
              <p className='text-gray-600'>
                Access bonus episodes and behind-the-scenes content
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Community Access
              </h3>
              <p className='text-gray-600'>
                Join our premium community for deeper discussions
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-yellow-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Live Q&A Sessions
              </h3>
              <p className='text-gray-600'>
                Monthly live sessions with Dr. Quadri for direct interaction
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Episode Transcripts
              </h3>
              <p className='text-gray-600'>
                Full transcripts for better accessibility and reference
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            What Our Members Say
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <div key={index} className='bg-white rounded-xl shadow-lg p-6'>
                <div className='flex items-center mb-4'>
                  <div className='text-3xl mr-3'>{testimonial.avatar}</div>
                  <div>
                    <div className='font-semibold text-gray-900'>
                      {testimonial.name}
                    </div>
                    <div className='text-sm text-emerald-600'>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className='text-gray-600 italic'>
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Can I cancel my membership anytime?
              </h3>
              <p className='text-gray-600'>
                Yes, you can cancel your membership at any time. You&apos;ll
                continue to have access to premium features until the end of
                your current billing period.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                What happens to my downloads if I cancel?
              </h3>
              <p className='text-gray-600'>
                Downloaded episodes will remain on your device, but you
                won&apos;t be able to download new episodes without an active
                membership.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Is there a family plan available?
              </h3>
              <p className='text-gray-600'>
                Currently, we offer individual memberships only. However,
                we&apos;re working on family plans and will announce them soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
