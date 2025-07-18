export default function AllEpisodesPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            All Podcast Episodes
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Browse through our complete collection of podcast episodes covering
            personal development, spirituality, and meaningful living.
          </p>
        </div>

        {/* Filter and Sort Options */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <select className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'>
                <option>All Categories</option>
                <option>Spirituality</option>
                <option>Personal Growth</option>
                <option>Mindfulness</option>
                <option>Life Purpose</option>
              </select>
              <select className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'>
                <option>Sort by: Latest</option>
                <option>Sort by: Oldest</option>
                <option>Sort by: Most Popular</option>
                <option>Sort by: Duration</option>
              </select>
            </div>
            <div className='text-sm text-gray-600'>
              Showing 1-12 of 156 episodes
            </div>
          </div>
        </div>

        {/* Episode Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
            >
              <div className='h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative'>
                <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700'>
                  Episode {156 - i}
                </div>
                <div className='absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white'>
                  {Math.floor(Math.random() * 30) + 30} min
                </div>
              </div>
              <div className='p-6'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className='bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium'>
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
                        Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Finding Your Purpose in Modern Life
                </h3>
                <p className='text-gray-600 mb-4 text-sm'>
                  A deep dive into understanding your life&apos;s purpose and
                  how to align your actions with your core values in
                  today&apos;s busy world.
                </p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-emerald-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>
                      {Math.floor(Math.random() * 10) + 5}K plays
                    </span>
                  </div>
                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm'>
                    Listen Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='mt-12 flex justify-center'>
          <nav className='flex items-center space-x-2'>
            <button className='px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'>
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-2 rounded-lg ${
                  page === 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button className='px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'>
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
