'use client';

import { useState, useEffect, useRef } from 'react';
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
  'Health',
  'Nutrition',
  'Self-Development',
  'Mental Health',
  'Wellness',
  'Medicine',
  'Psychology',
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

  // Mock data with real audio URLs and thumbnails
  useEffect(() => {
    const mockPodcasts: Podcast[] = [
      {
        id: 1,
        title: 'Understanding Anxiety: A Deep Dive into Mental Wellness',
        description:
          'Explore the complexities of anxiety disorders and discover practical strategies for managing stress and promoting mental well-being in daily life.',
        duration: '45:30',
        publishDate: '2024-01-15',
        category: 'Mental Health',
        audioUrl:
          'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        coverImage:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
        featured: true,
        views: 12500,
        likes: 890,
        downloads: 3200,
        host: 'Dr. Syed M Quadri',
        episodeNumber: 42,
      },
      {
        id: 2,
        title: 'Nutrition and Brain Health: The Science Connection',
        description:
          'Discover how proper nutrition directly impacts cognitive function, mood regulation, and overall brain health throughout different life stages.',
        duration: '38:15',
        publishDate: '2024-01-08',
        category: 'Nutrition',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
        coverImage:
          'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop&crop=center',
        featured: false,
        views: 8900,
        likes: 650,
        downloads: 2100,
        host: 'Dr. Syed M Quadri',
        episodeNumber: 41,
      },
      {
        id: 3,
        title:
          'Mastering Public Speaking: Overcoming Fear and Building Confidence',
        description:
          'Transform your public speaking abilities with proven techniques for managing stage fright and delivering compelling presentations.',
        duration: '52:20',
        publishDate: '2024-01-01',
        category: 'Self-Development',
        audioUrl:
          'https://file-examples.com/storage/fe68c8a7c4a1e7a5f09f5c2/2017/11/file_example_MP3_700KB.mp3',
        coverImage:
          'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop&crop=center',
        featured: true,
        views: 15600,
        likes: 1200,
        downloads: 4500,
        host: 'Dr. Syed M Quadri',
        episodeNumber: 40,
      },
      {
        id: 4,
        title: 'Sleep Disorders: Diagnosis and Treatment Approaches',
        description:
          'Comprehensive overview of common sleep disorders, their impact on health, and evidence-based treatment methodologies.',
        duration: '41:45',
        publishDate: '2023-12-25',
        category: 'Medicine',
        audioUrl:
          'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        coverImage:
          'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&crop=center',
        featured: false,
        views: 7200,
        likes: 480,
        downloads: 1800,
        host: 'Dr. Syed M Quadri',
        episodeNumber: 39,
      },
      {
        id: 5,
        title: 'Mindfulness and Meditation: Ancient Wisdom for Modern Life',
        description:
          'Learn practical mindfulness techniques and meditation practices that can enhance your daily life and mental clarity.',
        duration: '35:10',
        publishDate: '2023-12-18',
        category: 'Wellness',
        audioUrl:
          'https://file-examples.com/storage/fe68c8a7c4a1e7a5f09f5c2/2017/11/file_example_MP3_1MG.mp3',
        coverImage:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
        featured: true,
        views: 11800,
        likes: 920,
        downloads: 3600,
        host: 'Dr. Syed M Quadri',
        episodeNumber: 38,
      },
      {
        id: 6,
        title: 'Understanding Depression: Breaking the Stigma',
        description:
          'An honest conversation about depression, its various forms, treatment options, and the importance of seeking help.',
        duration: '48:30',
        publishDate: '2023-12-11',
        category: 'Mental Health',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
        coverImage:
          'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center',
        featured: false,
        views: 9400,
        likes: 710,
        downloads: 2800,
        host: 'Dr. Syed M Quadri',
        episodeNumber: 37,
      },
    ];

    setTimeout(() => {
      setPodcasts(mockPodcasts);
      setFilteredPodcasts(mockPodcasts);
      setLoading(false);
    }, 1000);
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

  const handleCardClick = (id: number) => {
    // On mobile, activate/deactivate the card
    if (window.innerWidth < 768) {
      setActiveCard(activeCard === id ? null : id);
    }
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
                <img
                  src={
                    podcasts.find((p) => p.id === currentlyPlaying)?.coverImage
                  }
                  alt='Episode thumbnail'
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
          <img 
            src='/banner/Podcast Banner.png' 
            alt='Podcast Banner' 
            className='w-full h-full object-cover object-center'
          />
        </div>
        <div className='absolute inset-0 bg-black/25'></div>
      </section>

      {/* Featured Episodes */}
      {featuredPodcasts.length > 0 && (
        <section className='py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16'>
          <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
              {featuredPodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  onClick={() => handleCardClick(podcast.id)}
                  className='group relative aspect-square rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-sm xs:shadow-md hover:shadow-lg xs:hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]'
                >
                  {/* Main Image */}
                  <img
                    src={podcast.coverImage}
                    alt={podcast.title}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                  />

                  {/* Gradient Overlay - Always visible but subtle */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20'></div>

                  {/* Episode Number - Always visible */}
                  <div className='absolute top-1 left-1 xs:top-1.5 xs:left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3'>
                    <span className='px-1 py-0.5 xs:px-1.5 xs:py-0.5 sm:px-2 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                      #{podcast.episodeNumber}
                    </span>
                  </div>

                  {/* Featured Badge - Always visible */}
                  <div className='absolute top-1 right-1 xs:top-1.5 xs:right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3'>
                    <span className='px-1 py-0.5 xs:px-1.5 xs:py-0.5 sm:px-2 sm:py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                      Featured
                    </span>
                  </div>

                  {/* Category Badge - Always visible */}
                  <div className='absolute top-1 left-1 xs:top-1.5 xs:left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3'>
                    <span className='px-1.5 py-0.5 xs:px-2 xs:py-1 bg-blue-500/80 backdrop-blur-sm text-white rounded-full text-xs font-medium'>
                      {podcast.category}
                    </span>
                  </div>

                  {/* Mobile Active / Desktop Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 transition-all duration-500 flex flex-col justify-end p-2 xs:p-3 sm:p-4 ${
                    activeCard === podcast.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                  }`}>
                    {/* Play Button - Center (Desktop Only) */}
                    <div className='absolute inset-0 items-center justify-center hidden md:flex'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(podcast.id);
                        }}
                        className='w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'
                        style={{ transitionDelay: '100ms' }}
                      >
                        {currentlyPlaying === podcast.id && isPlaying ? (
                          <PauseIcon className='w-8 h-8 text-blue-600' />
                        ) : (
                          <PlayIcon className='w-8 h-8 text-blue-600 ml-0.5' />
                        )}
                      </button>
                    </div>

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
                        
                        {/* Play/Pause and Date */}
                        <div className='flex items-center justify-between'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlay(podcast.id);
                            }}
                            className='flex items-center gap-2 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium'
                          >
                            {currentlyPlaying === podcast.id && isPlaying ? (
                              <>
                                <PauseIcon className='w-4 h-4' />
                                Pause
                              </>
                            ) : (
                              <>
                                <PlayIcon className='w-4 h-4' />
                                Play
                              </>
                            )}
                          </button>
                          
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

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlay(podcast.id);
                          }}
                          className='px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium'
                        >
                          {currentlyPlaying === podcast.id && isPlaying ? 'Pause' : 'Play'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
      <section className={`py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 ${currentlyPlaying ? 'pb-20 xs:pb-24 sm:pb-28 md:pb-32' : ''}`}>
        <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8'>
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
            <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
              {filteredPodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  onClick={() => handleCardClick(podcast.id)}
                  className='group relative aspect-square rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-sm xs:shadow-md hover:shadow-lg xs:hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]'
                >
                  {/* Main Image */}
                  <img
                    src={podcast.coverImage}
                    alt={podcast.title}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                  />

                  {/* Gradient Overlay - Always visible but subtle */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20'></div>

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
                    {/* Play Button - Center (Desktop Only) */}
                    <div className='absolute inset-0 items-center justify-center hidden md:flex'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(podcast.id);
                        }}
                        className='w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'
                        style={{ transitionDelay: '100ms' }}
                      >
                        {currentlyPlaying === podcast.id && isPlaying ? (
                          <PauseIcon className='w-8 h-8 text-blue-600' />
                        ) : (
                          <PlayIcon className='w-8 h-8 text-blue-600 ml-0.5' />
                        )}
                      </button>
                    </div>

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
                        
                        {/* Play/Pause and Date */}
                        <div className='flex items-center justify-between'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlay(podcast.id);
                            }}
                            className='flex items-center gap-2 px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium'
                          >
                            {currentlyPlaying === podcast.id && isPlaying ? (
                              <>
                                <PauseIcon className='w-4 h-4' />
                                Pause
                              </>
                            ) : (
                              <>
                                <PlayIcon className='w-4 h-4' />
                                Play
                              </>
                            )}
                          </button>
                          
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

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlay(podcast.id);
                          }}
                          className='px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium'
                        >
                          {currentlyPlaying === podcast.id && isPlaying ? 'Pause' : 'Play'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
