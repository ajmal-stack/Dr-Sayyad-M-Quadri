'use client';

import { useState, useRef } from 'react';
import {
  PlayIcon,
  EyeIcon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import youtubeData from '@/data/youtube.json';
import Link from 'next/link';

interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  publishDate: string;
  category: string;
  tags: string[];
  channelName: string;
  isNew?: boolean;
  isTrending?: boolean;
  featured?: boolean;
}

const YouTubeContent = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'mental-health' | 'general'>('mental-health');
  const [activeFilter, setActiveFilter] = useState('all');
  const videoRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

  const youtubeVideos: YouTubeVideo[] = youtubeData as YouTubeVideo[];

  // Categorize videos into Mental Health and General topics
  const mentalHealthCategories = ['Mental Health', 'Depression', 'Anxiety', 'Emotional Health'];
  const generalCategories = ['Health', 'Lifestyle', 'Education', 'Wellness'];

  const mentalHealthVideos = youtubeVideos.filter(video => 
    mentalHealthCategories.includes(video.category) || 
    video.tags.some(tag => ['Mental Health', 'Depression', 'Anxiety', 'Psychology', 'Clinical Psychology', 'Overthinking'].includes(tag))
  );

  const generalVideos = youtubeVideos.filter(video => 
    !mentalHealthCategories.includes(video.category) && 
    !video.tags.some(tag => ['Mental Health', 'Depression', 'Anxiety', 'Psychology', 'Clinical Psychology', 'Overthinking'].includes(tag))
  );

  // Get categories based on active tab
  const getCategories = () => {
    if (activeTab === 'mental-health') {
      return ['all', ...mentalHealthCategories];
    } else {
      return ['all', ...generalCategories];
    }
  };

  const categories = getCategories();

  // Get videos based on active tab and filter
  const getFilteredVideos = () => {
    const tabVideos = activeTab === 'mental-health' ? mentalHealthVideos : generalVideos;
    
    if (activeFilter === 'all') {
      return tabVideos;
    }
    
    return tabVideos.filter(video => video.category === activeFilter);
  };

  const filteredVideos = getFilteredVideos();

  // Get featured and trending videos based on active tab
  const getTabVideos = () => activeTab === 'mental-health' ? mentalHealthVideos : generalVideos;
  
  const featuredVideos = getTabVideos().filter((video) => video.featured);
  const trendingVideos = getTabVideos().filter((video) => video.isTrending);

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(videoId);
  };

  const handleTabChange = (tab: 'mental-health' | 'general') => {
    setActiveTab(tab);
    setActiveFilter('all'); // Reset filter when changing tabs
  };



  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <section className='min-h-screen pt-20 pb-6 bg-gradient-to-br from-slate-50 via-white to-red-50/30 relative overflow-hidden'>
      {/* YouTube Brand Background */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-red-600/5' />
      </div>

      <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative'>
        {/* Header Section with YouTube Branding */}
        <div className='text-center mb-6 sm:mb-8 lg:mb-12'>
          {/* Main Title */}
          <h2 className='text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight px-4 sm:px-0'>
            Watch Our Latest{' '}
            <span className='bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent'>
              Content
            </span>
          </h2> 

          <p className='text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0'>
            Discover insights on mental health and wellness
          </p>

                    {/* Mobile Layout - Two Column Top + Stacked Navigation */}
          <div className='block lg:hidden space-y-4'>
            {/* YouTube Logo and Subscribe Button - Two Columns */}
            <div className='grid grid-cols-2 gap-3 sm:gap-4'>
              {/* YouTube Logo - Mobile */}
              <div className='flex justify-center'>
                <div className='flex items-center bg-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg border border-red-100'>
                  <svg
                    className='w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
                      fill='#FF0000'
                    />
                  </svg>
                  <span className='text-sm sm:text-lg font-bold text-slate-900'>YouTube</span>
                </div>
              </div>

              {/* Subscribe Button - Mobile */}
              <div className='flex justify-center'>
                <a
                  href='https://www.youtube.com/@drsyedmquadri'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200'
                >
                  <svg
                    className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M8 12V8l4 2-4 2z' />
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-xs sm:text-sm'>Subscribe Channel</span>
                  
                </a>
              </div>
            </div>

            {/* Tab Navigation - Mobile */}
            <div className='flex justify-center'>
              <div className='bg-white rounded-2xl p-1 shadow-lg border border-red-100 w-full max-w-sm'>
                <div className='flex gap-1'>
                  <button
                    onClick={() => handleTabChange('mental-health')}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                      activeTab === 'mental-health'
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Mental Health
                  </button>
                  <button
                    onClick={() => handleTabChange('general')}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                      activeTab === 'general'
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    General Topics
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className='hidden lg:block'>
            <div className='flex items-center justify-between my-6'>
              {/* YouTube Logo - Desktop */}
              <div>
                <div className='flex items-center bg-white rounded-2xl px-6 py-3 shadow-lg border border-red-100'>
                  <svg
                    className='w-8 h-8 mr-3'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
                      fill='#FF0000'
                    />
                  </svg>
                  <span className='text-xl font-bold text-slate-900'>YouTube</span>
                </div>
              </div>

              {/* Tab Navigation - Desktop */}
              <div>
          <div className='bg-white rounded-2xl p-1 shadow-lg border border-red-100'>
            <div className='flex gap-1'>
              <button
                onClick={() => handleTabChange('mental-health')}
                className={`px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'mental-health'
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Mental Health
              </button>
              <button
                onClick={() => handleTabChange('general')}
                className={`px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'general'
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                General Topics
              </button>
                  </div>
                </div>
              </div>

              {/* Subscribe Button - Desktop */}
              <div>
                <a
                  href='https://www.youtube.com/@drsyedmquadri'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M8 12V8l4 2-4 2z' />
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Subscribe Channel
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className='flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-0'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                activeFilter === category
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-gray-50 border border-red-100'
              }`}
            >
              {category === 'all' ? 'All Videos' : category}
            </button>
          ))}
        </div>

        {/* Video Popup Modal */}
        {activeVideo && (
          <>
            {/* Backdrop */}
            <div
              className='fixed inset-0 z-40 bg-black/90 backdrop-blur-sm'
              onClick={() => setActiveVideo(null)}
            />

            {/* Modal */}
            <div className='fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-8'>
              <div className='relative w-full max-w-[95vw] sm:max-w-[85vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto'>
                {/* Close Button */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className='absolute -top-8 sm:-top-10 md:-top-12 right-0 z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50'
                  aria-label='Close video'
                >
                  <svg
                    className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />  
                  </svg>
                </button>

                {/* Video Player Container */}
                <div className='relative w-full aspect-video bg-black rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl'>
                  {/* Loading indicator */}
                  <div className='absolute inset-0 bg-black flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white'></div>
                  </div>
                  
                  <iframe
                    ref={(el) => {
                      if (el && activeVideo) {
                        videoRefs.current[activeVideo] = el;
                      }
                    }}
                    src={`https://www.youtube.com/embed/${
                      youtubeVideos.find((v) => v.id === activeVideo)?.videoId
                    }?autoplay=1&rel=0&modestbranding=1&fs=1&iv_load_policy=3&controls=1&disablekb=0`}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    className='absolute inset-0 w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl'
                  ></iframe>
                </div>

                {/* Video Title (Optional - shows below video on larger screens) */}
                <div className='hidden md:block mt-4 text-center'>
                  <h3 className='text-white text-lg lg:text-xl font-semibold px-4'>
                    {youtubeVideos.find((v) => v.id === activeVideo)?.title}
                  </h3>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Video Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 mb-8 sm:mb-12 lg:mb-16'>
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className='group bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 border border-red-100'
            >
              {/* Video Thumbnail */}
              <div className='relative aspect-video bg-slate-200 overflow-hidden'>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />

                {/* Play Button Overlay */}
                <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center'>
                  <button
                    onClick={() => handleVideoPlay(video.id)}
                    className='w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-105'
                  >
                    <PlayIcon className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ml-0.5 sm:ml-1' />
                  </button>
                </div>

                {/* Duration Badge */}
                <div className='absolute bottom-2 right-2 bg-black/80 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium'>
                  {video.duration}
                </div>

                {/* Status Badges */}
                <div className='absolute top-2 left-2 flex gap-1 sm:gap-2'>
                  {video.featured && (
                    <span className='bg-red-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold'>
                      Featured
                    </span>
                  )}
                  {video.isNew && (
                    <span className='bg-green-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold'>
                      New
                    </span>
                  )}
                  {video.isTrending && (
                    <span className='bg-orange-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold'>
                      Trending
                    </span>
                  )}
                </div>
              </div>

              {/* Video Info */}
              <div className='p-2 sm:p-3 lg:p-6'>
                <div className='mb-1 sm:mb-2 lg:mb-3'>
                  <h3 className='text-sm sm:text-base lg:text-lg font-bold text-slate-900 mb-1 lg:mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-200'>
                    {video.title}
                  </h3>
                  <p className='text-xs lg:text-sm text-slate-600 line-clamp-2 leading-relaxed hidden sm:block'>
                    {video.description}
                  </p>
                </div>

                {/* Video Stats */}
                {/* <div className='flex items-center justify-between text-sm text-slate-500 mb-4'>
                  <div className='flex items-center gap-3'>
                    <span className='flex items-center'>
                      <EyeIcon className='w-4 h-4 mr-1' />
                      {formatViews(video.views)}
                    </span>
                    <span className='flex items-center'>
                      <HandThumbUpIcon className='w-4 h-4 mr-1' />
                      {formatViews(video.likes)}
                    </span>
                  </div>
                  <span>{formatDate(video.publishDate)}</span>
                </div> */}

                {/* Tags */}
                {/* <div className='flex flex-wrap gap-1 mb-4'>
                  {video.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className='bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs font-medium border border-red-100'
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}

                {/* Action Buttons */}
                {/* <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                   
                    <button
                      onClick={() => handleLike(video.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        likedVideos.includes(video.id)
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {likedVideos.includes(video.id) ? (
                        <HandThumbUpIconSolid className='w-4 h-4' />
                      ) : (
                        <HandThumbUpIcon className='w-4 h-4' />
                      )}
                    </button>

                    
                    <button
                      onClick={() => handleSave(video.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        savedVideos.includes(video.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {savedVideos.includes(video.id) ? (
                        <BookmarkIconSolid className='w-4 h-4' />
                      ) : (
                        <BookmarkIcon className='w-4 h-4' />
                      )}
                    </button>

                   
                    <button className='p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-300'>
                      <ShareIcon className='w-4 h-4' />
                    </button>
                  </div>

                 
                  <button
                    onClick={() => handleVideoPlay(video.id)}
                    className='bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center'
                  >
                    <PlayIcon className='w-4 h-4 mr-1' />
                    Watch
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Sections */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16'>
          {/* Featured Videos */}
          <div className='bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-red-100 shadow-lg'>
            <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center'>
              <PlayIcon className='w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-600' />
              Featured Videos
            </h3>
            <div className='space-y-3 sm:space-y-4'>
              {featuredVideos.slice(0, 3).map((video) => (
                <div
                  key={video.id}
                  className='flex items-center gap-3 sm:gap-4 p-2 sm:p-3 lg:p-4 bg-red-50 rounded-xl sm:rounded-2xl hover:bg-red-100 transition-colors duration-200 cursor-pointer'
                  onClick={() => handleVideoPlay(video.id)}
                >
                  <div className='relative w-16 h-10 sm:w-20 sm:h-12 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0'>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 64px, 80px'
                    />
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                      <PlayIcon className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1'>
                      {video.title}
                    </h4>
                    <div className='flex items-center gap-1 sm:gap-2 text-xs text-slate-600 mt-0.5 sm:mt-1'>
                      <span>{formatViews(video.views)} views</span>
                      <span>•</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Videos */}
          <div className='bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-red-100 shadow-lg'>
            <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center'>
              <UserGroupIcon className='w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-600' />
              Trending Now
            </h3>
            <div className='space-y-3 sm:space-y-4'>
              {trendingVideos.slice(0, 3).map((video) => (
                <div
                  key={video.id}
                  className='flex items-center gap-3 sm:gap-4 p-2 sm:p-3 lg:p-4 bg-orange-50 rounded-xl sm:rounded-2xl hover:bg-orange-100 transition-colors duration-200 cursor-pointer'
                  onClick={() => handleVideoPlay(video.id)}
                >
                  <div className='relative w-16 h-10 sm:w-20 sm:h-12 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0'>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 64px, 80px'
                    />
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                      <PlayIcon className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1'>
                      {video.title}
                    </h4>
                    <div className='flex items-center gap-1 sm:gap-2 text-xs text-slate-600 mt-0.5 sm:mt-1'>
                      <span>{formatViews(video.views)} views</span>
                      <span>•</span>
                      <span>{formatDate(video.publishDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className='text-center'>
          <div className='bg-gradient-to-r from-red-600 to-red-500 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden mx-2 sm:mx-0'>
            <div className='absolute inset-0 opacity-20'>
              <div
                className='w-full h-full bg-repeat'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className='relative z-10 max-w-3xl mx-auto'>
              <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4'>
                Subscribe for Weekly Mental Health Content
              </h3>
              <p className='text-sm sm:text-base lg:text-xl opacity-90 mb-6 sm:mb-8 leading-relaxed'>
                Join 250K+ subscribers getting expert mental health guidance,
                practical tips, and therapeutic insights
              </p>

              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
                <Link 
                  href='https://www.youtube.com/@drsyedmquadri' 
                  target='_blank' 
                  className='bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center'
                >
                  <PlayIcon className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
                  Subscribe on YouTube
                </Link>
                <Link 
                  href='https://www.youtube.com/@drsyedmquadri/videos' 
                  target='_blank' 
                  className='border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white/10 transition-colors duration-200'
                >
                  View All Videos
                </Link>
              </div>

              <div className='mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm opacity-80'>
                <div className='flex items-center'>
                  <UserGroupIcon className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2' />
                  250K+ Subscribers
                </div>
                <div className='flex items-center'>
                  <EyeIcon className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2' />
                  2.5M+ Views
                </div>
                <div className='flex items-center'>
                  <CalendarIcon className='w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2' />
                  Weekly Updates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeContent;
