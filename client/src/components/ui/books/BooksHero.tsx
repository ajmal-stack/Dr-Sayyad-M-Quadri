'use client';

import Image from 'next/image';

interface BooksHeroProps {
  className?: string;
}

export default function BooksHero({ className = '' }: BooksHeroProps) {
  return (
    <section className={`relative overflow-hidden w-full ${className}`}>
      {/* Responsive height classes with better mobile optimization */}
      <div className="
        h-[140px] 
        xs:h-[160px] 
        sm:h-[200px] 
        md:h-[280px] 
        lg:h-[360px] 
        xl:h-[400px] 
        2xl:h-[440px]
        relative
      ">
        {/* Background Image with optimized loading */}
        <Image
          src='/banner/books banner1.jpg'
          alt='Books Banner' 
          fill
          className='object-cover object-center'
          priority={true}
          quality={95}
          sizes='
            (max-width: 475px) 100vw,
            (max-width: 640px) 100vw,
            (max-width: 768px) 100vw,
            (max-width: 1024px) 100vw,
            100vw
          '
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Optional overlay text */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white drop-shadow-lg">
            <h1 className="
              text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              font-bold mb-2 sm:mb-4
            ">
              Books & Audiobooks
            </h1>
            <p className="
              text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl 
              opacity-90 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4
            ">
              Discover Dr. Syed M Quadri's collection of transformative literature
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
