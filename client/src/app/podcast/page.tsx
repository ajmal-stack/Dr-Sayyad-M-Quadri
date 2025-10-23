'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { generatePodcastSlug } from '@/utils/slugify';
import PodcastSearchModal from '@/components/ui/primitives/PodcastSearchModal';
import {
  PlayIcon,
  PauseIcon,
  HeartIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CalendarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface Podcast {
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

const categories = [
  'All',
  'Mental Health',
  'Nutrition', 
  'Self-Development',
  'Health',
  'Wellness',
  'Psychology'
];



export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [likedEpisodes, setLikedEpisodes] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fetch podcast data from API
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/podcasts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setPodcasts(data.data);
          setFilteredPodcasts(data.data);
        }
      } catch (err) {
        console.error('Error fetching podcasts:', err);
        setPodcasts([]);
        setFilteredPodcasts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentlyPlaying]);

  // Handle anchor navigation from URL hash
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, []);

  // Filter podcasts based on category and search
  useEffect(() => {
    let filtered = podcasts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (podcast) => podcast.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          podcast.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          podcast.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPodcasts(filtered);
  }, [podcasts, selectedCategory, searchQuery]);

  const handlePlay = (id: number) => {
    const podcast = podcasts.find((p) => p.id === id);
    if (!podcast || !audioRef.current) return;

    if (currentlyPlaying === id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentlyPlaying !== id) {
        audioRef.current.src = podcast.audioUrl;
        setCurrentlyPlaying(id);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLike = (id: number) => {
    const newLikedEpisodes = new Set(likedEpisodes);
    if (newLikedEpisodes.has(id)) {
      newLikedEpisodes.delete(id);
    } else {
      newLikedEpisodes.add(id);
    }
    setLikedEpisodes(newLikedEpisodes);
  };

  const handleCardClick = (id: number, event: React.MouseEvent) => {
    // On mobile, activate/deactivate the card for first click
    if (window.innerWidth < 768) {
      if (activeCard === id) {
        // Second click - let Link handle navigation
        return;
      } else {
        // First click - activate card and prevent navigation
        setActiveCard(id);
        event.preventDefault();
      }
    }
    // On desktop, let Link handle navigation
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };



  const featuredPodcasts = podcasts.filter((podcast) => podcast.featured);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return (
    <div className='pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30'>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload='metadata' />

      {/* Audio Player Bar (appears when playing) */}
      {currentlyPlaying && (
        <div className='fixed bottom-0 left-0 right-0 bg-blue-600 backdrop-blur-sm border-t border-blue-500 p-4 z-50 shadow-2xl'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-3'>
                <Image
                  src={
                    podcasts.find((p) => p.id === currentlyPlaying)?.coverImage || ''
                  }
                  alt='Episode thumbnail'
                  width={48}
                  height={48}
                  className='w-12 h-12 rounded-lg object-cover'
                />
                <div>
                  <h4 className='font-semibold text-sm line-clamp-1 text-white'>
                    {podcasts.find((p) => p.id === currentlyPlaying)?.title}
                  </h4>
                  <p className='text-xs text-blue-200'>Dr. Syed M Quadri</p>
                </div>
              </div>

              <div className='flex-1 flex items-center gap-4'>
                <button
                  onClick={() => handlePlay(currentlyPlaying)}
                  className='w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg'
                >
                  {isPlaying ? (
                    <PauseIcon className='w-5 h-5' />
                  ) : (
                    <PlayIcon className='w-5 h-5 ml-0.5' />
                  )}
                </button>

                <div className='flex-1 flex items-center gap-2'>
                  <span className='text-xs text-blue-200 w-10'>
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type='range'
                    min='0'
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => {
                      const time = parseFloat(e.target.value);
                      setCurrentTime(time);
                      if (audioRef.current) {
                        audioRef.current.currentTime = time;
                      }
                    }}
                    className='flex-1 slider'
                  />
                  <span className='text-xs text-blue-200 w-10'>
                    {formatTime(duration)}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={toggleMute}
                    className='p-1 hover:bg-white/20 rounded transition-colors'
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className='w-5 h-5 text-white' />
                    ) : (
                      <SpeakerWaveIcon className='w-5 h-5 text-white' />
                    )}
                  </button>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.1'
                    value={volume}
                    onChange={(e) =>
                      handleVolumeChange(parseFloat(e.target.value))
                    }
                    className='w-20 slider'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className='relative overflow-hidden w-full h-[185px] xs:h-[180px] sm:h-[240px] md:h-[300px] lg:h-[380px] xl:h-[420px] 2xl:h-[480px]'>
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src='/banner/Podcast Banner 2.png'
            alt='Podcast Banner' 
            fill
            className='object-cover object-center'
            priority={true}
            quality={95}
            sizes='100vw'
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        <div className='absolute inset-0 bg-black/25'></div>
      </section>

      {/* Episode Search Section - Moved to Top */}
      <section id="episode-search" className='py-6 sm:py-8 md:py-10 bg-white/50 backdrop-blur-sm border-b border-slate-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-6'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg'>
                <MagnifyingGlassIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center'>
                Find Your Perfect Episode
              </h2>
            </div>
            <p className='text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-center'>
              Search through our collection of therapeutic podcasts and mental health discussions
            </p>
          </div>
          <div className='flex flex-col gap-4 sm:gap-6'>
            {/* Search */}
            <div className='relative w-full max-w-2xl mx-auto z-20'>
              <MagnifyingGlassIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none' />
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className='w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl hover:border-blue-300 transition-all duration-300 bg-white shadow-lg text-base text-left text-slate-400 relative z-30 cursor-text'
              >
                Search episodes, topics, or categories...
              </button>
            </div>

            {/* Quick Category Access */}
            <div className='flex justify-center relative z-20'>
              <div className='flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide'>
                <span className='text-sm text-slate-500 flex-shrink-0 mr-2'>Quick Browse:</span>
                <div className='flex gap-2 min-w-max'>
                  {categories.slice(1, 4).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsSearchModalOpen(true);
                      }}
                      className='px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap relative z-30 bg-white text-slate-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-300'
                    >
                      {category}
                    </button>
                  ))}
                  <button
                    onClick={() => setIsSearchModalOpen(true)}
                    className='px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap relative z-30 bg-blue-600 text-white hover:bg-blue-700'
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episodes */}
      {featuredPodcasts.length > 0 && (
        <section id="all-episodes" className='py-8 sm:py-12 md:py-16 lg:py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='mb-8 sm:mb-12'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
                All Podcast Episodes
              </h2>
              <p className='text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl'>
                Browse all therapeutic podcast episodes
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
              {featuredPodcasts.map((podcast) => (
                <Link
                  key={podcast.id}
                  href={`/podcast/${generatePodcastSlug(podcast.title)}`}
                  onClick={(e) => handleCardClick(podcast.id, e)}
                  className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-gray-100 block'
                >
                  {/* Card Image */}
                  <div className='relative aspect-[4/3] overflow-hidden'>
                    <Image
                      src={podcast.coverImage}
                      alt={podcast.title}
                      fill
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Badges */}
                    <div className='absolute top-3 left-3'>
                      <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm'>
                        Featured
                      </span>
                    </div>
                    
                    <div className='absolute top-3 right-3'>
                      <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm'>
                        #{podcast.episodeNumber}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className='absolute bottom-3 left-3'>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm shadow-sm ${
                        podcast.category === 'Mental Health' ? 'bg-purple-500/90' :
                        podcast.category === 'Nutrition' ? 'bg-green-500/90' :
                        podcast.category === 'Self-Development' ? 'bg-blue-500/90' :
                        podcast.category === 'Health' ? 'bg-teal-500/90' :
                        podcast.category === 'Wellness' ? 'bg-indigo-500/90' :
                        podcast.category === 'Psychology' ? 'bg-orange-500/90' :
                        'bg-gray-500/90'
                      }`}>
                        {podcast.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className='p-4 sm:p-5 lg:p-6'>
                    {/* Title and Description */}
                    <div className='mb-4'>
                      <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors'>
                        {podcast.title}
                      </h3>
                      <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>
                        {podcast.description}
                      </p>
                    </div>

                    {/* Meta Information */}
                    {/* <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center space-x-1'>
                        <ClockIcon className='w-4 h-4' />
                        <span>{podcast.duration}</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <CalendarIcon className='w-4 h-4' />
                        <span>
                          {new Date(podcast.publishDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div> */}

                    {/* Stats and Actions */}
                    {/* <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                      <div className='flex items-center space-x-4 text-xs text-gray-500'>
                        <div className='flex items-center space-x-1'>
                          <EyeIcon className='w-4 h-4' />
                          <span>{podcast.views?.toLocaleString()}</span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <HeartIcon className='w-4 h-4' />
                          <span>{podcast.likes}</span>
                        </div>
                      </div>
                      
                      <div className='flex items-center space-x-1'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleLike(podcast.id);
                          }}
                          className='p-1.5 rounded-lg hover:bg-gray-100 transition-colors'
                        >
                          {likedEpisodes.has(podcast.id) ? (
                            <HeartSolidIcon className='w-4 h-4 text-red-500' />
                          ) : (
                            <HeartIcon className='w-4 h-4 text-gray-400 hover:text-red-500' />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          className='p-1.5 rounded-lg hover:bg-gray-100 transition-colors'
                        >
                          <ShareIcon className='w-4 h-4 text-gray-400 hover:text-gray-600' />
                        </button>
                      </div>
                    </div> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Episodes Section */}
      <section id="trending-episodes" className='py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-blue-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 sm:mb-12'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
                Trending Episodes
              </h2>
            </div>
            <p className='text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl'>
              Most popular mental health discussions
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
            {podcasts.slice(0, 8).map((podcast) => (
              <Link
                key={podcast.id}
                href={`/podcast/${generatePodcastSlug(podcast.title)}`}
                className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-gray-100 block'
              >
                <div className='relative aspect-[4/3] overflow-hidden'>
                  <Image
                    src={podcast.coverImage}
                    alt={podcast.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-700'
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  />
                  <div className='absolute top-3 left-3'>
                    <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm'>
                      Trending
                    </span>
                  </div>
                </div>
                <div className='p-4 sm:p-5 lg:p-6'>
                  <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors'>
                    {podcast.title}
                  </h3>
                  <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>
                    {podcast.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Topics Section */}
      <section id="podcast-topics" className='py-8 sm:py-12 md:py-16 lg:py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 sm:mb-12'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-gradient-to-r from-teal-600 to-green-600 p-2 rounded-lg'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
                Podcast Topics
              </h2>
            </div>
            <p className='text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl'>
              Browse by therapeutic categories
            </p>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6'>
            {categories.slice(1).map((category, index) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  document.getElementById('episode-search')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  category === 'Mental Health' ? 'bg-purple-100 text-purple-600' :
                  category === 'Nutrition' ? 'bg-green-100 text-green-600' :
                  category === 'Self-Development' ? 'bg-blue-100 text-blue-600' :
                  category === 'Health' ? 'bg-teal-100 text-teal-600' :
                  category === 'Wellness' ? 'bg-indigo-100 text-indigo-600' :
                  category === 'Psychology' ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className='font-semibold text-sm sm:text-base text-center line-clamp-2'>
                  {category}
                </h3>
                <p className='text-xs sm:text-sm text-gray-500 mt-1 text-center'>
                  {podcasts.filter(p => p.category === category).length} episodes
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* Podcast Membership Section */}
      <section id="podcast-membership" className='py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-indigo-50 to-purple-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8 sm:mb-12'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg'>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900'>
                Podcast Membership
              </h2>
            </div>
            <p className='text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto'>
              Join our therapeutic community
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='text-center'>
                <div className='bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>Free Access</h3>
                <p className='text-gray-600 text-sm mb-4'>Basic podcast episodes and community access</p>
                <button className='w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors'>
                  Get Started
                </button>
              </div>
            </div>
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-indigo-200'>
              <div className='text-center'>
                <div className='bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>Premium</h3>
                <p className='text-gray-600 text-sm mb-4'>Exclusive content, early access, and premium support</p>
                <button className='w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors'>
                  Upgrade Now
                </button>
              </div>
            </div>
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='text-center'>
                <div className='bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>Community</h3>
                <p className='text-gray-600 text-sm mb-4'>Connect with others on their mental health journey</p>
                <button className='w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors'>
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Modal */}
      <PodcastSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        podcasts={podcasts}
        categories={categories}
      />

    </div>
  );
}
