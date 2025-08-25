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
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');
  const [selectedType, setSelectedType] = useState('All Types');

  const allBooks = [...booksData.featuredBooks, ...booksData.otherBooks] as Book[];

  const filteredItems = allBooks.filter(item => {
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFormat = selectedFormat === 'All Formats' || item.format.includes(selectedFormat);
    const matchesType = selectedType === 'All Types' || 
                       (selectedType === 'Books' && item.type === 'Books') ||
                       (selectedType === 'Audiobook' && item.type === 'Audiobook');
    
    return matchesCategory && matchesSearch && matchesFormat && matchesType;
  });

  return (
    <div className='min-h-screen bg-gray-50 pt-20'>
      {/* Hero Section */}
      <BooksHero />

      {/* Main Content with Sidebar Layout */}
      <div className="lg:flex">
        {/* Sidebar */}
        <BooksSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          categories={booksData.categories}
          formats={booksData.stats.formats}
          resultsCount={filteredItems.length}
        />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Books Grid */}
          <BooksGrid items={filteredItems} className="bg-gray-50" />

          {/* Call to Action */}
          {/* <BooksCTA /> */}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;