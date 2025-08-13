'use client';

import { notFound } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { 
  ArrowLeftIcon, 
  StarIcon, 
  ClockIcon,
  BookOpenIcon,
  SpeakerWaveIcon,
  ShareIcon,
  HeartIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  SpeakerXMarkIcon,
  DocumentTextIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon, HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import booksData from '@/data/books.json';
import { OptimizedImage } from '@/components/ui/primitives/OptimizedImage';
import { Button } from '@/components/ui/primitives/Button';

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

interface BookDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'reviews'>('overview');
  // Audiobook-specific state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(0.8);
  // E-book specific state
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Unwrap params Promise and get book data
  const resolvedParams = use(params);
  const allBooks = [...booksData.featuredBooks, ...booksData.otherBooks] as Book[];
  const book = allBooks.find(b => b.id === parseInt(resolvedParams.id));

  useEffect(() => {
    if (book && book.format.length > 0) {
      setSelectedFormat(book.format[0]);
    }
  }, [book]);

  // Handle modal keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPreviewModalOpen) {
        setIsPreviewModalOpen(false);
      }
    };

    if (isPreviewModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isPreviewModalOpen]);

  if (!book) {
    notFound();
  }

  // Generate related books (same category, excluding current book)
  const relatedBooks = allBooks
    .filter(b => b.id !== book.id && b.category === book.category)
    .slice(0, 3);

  // Simulate audio progress for demo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev < 3600 ? prev + 1 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4', 
      lg: 'w-5 h-5'
    }[size];

    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.floor(rating) ? (
              <SolidStarIcon className={`${sizeClass} text-yellow-400`} />
            ) : star === Math.ceil(rating) && rating % 1 !== 0 ? (
              <div className="relative">
                <StarIcon className={`${sizeClass} text-gray-300`} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                  <SolidStarIcon className={`${sizeClass} text-yellow-400`} />
                </div>
              </div>
            ) : (
              <StarIcon className={`${sizeClass} text-gray-300`} />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/books" className="text-gray-500 hover:text-gray-700">
              Books
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{book.title}</span>
          </nav>
        </div>
      </div>

      {/* Back Button - Mobile */}
      <div className="lg:hidden bg-white px-4 py-3 border-b border-gray-200">
        <Link href="/books" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Books
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Book Image */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Main Book Image */}
            <div className="relative group">
              <div className="aspect-[3/4] max-w-[280px] sm:max-w-[320px] lg:max-w-full mx-auto lg:mx-0 bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl overflow-hidden">
                <OptimizedImage
                  src={book.image}
                  alt={book.title}
                  width={320}
                  height={427}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                  priority
                />
              </div>
              
              {/* Book Type Badge */}
              <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4">
                <div className="flex items-center bg-black/90 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium">
                  {book.type === 'Audiobook' ?  ( 
                    <>
                      <SpeakerWaveIcon className="w-3 h-3 mr-1" />
                      Audiobook
                    </>
                  ) : (
                    <>
                      <BookOpenIcon className="w-3 h-3 mr-1" />
                      Book
                    </>
                  )}
                </div>
              </div>

              {/* Bestseller Badge */}
              {book.bestseller && (
                <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold">
                    Bestseller
                  </div>
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 p-2 sm:p-2.5 lg:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                {isFavorited ? (
                  <SolidHeartIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
                )}
              </button>
            </div>

            {/* Type-Specific Quick Actions - Desktop */}
            {book.type === 'Audiobook' ? (
              <div className="hidden lg:flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  leftIcon={<ShareIcon className="w-4 h-4" />}
                >
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setIsPlaying(!isPlaying)}
                  leftIcon={isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                >
                  {isPlaying ? 'Pause' : 'Preview'}
                </Button>
              </div>
            ) : (
            <div className="hidden lg:flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  leftIcon={<ShareIcon className="w-4 h-4" />}
                >
                Share
              </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setShowPreview(!showPreview)}
                  leftIcon={<EyeIcon className="w-4 h-4" />}
                >
                  {showPreview ? 'Hide Preview' : 'Preview'}
              </Button>
            </div>
            )}
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            {/* Header Info */}
            <div className="space-y-3 lg:space-y-4">
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">
                  {book.title}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1 lg:mt-2">
                  {book.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="text-sm sm:text-base font-medium text-gray-900">by {book.author}</span>
                <span className="hidden sm:inline text-xs sm:text-sm text-gray-500">•</span>
                <span className="text-xs sm:text-sm text-gray-600">{book.category}</span>
              </div>

              {/* Rating and Reviews */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-0.5">
                  {renderStars(book.rating, 'md')}
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">{book.rating}</span>
                </div>
                <span className="hidden sm:inline text-xs sm:text-sm text-gray-400">•</span>
                <span className="text-xs sm:text-sm text-gray-600">{book.reviews} reviews</span>
              </div>

              {/* Key Stats */}
              <div className="flex items-center space-x-6 text-xs sm:text-sm text-gray-600">
                {book.pages && (
                  <div className="flex items-center space-x-1">
                    <BookOpenIcon className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{book.pages} pages</span>
                  </div>
                )}
                {book.duration && (
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{book.duration}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span className="text-xs sm:text-sm">Published {new Date(book.publishDate).getFullYear()}</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">{book.price}</span>
                <span className="text-sm sm:text-base text-gray-500 line-through">{book.originalPrice}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs sm:text-sm font-medium">
                  Save {Math.round((1 - parseFloat(book.price.slice(1)) / parseFloat(book.originalPrice.slice(1))) * 100)}%
                </span>
              </div>

              {/* Format Selection */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Choose Format:
                </label>
                <div className="flex flex-wrap gap-2">
                  {book.format.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`px-2 py-1 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                        selectedFormat === format
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Buttons - Type Specific */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {book.type === 'Audiobook' ? (
                  <>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      leftIcon={<SpeakerWaveIcon className="w-5 h-5" />}
                    >
                      Get Audiobook
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                      leftIcon={<PlayIcon className="w-5 h-5" />}
                    >
                      Listen Now
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      leftIcon={<DocumentTextIcon className="w-5 h-5" />}
                    >
                      Get E-book
                </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                      leftIcon={<BookOpenIcon className="w-5 h-5" />}
                    >
                      Read Now
                </Button>
                  </>
                )}
              </div>

              {/* Audio Player Section - For Audiobooks */}
             
            </div>

            {book.type === 'Audiobook' && (
                <div className="mt-2">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 lg:p-6 border border-blue-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
                        <SpeakerWaveIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                        Audio Player
                      </h3>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                        <span>Narrated by: {book.narrator || book.author}</span>
                      </div>
                    </div>
                    
                    {/* Audio Controls */}
                    <div className="bg-white rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm">
                      {/* Progress Bar */}
                      <div className="mb-3 lg:mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                          <span>{book.duration}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 lg:h-2 cursor-pointer">
                          <div 
                            className="bg-blue-600 h-1.5 lg:h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(currentTime / 3600) * 100}%` }}
                          />
              </div>
            </div>

                      {/* Playback Controls */}
                      <div className="flex items-center justify-center space-x-4 lg:space-x-6">
                        <Button variant="outline" size="sm">
                          <BackwardIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                        </Button>
                        <Button 
                          size="lg" 
                          className="rounded-full w-10 h-10 lg:w-12 lg:h-12"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <PauseIcon className="w-5 h-5 lg:w-6 lg:h-6" /> : <PlayIcon className="w-5 h-5 lg:w-6 lg:h-6" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <ForwardIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                        </Button>
                      </div>
                      
                      {/* Additional Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 lg:mt-4 space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm text-gray-600">Speed:</span>
                          <select 
                            className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1"
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
                          <SpeakerXMarkIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1" 
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-16 sm:w-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Type-Specific Quick Actions - Mobile */}
            {book.type === 'Audiobook' ? (
              <div className="lg:hidden flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  leftIcon={<ShareIcon className="w-4 h-4" />}
                >
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setIsPlaying(!isPlaying)}
                  leftIcon={isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                >
                  {isPlaying ? 'Pause' : 'Preview'}
                </Button>
              </div>
            ) : (
            <div className="lg:hidden flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  leftIcon={<ShareIcon className="w-4 h-4" />}
                >
                Share
              </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setIsPreviewModalOpen(true)}
                  leftIcon={<EyeIcon className="w-4 h-4" />}
                >
                  Preview
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Book Preview Modal */}
        {isPreviewModalOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsPreviewModalOpen(false)}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{book.title}</h2>
                    <p className="text-sm text-gray-600">Preview - Chapter 1</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsPreviewModalOpen(false)}
                  leftIcon={<XMarkIcon className="w-4 h-4" />}
                >
                  Close
                </Button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                <div className="prose prose-gray max-w-none">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border border-amber-100">
                    <div className="flex items-center space-x-2 mb-3">
                      <DocumentTextIcon className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">Book Preview</span>
                    </div>
                    <p className="text-sm text-amber-700">
                      This is a sample preview of the book content. The full version contains comprehensive chapters, exercises, and detailed guidance.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Chapter 1: Introduction</h3>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Mental health is a critical aspect of our overall well-being that affects every dimension of our lives. 
                      In this comprehensive guide, we&apos;ll explore evidence-based approaches to understanding and managing 
                      mental health challenges that many individuals face in today&apos;s complex world.
                    </p>
                    
                    <p>
                      Whether you&apos;re a mental health professional seeking to expand your knowledge, someone currently 
                      facing mental health challenges, or a family member looking to better understand and support 
                      a loved one, this book offers practical insights and actionable strategies rooted in decades 
                      of clinical experience and research.
                    </p>
                    
                    <p>
                      Throughout these pages, you&apos;ll discover tools for building resilience, managing stress, 
                      and developing healthy coping mechanisms that can be applied in daily life. We&apos;ll explore 
                      the connection between mind and body, examine the role of relationships in mental wellness, 
                      and provide step-by-step guidance for creating positive change.
                    </p>

                    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg my-6">
                      <p className="text-blue-900 italic">
                        &ldquo;Mental health is not a destination, but a process. It&apos;s about how you drive, not where you&apos;re going.&rdquo;
                      </p>
                      <footer className="text-sm text-blue-700 mt-2">— Dr. Noam Shpancer</footer>
                    </blockquote>

                    <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">What You&apos;ll Learn</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Evidence-based techniques for managing anxiety and stress</li>
                      <li>Building emotional resilience in challenging times</li>
                      <li>Understanding the mind-body connection</li>
                      <li>Developing healthy communication patterns</li>
                      <li>Creating sustainable self-care practices</li>
                    </ul>

                    <div className="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-200">
                      <p className="text-sm text-gray-600 italic text-center">
                        This is a preview of the full content. Purchase to read the complete book with all {book.pages} pages, 
                        practical exercises, case studies, and comprehensive resources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    leftIcon={<DocumentTextIcon className="w-5 h-5" />}
                  >
                    Get E-book - {book.price}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => setIsPreviewModalOpen(false)}
                  >
                    Continue Browsing
              </Button>
            </div>
          </div>
        </div>
          </div>
        )}

        {/* Tabs Section */}
        <div className="mt-12 lg:mt-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'details', label: book.type === 'Audiobook' ? 'Audio Details' : 'Book Details' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'details' | 'reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === 'overview' && (
              <div className="max-w-4xl">
                <div className="prose prose-lg max-w-none">
                  <div className={`text-gray-700 leading-relaxed ${!showFullDescription ? 'line-clamp-6' : ''}`}>
                    {book.description}
                    {/* Type-specific content */}
                    <div className="mt-4 space-y-4">
                      {book.type === 'Audiobook' ? (
                        <>
                          <p>
                            This comprehensive audiobook provides listeners with evidence-based strategies and practical tools 
                            for understanding and managing mental health challenges. Drawing from years of clinical experience 
                            and the latest research in psychology and psychiatry, narrated with clarity and compassion.
                          </p>
                          <p>
                            Perfect for busy professionals and those who prefer audio learning, this audiobook allows you to 
                            absorb valuable mental health insights during commutes, exercise, or quiet moments at home. 
                            The expert narration brings Dr. Quadri&apos;s wisdom to life in an engaging, accessible format.
                          </p>
                        </>
                      ) : (
                        <>
                      <p>
                        This comprehensive guide provides readers with evidence-based strategies and practical tools 
                        for understanding and managing mental health challenges. Drawing from years of clinical experience 
                        and the latest research in psychology and psychiatry.
                      </p>
                      <p>
                            Whether you&apos;re a mental health professional, someone experiencing mental health challenges, 
                        or a family member seeking to understand and support a loved one, this book offers valuable 
                            insights and actionable advice. Interactive exercises and reflection prompts enhance the learning experience.
                      </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showFullDescription ? (
                      <>
                        Show Less
                        <ChevronUpIcon className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        Read More
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {book.type === 'Audiobook' ? 'Audio Topics Covered' : 'Topics Covered'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm capitalize ${
                          book.type === 'Audiobook' 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {book.type === 'Audiobook' ? 'Audiobook Information' : 'Book Information'}
                    </h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">ISBN:</dt>
                        <dd className="text-gray-900 font-medium">{book.isbn}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Publication Date:</dt>
                        <dd className="text-gray-900 font-medium">
                          {new Date(book.publishDate).toLocaleDateString()}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Type:</dt>
                        <dd className="text-gray-900 font-medium flex items-center">
                          {book.type === 'Audiobook' ? (
                            <>
                              <SpeakerWaveIcon className="w-4 h-4 mr-1 text-blue-600" />
                              Audiobook
                            </>
                          ) : (
                            <>
                              <BookOpenIcon className="w-4 h-4 mr-1 text-blue-600" />
                              Book
                            </>
                          )}
                        </dd>
                      </div>
                      {book.pages && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Pages:</dt>
                          <dd className="text-gray-900 font-medium">{book.pages}</dd>
                        </div>
                      )}
                      {book.duration && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">{book.type === 'Audiobook' ? 'Audio Duration:' : 'Duration:'}:</dt>
                          <dd className="text-gray-900 font-medium">{book.duration}</dd>
                        </div>
                      )}
                      {book.narrator && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Narrator:</dt>
                          <dd className="text-gray-900 font-medium">{book.narrator}</dd>
                        </div>
                      )}
                      {book.type === 'Audiobook' && (
                        <>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Audio Quality:</dt>
                            <dd className="text-gray-900 font-medium">High Quality MP3</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">File Size:</dt>
                            <dd className="text-gray-900 font-medium">~150 MB</dd>
                          </div>
                        </>
                      )}
                      {book.type === 'Books' && (
                        <>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Language:</dt>
                            <dd className="text-gray-900 font-medium">English</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-600">Reading Level:</dt>
                            <dd className="text-gray-900 font-medium">General Adult</dd>
                          </div>
                        </>
                      )}
                    </dl>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Available Formats</h3>
                    <div className="space-y-3">
                      {book.format.map((format) => (
                        <div
                          key={format}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            {format === 'Audiobook' || format === 'Digital Download' ? (
                              <SpeakerWaveIcon className="w-4 h-4 mr-2 text-purple-600" />
                            ) : (
                              <DocumentDuplicateIcon className="w-4 h-4 mr-2 text-blue-600" />
                            )}
                          <span className="font-medium text-gray-900">{format}</span>
                          </div>
                          <span className="text-blue-600 font-semibold">{book.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    {book.type === 'Audiobook' && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-purple-100">
                        <h4 className="font-semibold text-blue-900 mb-2">Audiobook Features</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Variable playback speed (0.5x - 2x)</li>
                          <li>• Chapter navigation</li>
                          <li>• Offline listening</li>
                          <li>• Sleep timer function</li>
                          <li>• Bookmarks and notes</li>
                        </ul>
                      </div>
                    )}
                    
                    {book.type === 'Books' && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-semibold text-blue-900 mb-2">E-book Features</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Adjustable font size and style</li>
                          <li>• Night mode reading</li>
                          <li>• Search within text</li>
                          <li>• Highlight and annotate</li>
                          <li>• Cross-device sync</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                {/* Reviews Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{book.rating}</div>
                      <div className="flex justify-center mb-2">
                        {renderStars(book.rating, 'lg')}
                      </div>
                      <div className="text-gray-600">{book.reviews} reviews</div>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const percentage = Math.max(10, Math.random() * 60 + (6 - stars) * 10);
                        return (
                          <div key={stars} className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600 w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
                  
                  {(book.type === 'Audiobook' ? [
                    {
                      name: "Sarah M.", 
                      rating: 5,
                      date: "2 days ago",
                      review: "Outstanding audiobook! Dr. Quadri's narration is incredibly soothing and professional. I listen during my commute and it's transformed my understanding of mental health. The audio quality is excellent."
                    },
                    {
                      name: "Michael R.",
                      rating: 4,
                      date: "1 week ago", 
                      review: "Perfect for multitasking! I can listen while exercising or doing chores. The narrator's voice is clear and engaging. Great content delivered in a very accessible format."
                    },
                    {
                      name: "Jennifer L.",
                      rating: 5,
                      date: "2 weeks ago",
                      review: "The audiobook format makes it so easy to absorb this important information. I've listened to certain chapters multiple times. Dr. Quadri's delivery is both professional and warm."
                    }
                  ] : [
                    {
                      name: "Sarah M.",
                      rating: 5,
                      date: "2 days ago",
                      review: "Absolutely transformative read. Dr. Quadri's approach to mental health is both compassionate and practical. The exercises in this book have genuinely helped me manage my anxiety."
                    },
                    {
                      name: "Michael R.",
                      rating: 4,
                      date: "1 week ago", 
                      review: "Well-written and informative. As someone working in healthcare, I found the evidence-based approaches particularly valuable. The interactive elements make it engaging."
                    },
                    {
                      name: "Jennifer L.",
                      rating: 5,
                      date: "2 weeks ago",
                      review: "This book came at exactly the right time in my life. The author's insights into trauma recovery are profound. I love being able to highlight and take notes digitally."
                    }
                  ]).map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{review.name}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.review}</p>
                    </div>
                  ))}
                </div>)
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Books in {book.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  href={`/books/${relatedBook.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src={relatedBook.image}
                      alt={relatedBook.title}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedBook.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(relatedBook.rating, 'sm')}
                        <span className="text-sm text-gray-600">({relatedBook.reviews})</span>
                      </div>
                      <span className="font-bold text-gray-900">{relatedBook.price}</span>
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
