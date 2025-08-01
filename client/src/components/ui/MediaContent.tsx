'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  BookOpenIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Add the blob animation styles
const blobStyles = `
  @keyframes blob-bounce {
    0% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
    }
    25% {
      transform: translate(-50%, -50%) translate3d(100%, 0, 0);
    }
    50% {
      transform: translate(-50%, -50%) translate3d(100%, 100%, 0);
    }
    75% {
      transform: translate(-50%, -50%) translate3d(0, 100%, 0);
    }
    100% {
      transform: translate(-50%, -50%) translate3d(0, 0, 0);
    }
  }
`;

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
    id: 2,
    title: 'Mind Matters: Mental Wellness',
    description:
      'Essential guide to maintaining mental health and building resilience in daily life.',
    image: '/books/Navy and Pink Illustrated Mind Matters Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Mental Health',
    pages: 350,
  },
  {
    id: 3,
    title: 'Daily Food Journal',
    description:
      'Track your nutrition and build healthy eating habits for better mental and physical wellness.',
    image: '/books/Red Simple Food Journal Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Wellness',
    pages: 200,
  },
  {
    id: 4,
    title: 'Modern Psychology Insights',
    description:
      'Comprehensive guide to understanding modern psychological approaches and therapeutic techniques.',
    image: '/books/Black and White Modern Psychology Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Psychology',
    pages: 320,
  },
  // {
  //   id: 5,
  //   title: 'Love & Relationships',
  //   description:
  //     'Navigate romantic relationships with psychological insights and practical advice.',
  //   image: '/books/Romantic Doctor Love Story Ebook Cover.png',
  //   author: 'Dr. Syed M Quadri',
  //   category: 'Relationships',
  //   pages: 250,
  // },
  // {
  //   id: 6,
  //   title: 'Nutrition & Mental Health',
  //   description:
  //     'Discover the connection between nutrition and mental wellness for optimal health.',
  //   image:
  //     '/books/Red and Green Seamless Pattern Printable Daily Food Journal Cover.jpg',
  //   author: 'Dr. Syed M Quadri',
  //   category: 'Health',
  //   pages: 180,
  // },
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
  // {
  //   id: 4,
  //   title: 'Stress Management Techniques',
  //   description:
  //     'Practical techniques for managing daily stress and building resilience.',
  //   thumbnail: '/banner/Parenting Unveiled (2).jpg',
  //   duration: '12:15',
  //   views: '203K',
  //   uploadDate: '1 week ago',
  // },
  // {
  //   id: 5,
  //   title: 'Building Healthy Relationships',
  //   description:
  //     'Communication skills and strategies for stronger, healthier relationships.',
  //   thumbnail: '/banner/Parenting Unveiled (3).jpg',
  //   duration: '25:10',
  //   views: '98K',
  //   uploadDate: '2 months ago',
  // },
  // {
  //   id: 6,
  //   title: 'Sleep and Mental Health',
  //   description:
  //     'Understanding the crucial connection between sleep quality and mental wellness.',
  //   thumbnail: '/banner/Parenting Unveiled (4).jpg',
  //   duration: '16:55',
  //   views: '134K',
  //   uploadDate: '3 weeks ago',
  // },
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
  // {
  //   id: 4,
  //   title: 'The Science of Happiness',
  //   description:
  //     'Exploring positive psychology and evidence-based approaches to well-being.',
  //   duration: '41:15',
  //   releaseDate: '2023-12-25',
  //   category: 'Positive Psychology',
  //   audioUrl: '#', // Placeholder
  // },
  // {
  //   id: 5,
  //   title: 'Couples Therapy Insights',
  //   description:
  //     'Relationship dynamics and communication strategies for healthier partnerships.',
  //   duration: '47:10',
  //   releaseDate: '2023-12-18',
  //   category: 'Relationships',
  //   audioUrl: '#', // Placeholder
  // },
  // {
  //   id: 6,
  //   title: 'Mindfulness and Meditation',
  //   description:
  //     'The therapeutic benefits of mindfulness practices in mental health treatment.',
  //   duration: '35:25',
  //   releaseDate: '2023-12-11',
  //   category: 'Mindfulness',
  //   audioUrl: '#', // Placeholder
  // },
];

