'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BookOpenIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  ChevronRightIcon,
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
  _id: string;
  id?: number;
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

export default function MediaContentDesktop() {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(true);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(true);

  const itemsPerPage = 4;
  const youtubeVideoPerPage = 3;
  
  // Audio player ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    if (!document.getElementById('blob-animations-desktop')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'blob-animations-desktop';
      styleElement.textContent = blobStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getBooksPageItems = () => {
    return books.slice(0, itemsPerPage);
  };

  const getVideosPageItems = () => {
    return youtubeVideos.slice(0, youtubeVideoPerPage);
  };

  const getPodcastPageItems = () => {
    return podcastEpisodes.slice(0, 3); 
  };



  const toggleAudioPlay = (episodeId: string, audioUrl: string) => {
    if (playingAudio === episodeId) {
      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudio(null);
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Create new audio element
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.play().catch(err => {
        console.error('Error playing audio:', err);
        setPlayingAudio(null);
      });
      
      // Handle audio end
      audio.onended = () => {
        setPlayingAudio(null);
      };
      
      setPlayingAudio(episodeId);
    }
  };

  const handleVideoPlay = (videoId: string) => {
    setActiveVideo(videoId);
  };

  return (
    <section className='pt-8 bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 relative overflow-hidden'>
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
        <div className='absolute top-20 right-10 w-32 h-32 bg-indigo-200/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-20 left-10 w-40 h-40 bg-purple-200/15 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='max-w-7xl mx-auto px-8 relative'>
        {/* Books Section */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex-1'>
              <h3 className='text-3xl font-bold text-slate-900 mb-2 flex items-center'>
                <BookOpenIcon className='w-7 h-7 mr-3 text-black' />
                <span className='text-black'>Books & Audiobooks</span>
              </h3>
              <div className='h-1 w-36 bg-black rounded-full'></div>
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

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
            {isLoadingBooks ? (
              // Loading skeleton
              Array.from({ length: 4 }, (_, index) => (
                <div
                  key={`book-skeleton-${index}`}
                  className='relative w-full bg-slate-200 animate-pulse rounded-2xl'
                  style={{ height: '440px' }}
                />
              ))
            ) : books.length === 0 ? (
              // No books message
              <div className='col-span-full text-center py-12'>
                <p className='text-slate-600'>No books available at the moment.</p>
              </div>
            ) : (
              getBooksPageItems().map((book, index) => (
              <div
                key={book.id}
                className='group relative w-full'
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  position: 'relative',
                  height: '440px',
                  borderRadius: '14px',
                  zIndex: 10,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                }}
              >
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
                  {/* Book Cover Image */}
                  <div className='relative w-full h-full overflow-hidden flex items-center justify-center p-4'>
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className='object-contain transition-transform duration-300 group-hover:scale-105'
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
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

                  {/* Hover Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-[3] rounded-[10px] flex flex-col justify-end'>
                    <div className='p-4 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500'>
                      <h3 className='text-lg font-bold mb-2 leading-tight'>
                        {book.title}
                      </h3>
                      <p className='text-sm text-white/90 mb-3 leading-relaxed line-clamp-2'>
                        {book.description}
                      </p>
                      <div className='text-xs text-white/80 mb-4'>
                        <div className='font-medium'>{book.author}</div>
                        <div>{book.pages ? `${book.pages} pages` : book.duration || book.type}</div>
                      </div>
                      <Link href={`/books/${generateBookSlug(book.title)}`}>
                        <Button variant="secondary" size="sm" fullWidth>
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>

          {/* Pagination for Books */}
          {/* {getBooksTotalPages() > 1 && (
            <div className='flex items-center justify-center space-x-4 mt-8'>
              <Button
                onClick={handleBooksPrevPage}
                disabled={currentBookPage === 0}
                variant="secondary"
                size="sm"
                leftIcon={<ChevronLeftIcon className='w-5 h-5' />}
              >
                Previous
              </Button>

              <div className='flex space-x-2'>
                {Array.from({ length: getBooksTotalPages() }, (_, i) => (
                  <Button
                    key={i}
                    onClick={() => setCurrentBookPage(i)}
                    variant={currentBookPage === i ? "primary" : "secondary"}
                    size="icon"
                    className="w-10 h-10"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleBooksNextPage}
                disabled={currentBookPage === getBooksTotalPages() - 1}
                variant="secondary"
                size="sm"
                rightIcon={<ChevronRightIcon className='w-5 h-5' />}
              >
                Next
              </Button>
            </div>
          )} */}
        </div>

        {/* Podcast Section */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex-1'>
              <h3 className='text-3xl font-bold text-slate-900 mb-2 flex items-center'>
                <SpeakerWaveIcon className='w-7 h-7 mr-3 text-black' />
                <span className='text-black'>Podcast & Audio</span>
              </h3>
              <div className='h-1 w-36 bg-black rounded-full'></div>
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

          <div className='grid grid-cols-3 gap-8 mb-8'>
            {isLoadingPodcasts ? (
              // Loading skeleton
              Array.from({ length: 3 }, (_, index) => (
                <div
                  key={`podcast-skeleton-${index}`}
                  className='relative w-full bg-slate-200 animate-pulse rounded-2xl'
                  style={{ height: '300px' }}
                />
              ))
            ) : podcastEpisodes.length === 0 ? (
              // No podcasts message
              <div className='col-span-full text-center py-12'>
                <p className='text-slate-600'>No podcasts available at the moment.</p>
              </div>
            ) : (
              getPodcastPageItems().map((episode, index) => (
              <Link
                key={episode._id}
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
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
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
                      className='w-16 h-16 lg:w-20 lg:h-20 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-colors duration-200'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleAudioPlay(episode._id, episode.audioUrl);
                      }}
                    >
                      {playingAudio === episode._id ? (
                        <PauseIcon className='w-8 h-8 lg:w-10 lg:h-10' />
                      ) : (
                        <PlayIcon className='w-8 h-8 lg:w-10 lg:h-10 ml-1' />
                      )}
                    </button>
                  </div>
                </div>

              
              </Link>
            ))
            )}
          </div>

          {/* Pagination for Podcast */}
          {/* {getPodcastTotalPages() > 1 && (
            <div className='flex items-center justify-center space-x-4 mt-8'>
              <Button
                onClick={handlePodcastPrevPage}
                disabled={currentPodcastPage === 0}
                variant="secondary"
                size="sm"
                leftIcon={<ChevronLeftIcon className='w-5 h-5' />}
              >
                Previous
              </Button>

              <div className='flex space-x-2'>
                {Array.from({ length: getPodcastTotalPages() }, (_, i) => (
                  <Button
                    key={i}
                    onClick={() => setCurrentPodcastPage(i)}
                    variant={currentPodcastPage === i ? "primary" : "secondary"}
                    size="icon"
                    className="w-10 h-10"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handlePodcastNextPage}
                disabled={currentPodcastPage === getPodcastTotalPages() - 1}
                variant="secondary"
                size="sm"
                rightIcon={<ChevronRightIcon className='w-5 h-5' />}
              >
                Next
              </Button>
            </div>
          )} */}
        </div>

        {/* YouTube Section */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex-1'>
              <h3 className='text-3xl font-bold text-slate-900 mb-2 flex items-center'>
                <VideoCameraIcon className='w-7 h-7 mr-3 text-black' />
                <span className='text-black'>YouTube & Videos</span>
              </h3>
              <div className='h-1 w-32 bg-black rounded-full'></div>
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

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
            {isLoadingYoutube ? (
              // Loading skeleton
              Array.from({ length: 3 }, (_, index) => (
                <div
                  key={`youtube-skeleton-${index}`}
                  className='relative w-full bg-slate-200 animate-pulse rounded-2xl'
                  style={{ height: '300px' }}
                />
              ))
            ) : youtubeVideos.length === 0 ? (
              // No videos message
              <div className='col-span-full text-center py-12'>
                <p className='text-slate-600'>No YouTube videos available at the moment.</p>
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
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                  />
                  
                  {/* Duration Badge */}
                  <div className='absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium'>
                    {video.duration}
                  </div>

                  {/* Play Button Overlay */}
                  <div className='absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center'>
                    <button className='w-16 h-16 lg:w-20 lg:h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors duration-200'>
                      <PlayIcon className='w-8 h-8 lg:w-10 lg:h-10 ml-1' />
                    </button>
                  </div>
                </div>

                {/* Video Info */}
                
              </div>
            ))
            )}
          </div>

         
        </div>
      </div>

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