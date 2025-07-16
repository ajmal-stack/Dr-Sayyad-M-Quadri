import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

export default function FoodJournalPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50/30'>
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
            <div className='relative w-80 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100/50'>
              <Image
                src='/books/Red and Green Seamless Pattern Printable Daily Food Journal Cover.jpg'
                alt='Daily Food Journal Book Cover'
                fill
                className='object-cover'
              />
            </div>
          </div>

          {/* Book Details */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-4xl font-bold text-slate-800 mb-2'>
                Daily Food Journal
              </h1>
              <p className='text-lg text-slate-600 mb-4'>
                Track Your Nutrition and Mental Health Connection
              </p>
              <p className='text-sm text-blue-600 font-semibold'>
                By Dr. Sayyed M Quadri
              </p>
            </div>

            <div className='prose prose-slate max-w-none'>
              <p className='text-slate-700 leading-relaxed'>
                Discover the powerful connection between nutrition and mental
                health. This comprehensive journal helps you track your eating
                patterns, mood changes, and overall well-being to create a
                healthier relationship with food.
              </p>

              <h3 className='text-xl font-semibold text-slate-800 mt-6 mb-3'>
                What You&apos;ll Track:
              </h3>
              <ul className='list-disc list-inside text-slate-700 space-y-2'>
                <li>Daily food intake and nutritional values</li>
                <li>Mood and energy levels throughout the day</li>
                <li>Sleep quality and its impact on eating habits</li>
                <li>Stress levels and emotional eating patterns</li>
                <li>Physical activity and its correlation with diet</li>
              </ul>
            </div>

            <div className='flex items-center space-x-4 pt-6'>
              <button className='flex items-center space-x-2 bg-gradient-to-r from-green-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl'>
                <ShoppingCartIcon className='w-5 h-5' />
                <span>Purchase Journal</span>
              </button>

              <button className='flex items-center space-x-2 text-slate-600 hover:text-green-600 px-6 py-3 rounded-xl border border-slate-300 hover:border-green-300 transition-all duration-300'>
                <HeartIcon className='w-5 h-5' />
                <span>Add to Wishlist</span>
              </button>
            </div>

            <div className='bg-green-50/50 rounded-xl p-6 border border-green-100/50'>
              <h3 className='text-lg font-semibold text-slate-800 mb-3'>
                Journal Details
              </h3>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='font-medium text-slate-600'>Format:</span>
                  <span className='text-slate-800 ml-2'>
                    Printable & Digital
                  </span>
                </div>
                <div>
                  <span className='font-medium text-slate-600'>Pages:</span>
                  <span className='text-slate-800 ml-2'>180</span>
                </div>
                <div>
                  <span className='font-medium text-slate-600'>Duration:</span>
                  <span className='text-slate-800 ml-2'>90 Days</span>
                </div>
                <div>
                  <span className='font-medium text-slate-600'>Category:</span>
                  <span className='text-slate-800 ml-2'>
                    Health & Nutrition
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
