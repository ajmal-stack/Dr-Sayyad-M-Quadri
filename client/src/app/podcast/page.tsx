'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import podcastData from '@/data/podcasts.json';
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
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load podcast data from JSON
  useEffect(() => {
    const episodes = podcastData.episodes as Podcast[];
    setPodcasts(episodes);
    setFilteredPodcasts(episodes);
    setLoading(false);
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

      {/* Featured Episodes */}
      {featuredPodcasts.length > 0 && (
        <section className='py-8 sm:py-12 md:py-16 lg:py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='mb-8 sm:mb-12'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
                Featured Episodes
              </h2>
              <p className='text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl'>
                Handpicked episodes covering the most important topics in mental health and wellness
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
              {featuredPodcasts.map((podcast) => (
                <Link
                  key={podcast.id}
                  href={`/podcast/${podcast.id}`}
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

      {/* Search and Filter Section */}
      <section className='py-3 xs:py-4 sm:py-5 md:py-6 bg-white/50 backdrop-blur-sm border-y border-slate-200'>
        <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-3 xs:gap-4 sm:gap-5 md:gap-6'>
            {/* Search */}
            <div className='relative w-full'>
              <MagnifyingGlassIcon className='absolute left-2.5 xs:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400' />
              <input
                type='text'
                placeholder='Search episodes...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-8 xs:pl-10 sm:pl-12 pr-3 xs:pr-4 py-2 xs:py-2.5 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base placeholder:text-xs xs:placeholder:text-sm'
              />
            </div>

            {/* Category Filter */}
            <div className='flex items-center gap-1.5 xs:gap-2 overflow-x-auto pb-1 xs:pb-2 sm:pb-0 scrollbar-hide'>
              <FunnelIcon className='w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0' />
              <div className='flex gap-1.5 xs:gap-2 min-w-max'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2.5 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap touch-manipulation ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md xs:shadow-lg'
                        : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200 active:bg-blue-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className={`py-8 sm:py-12 md:py-16 lg:py-20 ${currentlyPlaying ? 'pb-20 xs:pb-24 sm:pb-28 md:pb-32' : ''}`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 sm:mb-12'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3'>
              All Episodes
            </h2>
            <p className='text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl'>
              Browse our complete collection of mental health and wellness episodes
            </p>
          </div>
          {filteredPodcasts.length === 0 ? (
            <div className='text-center py-8 xs:py-10 sm:py-12 md:py-16'>
              <div className='w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4'>
                <MagnifyingGlassIcon className='w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-slate-400' />
              </div>
              <h3 className='text-base xs:text-lg sm:text-xl font-semibold text-slate-800 mb-2'>
                No episodes found
              </h3>
              <p className='text-xs xs:text-sm sm:text-base text-slate-600'>
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
              {filteredPodcasts.map((podcast) => (
                <Link
                  key={podcast.id}
                  href={`/podcast/${podcast.id}`}
                  onClick={(e) => handleCardClick(podcast.id, e)}
                  className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-gray-100 block'
                >
                  {/* Card Image */}
                  <div className='relative aspect-[4/3] overflow-hidden'>
                    <Image
                      src={podcast.coverImage}
                      alt={podcast.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-700'
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
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

                  {/* Episode Number - Always visible */}
                  <div className='absolute top-1 left-1 xs:top-1.5 xs:left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3'>
                    <span className='px-1 py-0.5 xs:px-1.5 xs:py-0.5 sm:px-2 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                      #{podcast.episodeNumber}
                    </span>
                  </div>

                  {/* Featured Badge - Only for featured */}
                  {podcast.featured && (
                    <div className='absolute top-1 right-1 xs:top-1.5 xs:right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3'>
                      <span className='px-1 py-0.5 xs:px-1.5 xs:py-0.5 sm:px-2 sm:py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Mobile Active / Desktop Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 transition-all duration-500 flex flex-col justify-end p-2 xs:p-3 sm:p-4 ${
                    activeCard === podcast.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                  }`}>


                    {/* Content Details - Bottom */}
                    <div
                      className={`transform transition-all duration-500 ${
                        activeCard === podcast.id ? 'translate-y-0' : 'translate-y-4 md:group-hover:translate-y-0'
                      }`}
                      style={{ transitionDelay: '200ms' }}
                    >
                      {/* Desktop Metadata (hidden on mobile) */}
                      <div className='hidden md:block'>
                        {/* Category and Duration */}
                        <div className='flex items-center gap-2 mb-2'>
                          <span className='px-2 py-1 bg-blue-500/80 backdrop-blur-sm text-white rounded-full text-xs font-medium'>
                            {podcast.category}
                          </span>
                          <div className='flex items-center text-white/80 text-xs'>
                            <ClockIcon className='w-3 h-3 mr-1' />
                            {podcast.duration}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className='text-white font-bold text-sm mb-2 line-clamp-2 leading-tight'>
                          {podcast.title}
                        </h3>

                        {/* Stats */}
                        <div className='flex items-center justify-between text-white/70 text-xs mb-3'>
                          <div className='flex items-center gap-3'>
                            <div className='flex items-center'>
                              <EyeIcon className='w-3 h-3 mr-1' />
                              {podcast.views?.toLocaleString()}
                            </div>
                            <div className='flex items-center'>
                              <HeartIcon className='w-3 h-3 mr-1' />
                              {podcast.likes}
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <CalendarIcon className='w-3 h-3 mr-1' />
                            {new Date(podcast.publishDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Mobile Simplified Controls */}
                      <div className='md:hidden'>
                        {/* Title */}
                        <h3 className='text-white font-bold text-sm mb-2 line-clamp-2 leading-tight'>
                          {podcast.title}
                        </h3>
                        
                        {/* Date */}
                        <div className='flex items-center justify-end'>
                          <div className='flex items-center text-white/80 text-xs'>
                            <CalendarIcon className='w-3 h-3 mr-1' />
                            {new Date(podcast.publishDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Full Controls */}
                      <div className='hidden md:flex md:items-center md:justify-between'>
                        <div className='flex items-center gap-1'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(podcast.id);
                            }}
                            className='p-1.5 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors'
                          >
                            {likedEpisodes.has(podcast.id) ? (
                              <HeartSolidIcon className='w-4 h-4 text-red-400' />
                            ) : (
                              <HeartIcon className='w-4 h-4 text-white/70' />
                            )}
                          </button>

                          <button
                            onClick={(e) => e.stopPropagation()}
                            className='p-1.5 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors'
                          >
                            <ShareIcon className='w-4 h-4 text-white/70' />
                          </button>

                          <button
                            onClick={(e) => e.stopPropagation()}
                            className='p-1.5 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors'
                          >
                            <ArrowDownTrayIcon className='w-4 h-4 text-white/70' />
                          </button>
                        </div>


                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
