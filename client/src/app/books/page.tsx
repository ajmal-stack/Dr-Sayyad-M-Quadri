export default function BooksPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Books
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Explore published works and curated recommendations for meaningful
            reading.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Published Books */}
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Published Works
            </h2>
            <div className='space-y-6'>
              {[1, 2, 3].map((book) => (
                <div
                  key={book}
                  className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex'
                >
                  <div className='w-24 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex-shrink-0 mr-6'></div>
                  <div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      The Path to Enlightenment {book}
                    </h3>
                    <p className='text-gray-600 mb-4'>
                      A comprehensive guide to spiritual growth and
                      self-discovery in the modern world.
                    </p>
                    <div className='flex items-center space-x-4'>
                      <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                        Read More
                      </button>
                      <button className='border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors'>
                        Purchase
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Recommended Reading
            </h2>
            <div className='space-y-4'>
              {[1, 2, 3, 4, 5].map((book) => (
                <div
                  key={book}
                  className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4'
                >
                  <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                    Recommended Book {book}
                  </h3>
                  <p className='text-gray-600 text-sm mb-2'>
                    A thought-provoking read that complements the themes
                    discussed in our podcast.
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-500'>
                      by Author Name
                    </span>
                    <button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
