export default function AboutPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <div className='w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-6'></div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Dr. Sayyed M Quadri
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Author, Speaker, and Thought Leader dedicated to sharing insights on
            personal development, spirituality, and meaningful living.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Biography */}
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Biography</h2>
            <div className='space-y-4 text-gray-600'>
              <p>
                Dr. Sayyed M Quadri is a renowned author and speaker who has
                dedicated his life to exploring the intersection of
                spirituality, personal development, and practical wisdom.
              </p>
              <p>
                With over two decades of experience in guiding individuals
                toward meaningful transformation, Dr. Quadri has touched
                countless lives through his books, podcasts, and live events.
              </p>
              <p>
                His approach combines ancient wisdom with contemporary insights,
                making complex spiritual concepts accessible to modern audiences
                seeking purpose and fulfillment.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className='bg-white rounded-xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Achievements
            </h2>
            <div className='space-y-4'>
              <div className='flex items-start'>
                <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3'></div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    Published Author
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Multiple bestselling books on spirituality and personal
                    growth
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3'></div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    International Speaker
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Keynote speaker at conferences worldwide
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3'></div>
                <div>
                  <h3 className='font-semibold text-gray-900'>Podcast Host</h3>
                  <p className='text-gray-600 text-sm'>
                    Host of popular podcast with over 1M downloads
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3'></div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    Spiritual Guide
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    Mentor to thousands seeking spiritual growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className='mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-center'>
          <h2 className='text-2xl font-bold text-white mb-4'>Get in Touch</h2>
          <p className='text-emerald-100 mb-6'>
            Ready to connect? Reach out for speaking engagements,
            collaborations, or just to say hello.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
              Send Message
            </button>
            <button className='border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors'>
              Download Press Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
