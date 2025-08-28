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
    <div className="h-full lg:h-auto bg-white border-r lg:border border-gray-200 lg:rounded-xl lg:shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-200 bg-white lg:bg-gray-50 lg:rounded-t-xl sticky top-0 z-10">
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
      <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
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
          <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="All Categories"
                checked={selectedCategory === 'All Categories'}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">All Categories</span>
            </label>
            {categories.filter(cat => cat !== 'All Books').map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Type</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="All Types"
                checked={selectedType === 'All Types'}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">All Types</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="Books"
                checked={selectedType === 'Books'}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">Books</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="Audiobook"
                checked={selectedType === 'Audiobook'}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">Audiobooks</span>
            </label>
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Format</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                value="All Formats"
                checked={selectedFormat === 'All Formats'}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">All Formats</span>
            </label>
            {formats.map(format => (
              <label key={format} className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value={format}
                  checked={selectedFormat === format}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-700">{format}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Footer - Results and Clear */}
      <div className="p-4 lg:p-6 border-t border-gray-200 bg-white lg:bg-gray-50 lg:rounded-b-xl sticky bottom-0">
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
        fixed lg:static
        top-0 lg:top-0
        left-0 h-screen lg:h-auto
        w-80 lg:w-full
        z-50 lg:z-10
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:mt-6
        ${className}
      `}>
        <SidebarContent />
      </div>
    </>
  );
}
