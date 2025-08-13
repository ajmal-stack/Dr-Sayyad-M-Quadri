'use client';

import { notFound } from 'next/navigation';
import { useState, useEffect, useRef, use } from 'react';
import { 
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ShareIcon,
  HeartIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CalendarIcon,
  EyeIcon,
  UserIcon,
  HashtagIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/primitives/OptimizedImage';
import { Button } from '@/components/ui/primitives/Button';
import podcastData from '@/data/podcasts.json';

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
  transcript?: string;
  showNotes?: string[];
  tags?: string[];
}

export default function PodcastDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Unwrap params Promise and get podcast data from JSON
  const resolvedParams = use(params);
  const episodes = podcastData.episodes as Podcast[];
  const podcast = episodes.find(p => p.id === parseInt(resolvedParams.id));

  if (!podcast) {
    notFound();
  }

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Update audio properties when they change
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = isMuted;
      audio.playbackRate = playbackSpeed;
    }
  }, [volume, isMuted, playbackSpeed]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newTime: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const relatedPodcasts = episodes
    .filter(p => p.id !== podcast.id && p.category === podcast.category)
    .slice(0, 3);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={podcast.audioUrl} preload="metadata" />

      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4">
          <Link 
            href="/podcast" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Podcasts
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          
          {/* Left Column - Podcast Cover & Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Image */}
            <div className="relative aspect-square">
              <OptimizedImage
                src={podcast.coverImage}
                alt={podcast.title}
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px"
              />
              
              {/* Featured Badge */}
              {podcast.featured && (
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>
              )}

              {/* Episode Number */}
              <div className="absolute top-3 left-3">
                <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-sm font-bold flex items-center">
                  <HashtagIcon className="w-4 h-4 mr-1" />
                  {podcast.episodeNumber}
                </div>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <SpeakerWaveIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Now Playing
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4" />
                  <span>{podcast.duration}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSkip(-15)}
                  leftIcon={<BackwardIcon className="w-4 h-4" />}
                >
                  15s
                </Button>
                <Button 
                  size="lg" 
                  className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? 
                    <PauseIcon className="w-6 h-6" /> : 
                    <PlayIcon className="w-6 h-6 ml-0.5" />
                  }
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSkip(30)}
                  rightIcon={<ForwardIcon className="w-4 h-4" />}
                >
                  30s
                </Button>
              </div>

              {/* Additional Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Speed:</span>
                  <select 
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <SpeakerWaveIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsLiked(!isLiked)}
                leftIcon={isLiked ? 
                  <SolidHeartIcon className="w-5 h-5 text-red-500" /> : 
                  <HeartIcon className="w-5 h-5" />
                }
              >
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                leftIcon={<ShareIcon className="w-5 h-5" />}
              >
                Share
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                leftIcon={<ArrowDownTrayIcon className="w-5 h-5" />}
              >
                Download
              </Button>
            </div>
          </div>

          {/* Right Column - Episode Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Episode Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {podcast.category}
                  </span>
                  <span className="text-sm text-gray-500">Episode #{podcast.episodeNumber}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {podcast.title}
                </h1>

                {/* Host and Date */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 font-medium">{podcast.host}</span>
                  </div>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(podcast.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{podcast.views?.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HeartIcon className="w-4 h-4" />
                    <span>{podcast.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>{podcast.downloads} downloads</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">About This Episode</h3>
                  <div className="text-gray-700 leading-relaxed">
                    {showFullDescription ? (
                      <p>{podcast.description}</p>
                    ) : (
                      <p>{podcast.description.slice(0, 200)}...</p>
                    )}
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-600 hover:text-blue-700 font-medium ml-2"
                    >
                      {showFullDescription ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {podcast.tags && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {podcast.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Show Notes */}
            {podcast.showNotes && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Show Notes</h3>
                <ul className="space-y-2">
                  {podcast.showNotes.map((note, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Transcript */}
            {podcast.transcript && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Transcript</h3>
                  {showTranscript ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {showTranscript && (
                  <div className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                    {podcast.transcript}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Episodes */}
        {relatedPodcasts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More in {podcast.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPodcasts.map((relatedPodcast) => (
                <Link
                  key={relatedPodcast.id}
                  href={`/podcast/${relatedPodcast.id}`}
                  className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <OptimizedImage
                        src={relatedPodcast.coverImage}
                        alt={relatedPodcast.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {relatedPodcast.title}
                      </h3>
                      <div className="flex items-center mt-2 space-x-3 text-sm text-gray-500">
                        <span>#{relatedPodcast.episodeNumber}</span>
                        <span>•</span>
                        <span>{relatedPodcast.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
