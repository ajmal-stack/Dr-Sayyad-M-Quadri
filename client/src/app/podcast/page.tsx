'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  PlayIcon,
  PauseIcon,
  ClockIcon,
  CalendarDaysIcon,
  TagIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  MicrophoneIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import {
  PlayIcon as PlayIconSolid,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid';

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  publishDate: string;
  category: string;
  tags: string[];
  audioUrl: string;
  thumbnailUrl: string;
  plays: number;
  likes: number;
  featured: boolean;
  trending: boolean;
}

const categories = [
  'All Episodes',
  'Anxiety & Stress',
  'Depression',
  'Relationships',
  'Self-Care',
  'Therapy Insights',
  'Mental Wellness',
  'Life Transitions',
];

const mockEpisodes: Episode[] = [
  {
    id: '1',
    title: 'Understanding Anxiety: Breaking the Cycle of Worry',
    description:
      'Explore effective strategies to manage anxiety and understand the root causes behind persistent worry patterns.',
    duration: '32:45',
    publishDate: '2024-01-15',
    category: 'Anxiety & Stress',
    tags: ['anxiety', 'coping-strategies', 'mental-health'],
    audioUrl: '/audio/episode-1.mp3',
    thumbnailUrl: '/banner/Parenting Unveiled (1).jpg',
    plays: 15420,
    likes: 892,
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'Building Resilient Relationships: Communication That Heals',
    description:
      'Learn how to foster deeper connections through therapeutic communication techniques and emotional intelligence.',
    duration: '28:12',
    publishDate: '2024-01-08',
    category: 'Relationships',
    tags: ['relationships', 'communication', 'emotional-health'],
    audioUrl: '/audio/episode-2.mp3',
    thumbnailUrl: '/banner/Parenting Unveiled (2).jpg',
    plays: 12350,
    likes: 756,
    featured: true,
    trending: false,
  },
  {
    id: '3',
    title: 'Depression Recovery: Finding Light in Dark Moments',
    description:
      'A compassionate exploration of depression recovery, featuring practical tools and hope-filled insights.',
    duration: '41:30',
    publishDate: '2024-01-01',
    category: 'Depression',
    tags: ['depression', 'recovery', 'hope', 'therapy'],
    audioUrl: '/audio/episode-3.mp3',
    thumbnailUrl: '/banner/Parenting Unveiled (3).jpg',
    plays: 18750,
    likes: 1240,
    featured: true,
    trending: true,
  },
  {
    id: '4',
    title: 'Self-Care Strategies for Mental Wellness',
    description:
      'Discover evidence-based self-care practices that support long-term mental health and emotional balance.',
    duration: '25:18',
    publishDate: '2023-12-25',
    category: 'Self-Care',
    tags: ['self-care', 'wellness', 'mindfulness'],
    audioUrl: '/audio/episode-4.mp3',
    thumbnailUrl: '/banner/Parenting Unveiled (4).jpg',
    plays: 9870,
    likes: 543,
    featured: false,
    trending: false,
  },
  {
    id: '5',
    title: 'Navigating Life Transitions with Grace',
    description:
      'How to handle major life changes, career shifts, and personal transformations with resilience and purpose.',
    duration: '36:22',
    publishDate: '2023-12-18',
    category: 'Life Transitions',
    tags: ['life-changes', 'resilience', 'growth'],
    audioUrl: '/audio/episode-5.mp3',
    thumbnailUrl:
      '/banner/White and Black Simple Mental Health Youtube Thumbnail.png',
    plays: 11200,
    likes: 687,
    featured: false,
    trending: true,
  },
  {
    id: '6',
    title: 'The Science of Happiness: Positive Psychology Insights',
    description:
      'Evidence-based approaches to cultivating lasting happiness and well-being through positive psychology.',
    duration: '29:45',
    publishDate: '2023-12-11',
    category: 'Mental Wellness',
    tags: ['happiness', 'positive-psychology', 'well-being'],
    audioUrl: '/audio/episode-6.mp3',
    thumbnailUrl:
      '/banner/U_White and Black Simple Mental Health Youtube Thumbnail.png',
    plays: 13450,
    likes: 821,
    featured: false,
    trending: false,
  },
];

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<Episode[]>(mockEpisodes);
  const [filteredEpisodes, setFilteredEpisodes] =
    useState<Episode[]>(mockEpisodes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Episodes');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [likedEpisodes, setLikedEpisodes] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = episodes;

    // Filter by category
    if (selectedCategory !== 'All Episodes') {
      filtered = filtered.filter(
        (episode) => episode.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (episode) =>
          episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          episode.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          episode.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredEpisodes(filtered);
  }, [episodes, selectedCategory, searchQuery]);

  const handlePlay = (episodeId: string) => {
    setCurrentlyPlaying(currentlyPlaying === episodeId ? null : episodeId);
  };

  const handleLike = (episodeId: string) => {
    const newLikedEpisodes = new Set(likedEpisodes);
    if (likedEpisodes.has(episodeId)) {
      newLikedEpisodes.delete(episodeId);
    } else {
      newLikedEpisodes.add(episodeId);
    }
    setLikedEpisodes(newLikedEpisodes);

    // Update episode likes count
    setEpisodes((prev) =>
      prev.map((episode) => {
        if (episode.id === episodeId) {
          return {
            ...episode,
            likes: likedEpisodes.has(episodeId)
              ? episode.likes - 1
              : episode.likes + 1,
          };
        }
        return episode;
      })
    );
  };

  const featuredEpisodes = episodes.filter((episode) => episode.featured);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-20'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='p-3 bg-white/20 rounded-xl backdrop-blur-sm'>
                    <MicrophoneIcon className='w-8 h-8' />
                  </div>
                  <span className='text-lg font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                    Mental Health Podcast
                  </span>
                </div>
                <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
                  Therapeutic Conversations with{' '}
                  <span className='bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
                    Dr. Quadri
                  </span>
                </h1>
                <p className='text-xl lg:text-2xl text-blue-100 leading-relaxed'>
                  Evidence-based insights, healing conversations, and practical
                  strategies for mental wellness and emotional growth.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  href='/podcast/all-episodes'
                  className='group flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl'
                >
                  <PlayIconSolid className='w-6 h-6 mr-3 group-hover:scale-110 transition-transform' />
                  Browse All Episodes
                </Link>
                <Link
                  href='/podcast/trending'
                  className='group flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 hover:scale-105'
                >
                  <SparklesIcon className='w-6 h-6 mr-3 group-hover:scale-110 transition-transform' />
                  Trending Now
                </Link>
              </div>

              <div className='grid grid-cols-3 gap-6 pt-8 border-t border-white/20'>
                <div className='text-center'>
                  <div className='text-3xl font-bold'>{episodes.length}+</div>
                  <div className='text-blue-200 text-sm'>Episodes</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold'>50K+</div>
                  <div className='text-blue-200 text-sm'>Listeners</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold'>4.9★</div>
                  <div className='text-blue-200 text-sm'>Rating</div>
                </div>
              </div>
            </div>

            <div className='relative'>
              <div className='relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
                <div className='aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mb-6 flex items-center justify-center'>
                  <MicrophoneIcon className='w-24 h-24 text-white' />
                </div>
                <h3 className='text-2xl font-bold mb-2'>Latest Episode</h3>
                <p className='text-blue-100 mb-4'>
                  {featuredEpisodes[0]?.title}
                </p>
                <button
                  onClick={() => handlePlay(featuredEpisodes[0]?.id)}
                  className='flex items-center justify-center w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300'
                >
                  {currentlyPlaying === featuredEpisodes[0]?.id ? (
                    <PauseIcon className='w-5 h-5 mr-2' />
                  ) : (
                    <PlayIcon className='w-5 h-5 mr-2' />
                  )}
                  {currentlyPlaying === featuredEpisodes[0]?.id
                    ? 'Pause'
                    : 'Play Now'}
                </button>
              </div>
              <div className='absolute -top-4 -right-4 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl'></div>
              <div className='absolute -bottom-4 -left-4 w-40 h-40 bg-purple-300/20 rounded-full blur-xl'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8'>
          <div className='flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8'>
            <div>
              <h2 className='text-3xl font-bold text-slate-800 mb-2'>
                Explore Episodes
              </h2>
              <p className='text-slate-600'>
                Discover therapeutic insights and mental health guidance
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='lg:hidden flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors'
            >
              <AdjustmentsHorizontalIcon className='w-5 h-5 mr-2' />
              Filters
            </button>
          </div>

          {/* Search Bar */}
          <div className='relative mb-6'>
            <MagnifyingGlassIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400' />
            <input
              type='text'
              placeholder='Search episodes, topics, or keywords...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300'
            />
          </div>

          {/* Category Filter */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden lg:block'
            } transition-all duration-300`}
          >
            <div className='flex flex-wrap gap-3'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episodes */}
      {featuredEpisodes.length > 0 && (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-slate-800 mb-2'>
              Featured Episodes
            </h2>
            <p className='text-slate-600'>
              Hand-picked episodes for your mental wellness journey
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {featuredEpisodes.map((episode) => (
              <div
                key={episode.id}
                className='group bg-white rounded-3xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105'
              >
                <div className='relative aspect-video overflow-hidden'>
                  <Image
                    src={episode.thumbnailUrl}
                    alt={episode.title}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
                  <div className='absolute top-4 right-4'>
                    <span className='bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold'>
                      Featured
                    </span>
                  </div>
                  <button
                    onClick={() => handlePlay(episode.id)}
                    className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  >
                    <div className='w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform'>
                      {currentlyPlaying === episode.id ? (
                        <PauseIcon className='w-8 h-8 text-blue-600' />
                      ) : (
                        <PlayIcon className='w-8 h-8 text-blue-600 ml-1' />
                      )}
                    </div>
                  </button>
                </div>
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
                      {episode.category}
                    </span>
                    <div className='flex items-center space-x-2 text-slate-500 text-sm'>
                      <ClockIcon className='w-4 h-4' />
                      <span>{episode.duration}</span>
                    </div>
                  </div>
                  <h3 className='text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                    {episode.title}
                  </h3>
                  <p className='text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {episode.description}
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4 text-sm text-slate-500'>
                      <div className='flex items-center space-x-1'>
                        <EyeIcon className='w-4 h-4' />
                        <span>{episode.plays.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleLike(episode.id)}
                        className='flex items-center space-x-1 hover:text-red-500 transition-colors'
                      >
                        {likedEpisodes.has(episode.id) ? (
                          <HeartIconSolid className='w-4 h-4 text-red-500' />
                        ) : (
                          <HeartIcon className='w-4 h-4' />
                        )}
                        <span>{episode.likes}</span>
                      </button>
                    </div>
                    <div className='flex items-center space-x-1 text-sm text-slate-500'>
                      <CalendarDaysIcon className='w-4 h-4' />
                      <span>
                        {new Date(episode.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Episodes Grid */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-slate-800 mb-2'>
            {selectedCategory === 'All Episodes'
              ? 'All Episodes'
              : selectedCategory}
          </h2>
          <p className='text-slate-600'>
            {filteredEpisodes.length} episode
            {filteredEpisodes.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredEpisodes.length === 0 ? (
          <div className='text-center py-16'>
            <MagnifyingGlassIcon className='w-16 h-16 text-slate-300 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-slate-600 mb-2'>
              No episodes found
            </h3>
            <p className='text-slate-500'>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className='space-y-6'>
            {filteredEpisodes.map((episode) => (
              <div
                key={episode.id}
                className='group bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300'
              >
                <div className='flex flex-col md:flex-row'>
                  <div className='relative md:w-80 aspect-video md:aspect-square overflow-hidden'>
                    <Image
                      src={episode.thumbnailUrl}
                      alt={episode.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent md:bg-gradient-to-t md:from-black/60 md:via-transparent md:to-transparent'></div>
                    <button
                      onClick={() => handlePlay(episode.id)}
                      className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    >
                      <div className='w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform'>
                        {currentlyPlaying === episode.id ? (
                          <PauseIcon className='w-8 h-8 text-blue-600' />
                        ) : (
                          <PlayIcon className='w-8 h-8 text-blue-600 ml-1' />
                        )}
                      </div>
                    </button>
                    {episode.trending && (
                      <div className='absolute top-4 left-4'>
                        <span className='bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center'>
                          <SparklesIcon className='w-4 h-4 mr-1' />
                          Trending
                        </span>
                      </div>
                    )}
                  </div>
                  <div className='flex-1 p-6'>
                    <div className='flex flex-col h-full'>
                      <div className='flex items-center justify-between mb-3'>
                        <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
                          {episode.category}
                        </span>
                        <div className='flex items-center space-x-2 text-slate-500 text-sm'>
                          <ClockIcon className='w-4 h-4' />
                          <span>{episode.duration}</span>
                        </div>
                      </div>
                      <h3 className='text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors'>
                        {episode.title}
                      </h3>
                      <p className='text-slate-600 leading-relaxed mb-4 flex-1'>
                        {episode.description}
                      </p>
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {episode.tags.map((tag) => (
                          <span
                            key={tag}
                            className='bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm flex items-center'
                          >
                            <TagIcon className='w-3 h-3 mr-1' />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-6 text-sm text-slate-500'>
                          <div className='flex items-center space-x-1'>
                            <EyeIcon className='w-4 h-4' />
                            <span>{episode.plays.toLocaleString()} plays</span>
                          </div>
                          <button
                            onClick={() => handleLike(episode.id)}
                            className='flex items-center space-x-1 hover:text-red-500 transition-colors'
                          >
                            {likedEpisodes.has(episode.id) ? (
                              <HeartIconSolid className='w-4 h-4 text-red-500' />
                            ) : (
                              <HeartIcon className='w-4 h-4' />
                            )}
                            <span>{episode.likes} likes</span>
                          </button>
                          <div className='flex items-center space-x-1'>
                            <CalendarDaysIcon className='w-4 h-4' />
                            <span>
                              {new Date(
                                episode.publishDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button className='text-slate-400 hover:text-slate-600 transition-colors'>
                          <ShareIcon className='w-5 h-5' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='text-center'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-4'>
              Never Miss an Episode
            </h2>
            <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
              Subscribe to get notified about new therapeutic conversations and
              mental health insights.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='/podcast/membership'
                className='px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105'
              >
                Join Our Community
              </Link>
              <Link
                href='/newsletter'
                className='px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300'
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
