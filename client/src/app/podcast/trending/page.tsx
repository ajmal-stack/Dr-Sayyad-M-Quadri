export default function TrendingEpisodesPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            <span className='bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent'>
              Trending Episodes
            </span>
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Discover the most popular and impactful episodes that are resonating
            with our community right now.
          </p>
        </div>

        {/* Trending Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
            <div className='text-3xl font-bold text-teal-600 mb-2'>2.3M</div>
            <div className='text-gray-600'>Total Plays This Week</div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
            <div className='text-3xl font-bold text-teal-600 mb-2'>456</div>
            <div className='text-gray-600'>New Subscribers</div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
            <div className='text-3xl font-bold text-teal-600 mb-2'>89%</div>
            <div className='text-gray-600'>Completion Rate</div>
          </div>
        </div>

        {/* Top Trending Episodes */}
        <div className='space-y-6'>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
            >
              <div className='flex flex-col md:flex-row'>
                <div className='md:w-80 h-48 md:h-auto bg-gradient-to-br from-teal-400 to-cyan-500 relative'>
                  <div className='absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                    #{i + 1} Trending
                  </div>
                  <div className='absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white'>
                    {Math.floor(Math.random() * 30) + 30} min
                  </div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <button className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'>
                      <svg
                        className='w-6 h-6 text-white ml-1'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M8 5v14l11-7z' />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='flex-1 p-6'>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium'>
                      {
                        [
                          'Spirituality',
                          'Personal Growth',
                          'Mindfulness',
                          'Life Purpose',
                        ][Math.floor(Math.random() * 4)]
                      }
                    </span>
                    <span className='text-xs text-gray-500'>
                      {new Date(
                        Date.now() -
                          Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </span>
                    <div className='flex items-center ml-auto'>
                      <div className='text-teal-600 font-medium text-sm'>
                        🔥 {Math.floor(Math.random() * 50) + 50}K plays
                      </div>
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {
                      [
                        'The Power of Mindful Living in a Digital Age',
                        'Discovering Your True Purpose Through Spiritual Practice',
                        'Breaking Free from Limiting Beliefs',
                        'The Art of Inner Peace and Contentment',
                        'Transforming Challenges into Growth Opportunities',
                        'Building Meaningful Relationships in Modern Times',
                        'The Journey to Self-Discovery and Authenticity',
                        'Cultivating Gratitude and Abundance Mindset',
                      ][i]
                    }
                  </h3>
                  <p className='text-gray-600 mb-4'>
                    A transformative conversation exploring how to navigate
                    life&apos;s challenges while staying true to your authentic
                    self and spiritual values.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex items-center space-x-1'>
                        <div className='w-2 h-2 bg-teal-500 rounded-full'></div>
                        <span className='text-sm text-gray-600'>95% liked</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <div className='w-2 h-2 bg-cyan-500 rounded-full'></div>
                        <span className='text-sm text-gray-600'>
                          {Math.floor(Math.random() * 200) + 100} shares
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <button className='text-gray-500 hover:text-teal-600 p-2 rounded-full hover:bg-teal-50 transition-colors'>
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                        </svg>
                      </button>
                      <button className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors'>
                        Listen Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className='mt-12 text-center'>
          <button className='bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl'>
            Load More Trending Episodes
          </button>
        </div>
      </div>
    </div>
  );
}
