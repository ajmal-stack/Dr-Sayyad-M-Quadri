import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

export default function PublicSpeakingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50/30'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Back Button */}
        <Link
          href='/books'
          className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-300'
        >
          <ArrowLeftIcon className='w-5 h-5 mr-2' />
          Back to Books
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Book Cover */}
          <div className='flex justify-center lg:justify-start'>
            <div className='relative w-80 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100/50'>
              <Image
                src='/books/Blue & Orange Playful Illustrative Public Speaking Book Cover.jpg'
                alt='Public Speaking Mastery Book Cover'
                fill
                className='object-cover'
              />
            </div>
          </div>

          {/* Book Details */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-4xl font-bold text-slate-800 mb-2'>
                Public Speaking Mastery
              </h1>
              <p className='text-lg text-slate-600 mb-4'>
                Overcome Anxiety and Speak with Confidence
              </p>
              <p className='text-sm text-blue-600 font-semibold'>
                By Dr. Syed M Quadri
              </p>
            </div>

            <div className='prose prose-slate max-w-none'>
              <p className='text-slate-700 leading-relaxed'>
                Transform your fear of public speaking into confident
                communication. This comprehensive guide combines psychological
                insights with practical techniques to help you become a
                compelling and confident speaker.
              </p>

              <h3 className='text-xl font-semibold text-slate-800 mt-6 mb-3'>
                What You&apos;ll Learn:
              </h3>
              <ul className='list-disc list-inside text-slate-700 space-y-2'>
                <li>Understanding and overcoming speaking anxiety</li>
                <li>Building confidence through preparation</li>
                <li>Engaging your audience effectively</li>
                <li>Body language and vocal techniques</li>
                <li>Handling difficult questions and situations</li>
              </ul>
            </div>

            <div className='flex items-center space-x-4 pt-6'>
              <button className='flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'>
                <ShoppingCartIcon className='w-5 h-5' />
                <span>Purchase Book</span>
              </button>

              <button className='flex items-center space-x-2 text-slate-600 hover:text-orange-600 px-6 py-3 rounded-xl border border-slate-300 hover:border-orange-300 transition-all duration-300'>
                <HeartIcon className='w-5 h-5' />
                <span>Add to Wishlist</span>
              </button>
            </div>

            <div className='bg-orange-50/50 rounded-xl p-6 border border-orange-100/50'>
              <h3 className='text-lg font-semibold text-slate-800 mb-3'>
                Book Details
              </h3>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='font-medium text-slate-600'>Format:</span>
                  <span className='text-slate-800 ml-2'>
                    Paperback & Digital
                  </span>
                </div>
                <div>
                  <span className='font-medium text-slate-600'>Pages:</span>
                  <span className='text-slate-800 ml-2'>256</span>
                </div>
                <div>
                  <span className='font-medium text-slate-600'>Language:</span>
                  <span className='text-slate-800 ml-2'>English</span>
                </div>
                <div>
                  <span className='font-medium text-slate-600'>Category:</span>
                  <span className='text-slate-800 ml-2'>Self-Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