export default function MediaContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [currentVideoPage, setCurrentVideoPage] = useState(0);
  const [currentPodcastPage, setCurrentPodcastPage] = useState(0);
  const [currentMobileBookIndex, setCurrentMobileBookIndex] = useState(0);
  const [currentMobileVideoIndex, setCurrentMobileVideoIndex] = useState(0);
  const [currentMobilePodcastIndex, setCurrentMobilePodcastIndex] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const itemsPerPage = 4;

  useEffect(() => {
    setIsVisible(true);

    // Inject blob animation styles
    const styleElement = document.createElement('style');
    styleElement.textContent = blobStyles;
    document.head.appendChild(styleElement);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      // Clean up the injected styles
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);



  const getBooksPageItems = () => {
    if (isMobile) {
      return [books[currentMobileBookIndex]];
    } else {
      const startBook = currentBookPage * itemsPerPage;
      return books.slice(startBook, startBook + itemsPerPage);
    }
  };

  const getVideosPageItems = () => {
    if (isMobile) {
      return [youtubeVideos[currentMobileVideoIndex]];
    } else {
      const startVideo = currentVideoPage * itemsPerPage;
      return youtubeVideos.slice(startVideo, startVideo + itemsPerPage);
    }
  };

  const getPodcastPageItems = () => {
    if (isMobile) {
      return [podcastEpisodes[currentMobilePodcastIndex]];
    } else {
      const startPodcast = currentPodcastPage * itemsPerPage;
      return podcastEpisodes.slice(startPodcast, startPodcast + itemsPerPage);
    }
  };

  const handleMobileBookNext = () => {
    setCurrentMobileBookIndex((prev) =>
      prev < books.length - 1 ? prev + 1 : 0
    );
  };

  const handleMobileBookPrev = () => {
    setCurrentMobileBookIndex((prev) =>
      prev > 0 ? prev - 1 : books.length - 1
    );
  };

  const handleMobileVideoNext = () => {
    setCurrentMobileVideoIndex((prev) =>
      prev < youtubeVideos.length - 1 ? prev + 1 : 0
    );
  };

  const handleMobileVideoPrev = () => {
    setCurrentMobileVideoIndex((prev) =>
      prev > 0 ? prev - 1 : youtubeVideos.length - 1
    );
  };

  const handleMobilePodcastNext = () => {
    setCurrentMobilePodcastIndex((prev) =>
      prev < podcastEpisodes.length - 1 ? prev + 1 : 0
    );
  };

  const handleMobilePodcastPrev = () => {
    setCurrentMobilePodcastIndex((prev) =>
      prev > 0 ? prev - 1 : podcastEpisodes.length - 1
    );
  };



  const getBooksTotalPages = () => Math.ceil(books.length / itemsPerPage);
  const getVideosTotalPages = () => Math.ceil(youtubeVideos.length / itemsPerPage);
  const getPodcastTotalPages = () => Math.ceil(podcastEpisodes.length / itemsPerPage);

  const handleBooksPrevPage = () => {
    setCurrentBookPage((prev) => Math.max(0, prev - 1));
  };

  const handleBooksNextPage = () => {
    const totalPages = getBooksTotalPages();
    setCurrentBookPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleVideosPrevPage = () => {
    setCurrentVideoPage((prev) => Math.max(0, prev - 1));
  };

  const handleVideosNextPage = () => {
    const totalPages = getVideosTotalPages();
    setCurrentVideoPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handlePodcastPrevPage = () => {
    setCurrentPodcastPage((prev) => Math.max(0, prev - 1));
  };

  const handlePodcastNextPage = () => {
    const totalPages = getPodcastTotalPages();
    setCurrentPodcastPage((prev) => Math.min(totalPages - 1, prev + 1));
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



  return (
    <section className='pt-4 sm:pt-6 lg:pt-8 bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5' />
        <div className='absolute top-10 sm:top-20 right-5 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 bg-indigo-200/20 rounded-full blur-2xl sm:blur-3xl animate-pulse' />
        <div className='absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-24 sm:w-40 h-24 sm:h-40 bg-purple-200/15 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
                {/* Header */}
        <div
          className={`text-center mb-4 sm:mb-6 lg:mb-8 ${
            isVisible
              ? 'animate-in slide-in-from-top duration-1000'
              : 'opacity-0'
          }`}
        >
          <div className='flex justify-center mb-4 sm:mb-6'>
            <div className='inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg'>
              {/* <BookOpenIcon className='w-4 h-4 sm:w-5 sm:h-5 mr-2' /> */}
              <div className='text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight px-2'>
            Explore Our{' '}
            <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Learning Resources
            </span>
          </div>
            </div>
          </div>
          
        </div>



        {/* Content Area */}
        <div
          className={`${
            isVisible
              ? 'animate-in fade-in duration-1000 delay-400'
              : 'opacity-0'
          }`}
        >
          {/* Books Section */}
          <div className='mb-8'>
            <div className='flex items-center justify-between mb-8'>
              <div className='flex-1 text-center'>
                <div className='relative inline-block'>
                  <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-2 flex items-center justify-center'>
                    <BookOpenIcon className='w-6 h-6 sm:w-7 sm:h-7 mr-3 text-indigo-600' />
                    <span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                      Books
                    </span>
                  </h3>
                  <div className='h-1 w-30 mx-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full'></div>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/books'}
                className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2'
              >
                <span>See More</span>
                <ChevronRightIcon className='w-4 h-4' />
              </button>
            </div>

            <div
              className={`${
                isMobile
                  ? 'relative w-full h-auto flex justify-center items-center'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
              } mb-8`}
            >
              {(getBooksPageItems() as Book[]).map((book, index) => (
                  <div
                    key={book.id}
                    className={`group relative ${
                      isMobile ? 'w-full max-w-sm mx-auto' : 'w-full'
                    }`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      position: 'relative',
                      width: isMobile ? '100%' : '100%',
                      height: '400px',
                      borderRadius: '14px',
                      zIndex: 1111,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                    }}
                  >
                    {/* Mobile Navigation Arrows - On Card */}
                    {isMobile && (
                      <>
                        <button
                          onClick={handleMobileBookPrev}
                          className='absolute left-2 top-1/2 transform -translate-y-1/2 z-[9999] flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20'
                        >
                          <ChevronLeftIcon className='w-5 h-5 text-slate-700' />
                        </button>

                        <button
                          onClick={handleMobileBookNext}
                          className='absolute right-2 top-1/2 transform -translate-y-1/2 z-[9999] flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20'
                        >
                          <ChevronRightIcon className='w-5 h-5 text-slate-700' />
                        </button>
                      </>
                    )}

                    {/* Animated Blob Background */}
                    <div 
                      className="absolute z-[1] top-1/2 left-1/2 w-[150px] h-[150px] rounded-full opacity-100 blur-[12px]"
                      style={{
                        backgroundColor: index % 3 === 0 ? '#4f46e5' : index % 3 === 1 ? '#7c3aed' : '#ec4899',
                        animation: 'blob-bounce 5s infinite ease',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />

                    {/* Glass Background */}
                    <div 
                      className="absolute z-[2] bg-white/95 backdrop-blur-[24px] rounded-[10px] overflow-hidden"
                      style={{
                        top: '5px',
                        left: '5px',
                        width: 'calc(100% - 10px)',
                        height: 'calc(100% - 10px)',
                        outline: '2px solid white',
                      }}
                    >
                      {/* Book Cover Image - Full Card */}
                      <div className='relative w-full h-full overflow-hidden flex items-center justify-center p-4'>
                        <Image
                          src={book.image}
                          alt={book.title}
                          fill
                          className='object-contain transition-transform duration-700 group-hover:scale-105'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        
                        {/* Clean Category Badge */}
                        <div className='absolute top-2 left-2'>
                          <span className='bg-white/90 backdrop-blur-sm text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm'>
                            {book.category}
                          </span>
                        </div>
                      </div>

                      {/* Desktop Hover Overlay with Text and Button */}
                      <div className='hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-[3] rounded-[10px] flex-col justify-end'>
                        <div className='p-4 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500'>
                          <h3 className='text-lg font-bold mb-2 leading-tight'>
                            {book.title}
                          </h3>
                          <p className='text-sm text-white/90 mb-3 leading-relaxed line-clamp-2'>
                            {book.description}
                          </p>
                          <div className='text-xs text-white/80 mb-4'>
                            <div className='font-medium'>{book.author}</div>
                            <div>{book.pages} pages</div>
                          </div>
                          <button className='w-full bg-white text-indigo-600 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 text-sm font-semibold shadow-lg'>
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile-Only Bottom Info (visible on mobile) */}
                    <div className='block sm:hidden absolute bottom-0 left-0 right-0 z-[4] bg-gradient-to-t from-black/95 via-black/80 to-transparent rounded-b-[10px] p-3'>
                      <h3 className='text-sm font-bold text-white mb-1 leading-tight line-clamp-1'>
                        {book.title}
                      </h3>
                      <p className='text-xs text-white/80 mb-2'>
                        By {book.author} • {book.pages} pages
                      </p>
                      <button className='w-full bg-white text-indigo-600 py-1.5 rounded-full text-xs font-semibold shadow-lg'>
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Mobile Progress Dots for Books */}
            {isMobile && (
              <div className='flex justify-center py-4'>
                <div className='flex space-x-2'>
                  {Array.from({ length: books.length }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentMobileBookIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentMobileBookIndex === i
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 w-6'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination - Desktop Only for Books */}
            {!isMobile && getBooksTotalPages() > 1 && (
              <div className='flex items-center justify-center space-x-4 mt-8'>
                <button
                  onClick={handleBooksPrevPage}
                  disabled={currentBookPage === 0}
                  className='flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
                >
                  <ChevronLeftIcon className='w-5 h-5 text-slate-600' />
                  <span className='text-sm font-semibold text-slate-600'>
                    Previous
                  </span>
                </button>

                <div className='flex space-x-2'>
                  {Array.from({ length: getBooksTotalPages() }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentBookPage(i)}
                      className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-110 ${
                        currentBookPage === i
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'bg-white text-slate-600 hover:bg-indigo-50 shadow-lg'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleBooksNextPage}
                  disabled={currentBookPage === getBooksTotalPages() - 1}
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

          {/* YouTube Section */}
          <div className='mb-8'>
            <div className='flex items-center justify-between mb-8'>
              <div className='flex-1 text-center'>
                <div className='relative inline-block'>
                  <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-2 flex items-center justify-center'>
                  <VideoCameraIcon className='w-6 h-6 sm:w-7 sm:h-7 mr-3 text-red-600' />
                  <span className='bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent'>
                    YouTube Videos
                    </span>
                  </h3>
                  <div className='h-1 w-32 mx-auto bg-gradient-to-r from-red-600 via-red-600 to-red-700 rounded-full'></div>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/videos'}
                className='bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2'
              >
                <span>See More</span>
                <ChevronRightIcon className='w-4 h-4' />
              </button>
            </div>

            <div
              className={`${
                isMobile
                  ? 'relative w-full h-auto flex justify-center items-center'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              } mb-8`}
            >
              {(getVideosPageItems() as YouTubeVideo[]).map(
                  (video, index) => (
                    <div
                      key={video.id}
                      className={`group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-100 ${
                        isMobile ? 'w-full max-w-sm mx-auto' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Mobile Navigation Arrows - On Card */}
                      {isMobile && (
                        <>
                          <button
                            onClick={handleMobileVideoPrev}
                            className='absolute left-2 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20'
                          >
                            <ChevronLeftIcon className='w-5 h-5 text-slate-700' />
                          </button>

                          <button
                            onClick={handleMobileVideoNext}
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20'
                          >
                            <ChevronRightIcon className='w-5 h-5 text-slate-700' />
                          </button>
                        </>
                      )}
                      {/* Video Thumbnail */}
                      <div className='relative h-56 sm:h-64 overflow-hidden'>
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className='object-cover object-center transition-transform duration-700 group-hover:scale-105'
                          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        />
                        
                        {/* Duration Badge */}
                        <div className='absolute top-4 right-4'>
                          <span className='bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm'>
                            {video.duration}
                          </span>
                        </div>

                        {/* Play Button */}
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='bg-red-600 rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700'>
                            <PlayIcon className='w-6 h-6 text-white ml-0.5' />
                          </div>
                        </div>

                        {/* Hover Overlay Content */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500'>
                          <div className='absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500'>
                            <h3 className='text-lg font-bold mb-2 leading-tight'>
                              {video.title}
                            </h3>
                            <p className='text-sm text-white/90 mb-3 leading-relaxed line-clamp-2'>
                              {video.description}
                            </p>
                            <div className='flex items-center justify-between'>
                              <div className='text-xs text-white/80'>
                                <div className='font-medium'>{video.views} views</div>
                                <div>{video.uploadDate}</div>
                              </div>
                              <button className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 text-sm font-semibold shadow-lg flex items-center space-x-2'>
                                <PlayIcon className='w-4 h-4' />
                                <span>Watch Now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile-Only Bottom Info */}
                      <div className='block sm:hidden p-4 bg-gradient-to-r from-red-50 to-orange-50'>
                        <h3 className='text-lg font-bold text-slate-900 mb-1 truncate'>
                          {video.title}
                        </h3>
                        <p className='text-sm text-slate-600 mb-2'>
                          {video.views} views • {video.uploadDate}
                        </p>
                        <button className='w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-full text-sm font-semibold flex items-center justify-center space-x-2'>
                          <PlayIcon className='w-4 h-4' />
                          <span>Watch Now</span>
                        </button>
                      </div>
                    </div>
                  )
                )}
            </div>

            {/* Mobile Progress Dots for Videos */}
            {isMobile && (
              <div className='flex justify-center py-4'>
                <div className='flex space-x-2'>
                  {Array.from({ length: youtubeVideos.length }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentMobileVideoIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentMobileVideoIndex === i
                          ? 'bg-gradient-to-r from-red-600 to-red-700 w-6'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination - Desktop Only for Videos */}
            {!isMobile && getVideosTotalPages() > 1 && (
              <div className='flex items-center justify-center space-x-4 mt-8'>
                <button
                  onClick={handleVideosPrevPage}
                  disabled={currentVideoPage === 0}
                  className='flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
                >
                  <ChevronLeftIcon className='w-5 h-5 text-slate-600' />
                  <span className='text-sm font-semibold text-slate-600'>
                    Previous
                  </span>
                </button>

                <div className='flex space-x-2'>
                  {Array.from({ length: getVideosTotalPages() }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentVideoPage(i)}
                      className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-110 ${
                        currentVideoPage === i
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                          : 'bg-white text-slate-600 hover:bg-red-50 shadow-lg'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleVideosNextPage}
                  disabled={currentVideoPage === getVideosTotalPages() - 1}
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

          {/* Podcast Section */}
          <div className='mb-0'>
            <div className='flex items-center justify-between mb-8'>
              <div className='flex-1 text-center'>
                <div className='relative inline-block'>
                  <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-2 flex items-center justify-center'>
                  <SpeakerWaveIcon className='w-6 h-6 sm:w-7 sm:h-7 mr-3 text-purple-600' />
                  <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    Podcast Episodes
                    </span>
                  </h3>
                  <div className='h-1 w-36 mx-auto bg-gradient-to-r from-purple-600 via-purple-600 to-pink-600 rounded-full'></div>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/podcasts'}
                className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2'
              >
                <span>See More</span>
                <ChevronRightIcon className='w-4 h-4' />
              </button>
            </div>


            <div
              className={`${
                isMobile
                  ? 'relative w-full h-auto flex justify-center items-center'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              } mb-8`}
            >
              {(getPodcastPageItems() as PodcastEpisode[]).map(
                  (episode, index) => (
                    <div
                      key={episode.id}
                      className={`group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-100 ${
                        isMobile ? 'w-full max-w-sm mx-auto' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Mobile Navigation Arrows - On Card */}
                      {isMobile && (
                        <>
                          <button
                            onClick={handleMobilePodcastPrev}
                            className='absolute left-2 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20'
                          >
                            <ChevronLeftIcon className='w-5 h-5 text-slate-700' />
                          </button>

                          <button
                            onClick={handleMobilePodcastNext}
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20'
                          >
                            <ChevronRightIcon className='w-5 h-5 text-slate-700' />
                          </button>
                        </>
                      )}
                      {/* Podcast Visual Header */}
                      <div className='relative h-40 sm:h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 overflow-hidden'>
                        {/* Audio Wave Pattern */}
                        <div className='absolute inset-0 opacity-20'>
                          <div className='flex items-end justify-center h-full space-x-1 p-8'>
                            {Array.from({ length: 20 }, (_, i) => (
                              <div 
                                key={i}
                                className='bg-white rounded-full animate-pulse'
                                style={{
                                  width: '3px',
                                  height: `${Math.random() * 100 + 20}%`,
                                  animationDelay: `${i * 0.1}s`
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Category and Duration */}
                        <div className='absolute top-4 left-4 right-4 flex items-center justify-between'>
                          <span className='bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-1 rounded-full text-xs font-semibold'>
                            {episode.category}
                          </span>
                          <span className='bg-black/60 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm'>
                            {episode.duration}
                          </span>
                        </div>

                        {/* Play Button */}
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <button
                            onClick={() => toggleAudioPlay(episode.id)}
                            className='bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl transform transition-all duration-300 group-hover:scale-110 hover:bg-white'
                          >
                            {playingAudio === episode.id ? (
                              <PauseIcon className='w-6 h-6 text-purple-600' />
                            ) : (
                              <PlayIcon className='w-6 h-6 text-purple-600 ml-0.5' />
                            )}
                          </button>
                        </div>

                        {/* Hover Overlay Content */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500'>
                          <div className='absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500'>
                            <h3 className='text-lg font-bold mb-2 leading-tight'>
                              {episode.title}
                            </h3>
                            <p className='text-sm text-white/90 mb-3 leading-relaxed line-clamp-2'>
                              {episode.description}
                            </p>
                            <div className='flex items-center justify-between'>
                              <div className='text-xs text-white/80'>
                                <div className='font-medium'>
                                  {new Date(episode.releaseDate).toLocaleDateString()}
                                </div>
                                <div>Sample Audio Available</div>
                              </div>
                              <button
                                onClick={() => toggleAudioPlay(episode.id)}
                                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 text-sm font-semibold shadow-lg flex items-center space-x-2'
                              >
                                {playingAudio === episode.id ? (
                                  <PauseIcon className='w-4 h-4' />
                                ) : (
                                  <PlayIcon className='w-4 h-4' />
                                )}
                                <span>
                                  {playingAudio === episode.id ? 'Pause' : 'Listen Now'}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile-Only Bottom Info */}
                      <div className='block sm:hidden p-4 bg-gradient-to-r from-purple-50 to-pink-50'>
                        <h3 className='text-lg font-bold text-slate-900 mb-1 truncate'>
                          {episode.title}
                        </h3>
                        <p className='text-sm text-slate-600 mb-2'>
                          {new Date(episode.releaseDate).toLocaleDateString()} • {episode.duration}
                        </p>
                        <button
                          onClick={() => toggleAudioPlay(episode.id)}
                          className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-full text-sm font-semibold flex items-center justify-center space-x-2'
                        >
                          {playingAudio === episode.id ? (
                            <PauseIcon className='w-4 h-4' />
                          ) : (
                            <PlayIcon className='w-4 h-4' />
                          )}
                          <span>
                            {playingAudio === episode.id ? 'Pause' : 'Listen Now'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )
                )}
            </div>

            {/* Mobile Progress Dots for Podcast */}
            {isMobile && (
              <div className='flex justify-center py-4'>
                <div className='flex space-x-2'>
                  {Array.from({ length: podcastEpisodes.length }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentMobilePodcastIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentMobilePodcastIndex === i
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-6'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination - Desktop Only for Podcast */}
            {!isMobile && getPodcastTotalPages() > 1 && (
              <div className='flex items-center justify-center space-x-4 mt-8'>
                <button
                  onClick={handlePodcastPrevPage}
                  disabled={currentPodcastPage === 0}
                  className='flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
                >
                  <ChevronLeftIcon className='w-5 h-5 text-slate-600' />
                  <span className='text-sm font-semibold text-slate-600'>
                    Previous
                  </span>
                </button>

                <div className='flex space-x-2'>
                  {Array.from({ length: getPodcastTotalPages() }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPodcastPage(i)}
                      className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-110 ${
                        currentPodcastPage === i
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-white text-slate-600 hover:bg-purple-50 shadow-lg'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handlePodcastNextPage}
                  disabled={currentPodcastPage === getPodcastTotalPages() - 1}
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
      </div>
     
    </section>
  );
}
