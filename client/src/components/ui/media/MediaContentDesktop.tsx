'use client';

import { useState, useEffect } from 'react';
import {
  BookOpenIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../primitives/Button';
import Image from 'next/image';
import { ContentLoader } from '../primitives/Loader';

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
    description: 'Overcome anxiety and master the art of confident public speaking with proven strategies.',
    image: '/books/Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Self-Help',
    pages: 280,
  },
  {
    id: 2,
    title: 'Mind Matters: Mental Wellness',
    description: 'Essential guide to maintaining mental health and building resilience in daily life.',
    image: '/books/Navy and Pink Illustrated Mind Matters Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Mental Health',
    pages: 350,
  },
  {
    id: 3,
    title: 'Daily Food Journal',
    description: 'Track your nutrition and build healthy eating habits for better mental and physical wellness.',
    image: '/books/Red Simple Food Journal Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Wellness',
    pages: 200,
  },
  {
    id: 4,
    title: 'Modern Psychology Insights',
    description: 'Comprehensive guide to understanding modern psychological approaches and therapeutic techniques.',
    image: '/books/Black and White Modern Psychology Book Cover.jpg',
    author: 'Dr. Syed M Quadri',
    category: 'Psychology',
    pages: 320,
  },
];

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

// Sample podcast episodes data
const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: 'Mental Health in the Digital Age',
    description: 'Exploring how technology impacts our mental health and strategies for digital wellness.',
    duration: '45:30',
    releaseDate: '2024-01-15',
    category: 'Mental Health',
    audioUrl: '#',
  },
  {
    id: 2,
    title: 'Trauma Recovery: A Journey of Healing',
    description: 'Understanding trauma responses and the path to recovery with expert insights.',
    duration: '52:20',
    releaseDate: '2024-01-08',
    category: 'Trauma',
    audioUrl: '#',
  },
  {
    id: 3,
    title: 'Anxiety Management Strategies',
    description: 'Practical techniques and therapeutic approaches for managing anxiety disorders.',
    duration: '38:45',
    releaseDate: '2024-01-01',
    category: 'Anxiety',
    audioUrl: '#',
  },
];

export default function MediaContentDesktop() {

  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [currentVideoPage, setCurrentVideoPage] = useState(0);
  const [currentPodcastPage, setCurrentPodcastPage] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 4;

  useEffect(() => {
    // Inject blob animation styles only once
    if (!document.getElementById('blob-animations-desktop')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'blob-animations-desktop';
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
  };

  return (
    <section className='pt-8 pb-12 bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 relative overflow-hidden'>
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
            {getBooksPageItems().map((book, index) => (
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
                        <div>{book.pages} pages</div>
                      </div>
                      <Button variant="secondary" size="sm" fullWidth>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for Books */}
          {getBooksTotalPages() > 1 && (
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
          )}
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

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
            {getPodcastPageItems().map((episode, index) => (
              <div
                key={episode.id}
                className='group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-100'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Podcast Visual Header */}
                <div className='relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 overflow-hidden h-48'>
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
                    <Button
                      onClick={() => toggleAudioPlay(episode.id)}
                      variant="secondary"
                      size="icon-lg"
                      className='bg-white/90 backdrop-blur-sm hover:bg-white shadow-2xl group-hover:scale-110'
                    >
                      {playingAudio === episode.id ? (
                        <PauseIcon className='w-6 h-6 text-blue-600' />
                      ) : (
                        <PlayIcon className='w-6 h-6 text-blue-600 ml-0.5' />
                      )}
                    </Button>
                  </div>

                  {/* Hover Overlay */}
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
                        <Button
                          onClick={() => toggleAudioPlay(episode.id)}
                          variant="primary"
                          size="sm"
                          leftIcon={
                            playingAudio === episode.id ? (
                              <PauseIcon className='w-4 h-4' />
                            ) : (
                              <PlayIcon className='w-4 h-4' />
                            )
                          }
                        >
                          {playingAudio === episode.id ? 'Pause' : 'Listen Now'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for Podcast */}
          {getPodcastTotalPages() > 1 && (
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
          )}
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
            {getVideosPageItems().map((video, index) => (
              <div
                key={video.id}
                className='group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-100'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Video Thumbnail */}
                <div className='relative overflow-hidden h-64'>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+E="
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

                  {/* Hover Overlay */}
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
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<PlayIcon className='w-4 h-4' />}
                        >
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination for Videos */}
          {getVideosTotalPages() > 1 && (
            <div className='flex items-center justify-center space-x-4 mt-8'>
              <Button
                onClick={handleVideosPrevPage}
                disabled={currentVideoPage === 0}
                variant="secondary"
                size="sm"
                leftIcon={<ChevronLeftIcon className='w-5 h-5' />}
              >
                Previous
              </Button>

              <div className='flex space-x-2'>
                {Array.from({ length: getVideosTotalPages() }, (_, i) => (
                  <Button
                    key={i}
                    onClick={() => setCurrentVideoPage(i)}
                    variant={currentVideoPage === i ? "primary" : "secondary"}
                    size="icon"
                    className="w-10 h-10"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleVideosNextPage}
                disabled={currentVideoPage === getVideosTotalPages() - 1}
                variant="secondary"
                size="sm"
                rightIcon={<ChevronRightIcon className='w-5 h-5' />}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}