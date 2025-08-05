'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ContentLoader } from '../primitives/Loader';

const heroSlides = [
  {
    id: 1,
    backgroundImage: '/hero banner/1.png',
  },
  {
    id: 2,
    backgroundImage: '/hero banner/2.png',
  },
  {
    id: 3,
    backgroundImage: '/hero banner/3.png',
  },
  {
    id: 4,
    backgroundImage: '/hero banner/4.png',
  },
  {
    id: 5,
    backgroundImage: '/hero banner/5.png',
  },
  {
    id: 6,
    backgroundImage: '/hero banner/6.png',
  },
  {
    id: 7,
    backgroundImage: '/hero banner/7.png',
  },
  {
    id: 8,
    backgroundImage: '/hero banner/8.png',
  },
  {
    id: 9,
    backgroundImage: '/hero banner/9.png',
  },

];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const interval = setInterval(() => {
      if (!isPaused && !isDragging) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  // Global mouse event listeners for better drag experience
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setCurrentX(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        const diff = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
          } else {
            setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
          }
        }
        
        setIsDragging(false);
        setIsPaused(false);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, currentX]);

  // Navigation functions
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  const goToSlide = (index: number) => setCurrentSlide(index);

  // Touch/Mouse drag handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    setIsPaused(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
    }
    
    setIsDragging(false);
    setIsPaused(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Right click and long press handlers
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
  };

  const handleLongPressStart = () => {
    setIsPaused(true);
  };

  const handleLongPressEnd = () => {
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <section
      className='relative h-[200px] xs:h-[180px] sm:h-[240px] md:h-[300px] lg:h-[380px] xl:h-[420px] 2xl:h-[480px] w-full overflow-hidden mt-20 cursor-grab active:cursor-grabbing select-none'
      id='hero'
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onContextMenu={handleContextMenu}
      style={{ touchAction: 'pan-y pinch-zoom' }}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-slate-100">
          <ContentLoader 
            variant="spinner" 
            size="xl" 
            message="Loading hero images..." 
            className="h-full"
          />
        </div>
      )}

      <div className='absolute inset-0'>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-110'
            }`}
          >
            <div 
              className='absolute inset-0 bg-slate-900'
              onTouchStart={handleLongPressStart}
              onTouchEnd={handleLongPressEnd}
              onMouseDown={handleLongPressStart}
              onMouseUp={handleLongPressEnd}
            >
              <Image
                src={slide.backgroundImage}
                alt={`Hero banner ${slide.id}`}
                fill
                className='object-cover object-center pointer-events-none'
                priority={index <= 1} // Load first 2 images with priority
                quality={95}
                sizes='100vw'
                draggable={false}
                onLoad={handleImageLoad}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 sm:from-black/10 sm:via-black/20 sm:to-black/40' />
          </div>
        ))}
      </div>

      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping' />
        <div className='absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1000' />
        <div className='absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping delay-2000' />
        <div className='absolute top-60 left-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping delay-500' />
        <div className='absolute bottom-60 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-ping delay-1500' />
      </div>
      <div className='absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div className={`flex items-center space-x-1 sm:space-x-2 md:space-x-3 backdrop-blur-md rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border transition-all duration-300 ${
          isPaused || isDragging 
            ? 'bg-orange-500/30 border-orange-400/50' 
            : 'bg-white/20 border-white/30'
        }`}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 sm:h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-3 sm:w-6 md:w-8 lg:w-12'
                  : 'bg-white/50 w-1 sm:w-2 md:w-3 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Pause/Drag Indicator */}
      {(isPaused || isDragging) && (
        <div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-20'>
          <div className='bg-orange-500/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-orange-400/50'>
            {isDragging ? '🤏 Dragging' : '⏸️ Paused'}
          </div>
        </div>
      )}

      <div className='absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20 z-20'>
        <div
          className='h-full bg-white transition-all duration-300 ease-linear'
          style={{
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
