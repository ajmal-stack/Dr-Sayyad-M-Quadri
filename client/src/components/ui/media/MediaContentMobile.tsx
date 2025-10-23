'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpenIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  ChevronRightIcon,
  HandRaisedIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../primitives/Button';
import Image from 'next/image';
import Link from 'next/link';
import { generateBookSlug, generatePodcastSlug } from '@/utils/slugify';
// import { ContentLoader } from '../primitives/Loader';
// import LoadingAnimation from '../LoadingAnimation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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
  subtitle: string;
  author: string;
  description: string;
  category: string;
  type: 'Books' | 'Audiobook';
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  pages?: number;
  duration?: string;
  narrator?: string;
  publishDate: string;
  isbn: string;
  format: string[];
  image: string;
  featured: boolean;
  bestseller: boolean;
  tags: string[];
}

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

interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  publishDate: string;
  category: string;
  audioUrl: string;
  coverImage: string;
  featured: boolean;
  views?: number;
  likes?: number;
  downloads?: number;
  host?: string;
  episodeNumber?: number;
}


// Utility functions for formatting
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

export default function MediaContentMobile() {
  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [currentVideoPage, setCurrentVideoPage] = useState(0);
  const [currentPodcastPage, setCurrentPodcastPage] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(true);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(true);

  const itemsPerPage = 2; // 2 cards per page for mobile 
  
  // Refs for swipe containers
  const booksContainerRef = useRef<HTMLDivElement>(null);
  const videosContainerRef = useRef<HTMLDivElement>(null);
  const podcastsContainerRef = useRef<HTMLDivElement>(null);
  
  // Touch handling state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoadingBooks(true);
        const response = await fetch(`${API_URL}/books`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          // Get first 6 books for home page
          setBooks(data.data.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setBooks([]);
      } finally {
        setIsLoadingBooks(false);
      }
    };

    fetchBooks();
  }, []);

  // Fetch podcasts from API
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoadingPodcasts(true);
        const response = await fetch(`${API_URL}/podcasts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          // Get first 6 podcasts for home page
          setPodcastEpisodes(data.data.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching podcasts:', err);
        setPodcastEpisodes([]);
      } finally {
        setIsLoadingPodcasts(false);
      }
    };

    fetchPodcasts();
  }, []);

  // Fetch YouTube videos from API
  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      try {
        setIsLoadingYoutube(true);
        const response = await fetch(`${API_URL}/youtube`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube videos');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          // Get first 6 videos for home page
          setYoutubeVideos(data.data.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setYoutubeVideos([]);
      } finally {
        setIsLoadingYoutube(false);
      }
    };

    fetchYoutubeVideos();
  }, []);

  useEffect(() => {
    // Inject blob animation styles only once
    if (!document.getElementById('blob-animations')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'blob-animations';
      styleElement.textContent = blobStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

  const getBooksPageItems = () => {
    const startBook = currentBookPage * itemsPerPage;
    return books.slice(startBook, startBook + itemsPerPage);
  };

  const getVideosPageItems = () => {
    const startVideo = currentVideoPage * itemsPerPage;
    return youtubeVideos.slice(startVideo, startVideo + itemsPerPage);
  };

  const getPodcastPageItems = () => {
    const startPodcast = currentPodcastPage * itemsPerPage;
    return podcastEpisodes.slice(startPodcast, startPodcast + itemsPerPage);
  };

  const getBooksTotalPages = () => Math.ceil(books.length / itemsPerPage);
  const getVideosTotalPages = () => Math.ceil(youtubeVideos.length / itemsPerPage);
  const getPodcastTotalPages = () => Math.ceil(podcastEpisodes.length / itemsPerPage);

  // Swipe handling functions
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const onTouchEnd = useCallback((sectionType: 'books' | 'videos' | 'podcasts') => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    const isSwipe = Math.abs(distanceX) > minSwipeDistance;
    
    if (isHorizontalSwipe && isSwipe) {
      setHasInteracted(true);
      setShowSwipeHint(false);
      
      if (sectionType === 'books') {
        const totalPages = getBooksTotalPages();
        if (distanceX > 0 && currentBookPage < totalPages - 1) {
          setCurrentBookPage(prev => prev + 1);
        } else if (distanceX < 0 && currentBookPage > 0) {
          setCurrentBookPage(prev => prev - 1);
        }
      } else if (sectionType === 'videos') {
        const totalPages = getVideosTotalPages();
        if (distanceX > 0 && currentVideoPage < totalPages - 1) {
          setCurrentVideoPage(prev => prev + 1);
        } else if (distanceX < 0 && currentVideoPage > 0) {
          setCurrentVideoPage(prev => prev - 1);
        }
      } else if (sectionType === 'podcasts') {
        const totalPages = getPodcastTotalPages();
        if (distanceX > 0 && currentPodcastPage < totalPages - 1) {
          setCurrentPodcastPage(prev => prev + 1);
        } else if (distanceX < 0 && currentPodcastPage > 0) {
          setCurrentPodcastPage(prev => prev - 1);
        }
      }
    }
  }, [touchStart, touchEnd, currentBookPage, currentVideoPage, currentPodcastPage]);

  // Hide swipe hint after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowSwipeHint(false);
      }
    }, 5000); // Hide after 5 seconds if no interaction

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const toggleAudioPlay = (episodeId: number) => {
    setPlayingAudio(playingAudio === episodeId ? null : episodeId);
  };

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(videoId);
  };

  // Swipe Hint Component
  const SwipeHint = ({ show }: { show: boolean }) => (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className='bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 animate-pulse'>
        <HandRaisedIcon className='w-5 h-5 text-blue-400' />
        <span className='text-sm font-medium'>Swipe left or right for more</span>
        <div className='flex space-x-1'>
          <ArrowRightIcon className='w-4 h-4 text-blue-400 animate-bounce' style={{ animationDelay: '0s' }} />
          <ArrowRightIcon className='w-4 h-4 text-blue-400 animate-bounce' style={{ animationDelay: '0.2s' }} />
          <ArrowRightIcon className='w-4 h-4 text-blue-400 animate-bounce' style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );

  return (
    <section className='pt-4 pb-6 bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 relative overflow-hidden'>
      {/* Main Loading Overlay */}
        {/* {isLoading && (
          <div className="absolute inset-0 z-40 bg-white/80 backdrop-blur-sm">
            <LoadingAnimation className="text-blue-600 scale-150 mb-8" />
            <p className="text-slate-600 text-lg font-medium">Loading media content...</p>
          </div>
        )} */}

      {/* Background Elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5' />
        <div className='absolute top-10 right-5 w-20 h-20 bg-indigo-200/20 rounded-full blur-2xl animate-pulse' />
        <div className='absolute bottom-10 left-5 w-24 h-24 bg-purple-200/15 rounded-full blur-2xl animate-pulse delay-1000' />
      </div>

      <div className='max-w-2xl mx-auto px-4 relative'>
        {/* Books Section */}
        <div className='mb-8'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-slate-900 mb-2 flex items-center'>
                <BookOpenIcon className='w-4 h-4 mr-2 text-black' />
                <span className='text-black'>Books & Audiobooks</span>
              </h3>
              <div className='h-1 w-20 bg-black rounded-full'></div>
            </div>
            <Button
              onClick={() => window.location.href = '/books'}
              variant="outline"
              size="sm"
              rightIcon={<ChevronRightIcon className='w-4 h-4' />}
            >
              See More
            </Button>
          </div>

          {/* Books Grid - 2 columns with swipe */}
          <div 
            ref={booksContainerRef}
            className='grid grid-cols-2 gap-4 mb-6 touch-pan-y'
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => onTouchEnd('books')}
          >
            {getBooksPageItems().map((book, index) => (
              <div
                key={book.id}
                className='group relative w-full'
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  position: 'relative',
                  height: '280px',
                  borderRadius: '12px',
                  zIndex: 10,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '12px 12px 40px rgba(0,0,0,0.1), -12px -12px 40px rgba(255,255,255,0.9)',
                }}
              >
                {/* Animated Blob Background */}
                <div 
                  className="absolute z-[1] top-1/2 left-1/2 w-[100px] h-[100px] rounded-full opacity-100 blur-[8px]"
                  style={{
                    backgroundColor: index % 3 === 0 ? '#4f46e5' : index % 3 === 1 ? '#7c3aed' : '#ec4899',
                    animation: 'blob-bounce 5s infinite ease',
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Glass Background */}
                <div 
                  className="absolute z-[2] bg-white/95 backdrop-blur-[16px] rounded-[8px] overflow-hidden"
                  style={{
                    top: '4px',
                    left: '4px',
                    width: 'calc(100% - 8px)',
                    height: 'calc(100% - 8px)',
                    outline: '1px solid white',
                  }}
                >
                  {/* Book Cover Image */}
                  <div className='relative w-full h-full overflow-hidden flex items-center justify-center p-3'>
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className='object-contain transition-transform duration-300 group-hover:scale-105'
                      sizes='(max-width: 768px) 50vw, 33vw'
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+E="
                    />
                    
                    {/* Category Badge */}
                    <div className='absolute top-2 left-2'>
                      <span className='bg-white/90 backdrop-blur-sm text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm'>
                        {book.category}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Bottom Info */}
                  <div className='absolute bottom-0 left-0 right-0 z-[4] bg-gradient-to-t from-black/95 via-black/80 to-transparent rounded-b-[8px] p-2'>
                    <h3 className='text-xs font-bold text-white mb-1 leading-tight line-clamp-1'>
                      {book.title}
                    </h3>
                    <p className='text-xs text-white/80 mb-2'>
                      By {book.author} • {book.pages ? `${book.pages} pages` : book.duration || book.type}
                    </p>
                    <Link href={`/books/${generateBookSlug(book.title)}`}>
                      <Button variant="secondary" size="xs" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {getBooksTotalPages() > 1 && (
            <div className='flex justify-center space-x-2 mb-4'>
              {Array.from({ length: getBooksTotalPages() }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBookPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentBookPage === i
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 w-6'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Podcast Section */}
        <div className='mb-8'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-slate-900 mb-2 flex items-center'>
                <SpeakerWaveIcon className='w-4 h-4 mr-2 text-black' />
                <span className='text-black'>Podcast & Audio</span>
              </h3>
              <div className='h-1 w-20 bg-black rounded-full'></div>
            </div>
            <Button
              onClick={() => window.location.href = '/podcast'}
              variant="outline"
              size="sm"
              rightIcon={<ChevronRightIcon className='w-4 h-4' />}
            >
              See More
            </Button>
          </div>

          {/* Podcast Grid - 2 columns with swipe */}
          <div 
            ref={podcastsContainerRef}
            className='grid grid-cols-2 gap-4 mb-6 touch-pan-y'
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => onTouchEnd('podcasts')}
          >
            {isLoadingPodcasts ? (
              // Loading skeleton
              Array.from({ length: 2 }, (_, index) => (
                <div
                  key={`podcast-skeleton-mobile-${index}`}
                  className='relative w-full bg-slate-200 animate-pulse rounded-2xl'
                  style={{ height: '200px' }}
                />
              ))
            ) : podcastEpisodes.length === 0 ? (
              // No podcasts message
              <div className='col-span-full text-center py-8'>
                <p className='text-slate-600 text-sm'>No podcasts available.</p>
              </div>
            ) : (
              getPodcastPageItems().map((episode, index) => (
              <Link
                key={episode.id}
                href={`/podcast/${generatePodcastSlug(episode.title)}`}
                className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 border border-purple-100 cursor-pointer block'
              >
                {/* Podcast Thumbnail */}
                <div className='relative aspect-video bg-slate-200 overflow-hidden'>
                  <Image
                    src={episode.coverImage}
                    alt={episode.title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 50vw, 33vw'
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                  />
                  
                  {/* Duration Badge */}
                  <div className='absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium'>
                    {episode.duration}
                  </div>

                  {/* Play Button Overlay */}
                  <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center'>
                    <button 
                      className='w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors duration-200'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleAudioPlay(episode.id);
                      }}
                    >
                      {playingAudio === episode.id ? (
                        <PauseIcon className='w-6 h-6' />
                      ) : (
                        <PlayIcon className='w-6 h-6 ml-0.5' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Podcast Content */}
                <div className='p-3'>
                  <h4 className='text-sm font-bold text-slate-900 mb-1 line-clamp-2'>
                    {episode.title}
                  </h4>
                  <p className='text-xs text-slate-600 mb-2'>
                    {formatDate(episode.publishDate)} • {episode.duration}
                  </p>
                </div>
              </Link>
            ))
            )}
          </div>

          {/* Pagination Dots */}
          {getPodcastTotalPages() > 1 && (
            <div className='flex justify-center space-x-2 mb-4'>
              {Array.from({ length: getPodcastTotalPages() }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPodcastPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPodcastPage === i
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-6'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* YouTube Section */}
        <div className='mb-8'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-slate-900 mb-2 flex items-center'>
                <VideoCameraIcon className='w-4 h-4 mr-2 text-black' />
                <span className='text-black'>YouTube & Videos</span>
              </h3>
              <div className='h-1 w-20 bg-black rounded-full'></div>
            </div>
            <Button
              onClick={() => window.location.href = '/youtube'}
              variant="outline"
              size="sm"
              rightIcon={<ChevronRightIcon className='w-4 h-4' />}
            >
              See More
            </Button>
          </div>

          {/* Videos Grid - 2 columns with swipe */}
          <div 
            ref={videosContainerRef}
            className='grid grid-cols-2 gap-4 mb-6 touch-pan-y'
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => onTouchEnd('videos')}
          >
            {isLoadingYoutube ? (
              // Loading skeleton
              Array.from({ length: 2 }, (_, index) => (
                <div
                  key={`youtube-skeleton-mobile-${index}`}
                  className='relative w-full bg-slate-200 animate-pulse rounded-2xl'
                  style={{ height: '200px' }}
                />
              ))
            ) : youtubeVideos.length === 0 ? (
              // No videos message
              <div className='col-span-full text-center py-8'>
                <p className='text-slate-600 text-sm'>No YouTube videos available.</p>
              </div>
            ) : (
              getVideosPageItems().map((video, index) => (
              <div
                key={video.id}
                className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 border border-red-100 cursor-pointer'
                onClick={() => handleVideoPlay(video.id)}
              >
                {/* Video Thumbnail */}
                <div className='relative aspect-video bg-slate-200 overflow-hidden'>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 50vw, 33vw'
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                  />
                  
                  {/* Duration Badge */}
                  <div className='absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium'>
                    {video.duration}
                  </div>

                  {/* Play Button Overlay */}
                  <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center'>
                    <button className='w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors duration-200'>
                      <PlayIcon className='w-6 h-6 ml-0.5' />
                    </button>
                  </div>
                </div>

                {/* Video Content */}
                <div className='p-3'>
                  <h4 className='text-sm font-bold text-slate-900 mb-1 line-clamp-2'>
                    {video.title}
                  </h4>
                  <p className='text-xs text-slate-600 mb-2'>
                    {formatViews(video.views)} views • {formatDate(video.publishDate)}
                  </p>
                </div>
              </div>
            ))
            )}
          </div>

          {/* Pagination Dots */}
          {getVideosTotalPages() > 1 && (
            <div className='flex justify-center space-x-2 mb-4'>
              {Array.from({ length: getVideosTotalPages() }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentVideoPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentVideoPage === i
                      ? 'bg-gradient-to-r from-red-600 to-red-700 w-6'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Swipe Hint */}
      <SwipeHint show={showSwipeHint} />

      {/* Video Modal - Enhanced Responsive Design */}
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
    </section>
  );
}