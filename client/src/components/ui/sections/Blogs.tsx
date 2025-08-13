'use client';

import { ClockIcon, ArrowRightIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import blogData from '@/data/blogs.json';

const Blogs = () => {
  const allBlogs = [blogData.featuredBlog, ...blogData.otherBlogs];
  const recentBlogs = allBlogs.slice(0, 3); // Show only 4 recent posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Mental Health': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Therapy': 'bg-blue-50 text-blue-700 border-blue-200',
      'Trauma Therapy': 'bg-red-50 text-red-700 border-red-200',
      'Mood Disorders': 'bg-orange-50 text-orange-700 border-orange-200',
      'Wellness': 'bg-green-50 text-green-700 border-green-200',
      'Psychology': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Depression': 'bg-amber-50 text-amber-700 border-amber-200',
      'Relationships': 'bg-purple-50 text-purple-700 border-purple-200',
      default: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <section className='py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Enhanced Header */}
        <div className='text-center mb-8 sm:mb-12 lg:mb-16'>
          <div className='inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-100'>
            <UserIcon className='w-4 h-4 mr-2' />
            Latest Insights
          </div>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight'>
            Recent blog posts
          </h2>
          <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Expert insights and evidence-based approaches to mental health and wellness
          </p>
        </div>

        {/* Enhanced Blog Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {recentBlogs.map((blog, index) => (
            <article 
              key={blog.id} 
              className={`group cursor-pointer ${index === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}`}
            >
              <Link href={`/blog/${blog.id}`} className='block h-full'>
                <div className='bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200'>
                  {/* Enhanced Image */}
                  <div className={`relative overflow-hidden ${index === 0 ? 'h-48 sm:h-64 lg:h-80' : 'h-40 sm:h-48'}`}>
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    
                    {/* Category Badge on Image */}
                    <div className='absolute top-3 left-3 sm:top-4 sm:left-4'>
                      <span className={`inline-block px-2 py-1 sm:px-3 text-xs font-semibold rounded-full border ${getCategoryColor(blog.category)} backdrop-blur-sm`}>
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className={`p-4 sm:p-6 flex-1 flex flex-col ${index === 0 ? 'lg:p-8' : ''}`}>
                    {/* Enhanced Meta */}
                    <div className='flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4'>
                      <div className='flex items-center gap-1'>
                        <UserIcon className='w-4 h-4' />
                        <span className='font-medium text-gray-700'>{blog.author}</span>
                      </div>
                      <span className='text-gray-300'>•</span>
                      <div className='flex items-center gap-1'>
                        <CalendarIcon className='w-4 h-4' />
                        <span>{formatDate(blog.publishDate)}</span>
                      </div>
                    </div>

                    {/* Enhanced Title */}
                    <h3 className={`font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight ${
                      index === 0 ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-lg'
                    }`}>
                      {blog.title}
                    </h3>

                    {/* Enhanced Excerpt */}
                    <p className={`text-gray-600 mb-4 sm:mb-6 flex-1 leading-relaxed ${
                      index === 0 ? 'text-base sm:text-lg' : 'text-sm'
                    }`}>
                      {blog.excerpt}
                    </p>

                    {/* Enhanced Footer */}
                    <div className='flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100'>
                      <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <ClockIcon className='w-4 h-4' />
                        <span className='font-medium'>{blog.readTime}</span>
                      </div>
                      
                      <div className='flex items-center gap-1 sm:gap-2 text-blue-600 group-hover:text-blue-700 transition-colors duration-200'>
                        <span className='text-xs sm:text-sm font-semibold'>Read more</span>
                        <ArrowRightIcon className='w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200' />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className='text-center mt-8 sm:mt-12 lg:mt-16'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          >
            View all articles
            <ArrowRightIcon className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
