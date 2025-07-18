'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function EpisodeSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const mockResults = [
    {
      id: 1,
      title: 'Finding Your Purpose in Modern Life',
      description:
        'A comprehensive guide to discovering your life purpose and aligning with your values.',
      duration: '45 min',
      date: '2024-01-15',
      category: 'Life Purpose',
      plays: '12.5K',
      transcript:
        'In this episode, we explore the profound question of purpose...',
    },
    {
      id: 2,
      title: 'The Art of Mindful Living',
      description:
        'Practical techniques for incorporating mindfulness into daily routines.',
      duration: '38 min',
      date: '2024-01-10',
      category: 'Mindfulness',
      plays: '8.3K',
      transcript: 'Mindfulness is not just a practice, but a way of being...',
    },
    {
      id: 3,
      title: 'Spiritual Growth Through Challenges',
      description:
        'How to transform life difficulties into opportunities for spiritual development.',
      duration: '52 min',
      date: '2024-01-05',
      category: 'Spirituality',
      plays: '15.7K',
      transcript:
        'Every challenge carries within it the seeds of transformation...',
    },
  ];

  const filteredResults = mockResults.filter((episode) => {
    const matchesSearch =
      searchQuery === '' ||
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.transcript.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      episode.category.toLowerCase() === selectedFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Episode Search
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Find specific episodes, topics, or moments from our podcast library
            using our powerful search tools.
          </p>
        </div>

        {/* Search Interface */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
          {/* Main Search Bar */}
          <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search episodes, topics, or transcript content...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg'
            />
          </div>

          {/* Filter Toggle */}
          <div className='flex items-center justify-between'>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors'
            >
              <FunnelIcon className='h-5 w-5' />
              Advanced Filters
            </button>
            <div className='text-sm text-gray-500'>
              {filteredResults.length} results found
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Category
                  </label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  >
                    <option value='all'>All Categories</option>
                    <option value='spirituality'>Spirituality</option>
                    <option value='personal growth'>Personal Growth</option>
                    <option value='mindfulness'>Mindfulness</option>
                    <option value='life purpose'>Life Purpose</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Duration
                  </label>
                  <select className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'>
                    <option>Any Duration</option>
                    <option>Under 30 min</option>
                    <option>30-45 min</option>
                    <option>45-60 min</option>
                    <option>Over 60 min</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Date Range
                  </label>
                  <select className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'>
                    <option>Any Time</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className='space-y-6'>
          {filteredResults.length === 0 ? (
            <div className='text-center py-12'>
              <MagnifyingGlassIcon className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                No episodes found
              </h3>
              <p className='text-gray-600'>
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            filteredResults.map((episode) => (
              <div
                key={episode.id}
                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
              >
                <div className='flex flex-col md:flex-row'>
                  <div className='md:w-64 h-48 md:h-auto bg-gradient-to-br from-emerald-400 to-teal-500 relative'>
                    <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700'>
                      {episode.category}
                    </div>
                    <div className='absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white'>
                      {episode.duration}
                    </div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <button className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'>
                        <svg
                          className='w-5 h-5 text-white ml-1'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M8 5v14l11-7z' />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='flex-1 p-6'>
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className='text-xl font-semibold text-gray-900'>
                        {episode.title}
                      </h3>
                      <span className='text-sm text-gray-500'>
                        {episode.plays} plays
                      </span>
                    </div>
                    <p className='text-gray-600 mb-4'>{episode.description}</p>

                    {/* Transcript Preview */}
                    {searchQuery &&
                      episode.transcript
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) && (
                        <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                          <div className='text-sm text-gray-700'>
                            <span className='font-medium'>
                              Transcript match:
                            </span>
                            <p className='mt-1'>
                              {episode.transcript.length > 100
                                ? `${episode.transcript.substring(0, 100)}...`
                                : episode.transcript}
                            </p>
                          </div>
                        </div>
                      )}

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        <span className='text-sm text-gray-500'>
                          Published:{' '}
                          {new Date(episode.date).toLocaleDateString()}
                        </span>
                        <span className='bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium'>
                          {episode.category}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <button className='text-gray-500 hover:text-emerald-600 px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors text-sm'>
                          Save
                        </button>
                        <button className='bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm'>
                          Listen Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Tips */}
        <div className='mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-white'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Search Tips</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='text-center'>
              <div className='text-3xl mb-2'>🔍</div>
              <h3 className='font-semibold mb-2'>Smart Search</h3>
              <p className='text-emerald-100 text-sm'>
                Search titles, descriptions, and even transcript content
              </p>
            </div>
            <div className='text-center'>
              <div className='text-3xl mb-2'>🏷️</div>
              <h3 className='font-semibold mb-2'>Filter by Category</h3>
              <p className='text-emerald-100 text-sm'>
                Narrow down results by topic, duration, or date
              </p>
            </div>
            <div className='text-center'>
              <div className='text-3xl mb-2'>💾</div>
              <h3 className='font-semibold mb-2'>Save for Later</h3>
              <p className='text-emerald-100 text-sm'>
                Save episodes to your personal library for easy access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
