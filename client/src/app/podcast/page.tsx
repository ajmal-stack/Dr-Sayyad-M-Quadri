export default function PodcastPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Podcast
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Inspiring conversations and insights on personal development,
            spirituality, and meaningful living.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Sample podcast episodes */}
          {[1, 2, 3, 4, 5, 6].map((episode) => (
            <div
              key={episode}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
            >
              <div className='h-48 bg-gradient-to-br from-emerald-400 to-teal-500'></div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Episode {episode}: Finding Your Purpose
                </h3>
                <p className='text-gray-600 mb-4'>
                  A deep dive into understanding your life&apos;s purpose and
                  how to align your actions with your values.
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>45 min</span>
                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors'>
                    Listen Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
