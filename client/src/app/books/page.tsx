'use client';

import { useState, useEffect } from 'react';
import BooksHero from '@/components/ui/books/BooksHero';
import BooksSidebar from '@/components/ui/books/BooksSidebar';
import BooksGrid from '@/components/ui/books/BooksGrid';
// import BooksCTA from '@/components/ui/books/BooksCTA';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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
  slug?: string;
}

const BooksPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books from backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/books`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setAllBooks(data.data);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.data.map((book: Book) => book.category))];
          setCategories(uniqueCategories as string[]);
          
          // Extract unique formats
          const allFormats = data.data.flatMap((book: Book) => book.format);
          const uniqueFormats = [...new Set(allFormats)];
          setFormats(uniqueFormats as string[]);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredItems = allBooks.filter(item => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFormat = selectedFormats.length === 0 || selectedFormats.some(format => item.format.includes(format));
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
    
    return matchesCategory && matchesSearch && matchesFormat && matchesType;
  });

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedCategories.length > 0 || 
    selectedFormats.length > 0 || 
    selectedTypes.length > 0;

  // Show loading state
  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 pt-20'>
        <BooksHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading books...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 pt-20'>
        <BooksHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Books</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 pt-20'>
      {/* Hero Section */}
      <BooksHero />

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto">
        {/* Main Content with Sidebar Layout */}
        <div className="lg:flex lg:gap-6 xl:gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96 lg:flex-shrink-0">
            <BooksSidebar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedFormats={selectedFormats}
              setSelectedFormats={setSelectedFormats}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              categories={categories}
              formats={formats}
              resultsCount={filteredItems.length}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 lg:pt-6">
            {/* Books Grid */}
            <BooksGrid 
              items={filteredItems} 
              className="bg-gray-50"
              onFilterClick={() => setIsSidebarOpen(true)}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Call to Action */}
            {/* <BooksCTA /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;