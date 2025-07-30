'use client';

import { useState } from 'react';
import { PlayIcon, PauseIcon, ClockIcon, CalendarIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface PodcastEpisode {
  id: number;
  title: string;
  duration: string;
  publishDate: string;
  category: string;
  coverImage: string;
  views: number;
  isLiked: boolean;
}

const categories = ['All', 'Mental Health', 'Wellness', 'Self-Improvement', 'Therapy', 'Mindfulness'];

// Mock data - replace with actual data fetching
const allEpisodes: PodcastEpisode[] = Array(9).fill(0).map((_, i) => ({
  id: i + 1,
  title: `Podcast Episode ${i + 1}: Understanding Mental Health`,
  duration: `${30 + i}:${i.toString().padStart(2, '0')}`,
  publishDate: `2023-${String(10 - Math.floor(i/3)).padStart(2, '0')}-${String(15 + i).padStart(2, '0')}`,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  coverImage: '/banner/mental-health-banner.jpg',
  views: Math.floor(Math.random() * 2000),
  isLiked: false
}));

export default function AllEpisodesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(allEpisodes);
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const togglePlay = (episodeId: number) => {
    setCurrentPlaying(currentPlaying === episodeId ? null : episodeId);
  };

  const toggleLike = (episodeId: number) => {
    setEpisodes(episodes.map(episode => 
      episode.id === episodeId 
        ? { ...episode, isLiked: !episode.isLiked } 
        : episode
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">All Podcast Episodes</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore our collection of insightful podcast episodes on mental health and wellness.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            className="block w-full md:w-auto pl-10 pr-10 py-2 border border-slate-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map((episode) => (
            <div key={episode.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-slate-100">
                <Image
                  src={episode.coverImage}
                  alt={episode.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => togglePlay(episode.id)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600 bg-opacity-90 flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                >
                  {currentPlaying === episode.id ? (
                    <PauseIcon className="h-8 w-8 text-white" />
                  ) : (
                    <PlayIcon className="h-8 w-8 text-white ml-1" />
                  )}
                </button>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {episode.category}
                  </span>
                  <span className="flex items-center text-slate-500 text-sm">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {episode.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {episode.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDate(episode.publishDate)}
                  </span>
                  <span>{episode.views.toLocaleString()} views</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => toggleLike(episode.id)}
                    className="flex items-center text-slate-500 hover:text-red-500 transition-colors"
                  >
                    {episode.isLiked ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
