'use client';

import { useState } from 'react';
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface BooksSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  categories: string[];
  formats: string[];
  resultsCount: number;
  className?: string;
}

export default function BooksSidebar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedFormat,
  setSelectedFormat,
  selectedType,
  setSelectedType,
  categories,
  formats,
  resultsCount,
  className = ''
}: BooksSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedFormat('All Formats');
    setSelectedType('All Types');
  };

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedCategory !== 'All Categories' || 
    selectedFormat !== 'All Formats' || 
    selectedType !== 'All Types';

  const SidebarContent = () => (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FunnelIcon className="w-5 h-5 mr-2 text-gray-600" />
            Filters
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All Categories">All Categories</option>
            {categories.filter(cat => cat !== 'All Books').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All Types">All Types</option>
            <option value="Books">Books</option>
            <option value="Audiobook">Audiobooks</option>
          </select>
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All Formats">All Formats</option>
            {formats.map(format => (
              <option key={format} value={format}>{format}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Sticky Footer - Results and Clear */}
      <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {resultsCount} result{resultsCount !== 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button - Sticky */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-24 left-4 z-30 flex items-center gap-2 px-3 py-2 bg-white shadow-lg border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 backdrop-blur-sm"
      >
        <Bars3Icon className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

            {/* Sidebar */}
      <div className={`
        fixed lg:sticky
        top-0 lg:top-20
        left-0 h-screen lg:h-[calc(100vh-5rem)]
        w-80 lg:w-72 xl:w-80
        z-50 lg:z-10
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${className}
      `}>
        <SidebarContent />
      </div>
    </>
  );
}
