'use client';

import { useState } from 'react';
import {
  PlayIcon,
  BookOpenIcon,
  MicrophoneIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  EyeIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from '@heroicons/react/24/solid';

interface ContentItem {
  id: string;
  type: 'podcast' | 'article' | 'video' | 'webinar';
  title: string;
  description: string;
  duration?: string;
  readTime?: string;
  image: string;
  category: string;
  featured: boolean;
  author?: string;
  publishDate: string;
  views: number;
  likes: number;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  isNew?: boolean;
  isTrending?: boolean;
}

const FeaturedContent = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  const contentData: ContentItem[] = [
    {
      id: '1',
      type: 'podcast',
      title: 'Understanding Anxiety in Modern Life',
      description:
        'A deep dive into managing anxiety in our fast-paced world with practical strategies and expert insights.',
      duration: '32 min',
      image: '🎧',
      category: 'Mental Health',
      featured: true,
      author: 'Dr. Syed M Quadri',
      publishDate: '2024-01-15',
      views: 12500,
      likes: 890,
      rating: 4.8,
      difficulty: 'Beginner',
      tags: ['Anxiety', 'Stress Management', 'Mindfulness'],
      isNew: true,
      isTrending: true,
    },
    {
      id: '2',
      type: 'article',
      title: 'Building Resilience Through Mindfulness',
      description:
        'Practical techniques for developing emotional strength and mental fortitude in challenging times.',
      readTime: '8 min read',
      image: '📖',
      category: 'Wellness',
      featured: false,
      author: 'Dr. Syed M Quadri',
      publishDate: '2024-01-10',
      views: 8200,
      likes: 654,
      rating: 4.6,
      difficulty: 'Intermediate',
      tags: ['Resilience', 'Mindfulness', 'Emotional Health'],
      isNew: false,
      isTrending: false,
    },
    {
      id: '3',
      type: 'video',
      title: 'Sleep Hygiene for Better Mental Health',
      description:
        'Expert tips for improving sleep quality and its profound impact on mental wellness and daily functioning.',
      duration: '15 min',
      image: '🎥',
      category: 'Sleep Health',
      featured: true,
      author: 'Dr. Syed M Quadri',
      publishDate: '2024-01-08',
      views: 15600,
      likes: 1200,
      rating: 4.9,
      difficulty: 'Beginner',
      tags: ['Sleep', 'Mental Health', 'Wellness'],
      isNew: false,
      isTrending: true,
    },
    {
      id: '4',
      type: 'webinar',
      title: 'Trauma-Informed Care Approaches',
      description:
        'Understanding trauma responses and implementing effective therapeutic interventions for healing.',
      duration: '45 min',
      image: '🧠',
      category: 'Trauma Therapy',
      featured: false,
      author: 'Dr. Syed M Quadri',
      publishDate: '2024-01-05',
      views: 6800,
      likes: 420,
      rating: 4.7,
      difficulty: 'Advanced',
      tags: ['Trauma', 'Therapy', 'EMDR'],
      isNew: false,
      isTrending: false,
    },
    {
      id: '5',
      type: 'podcast',
      title: 'Relationship Dynamics and Mental Health',
      description:
        'Exploring how relationships impact our psychological well-being and strategies for healthier connections.',
      duration: '28 min',
      image: '💝',
      category: 'Relationships',
      featured: true,
      author: 'Dr. Syed M Quadri',
      publishDate: '2024-01-12',
      views: 9400,
      likes: 720,
      rating: 4.5,
      difficulty: 'Intermediate',
      tags: ['Relationships', 'Communication', 'Boundaries'],
      isNew: true,
      isTrending: false,
    },
    {
      id: '6',
      type: 'article',
      title: 'Managing Depression: A Holistic Approach',
      description:
        'Comprehensive strategies combining therapy, lifestyle changes, and self-care for depression management.',
      readTime: '12 min read',
      image: '🌱',
      category: 'Depression',
      featured: false,
      author: 'Dr. Syed M Quadri',
      publishDate: '2024-01-03',
      views: 11200,
      likes: 890,
      rating: 4.8,
      difficulty: 'Intermediate',
      tags: ['Depression', 'Therapy', 'Self-Care'],
      isNew: false,
      isTrending: true,
    },
  ];

  const categories = [
    'all',
    'Mental Health',
    'Wellness',
    'Sleep Health',
    'Trauma Therapy',
    'Relationships',
    'Depression',
  ];

  const filteredContent = contentData.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const featuredItems = contentData.filter((item) => item.featured);
  const trendingItems = contentData.filter((item) => item.isTrending);

  const handleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookmark = (id: string) => {
    setBookmarkedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'podcast':
        return MicrophoneIcon;
      case 'video':
        return PlayIcon;
      case 'article':
        return BookOpenIcon;
      case 'webinar':
        return UserGroupIcon;
      default:
        return BookOpenIcon;
    }
  };

  const getActionText = (type: string) => {
    switch (type) {
      case 'podcast':
        return 'Listen';
      case 'video':
        return 'Watch';
      case 'article':
        return 'Read';
      case 'webinar':
        return 'Join';
      default:
        return 'View';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/50'></div>
        <div className='absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <div className='inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6'>
            <StarIcon className='w-4 h-4 mr-2' />
            Featured Content
          </div>
          <h2 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
            Latest{' '}
            <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              Insights
            </span>
          </h2>
          <p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
            Explore our comprehensive collection of podcasts, articles, videos,
            and educational content
          </p>
        </div>

        {/* Stats Section */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-16'>
          <div className='text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg'>
            <div className='text-3xl font-bold text-blue-600 mb-2'>50+</div>
            <div className='text-sm text-slate-600'>Episodes</div>
          </div>
          <div className='text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg'>
            <div className='text-3xl font-bold text-indigo-600 mb-2'>100K+</div>
            <div className='text-sm text-slate-600'>Total Views</div>
          </div>
          <div className='text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg'>
            <div className='text-3xl font-bold text-purple-600 mb-2'>4.8</div>
            <div className='text-sm text-slate-600'>Avg Rating</div>
          </div>
          <div className='text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg'>
            <div className='text-3xl font-bold text-emerald-600 mb-2'>25+</div>
            <div className='text-sm text-slate-600'>Topics</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className='flex flex-wrap justify-center gap-2 mb-12'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border border-blue-100 hover:border-blue-200'
              }`}
            >
              {category === 'all' ? 'All Content' : category}
            </button>
          ))}
        </div>

        {/* Featured Content Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {filteredContent.map((content, index) => {
            const IconComponent = getIcon(content.type);
            return (
              <div
                key={content.id}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 transform shadow-lg hover:shadow-xl ${
                  content.featured ? 'ring-2 ring-blue-500/30' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badges */}
                <div className='absolute -top-3 left-6 flex gap-2'>
                  {content.featured && (
                    <div className='bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                      Featured
                    </div>
                  )}
                  {content.isNew && (
                    <div className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                      New
                    </div>
                  )}
                  {content.isTrending && (
                    <div className='bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center'>
                      <ArrowTrendingUpIcon className='w-3 h-3 mr-1' />
                      Trending
                    </div>
                  )}
                </div>

                {/* Content Icon */}
                <div className='text-6xl mb-6 group-hover:scale-110 transition-transform duration-300'>
                  {content.image}
                </div>

                {/* Content Info */}
                <div className='mb-6'>
                  <div className='flex items-center gap-2 mb-3'>
                    <div className='inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium'>
                      <IconComponent className='w-3 h-3 mr-1' />
                      {content.category}
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        content.difficulty
                      )}`}
                    >
                      {content.difficulty}
                    </div>
                  </div>

                  <h3 className='text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2'>
                    {content.title}
                  </h3>

                  <p className='text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {content.description}
                  </p>

                  {/* Tags */}
                  <div className='flex flex-wrap gap-1 mb-4'>
                    {content.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className='bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs border border-blue-100'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className='flex items-center justify-between text-xs text-slate-500 mb-4'>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                      <EyeIcon className='w-4 h-4 mr-1' />
                      {content.views.toLocaleString()}
                    </div>
                    <div className='flex items-center'>
                      <StarIconSolid className='w-4 h-4 mr-1 text-yellow-500' />
                      {content.rating}
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <CalendarIcon className='w-4 h-4 mr-1' />
                    {new Date(content.publishDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs text-slate-500'>
                      {content.duration || content.readTime}
                    </span>
                  </div>

                  <div className='flex items-center gap-2'>
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(content.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        likedItems.includes(content.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {likedItems.includes(content.id) ? (
                        <HeartIconSolid className='w-4 h-4' />
                      ) : (
                        <HeartIcon className='w-4 h-4' />
                      )}
                    </button>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleBookmark(content.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        bookmarkedItems.includes(content.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {bookmarkedItems.includes(content.id) ? (
                        <BookmarkIconSolid className='w-4 h-4' />
                      ) : (
                        <BookmarkIcon className='w-4 h-4' />
                      )}
                    </button>

                    {/* Main Action Button */}
                    <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
                      {getActionText(content.type)}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Access Sections */}
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Featured Highlights */}
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-lg'>
            <h3 className='text-2xl font-bold text-slate-900 mb-6 flex items-center'>
              <StarIconSolid className='w-6 h-6 mr-2 text-yellow-500' />
              Featured Highlights
            </h3>
            <div className='space-y-4'>
              {featuredItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className='flex items-center gap-4 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all duration-300'
                >
                  <div className='text-2xl'>{item.image}</div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-slate-900 text-sm'>
                      {item.title}
                    </h4>
                    <p className='text-slate-600 text-xs'>
                      {item.category} • {item.duration || item.readTime}
                    </p>
                  </div>
                  <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300'>
                    {getActionText(item.type)}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-lg'>
            <h3 className='text-2xl font-bold text-slate-900 mb-6 flex items-center'>
              <ArrowTrendingUpIcon className='w-6 h-6 mr-2 text-orange-500' />
              Trending Now
            </h3>
            <div className='space-y-4'>
              {trendingItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className='flex items-center gap-4 p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-all duration-300'
                >
                  <div className='text-2xl'>{item.image}</div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-slate-900 text-sm'>
                      {item.title}
                    </h4>
                    <div className='flex items-center gap-2 text-xs text-slate-600'>
                      <EyeIcon className='w-3 h-3' />
                      {item.views.toLocaleString()} views
                    </div>
                  </div>
                  <button className='bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300'>
                    {getActionText(item.type)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='mt-16 text-center'>
          <div className='bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200 shadow-lg'>
            <h3 className='text-2xl font-bold text-slate-900 mb-4'>
              Never Miss an Update
            </h3>
            <p className='text-slate-600 mb-6'>
              Subscribe to get notified about new content and exclusive insights
            </p>
            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300'
              />
              <button className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
