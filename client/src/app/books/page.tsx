'use client';

import { useState } from 'react';
import booksData from '@/data/books.json';
import BooksHero from '@/components/ui/books/BooksHero';
import BooksSidebar from '@/components/ui/books/BooksSidebar';
import BooksGrid from '@/components/ui/books/BooksGrid';
// import BooksCTA from '@/components/ui/books/BooksCTA';


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

const BooksPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allBooks = [...booksData.featuredBooks, ...booksData.otherBooks] as Book[];

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
              categories={booksData.categories}
              formats={booksData.stats.formats}
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