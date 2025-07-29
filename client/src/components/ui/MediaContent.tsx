'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  BookOpenIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
  BookOpenIcon as BookOpenIconSolid,
  VideoCameraIcon as VideoCameraIconSolid,
  SpeakerWaveIcon as SpeakerWaveIconSolid,
} from '@heroicons/react/24/solid';

// Type definitions
interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  category: string;
  pages: number;
}

interface YouTubeVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
}

interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  releaseDate: string;
  category: string;
  audioUrl: string;
}

// Sample data for books
const books: Book[] = [
  {
    id: 1,
    title: 'Modern Psychology Insights',
    description:
      'Comprehensive guide to understanding modern psychological approaches and therapeutic techniques.',
    image: '/books/Black and White Modern Psychology Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Psychology',
    pages: 320,
  },
  {
    id: 2,
    title: 'Public Speaking Mastery',
    description:
      'Overcome anxiety and master the art of confident public speaking with proven strategies.',
    image:
      '/books/Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Self-Help',
    pages: 280,
  },
  {
    id: 3,
    title: 'Mind Matters: Mental Wellness',
    description:
      'Essential guide to maintaining mental health and building resilience in daily life.',
    image: '/books/Navy and Pink Illustrated Mind Matters Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Mental Health',
    pages: 350,
  },
  {
    id: 4,
    title: 'Daily Food Journal',
    description:
      'Track your nutrition and build healthy eating habits for better mental and physical wellness.',
    image: '/books/Red Simple Food Journal Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Wellness',
    pages: 200,
  },
  {
    id: 5,
    title: 'Love & Relationships',
    description:
      'Navigate romantic relationships with psychological insights and practical advice.',
    image: '/books/Romantic Doctor Love Story Ebook Cover.png',
    author: 'Dr. Syed M Quadri',
    category: 'Relationships',
    pages: 250,
  },
  {
    id: 6,
    title: 'Nutrition & Mental Health',
    description:
      'Discover the connection between nutrition and mental wellness for optimal health.',
    image:
      '/books/Red and Green Seamless Pattern Printable Daily Food Journal Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Health',
    pages: 180,
  },
];

// Sample YouTube videos data
const youtubeVideos: YouTubeVideo[] = [
  {
    id: 1,
    title: 'Understanding Anxiety: Signs, Symptoms & Solutions',
    description:
      'Learn to identify anxiety disorders and discover effective coping strategies.',
    thumbnail:
      '/banner/White and Black Simple Mental Health Youtube Thumbnail.png',
    duration: '15:32',
    views: '125K',
    uploadDate: '2 weeks ago',
  },
  {
    id: 2,
    title: 'Depression Treatment: Modern Approaches',
    description:
      'Explore evidence-based treatments for depression and mood disorders.',
    thumbnail:
      '/banner/U_White and Black Simple Mental Health Youtube Thumbnail.png',
    duration: '22:45',
    views: '89K',
    uploadDate: '1 month ago',
  },
  {
    id: 3,
    title: 'Parenting and Mental Health',
    description:
      "Essential parenting strategies for supporting children's mental wellness.",
    thumbnail: '/banner/Parenting Unveiled (1).jpg',
    duration: '18:20',
    views: '156K',
    uploadDate: '3 weeks ago',
  },
  {
    id: 4,
    title: 'Stress Management Techniques',
    description:
      'Practical techniques for managing daily stress and building resilience.',
    thumbnail: '/banner/Parenting Unveiled (2).jpg',
    duration: '12:15',
    views: '203K',
    uploadDate: '1 week ago',
  },
  {
    id: 5,
    title: 'Building Healthy Relationships',
    description:
      'Communication skills and strategies for stronger, healthier relationships.',
    thumbnail: '/banner/Parenting Unveiled (3).jpg',
    duration: '25:10',
    views: '98K',
    uploadDate: '2 months ago',
  },
  {
    id: 6,
    title: 'Sleep and Mental Health',
    description:
      'Understanding the crucial connection between sleep quality and mental wellness.',
    thumbnail: '/banner/Parenting Unveiled (4).jpg',
    duration: '16:55',
    views: '134K',
    uploadDate: '3 weeks ago',
  },
];

