'use client';

import { useState, useRef } from 'react';
import {
  PlayIcon,
  EyeIcon,
  HandThumbUpIcon,
  ShareIcon,
  BookmarkIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from '@heroicons/react/24/solid';

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
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [savedVideos, setSavedVideos] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const videoRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

  const youtubeVideos: YouTubeVideo[] = [
    {
      id: '1',
      videoId: 'xU-W_LV_tHE',
      title:
        '12 Root Causes of Depression with Natural Solutions | Dr. Syeda M Quadri’s Expert Guide',
      description:
        'Discover the root causes of depression and learn natural solutions to improve your mental health with Dr. Syeda M Quadri’s expert guidance.',
      thumbnail: 'https://img.youtube.com/vi/xU-W_LV_tHE/maxresdefault.jpg',
      duration: '07:03',
      views: 15200,
      likes: 890,
      publishDate: '2020-05-15',
      category: 'Depression',
      tags: ['Depression', 'Mental Health', 'Clinical Psychology'],
      channelName: 'SMQ English',
      isNew: false,
      featured: true,
    },
    {
      id: '2',
      videoId: 'cPWHUFw1SHg',
      title: '15 Ways to Naturally Reduce Anxiety | SMQ English',
      description:
        'Discover natural ways to reduce anxiety and improve your mental health with Dr. Syed M. Quadri’s expert tips.',
      thumbnail: 'https://img.youtube.com/vi/cPWHUFw1SHg/maxresdefault.jpg',
      duration: '07:03',
      views: 32800,
      likes: 1650,
      publishDate: '2020-04-20',
      category: 'Anxiety',
      tags: ['Anxiety', 'Mental Health', 'Overthinking', 'Psychology'],
      channelName: 'SMQ English',
      isTrending: true,
      featured: true,
    },
    {
      id: '3',
      videoId: 'aammIc5lCyc',
      title:
        'The Real Reason You Can’t Stop Overthinking | Real-life Example by Dr. Syed M. Quadri',
      description:
        'Discover the real reason behind your overthinking and learn practical strategies to overcome it with Dr. Syed M. Quadri’s expert advice.',
      thumbnail: 'https://img.youtube.com/vi/aammIc5lCyc/maxresdefault.jpg',
      duration: '07:43',
      views: 28500,
      likes: 1420,
      publishDate: '2021-03-10',
      category: 'Depression',
      tags: ['Depression', 'Mental Health', 'Overthinking', 'Psychology'],
      channelName: 'SMQ English',
      featured: true,
    },
    {
      id: '4',
      videoId: 'A9Tkxc7w8JE',
      title:
        '16-Hour Fasting - Is It Right For You? | Intermittent Fasting the Real truth',
      description:
        'Discover the real truth about intermittent fasting and learn how it can help you improve your health and well-being.',
      thumbnail: 'https://img.youtube.com/vi/A9Tkxc7w8JE/maxresdefault.jpg',
      duration: '05:03',
      views: 19700,
      likes: 1240,
      publishDate: '2021-08-05',
      category: 'Emotional Health',
      tags: [
        'Emotions',
        'Emotional Intelligence',
        'Self-Awareness',
        'Mental Health',
      ],
      channelName: 'SMQ English',
      isNew: false,
    },
    {
      id: '5',
      videoId: 'oJVO2ErRTs0',
      title: 'How to Stop Overthinking Instantly | Anxiety Relief Tips | SMQ',
      description:
        'Learn practical strategies to stop overthinking instantly and reduce anxiety with Dr. Syed M. Quadri’s expert tips.',
      thumbnail: 'https://img.youtube.com/vi/oJVO2ErRTs0/maxresdefault.jpg',
      duration: '11:03',
      views: 12400,
      likes: 780,
      publishDate: '2020-06-12',
      category: 'Mental Health',
      tags: ['Quarantine', 'Mental Health', 'Coping', 'Isolation'],
      channelName: 'Dr. Syed M Quadri',
      isTrending: false,
      featured: false,
    },
    {
      id: '6',
      videoId: 'oJVO2ErRTs0',
      title: 'How to Stop Overthinking Instantly | Anxiety Relief Tips | SMQ',
      description:
        'Learn practical strategies to stop overthinking instantly and reduce anxiety with Dr. Syed M. Quadri’s expert tips.',
      thumbnail: 'https://img.youtube.com/vi/oJVO2ErRTs0/maxresdefault.jpg',
      duration: '11:03',
      views: 24600,
      likes: 1580,
      publishDate: '2021-01-20',
      category: 'Anxiety',
      tags: ['Anxiety', 'Clinical Psychology', 'Treatment', 'Mental Health'],
      channelName: 'SMQ English',
      featured: false,
    },
  ];

  const categories = [
    'all',
    'Mental Health',
    'Depression',
    'Anxiety',
    'Emotional Health',
  ];

  const filteredVideos = youtubeVideos.filter(
    (video) => activeFilter === 'all' || video.category === activeFilter
  );

  const featuredVideos = youtubeVideos.filter((video) => video.featured);
  const trendingVideos = youtubeVideos.filter((video) => video.isTrending);

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(videoId);
  };

  const handleLike = (videoId: string) => {
    setLikedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleSave = (videoId: string) => {
    setSavedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
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
    <section className=' bg-gradient-to-br from-slate-50 via-white to-red-50/30 relative overflow-hidden'>
      {/* YouTube Brand Background */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-red-600/5' />
        <div className='absolute top-20 right-20 w-64 h-64 bg-red-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-red-200/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header Section with YouTube Branding */}
        <div className='text-center mb-8 lg:mb-12'>
          <div className='flex items-center justify-center mb-6'>
            {/* YouTube Logo */}
            <div className='flex items-center bg-white rounded-2xl px-6 py-3 shadow-lg border border-red-100 hover:shadow-xl transition-all duration-300'>
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

          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight'>
            Watch Our Latest{' '}
            <span className='bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent'>
              Content
            </span>
          </h2>

          <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
            Discover insights on mental health and wellness
          </p>

          {/* Subscribe Button */}
          <div className='mt-6'>
            <a
              href='https://www.youtube.com/@drsyedmquadri'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
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

        {/* Category Filter */}
        <div className='flex flex-wrap justify-center gap-2 mb-8 lg:mb-12'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border border-red-100 hover:border-red-200'
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
              className='fixed inset-0 z-40 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300'
              onClick={() => setActiveVideo(null)}
            />

            {/* Modal */}
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
              <div className='relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 pointer-events-auto'>
                {/* Close Button */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className='absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110'
                >
                  <svg
                    className='w-6 h-6'
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

                {/* Video Player */}
                <div className='aspect-video bg-black'>
                  <iframe
                    ref={(el) => {
                      if (el && activeVideo) {
                        videoRefs.current[activeVideo] = el;
                      }
                    }}
                    src={`https://www.youtube.com/embed/${
                      youtubeVideos.find((v) => v.id === activeVideo)?.videoId
                    }?autoplay=1&rel=0&modestbranding=1&fs=1`}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    className='w-full h-full'
                  ></iframe>
                </div>

                {/* Video Info */}
                <div className='p-6 lg:p-8'>
                  <div className='flex flex-col lg:flex-row lg:items-start gap-6'>
                    <div className='flex-1'>
                      <h3 className='text-xl lg:text-2xl font-bold text-slate-900 mb-3'>
                        {youtubeVideos.find((v) => v.id === activeVideo)?.title}
                      </h3>
                      <p className='text-slate-600 mb-4 leading-relaxed'>
                        {
                          youtubeVideos.find((v) => v.id === activeVideo)
                            ?.description
                        }
                      </p>

                      {/* Video Stats */}
                      <div className='flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4'>
                        <span className='flex items-center'>
                          <EyeIcon className='w-4 h-4 mr-1' />
                          {formatViews(
                            youtubeVideos.find((v) => v.id === activeVideo)
                              ?.views || 0
                          )}{' '}
                          views
                        </span>
                        <span className='flex items-center'>
                          <HandThumbUpIcon className='w-4 h-4 mr-1' />
                          {formatViews(
                            youtubeVideos.find((v) => v.id === activeVideo)
                              ?.likes || 0
                          )}{' '}
                          likes
                        </span>
                        <span className='flex items-center'>
                          <CalendarIcon className='w-4 h-4 mr-1' />
                          {formatDate(
                            youtubeVideos.find((v) => v.id === activeVideo)
                              ?.publishDate || ''
                          )}
                        </span>
                        <span className='flex items-center'>
                          <ClockIcon className='w-4 h-4 mr-1' />
                          {
                            youtubeVideos.find((v) => v.id === activeVideo)
                              ?.duration
                          }
                        </span>
                      </div>

                      {/* Tags */}
                      <div className='flex flex-wrap gap-2'>
                        {youtubeVideos
                          .find((v) => v.id === activeVideo)
                          ?.tags.map((tag, index) => (
                            <span
                              key={index}
                              className='bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-100'
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex lg:flex-col gap-3'>
                      <button
                        onClick={() => handleLike(activeVideo)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          likedVideos.includes(activeVideo)
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {likedVideos.includes(activeVideo) ? (
                          <HandThumbUpIconSolid className='w-4 h-4' />
                        ) : (
                          <HandThumbUpIcon className='w-4 h-4' />
                        )}
                        <span className='hidden sm:inline'>Like</span>
                      </button>

                      <button
                        onClick={() => handleSave(activeVideo)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          savedVideos.includes(activeVideo)
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {savedVideos.includes(activeVideo) ? (
                          <BookmarkIconSolid className='w-4 h-4' />
                        ) : (
                          <BookmarkIcon className='w-4 h-4' />
                        )}
                        <span className='hidden sm:inline'>Save</span>
                      </button>

                      <button className='flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-medium transition-all duration-300'>
                        <ShareIcon className='w-4 h-4' />
                        <span className='hidden sm:inline'>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Video Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16'>
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className='group bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-red-100 hover:border-red-200'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Video Thumbnail */}
              <div className='relative aspect-video bg-slate-200 overflow-hidden'>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />

                {/* Play Button Overlay */}
                <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center'>
                  <button
                    onClick={() => handleVideoPlay(video.id)}
                    className='w-16 h-16 lg:w-20 lg:h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-2xl transform hover:scale-110 transition-all duration-300'
                  >
                    <PlayIcon className='w-8 h-8 lg:w-10 lg:h-10 ml-1' />
                  </button>
                </div>

                {/* Duration Badge */}
                <div className='absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium'>
                  {video.duration}
                </div>

                {/* Status Badges */}
                <div className='absolute top-2 left-2 flex gap-2'>
                  {video.featured && (
                    <span className='bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold'>
                      Featured
                    </span>
                  )}
                  {video.isNew && (
                    <span className='bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold'>
                      New
                    </span>
                  )}
                  {video.isTrending && (
                    <span className='bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold'>
                      Trending
                    </span>
                  )}
                </div>
              </div>

              {/* Video Info */}
              <div className='p-4 lg:p-6'>
                <div className='mb-3'>
                  <h3 className='text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors'>
                    {video.title}
                  </h3>
                  <p className='text-sm text-slate-600 line-clamp-2 leading-relaxed'>
                    {video.description}
                  </p>
                </div>

                {/* Video Stats */}
                <div className='flex items-center justify-between text-sm text-slate-500 mb-4'>
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
                </div>

                {/* Tags */}
                <div className='flex flex-wrap gap-1 mb-4'>
                  {video.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className='bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs font-medium border border-red-100'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {/* Like Button */}
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

                    {/* Save Button */}
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

                    {/* Share Button */}
                    <button className='p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-300'>
                      <ShareIcon className='w-4 h-4' />
                    </button>
                  </div>

                  {/* Watch Button */}
                  <button
                    onClick={() => handleVideoPlay(video.id)}
                    className='bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center'
                  >
                    <PlayIcon className='w-4 h-4 mr-1' />
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Sections */}
        <div className='grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16'>
          {/* Featured Videos */}
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-red-100 shadow-lg'>
            <h3 className='text-xl lg:text-2xl font-bold text-slate-900 mb-6 flex items-center'>
              <PlayIcon className='w-6 h-6 mr-2 text-red-600' />
              Featured Videos
            </h3>
            <div className='space-y-4'>
              {featuredVideos.slice(0, 3).map((video) => (
                <div
                  key={video.id}
                  className='flex items-center gap-4 p-3 lg:p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-all duration-300 cursor-pointer'
                  onClick={() => handleVideoPlay(video.id)}
                >
                  <div className='relative w-20 h-12 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0'>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                      <PlayIcon className='w-4 h-4 text-white' />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-slate-900 text-sm line-clamp-1'>
                      {video.title}
                    </h4>
                    <div className='flex items-center gap-2 text-xs text-slate-600 mt-1'>
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
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-red-100 shadow-lg'>
            <h3 className='text-xl lg:text-2xl font-bold text-slate-900 mb-6 flex items-center'>
              <UserGroupIcon className='w-6 h-6 mr-2 text-orange-600' />
              Trending Now
            </h3>
            <div className='space-y-4'>
              {trendingVideos.slice(0, 3).map((video) => (
                <div
                  key={video.id}
                  className='flex items-center gap-4 p-3 lg:p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-all duration-300 cursor-pointer'
                  onClick={() => handleVideoPlay(video.id)}
                >
                  <div className='relative w-20 h-12 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0'>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                      <PlayIcon className='w-4 h-4 text-white' />
                    </div>
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='font-semibold text-slate-900 text-sm line-clamp-1'>
                      {video.title}
                    </h4>
                    <div className='flex items-center gap-2 text-xs text-slate-600 mt-1'>
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
          <div className='bg-gradient-to-r from-red-600 to-red-500 rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden'>
            <div className='absolute inset-0 opacity-20'>
              <div
                className='w-full h-full bg-repeat'
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <div className='relative z-10 max-w-3xl mx-auto'>
              <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4'>
                Subscribe for Weekly Mental Health Content
              </h3>
              <p className='text-lg lg:text-xl opacity-90 mb-8 leading-relaxed'>
                Join 250K+ subscribers getting expert mental health guidance,
                practical tips, and therapeutic insights
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button className='bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center'>
                  <PlayIcon className='w-5 h-5 mr-2' />
                  Subscribe on YouTube
                </button>
                <button className='border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300'>
                  View All Videos
                </button>
              </div>

              <div className='mt-8 flex flex-wrap justify-center items-center gap-6 text-sm opacity-80'>
                <div className='flex items-center'>
                  <UserGroupIcon className='w-5 h-5 mr-2' />
                  250K+ Subscribers
                </div>
                <div className='flex items-center'>
                  <EyeIcon className='w-5 h-5 mr-2' />
                  2.5M+ Views
                </div>
                <div className='flex items-center'>
                  <CalendarIcon className='w-5 h-5 mr-2' />
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
