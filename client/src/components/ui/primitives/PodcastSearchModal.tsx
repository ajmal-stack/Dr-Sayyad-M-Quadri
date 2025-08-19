'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, MagnifyingGlassIcon, PlayIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';

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

interface PodcastSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  podcasts: Podcast[];
  categories: string[];
}

export default function PodcastSearchModal({ isOpen, onClose, podcasts, categories }: PodcastSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter podcasts based on search and category
  useEffect(() => {
    let filtered = podcasts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (podcast) => podcast.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          podcast.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          podcast.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPodcasts(filtered);
  }, [podcasts, selectedCategory, searchQuery]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedCategory('All');
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handlePodcastClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-0 top-0 bottom-0 flex items-start justify-center pt-4 pb-4 sm:pt-8 sm:pb-8">
        <div className="relative w-full max-w-4xl h-full max-h-full mx-4 transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Search Podcasts</h2>
              <button
                onClick={onClose}
                className="rounded-full bg-gray-100 p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close search"
              >
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search episodes, topics, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            {searchQuery && (
              <div className="mt-3 text-sm text-gray-600">
                {filteredPodcasts.length} result{filteredPodcasts.length !== 1 ? 's' : ''} found
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            {!searchQuery && selectedCategory === 'All' ? (
              // Initial state - show recent/featured podcasts
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Search for podcasts</h3>
                <p className="mt-2 text-gray-500">
                  Start typing to find episodes, topics, or browse by category
                </p>
                
                {/* Featured Episodes Preview */}
                <div className="mt-8">
                  <h4 className="text-left text-sm font-semibold text-gray-900 mb-4">Featured Episodes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {podcasts.filter(p => p.featured).slice(0, 4).map((podcast) => (
                      <Link
                        key={podcast.id}
                        href={`/podcast/${podcast.id}`}
                        onClick={handlePodcastClick}
                        className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={podcast.coverImage}
                              alt={podcast.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {podcast.title}
                            </h5>
                            <p className="text-xs text-gray-500 mt-1">
                              {podcast.category} • {podcast.duration}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredPodcasts.length === 0 ? (
              // No results
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No episodes found</h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search terms or browse different categories
                </p>
              </div>
            ) : (
              // Search results
              <div className="space-y-4">
                {filteredPodcasts.map((podcast) => (
                  <Link
                    key={podcast.id}
                    href={`/podcast/${podcast.id}`}
                    onClick={handlePodcastClick}
                    className="group block bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      {/* Podcast Image */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={podcast.coverImage}
                          alt={podcast.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <PlayIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {podcast.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                              {podcast.description}
                            </p>
                          </div>
                          
                          {/* Episode Number */}
                          {podcast.episodeNumber && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                              #{podcast.episodeNumber}
                            </span>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            podcast.category === 'Mental Health' ? 'bg-purple-100 text-purple-700' :
                            podcast.category === 'Nutrition' ? 'bg-green-100 text-green-700' :
                            podcast.category === 'Self-Development' ? 'bg-blue-100 text-blue-700' :
                            podcast.category === 'Health' ? 'bg-teal-100 text-teal-700' :
                            podcast.category === 'Wellness' ? 'bg-indigo-100 text-indigo-700' :
                            podcast.category === 'Psychology' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {podcast.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>{podcast.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            <span>
                              {new Date(podcast.publishDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