// Sample podcast episodes data
const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: 'Mental Health in the Digital Age',
    description:
      'Exploring how technology impacts our mental health and strategies for digital wellness.',
    duration: '45:30',
    releaseDate: '2024-01-15',
    category: 'Mental Health',
    audioUrl: '#', // Placeholder
  },
  {
    id: 2,
    title: 'Trauma Recovery: A Journey of Healing',
    description:
      'Understanding trauma responses and the path to recovery with expert insights.',
    duration: '52:20',
    releaseDate: '2024-01-08',
    category: 'Trauma',
    audioUrl: '#', // Placeholder
  },
  {
    id: 3,
    title: 'Anxiety Management Strategies',
    description:
      'Practical techniques and therapeutic approaches for managing anxiety disorders.',
    duration: '38:45',
    releaseDate: '2024-01-01',
    category: 'Anxiety',
    audioUrl: '#', // Placeholder
  },
  {
    id: 4,
    title: 'The Science of Happiness',
    description:
      'Exploring positive psychology and evidence-based approaches to well-being.',
    duration: '41:15',
    releaseDate: '2023-12-25',
    category: 'Positive Psychology',
    audioUrl: '#', // Placeholder
  },
  {
    id: 5,
    title: 'Couples Therapy Insights',
    description:
      'Relationship dynamics and communication strategies for healthier partnerships.',
    duration: '47:10',
    releaseDate: '2023-12-18',
    category: 'Relationships',
    audioUrl: '#', // Placeholder
  },
  {
    id: 6,
    title: 'Mindfulness and Meditation',
    description:
      'The therapeutic benefits of mindfulness practices in mental health treatment.',
    duration: '35:25',
    releaseDate: '2023-12-11',
    category: 'Mindfulness',
    audioUrl: '#', // Placeholder
  },
];

type TabType = 'books' | 'youtube' | 'podcast';

