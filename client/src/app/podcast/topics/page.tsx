export default function PodcastTopicsPage() {
  const topics = [
    {
      name: 'Spirituality',
      description:
        'Explore spiritual practices, wisdom traditions, and inner growth',
      episodeCount: 45,
      color: 'from-purple-400 to-pink-400',
      icon: '🧘',
    },
    {
      name: 'Personal Growth',
      description: 'Development, self-improvement, and life transformation',
      episodeCount: 38,
      color: 'from-emerald-400 to-teal-400',
      icon: '🌱',
    },
    {
      name: 'Mindfulness',
      description: 'Present moment awareness and conscious living',
      episodeCount: 32,
      color: 'from-blue-400 to-cyan-400',
      icon: '🌸',
    },
    {
      name: 'Life Purpose',
      description: 'Finding meaning, direction, and authentic expression',
      episodeCount: 28,
      color: 'from-orange-400 to-red-400',
      icon: '🎯',
    },
    {
      name: 'Relationships',
      description: 'Building meaningful connections and healthy boundaries',
      episodeCount: 24,
      color: 'from-rose-400 to-pink-400',
      icon: '💝',
    },
    {
      name: 'Wisdom Traditions',
      description: 'Ancient teachings and timeless philosophical insights',
      episodeCount: 22,
      color: 'from-amber-400 to-orange-400',
      icon: '📜',
    },
    {
      name: 'Health & Wellness',
      description: 'Holistic approaches to physical and mental well-being',
      episodeCount: 19,
      color: 'from-green-400 to-emerald-400',
      icon: '🍃',
    },
    {
      name: 'Creativity',
      description: 'Artistic expression and creative problem-solving',
      episodeCount: 16,
      color: 'from-indigo-400 to-purple-400',
      icon: '🎨',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Podcast Topics
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Explore our diverse range of topics designed to inspire, educate,
            and transform your understanding of life and spirituality.
          </p>
        </div>

        {/* Topics Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {topics.map((topic) => (
            <div
              key={topic.name}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer'
            >
              <div
                className={`h-32 bg-gradient-to-r ${topic.color} flex items-center justify-center relative`}
              >
                <div className='text-4xl mb-2'>{topic.icon}</div>
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300'></div>
              </div>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {topic.name}
                  </h3>
                  <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium'>
                    {topic.episodeCount} episodes
                  </span>
                </div>
                <p className='text-gray-600 mb-4'>{topic.description}</p>
                <div className='flex items-center justify-between'>
                  <div className='text-sm text-gray-500'>
                    Latest episode: 2 days ago
                  </div>
                  <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm'>
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Topic */}
        <div className='bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-4'>
              Featured Topic: Spiritual Awakening
            </h2>
            <p className='text-xl text-emerald-100 mb-6'>
              This month we're diving deep into the journey of spiritual
              awakening - exploring the signs, stages, and transformative power
              of conscious awareness.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
                Listen to Series
              </button>
              <button className='border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors'>
                Download Guide
              </button>
            </div>
          </div>
        </div>

        {/* Recent Episodes by Topic */}
        <div className='mt-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Recent Episodes by Topic
          </h2>
          <div className='space-y-8'>
            {topics.slice(0, 3).map((topic) => (
              <div
                key={topic.name}
                className='bg-white rounded-xl shadow-lg p-6'
              >
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-2xl font-semibold text-gray-900 flex items-center gap-3'>
                    <span className='text-2xl'>{topic.icon}</span>
                    {topic.name}
                  </h3>
                  <button className='text-emerald-600 hover:text-emerald-700 font-medium'>
                    View All →
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {Array.from({ length: 3 }, (_, i) => (
                    <div
                      key={i}
                      className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                    >
                      <h4 className='font-semibold text-gray-900 mb-2'>
                        Episode {i + 1}
                      </h4>
                      <p className='text-sm text-gray-600 mb-3'>
                        Brief description of this episode covering{' '}
                        {topic.name.toLowerCase()} concepts.
                      </p>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs text-gray-500'>32 min</span>
                        <button className='text-emerald-600 hover:text-emerald-700 text-sm font-medium'>
                          Listen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
