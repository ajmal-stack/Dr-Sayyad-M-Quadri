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
import { ContentLoader } from '../primitives/Loader';
import booksData from '@/data/books.json';
import podcastData from '@/data/podcasts.json';

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

// Get books data from JSON
const allBooks = [...booksData.featuredBooks, ...booksData.otherBooks] as Book[];
const books = allBooks.slice(0, 6); // Show first 6 books

// Sample YouTube videos data
const youtubeVideos: YouTubeVideo[] = [
  {
    id: 1,
    title: 'Understanding Anxiety: Signs, Symptoms & Solutions',
    description: 'Learn to identify anxiety disorders and discover effective coping strategies.',
    thumbnail: '/banner/White and Black Simple Mental Health Youtube Thumbnail.png',
    duration: '15:32',
    views: '125K',
    uploadDate: '2 weeks ago',
  },
  {
    id: 2,
    title: 'Depression Treatment: Modern Approaches',
    description: 'Explore evidence-based treatments for depression and mood disorders.',
    thumbnail: '/banner/U_White and Black Simple Mental Health Youtube Thumbnail.png',
    duration: '22:45',
    views: '89K',
    uploadDate: '1 month ago',
  },
  {
    id: 3,
    title: 'Parenting and Mental Health',
    description: "Essential parenting strategies for supporting children's mental wellness.",
    thumbnail: '/banner/Parenting Unveiled (1).jpg',
    duration: '18:20',
    views: '156K',
    uploadDate: '3 weeks ago',
  },
];

// Get podcast episodes from JSON data
const podcastEpisodes: PodcastEpisode[] = podcastData.episodes.slice(0, 6); // Show first 6 episodes

export default function MediaContentMobile() {
  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [currentVideoPage, setCurrentVideoPage] = useState(0);
  const [currentPodcastPage, setCurrentPodcastPage] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const itemsPerPage = 2; // 2 cards per page for mobile
  
  // Refs for swipe containers
  const booksContainerRef = useRef<HTMLDivElement>(null);
  const videosContainerRef = useRef<HTMLDivElement>(null);
  const podcastsContainerRef = useRef<HTMLDivElement>(null);
  
  // Touch handling state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Inject blob animation styles only once
    if (!document.getElementById('blob-animations')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'blob-animations';
      styleElement.textContent = blobStyles;
      document.head.appendChild(styleElement);
    }

    // Remove artificial delay - load instantly
    setIsLoading(false);
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
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-white/80 backdrop-blur-sm">
          <ContentLoader 
            variant="dots" 
            size="xl" 
            message="Loading media content..." 
            className="min-h-[400px]"
          />
        </div>
      )}

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
                    <Link href={`/books/${book.id}`}>
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
            {getPodcastPageItems().map((episode, index) => (
              <Link
                key={episode.id}
                href={`/podcast/${episode.id}`}
                className='group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-slate-100 block'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Podcast Visual Header */}
                <div className='relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 overflow-hidden h-32'>
                  {/* Audio Wave Pattern */}
                  <div className='absolute inset-0 opacity-20'>
                    <div className='flex items-end justify-center h-full space-x-1 p-4'>
                      {Array.from({ length: 12 }, (_, i) => (
                        <div 
                          key={i}
                          className='bg-white rounded-full animate-pulse'
                          style={{
                            width: '2px',
                            height: `${Math.random() * 60 + 20}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Category and Duration */}
                  <div className='absolute top-2 left-2 right-2 flex items-center justify-between'>
                    <span className='bg-white/90 backdrop-blur-sm text-purple-700 px-2 py-1 rounded-full text-xs font-semibold'>
                      {episode.category}
                    </span>
                    <span className='bg-black/60 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm'>
                      {episode.duration}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleAudioPlay(episode.id);
                      }}
                      variant="secondary"
                      size="icon"
                      className='bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl group-hover:scale-110'
                    >
                      {playingAudio === episode.id ? (
                        <PauseIcon className='w-4 h-4 text-blue-600' />
                      ) : (
                        <PlayIcon className='w-4 h-4 text-blue-600 ml-0.5' />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Podcast Content */}
                <div className='p-3'>
                  <h4 className='text-sm font-bold text-slate-900 mb-1 line-clamp-2'>
                    {episode.title}
                  </h4>
                  <p className='text-xs text-slate-600 mb-2'>
                    {new Date(episode.publishDate).toLocaleDateString()}
                  </p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleAudioPlay(episode.id);
                    }}
                    variant="primary"
                    size="xs"
                    fullWidth
                    leftIcon={
                      playingAudio === episode.id ? (
                        <PauseIcon className='w-3 h-3' />
                      ) : (
                        <PlayIcon className='w-3 h-3' />
                      )
                    }
                  >
                    {playingAudio === episode.id ? 'Pause' : 'Listen Now'}
                  </Button>
                </div>
              </Link>
            ))}
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
            {getVideosPageItems().map((video, index) => (
              <div
                key={video.id}
                className='group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-slate-100'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Video Thumbnail */}
                <div className='relative overflow-hidden h-32'>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
                    sizes='(max-width: 768px) 50vw, 33vw'
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+E="
                  />
                  
                  {/* Duration Badge */}
                  <div className='absolute top-2 right-2'>
                    <span className='bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm'>
                      {video.duration}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='bg-red-600 rounded-full p-2 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700'>
                      <PlayIcon className='w-4 h-4 text-white ml-0.5' />
                    </div>
                  </div>
                </div>

                {/* Video Content */}
                <div className='p-3'>
                  <h4 className='text-sm font-bold text-slate-900 mb-1 line-clamp-2'>
                    {video.title}
                  </h4>
                  <p className='text-xs text-slate-600 mb-2'>
                    {video.views} views • {video.uploadDate}
                  </p>
                  <Button
                    variant="primary"
                    size="xs"
                    fullWidth
                    leftIcon={<PlayIcon className='w-3 h-3' />}
                  >
                    Watch Now
                  </Button>
                </div>
              </div>
            ))}
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
      <SwipeHint show={showSwipeHint && !isLoading} />
    </section>
  );
}