export default function MediaContent() {
  const [activeTab, setActiveTab] = useState<TabType>('books');
  const [isVisible, setIsVisible] = useState(false);
  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [currentVideoPage, setCurrentVideoPage] = useState(0);
  const [currentPodcastPage, setCurrentPodcastPage] = useState(0);
  const [currentMobileBookIndex, setCurrentMobileBookIndex] = useState(0);
  const [currentMobileVideoIndex, setCurrentMobileVideoIndex] = useState(0);
  const [currentMobilePodcastIndex, setCurrentMobilePodcastIndex] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileTabSelector, setShowMobileTabSelector] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const itemsPerPage = 3;

  useEffect(() => {
    setIsVisible(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getCurrentPageItems = () => {
    if (isMobile) {
      // On mobile, show one item at a time
      switch (activeTab) {
        case 'books':
          return [books[currentMobileBookIndex]];
        case 'youtube':
          return [youtubeVideos[currentMobileVideoIndex]];
        case 'podcast':
          return [podcastEpisodes[currentMobilePodcastIndex]];
        default:
          return [];
      }
    } else {
      // On desktop, use pagination
      switch (activeTab) {
        case 'books':
          const startBook = currentBookPage * itemsPerPage;
          return books.slice(startBook, startBook + itemsPerPage);
        case 'youtube':
          const startVideo = currentVideoPage * itemsPerPage;
          return youtubeVideos.slice(startVideo, startVideo + itemsPerPage);
        case 'podcast':
          const startPodcast = currentPodcastPage * itemsPerPage;
          return podcastEpisodes.slice(
            startPodcast,
            startPodcast + itemsPerPage
          );
        default:
          return [];
      }
    }
  };

  const getCurrentMobileIndex = () => {
    switch (activeTab) {
      case 'books':
        return currentMobileBookIndex;
      case 'youtube':
        return currentMobileVideoIndex;
      case 'podcast':
        return currentMobilePodcastIndex;
      default:
        return 0;
    }
  };

  const getTotalMobileItems = () => {
    switch (activeTab) {
      case 'books':
        return books.length;
      case 'youtube':
        return youtubeVideos.length;
      case 'podcast':
        return podcastEpisodes.length;
      default:
        return 0;
    }
  };

  const handleMobileNext = () => {
    switch (activeTab) {
      case 'books':
        setCurrentMobileBookIndex((prev) =>
          prev < books.length - 1 ? prev + 1 : 0
        );
        break;
      case 'youtube':
        setCurrentMobileVideoIndex((prev) =>
          prev < youtubeVideos.length - 1 ? prev + 1 : 0
        );
        break;
      case 'podcast':
        setCurrentMobilePodcastIndex((prev) =>
          prev < podcastEpisodes.length - 1 ? prev + 1 : 0
        );
        break;
    }
  };

  const handleMobilePrev = () => {
    switch (activeTab) {
      case 'books':
        setCurrentMobileBookIndex((prev) =>
          prev > 0 ? prev - 1 : books.length - 1
        );
        break;
      case 'youtube':
        setCurrentMobileVideoIndex((prev) =>
          prev > 0 ? prev - 1 : youtubeVideos.length - 1
        );
        break;
      case 'podcast':
        setCurrentMobilePodcastIndex((prev) =>
          prev > 0 ? prev - 1 : podcastEpisodes.length - 1
        );
        break;
    }
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleMobileNext();
    }
    if (isRightSwipe) {
      handleMobilePrev();
    }
  };

  const getTotalPages = () => {
    switch (activeTab) {
      case 'books':
        return Math.ceil(books.length / itemsPerPage);
      case 'youtube':
        return Math.ceil(youtubeVideos.length / itemsPerPage);
      case 'podcast':
        return Math.ceil(podcastEpisodes.length / itemsPerPage);
      default:
        return 1;
    }
  };

  const getCurrentPage = () => {
    switch (activeTab) {
      case 'books':
        return currentBookPage;
      case 'youtube':
        return currentVideoPage;
      case 'podcast':
        return currentPodcastPage;
      default:
        return 0;
    }
  };

  const handlePrevPage = () => {
    switch (activeTab) {
      case 'books':
        setCurrentBookPage((prev) => Math.max(0, prev - 1));
        break;
      case 'youtube':
        setCurrentVideoPage((prev) => Math.max(0, prev - 1));
        break;
      case 'podcast':
        setCurrentPodcastPage((prev) => Math.max(0, prev - 1));
        break;
    }
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    switch (activeTab) {
      case 'books':
        setCurrentBookPage((prev) => Math.min(totalPages - 1, prev + 1));
        break;
      case 'youtube':
        setCurrentVideoPage((prev) => Math.min(totalPages - 1, prev + 1));
        break;
      case 'podcast':
        setCurrentPodcastPage((prev) => Math.min(totalPages - 1, prev + 1));
        break;
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (isMobile) {
      setShowMobileTabSelector(false);
    }
  };

  const toggleMobileTabSelector = () => {
    setShowMobileTabSelector(!showMobileTabSelector);
  };

  const toggleAudioPlay = (episodeId: number) => {
    setPlayingAudio(playingAudio === episodeId ? null : episodeId);
    // Here you can add actual audio playback logic
    console.log(
      `${
        playingAudio === episodeId ? 'Pausing' : 'Playing'
      } audio for episode ${episodeId}`
    );
  };

  const tabs = [
    {
      id: 'books' as TabType,
      label: 'Books',
      icon: BookOpenIcon,
      iconSolid: BookOpenIconSolid,
      count: books.length,
    },
    {
      id: 'youtube' as TabType,
      label: 'YouTube',
      icon: VideoCameraIcon,
      iconSolid: VideoCameraIconSolid,
      count: youtubeVideos.length,
    },
    {
      id: 'podcast' as TabType,
      label: 'Podcast',
      icon: SpeakerWaveIcon,
      iconSolid: SpeakerWaveIconSolid,
      count: podcastEpisodes.length,
    },
  ];

  return (
    <section className='py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5' />
        <div className='absolute top-10 sm:top-20 right-5 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 bg-indigo-200/20 rounded-full blur-2xl sm:blur-3xl animate-pulse' />
        <div className='absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-24 sm:w-40 h-24 sm:h-40 bg-purple-200/15 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 lg:mb-16 ${
            isVisible
              ? 'animate-in slide-in-from-top duration-1000'
              : 'opacity-0'
          }`}
        >
          <div className='inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg'>
            <BookOpenIcon className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
            <span className='truncate'>Educational Resources & Content</span>
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-2'>
            Explore Our{' '}
            <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Learning Resources
            </span>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex flex-col sm:flex-row justify-center items-center mb-8 sm:mb-12 ${
            isVisible
              ? 'animate-in slide-in-from-bottom duration-1000 delay-200'
              : 'opacity-0'
          }`}
        >
          {/* Mobile Tab Selector Button */}
          <div className='block sm:hidden w-full mb-4'>
            <button
              onClick={toggleMobileTabSelector}
              className='w-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 flex items-center justify-between'
            >
              <div className='flex items-center'>
                {(() => {
                  const activeTabData = tabs.find(
                    (tab) => tab.id === activeTab
                  );
                  const Icon = activeTabData
                    ? activeTabData.iconSolid
                    : BookOpenIconSolid;
                  return (
                    <>
                      <Icon className='w-6 h-6 text-indigo-600 mr-3' />
                      <span className='font-semibold text-slate-900'>
                        {activeTabData?.label || 'Select Category'}
                      </span>
                      <span className='ml-2 px-2 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-600'>
                        {activeTabData?.count || 0}
                      </span>
                    </>
                  );
                })()}
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 text-slate-600 transform transition-transform duration-300 ${
                  showMobileTabSelector ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Desktop Tab Navigation */}
          <div className='hidden sm:block bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20 w-full sm:w-auto'>
            <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
              {tabs.map((tab) => {
                const Icon = activeTab === tab.id ? tab.iconSolid : tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    <Icon className='w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3' />
                    <span>{tab.label}</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                        activeTab === tab.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Tab Popup Overlay */}
        {showMobileTabSelector && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:hidden'>
            <div className='bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-in zoom-in duration-300'>
              {/* Popup Header */}
              <div className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between'>
                <h3 className='text-xl font-bold'>Select Category</h3>
                <button
                  onClick={() => setShowMobileTabSelector(false)}
                  className='p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200'
                >
                  <XMarkIcon className='w-6 h-6' />
                </button>
              </div>

              {/* Tab Options */}
              <div className='p-4 space-y-2'>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center p-4 rounded-2xl font-semibold text-base transition-all duration-300 transform hover:scale-105 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border-2 border-slate-100'
                      }`}
                    >
                      <Icon className='w-6 h-6 mr-4' />
                      <span className='flex-1 text-left'>{tab.label}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          activeTab === tab.id
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Popup Footer */}
              <div className='bg-slate-50 p-4 text-center'>
                <p className='text-sm text-slate-500'>
                  Choose a category to explore our content
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div
          className={`${
            isVisible
              ? 'animate-in fade-in duration-1000 delay-400'
              : 'opacity-0'
          }`}
        >
          {/* Books Content */}
          {activeTab === 'books' && (
            <>
              {/* Mobile Navigation Arrows - Above Card */}
              {isMobile && (
                <div className='flex justify-between items-center mb-4 px-4'>
                  <button
                    onClick={handleMobilePrev}
                    className='flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/20'
                  >
                    <ChevronLeftIcon className='w-6 h-6 text-slate-700' />
                  </button>

                  <div className='flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg'>
                    <span className='text-sm text-slate-600 font-medium'>
                      {getCurrentMobileIndex() + 1} of {getTotalMobileItems()}
                    </span>
                  </div>

                  <button
                    onClick={handleMobileNext}
                    className='flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/20'
                  >
                    <ChevronRightIcon className='w-6 h-6 text-slate-700' />
                  </button>
                </div>
              )}

              <div
                ref={isMobile ? scrollContainerRef : null}
                className={`${
                  isMobile
                    ? 'relative w-full h-auto flex justify-center items-center'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                } mb-8`}
                onTouchStart={isMobile ? onTouchStart : undefined}
                onTouchMove={isMobile ? onTouchMove : undefined}
                onTouchEnd={isMobile ? onTouchEnd : undefined}
              >
                {(getCurrentPageItems() as Book[]).map((book, index) => (
                  <div
                    key={book.id}
                    className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-white/20 ${
                      isMobile ? 'w-full max-w-sm mx-auto' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className='relative h-64 sm:h-72 lg:h-80 overflow-hidden'>
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className='object-cover object-center group-hover:scale-110 transition-transform duration-700'
                        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                      <div className='absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500'>
                        <span className='inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                          {book.category}
                        </span>
                      </div>
                    </div>
                    <div className='p-6'>
                      <h3 className='text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300'>
                        {book.title}
                      </h3>
                      <p className='text-slate-600 text-sm mb-4 leading-relaxed'>
                        {book.description}
                      </p>
                      <div className='flex items-center justify-between mb-4'>
                        <div className='text-xs text-slate-500'>
                          <div>{book.author}</div>
                          <div>{book.pages} pages</div>
                        </div>
                        <button className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm font-semibold shadow-lg'>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* YouTube Content */}
          {activeTab === 'youtube' && (
            <>
              {/* Mobile Navigation Arrows - Above Card */}
              {isMobile && (
                <div className='flex justify-between items-center mb-4 px-4'>
                  <button
                    onClick={handleMobilePrev}
                    className='flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/20'
                  >
                    <ChevronLeftIcon className='w-6 h-6 text-slate-700' />
                  </button>

                  <div className='flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg'>
                    <span className='text-sm text-slate-600 font-medium'>
                      {getCurrentMobileIndex() + 1} of {getTotalMobileItems()}
                    </span>
                  </div>

                  <button
                    onClick={handleMobileNext}
                    className='flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/20'
                  >
                    <ChevronRightIcon className='w-6 h-6 text-slate-700' />
                  </button>
                </div>
              )}

              <div
                ref={isMobile ? scrollContainerRef : null}
                className={`${
                  isMobile
                    ? 'relative w-full h-auto flex justify-center items-center'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                } mb-8`}
                onTouchStart={isMobile ? onTouchStart : undefined}
                onTouchMove={isMobile ? onTouchMove : undefined}
                onTouchEnd={isMobile ? onTouchEnd : undefined}
              >
                {(getCurrentPageItems() as YouTubeVideo[]).map(
                  (video, index) => (
                    <div
                      key={video.id}
                      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-white/20 ${
                        isMobile ? 'w-full max-w-sm mx-auto' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className='relative h-48 sm:h-56 overflow-hidden'>
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className='object-cover object-center group-hover:scale-110 transition-transform duration-700'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300' />
                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <div className='bg-red-600 rounded-full p-4 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300'>
                            <PlayIcon className='w-8 h-8 text-white ml-1' />
                          </div>
                        </div>
                        <div className='absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold'>
                          {video.duration}
                        </div>
                      </div>
                      <div className='p-6'>
                        <h3 className='text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors duration-300'>
                          {video.title}
                        </h3>
                        <p className='text-slate-600 text-sm mb-4 leading-relaxed'>
                          {video.description}
                        </p>
                        <div className='flex items-center justify-between mb-4'>
                          <div className='text-xs text-slate-500'>
                            <div>{video.views} views</div>
                            <div>{video.uploadDate}</div>
                          </div>
                          <button className='bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 text-sm font-semibold shadow-lg flex items-center space-x-2'>
                            <PlayIcon className='w-4 h-4' />
                            <span>Play Video</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}

          {/* Podcast Content */}
          {activeTab === 'podcast' && (
            <>
              {/* Mobile Navigation Arrows - Above Card */}
              {isMobile && (
                <div className='flex justify-between items-center mb-4 px-4'>
                  <button
                    onClick={handleMobilePrev}
                    className='flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/20'
                  >
                    <ChevronLeftIcon className='w-6 h-6 text-slate-700' />
                  </button>

                  <div className='flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg'>
                    <span className='text-sm text-slate-600 font-medium'>
                      {getCurrentMobileIndex() + 1} of {getTotalMobileItems()}
                    </span>
                  </div>

                  <button
                    onClick={handleMobileNext}
                    className='flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-white/20'
                  >
                    <ChevronRightIcon className='w-6 h-6 text-slate-700' />
                  </button>
                </div>
              )}

              <div
                ref={isMobile ? scrollContainerRef : null}
                className={`${
                  isMobile
                    ? 'relative w-full h-auto flex justify-center items-center'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                } mb-8`}
                onTouchStart={isMobile ? onTouchStart : undefined}
                onTouchMove={isMobile ? onTouchMove : undefined}
                onTouchEnd={isMobile ? onTouchEnd : undefined}
              >
                {(getCurrentPageItems() as PodcastEpisode[]).map(
                  (episode, index) => (
                    <div
                      key={episode.id}
                      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-white/20 ${
                        isMobile ? 'w-full max-w-sm mx-auto' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className='p-6'>
                        <div className='flex items-center justify-between mb-4'>
                          <span className='inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                            {episode.category}
                          </span>
                          <span className='text-xs text-slate-500'>
                            {episode.duration}
                          </span>
                        </div>
                        <h3 className='text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors duration-300'>
                          {episode.title}
                        </h3>
                        <p className='text-slate-600 text-sm mb-6 leading-relaxed'>
                          {episode.description}
                        </p>
                        <div className='flex items-center justify-between'>
                          <div className='text-xs text-slate-500'>
                            <div>
                              {new Date(
                                episode.releaseDate
                              ).toLocaleDateString()}
                            </div>
                            <div>Sample Audio Available</div>
                          </div>
                          <button
                            onClick={() => toggleAudioPlay(episode.id)}
                            className='flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 text-sm font-semibold shadow-lg'
                          >
                            {playingAudio === episode.id ? (
                              <PauseIcon className='w-4 h-4' />
                            ) : (
                              <PlayIcon className='w-4 h-4' />
                            )}
                            <span>
                              {playingAudio === episode.id ? 'Pause' : 'Play'}{' '}
                              Audio
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}

          {/* Mobile Progress Dots */}
          {isMobile && (
            <div className='flex justify-center py-4'>
              <div className='flex space-x-2'>
                {Array.from({ length: getTotalMobileItems() }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      switch (activeTab) {
                        case 'books':
                          setCurrentMobileBookIndex(i);
                          break;
                        case 'youtube':
                          setCurrentMobileVideoIndex(i);
                          break;
                        case 'podcast':
                          setCurrentMobilePodcastIndex(i);
                          break;
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      getCurrentMobileIndex() === i
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 w-6'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pagination - Desktop Only */}
          {!isMobile && getTotalPages() > 1 && (
            <div className='flex items-center justify-center space-x-4'>
              <button
                onClick={handlePrevPage}
                disabled={getCurrentPage() === 0}
                className='flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
              >
                <ChevronLeftIcon className='w-5 h-5 text-slate-600' />
                <span className='text-sm font-semibold text-slate-600'>
                  Previous
                </span>
              </button>

              <div className='flex space-x-2'>
                {Array.from({ length: getTotalPages() }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      switch (activeTab) {
                        case 'books':
                          setCurrentBookPage(i);
                          break;
                        case 'youtube':
                          setCurrentVideoPage(i);
                          break;
                        case 'podcast':
                          setCurrentPodcastPage(i);
                          break;
                      }
                    }}
                    className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-110 ${
                      getCurrentPage() === i
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-slate-600 hover:bg-indigo-50 shadow-lg'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={getCurrentPage() === getTotalPages() - 1}
                className='flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
              >
                <span className='text-sm font-semibold text-slate-600'>
                  Next
                </span>
                <ChevronRightIcon className='w-5 h-5 text-slate-600' />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
