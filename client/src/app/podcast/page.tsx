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
  SparklesIcon,
  MicrophoneIcon,
  UserGroupIcon,
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

const stats = [
  { label: 'Total Episodes', value: '150+', icon: MicrophoneIcon },
  { label: 'Monthly Listeners', value: '25K+', icon: UserGroupIcon },
  { label: 'Countries', value: '45+', icon: SparklesIcon },
  { label: 'Hours of Content', value: '200+', icon: ClockIcon },
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30'>
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
      <section className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32'>
          <div className='text-center'>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8'>
              <MicrophoneIcon className='w-5 h-5 mr-2' />
              <span className='text-sm font-medium'>
                Dr. Quadri&apos;s Podcast
              </span>
            </div>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
              Mental Health Insights
            </h1>
            <p className='text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed'>
              Join Dr. Syed M Quadri as he explores the depths of mental health,
              wellness, and personal development through engaging conversations
              and expert insights.
            </p>

            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
              {stats.map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-3'>
                    <stat.icon className='w-6 h-6' />
                  </div>
                  <div className='text-2xl font-bold text-white'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-blue-200'>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg'>
                Listen to Latest Episode
              </button>
              <button className='px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300'>
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl'></div>
      </section>

      {/* Featured Episodes */}
      {featuredPodcasts.length > 0 && (
        <section className='py-16 lg:py-24'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 mb-4'>
                <SparklesIcon className='w-5 h-5 mr-2' />
                <span className='text-sm font-medium'>Featured Episodes</span>
              </div>
              <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-4'>
                Don&apos;t Miss These
              </h2>
              <p className='text-lg text-slate-600 max-w-2xl mx-auto'>
                Our most popular and impactful episodes, carefully selected for
                maximum value
              </p>
            </div>

            <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              {featuredPodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className='group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer'
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
                  <div className='absolute top-3 left-3'>
                    <span className='px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                      #{podcast.episodeNumber}
                    </span>
                  </div>

                  {/* Featured Badge - Always visible */}
                  <div className='absolute top-3 right-3'>
                    <span className='px-2 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                      Featured
                    </span>
                  </div>

                  {/* Hover Overlay with Details */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4'>
                    {/* Play Button - Center */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <button
                        onClick={() => handlePlay(podcast.id)}
                        className='w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'
                        style={{ transitionDelay: '100ms' }}
                      >
                        {currentlyPlaying === podcast.id && isPlaying ? (
                          <PauseIcon className='w-8 h-8 text-blue-600' />
                        ) : (
                          <PlayIcon className='w-8 h-8 text-blue-600 ml-1' />
                        )}
                      </button>
                    </div>

                    {/* Content Details - Bottom */}
                    <div
                      className='transform translate-y-4 group-hover:translate-y-0 transition-all duration-500'
                      style={{ transitionDelay: '200ms' }}
                    >
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
                          {formatDate(podcast.publishDate).split(',')[0]}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex items-center justify-between'>
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
                          onClick={() => handlePlay(podcast.id)}
                          className='px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium'
                        >
                          {currentlyPlaying === podcast.id && isPlaying
                            ? 'Pause'
                            : 'Play'}
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
      <section className='py-8 bg-white/50 backdrop-blur-sm border-y border-slate-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row gap-6 items-center justify-between'>
            {/* Search */}
            <div className='relative flex-1 max-w-md'>
              <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
              <input
                type='text'
                placeholder='Search episodes...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm'
              />
            </div>

            {/* Category Filter */}
            <div className='flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0'>
              <FunnelIcon className='w-5 h-5 text-slate-500 flex-shrink-0' />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes */}
      <section className={`py-16 lg:py-24 ${currentlyPlaying ? 'pb-32' : ''}`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between mb-12'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-2'>
                All Episodes
              </h2>
              <p className='text-lg text-slate-600'>
                {filteredPodcasts.length} episode
                {filteredPodcasts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {filteredPodcasts.length === 0 ? (
            <div className='text-center py-16'>
              <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MagnifyingGlassIcon className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-xl font-semibold text-slate-800 mb-2'>
                No episodes found
              </h3>
              <p className='text-slate-600'>
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredPodcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className='group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer'
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
                  <div className='absolute top-3 left-3'>
                    <span className='px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                      #{podcast.episodeNumber}
                    </span>
                  </div>

                  {/* Featured Badge - Only for featured */}
                  {podcast.featured && (
                    <div className='absolute top-3 right-3'>
                      <span className='px-2 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white'>
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay with Details */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4'>
                    {/* Play Button - Center */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <button
                        onClick={() => handlePlay(podcast.id)}
                        className='w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'
                        style={{ transitionDelay: '100ms' }}
                      >
                        {currentlyPlaying === podcast.id && isPlaying ? (
                          <PauseIcon className='w-8 h-8 text-blue-600' />
                        ) : (
                          <PlayIcon className='w-8 h-8 text-blue-600 ml-1' />
                        )}
                      </button>
                    </div>

                    {/* Content Details - Bottom */}
                    <div
                      className='transform translate-y-4 group-hover:translate-y-0 transition-all duration-500'
                      style={{ transitionDelay: '200ms' }}
                    >
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
                          {formatDate(podcast.publishDate).split(',')[0]}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className='flex items-center justify-between'>
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
                          onClick={() => handlePlay(podcast.id)}
                          className='px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium'
                        >
                          {currentlyPlaying === podcast.id && isPlaying
                            ? 'Pause'
                            : 'Play'}
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

      {/* Newsletter Subscription */}
      <section className='py-16 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Never Miss an Episode
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Subscribe to get notified when new episodes are released
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 transition-all duration-300'
            />
            <button className='px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105'>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
