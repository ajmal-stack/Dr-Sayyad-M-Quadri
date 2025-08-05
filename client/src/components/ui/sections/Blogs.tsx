'use client';

import { useState, useEffect } from 'react';
import {
  BookOpenIcon,
  ClockIcon,
  TagIcon,
  CalendarDaysIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  // StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  isLiked: boolean;
  featured: boolean;
}

// interface BlogStats {
//   totalPosts: string;
//   totalReads: string;
//   avgRating: number;
//   categories: string;
// }

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const postsPerPage = 6;

  // const stats: BlogStats = {
  //   totalPosts: '250+',
  //   totalReads: '50K+',
  //   avgRating: 4.8,
  //   categories: '12',
  // };

  const categories = [
    'all',
    'Mental Health',
    'Therapy',
    'Wellness',
    'Psychology',
    'Self-Help',
    'Relationships',
    'Anxiety',
    'Depression',
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Understanding Anxiety: A Comprehensive Guide',
      excerpt: 'Learn about the different types of anxiety disorders, their symptoms, and effective treatment approaches that can help you or your loved ones.',
      content: 'Full content here...',
      author: 'Dr. Syed M Quadri',
      authorAvatar: '/sayyed-quadri.png',
      publishDate: '2024-01-15',
      readTime: '8 min read',
      category: 'Mental Health',
      tags: ['anxiety', 'mental-health', 'therapy'],
      image: '/banner/White and Black Simple Mental Health Youtube Thumbnail.png',
      views: 2450,
      likes: 189,
      isLiked: false,
      featured: true,
    },
    {
      id: 2,
      title: 'Building Resilience in Daily Life',
      excerpt: 'Discover practical strategies to build mental resilience and cope with life\'s challenges more effectively.',
      content: 'Full content here...',
      author: 'Dr. Syed M Quadri',
      authorAvatar: '/sayyed-quadri.png',
      publishDate: '2024-01-12',
      readTime: '6 min read',
      category: 'Wellness',
      tags: ['resilience', 'wellness', 'self-help'],
      image: '/banner/Parenting Unveiled (1).jpg',
      views: 1890,
      likes: 156,
      isLiked: false,
      featured: false,
    },
    {
      id: 3,
      title: 'The Psychology of Relationships',
      excerpt: 'Explore the psychological foundations of healthy relationships and learn how to improve communication with your partner.',
      content: 'Full content here...',
      author: 'Dr. Syed M Quadri',
      authorAvatar: '/sayyed-quadri.png',
      publishDate: '2024-01-10',
      readTime: '10 min read',
      category: 'Relationships',
      tags: ['relationships', 'psychology', 'communication'],
      image: '/banner/Parenting Unveiled (2).jpg',
      views: 3200,
      likes: 245,
      isLiked: false,
      featured: true,
    },
    {
      id: 4,
      title: 'Managing Depression: Hope and Healing',
      excerpt: 'Understanding depression and discovering evidence-based approaches to treatment and recovery.',
      content: 'Full content here...',
      author: 'Dr. Syed M Quadri',
      authorAvatar: '/sayyed-quadri.png',
      publishDate: '2024-01-08',
      readTime: '12 min read',
      category: 'Depression',
      tags: ['depression', 'therapy', 'healing'],
      image: '/banner/U_White and Black Simple Mental Health Youtube Thumbnail.png',
      views: 2780,
      likes: 198,
      isLiked: false,
      featured: false,
    },
    {
      id: 5,
      title: 'Mindfulness and Mental Health',
      excerpt: 'Learn how mindfulness practices can significantly improve your mental health and overall well-being.',
      content: 'Full content here...',
      author: 'Dr. Syed M Quadri',
      authorAvatar: '/sayyed-quadri.png',
      publishDate: '2024-01-05',
      readTime: '7 min read',
      category: 'Wellness',
      tags: ['mindfulness', 'mental-health', 'meditation'],
      image: '/banner/Parenting Unveiled (3).jpg',
      views: 1650,
      likes: 134,
      isLiked: false,
      featured: false,
    },
    {
      id: 6,
      title: 'Parenting and Child Psychology',
      excerpt: 'Essential insights into child development and effective parenting strategies for supporting your child\'s mental health.',
      content: 'Full content here...',
      author: 'Dr. Syed M Quadri',
      authorAvatar: '/sayyed-quadri.png',
      publishDate: '2024-01-03',
      readTime: '9 min read',
      category: 'Psychology',
      tags: ['parenting', 'child-psychology', 'development'],
      image: '/banner/Parenting Unveiled (4).jpg',
      views: 2100,
      likes: 167,
      isLiked: false,
      featured: false,
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section className='py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='text-center mb-8'>
            <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-blue-100 shadow-2xl'>
              <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
              <h2 className='text-2xl font-bold text-slate-900'>Loading Blog Posts...</h2>
              <p className='text-slate-600 mt-2'>Please wait while we fetch the latest content</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-4 sm:py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/50'></div>
        <div className='absolute top-10 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 left-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        {/* Header Section */}
        <div className='text-center mb-8 lg:mb-12'>
          <div className='inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6'>
            <BookOpenIcon className='w-4 h-4 mr-2' />
            Blog & Articles
          </div>
          
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6'>
            Mental Health Insights
          </h1>
          {/* <p className='text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto'>
            Discover expert insights, practical tips, and evidence-based approaches to mental wellness
          </p> */}

          {/* Stats */}
          {/* <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto'>
            <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-blue-100 shadow-lg'>
              <div className='text-2xl font-bold text-blue-600'>
                {stats.totalPosts}
              </div>
              <div className='text-sm text-slate-600'>Blog Posts</div>
            </div>
            <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-green-100 shadow-lg'>
              <div className='text-2xl font-bold text-green-600'>
                {stats.totalReads}
              </div>
              <div className='text-sm text-slate-600'>Total Reads</div>
            </div>
            <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-yellow-100 shadow-lg'>
              <div className='flex items-center justify-center'>
                <div className='text-2xl font-bold text-yellow-600 mr-1'>
                  {stats.avgRating}
                </div>
                <StarIconSolid className='w-5 h-5 text-yellow-500' />
              </div>
              <div className='text-sm text-slate-600'>Avg Rating</div>
            </div>
            <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-purple-100 shadow-lg'>
              <div className='text-2xl font-bold text-purple-600'>
                {stats.categories}
              </div>
              <div className='text-sm text-slate-600'>Categories</div>
            </div>
          </div> */}
        </div>

        {/* Search and Filter Section */}
        <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xl mb-8'>
          <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
            {/* Search Bar */}
            <div className='flex-1'>
              <div className='relative'>
                <MagnifyingGlassIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Search articles, topics, or tags...'
                  className='w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300'
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className='lg:w-64'>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300'
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className='mt-4 text-sm text-slate-600'>
            Showing {currentPosts.length} of {filteredPosts.length} articles
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8'>
          {currentPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                post.featured ? 'ring-2 ring-blue-200' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className='absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
                  Featured
                </div>
              )}

              {/* Image */}
              <div className='relative h-48 lg:h-56 overflow-hidden'>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />
                
                {/* Category Badge */}
                <div className='absolute top-4 right-4 z-10'>
                  <span className='bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-semibold'>
                    {post.category}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
              </div>

              {/* Content */}
              <div className='p-6'>
                {/* Meta Info */}
                <div className='flex items-center gap-4 text-xs text-slate-500 mb-3'>
                  <div className='flex items-center'>
                    <CalendarDaysIcon className='w-4 h-4 mr-1' />
                    {formatDate(post.publishDate)}
                  </div>
                  <div className='flex items-center'>
                    <ClockIcon className='w-4 h-4 mr-1' />
                    {post.readTime}
                  </div>
                  <div className='flex items-center'>
                    <EyeIcon className='w-4 h-4 mr-1' />
                    {post.views.toLocaleString()}
                  </div>
                </div>

                {/* Title */}
                <h3 className='text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300'>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className='text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed'>
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className='inline-flex items-center bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs'
                    >
                      <TagIcon className='w-3 h-3 mr-1' />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author and Actions */}
                <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
                  <div className='flex items-center'>
                    <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-3'>
                      <UserIcon className='w-4 h-4 text-white' />
                    </div>
                    <div>
                      <div className='text-sm font-semibold text-slate-900'>{post.author}</div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => handleLike(post.id)}
                      className='flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors duration-300'
                    >
                      {likedPosts.includes(post.id) ? (
                        <HeartIconSolid className='w-4 h-4 text-red-500' />
                      ) : (
                        <HeartIcon className='w-4 h-4 text-slate-400' />
                      )}
                      <span className='text-xs text-slate-600'>{post.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => handleShare(post)}
                      className='p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300'
                    >
                      <ShareIcon className='w-4 h-4 text-slate-400 hover:text-blue-500' />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-4 mb-8'>
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className='flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-700 hover:bg-blue-50 hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
            >
              <ChevronLeftIcon className='w-4 h-4' />
              Previous
            </button>

            <div className='flex gap-2'>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-2xl font-semibold transition-all duration-300 ${
                    currentPage === i
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              className='flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-2xl text-slate-700 hover:bg-blue-50 hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300'
            >
              Next
              <ChevronRightIcon className='w-4 h-4' />
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className='text-center py-12'>
            <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-slate-200 shadow-xl'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-bold text-slate-900 mb-4'>No articles found</h3>
              <p className='text-slate-600 mb-6'>
                Try adjusting your search terms or category filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setCurrentPage(0);
                }}
                className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
