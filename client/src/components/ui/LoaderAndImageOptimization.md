# Loader & Image Optimization Components

Complete loading states and optimized image components for better performance and user experience.

## 🚀 Features Added

✅ **Multiple Loader Variants**: Spinner, dots, pulse, bars, ring, skeleton  
✅ **Image Optimization**: Next.js Image integration with smart loading  
✅ **Loading States**: Page, content, and component-level loaders  
✅ **Performance**: Lazy loading, priority loading, blur placeholders  
✅ **Error Handling**: Fallback images and graceful error states  
✅ **Accessibility**: Proper ARIA labels and screen reader support  
✅ **TypeScript**: Full type safety with intelligent autocomplete  

## 📁 Components Created

### 1. **Loader.tsx** - Loading States
- `Loader` - Main loader component with variants
- `PageLoader` - Full-screen overlay loader
- `ContentLoader` - Section-specific loader
- `SkeletonLoader` - Content placeholder loader
- `ImageLoader` - Image placeholder loader

### 2. **OptimizedImage.tsx** - Image Optimization
- `OptimizedImage` - Base optimized image component
- `BannerImage` - High-priority banner images
- `GalleryImage` - Lazy-loaded gallery images
- `AvatarImage` - Profile/avatar images

### 3. **LoaderExamples.tsx** - Complete showcase
- All loader variants and sizes
- Image optimization examples
- Performance demonstrations

## 🎯 Usage Examples

### Basic Loaders

```tsx
import { Loader, ContentLoader, PageLoader } from '@/components/ui/Loader';

// Spinner loader
<Loader variant="spinner" size="lg" color="primary" />

// Dots loader
<Loader variant="dots" size="default" color="secondary" />

// Content section loader
<ContentLoader 
  variant="spinner" 
  size="xl" 
  message="Loading content..." 
/>

// Full page loader
<PageLoader 
  variant="dots" 
  message="Loading application..." 
/>
```

### Optimized Images

```tsx
import { BannerImage, GalleryImage, AvatarImage } from '@/components/ui/OptimizedImage';

// Banner image (high priority)
<BannerImage
  src="/hero-banner.jpg"
  alt="Hero Banner"
  fill
  priority={true}
  overlay={true}
  overlayClassName="bg-black/30"
/>

// Gallery image (lazy loaded)
<GalleryImage
  src="/gallery-image.jpg"
  alt="Gallery Item"
  width={400}
  height={300}
  onLoadComplete={() => console.log('Loaded!')}
/>

// Avatar image
<AvatarImage
  src="/profile.jpg"
  alt="User Avatar"
  size="lg"
/>
```

### Skeleton Loaders

```tsx
import { SkeletonLoader } from '@/components/ui/Loader';

// Card skeleton
<div className="space-y-3">
  <SkeletonLoader className="h-4 w-3/4" />
  <SkeletonLoader className="h-3 w-1/2" />
  <SkeletonLoader className="h-3 w-2/3" />
</div>

// Profile skeleton
<div className="flex items-center space-x-3">
  <SkeletonLoader className="w-12 h-12 rounded-full" />
  <div className="space-y-2">
    <SkeletonLoader className="h-3 w-24" />
    <SkeletonLoader className="h-2 w-16" />
  </div>
</div>
```

## 🔧 Integration Examples

### Hero Component (Updated)
```tsx
// Before: Basic Image with no loading state
<Image src={slide.backgroundImage} alt="Hero" fill />

// After: Optimized with loading state
<BannerImage
  src={slide.backgroundImage}
  alt={`Hero banner ${slide.id}`}
  fill
  priority={index <= 1}
  quality={95}
  onLoadComplete={handleImageLoad}
  showLoader={false}
/>
```

### MediaContent Component (Updated)
```tsx
// Before: Basic Image
<Image src={book.image} alt={book.title} fill />

// After: Optimized Gallery Image
<GalleryImage
  src={book.image}
  alt={book.title}
  fill
  onLoadComplete={handleImageLoad}
  priority={index === 0}
/>
```

### Podcast Page (Updated)
```tsx
// Before: Basic img tag
<img src="/banner/Podcast Banner 2.png" alt="Podcast Banner" />

// After: Optimized Banner
<BannerImage
  src="/banner/Podcast Banner 2.png"
  alt="Podcast Banner"
  fill
  priority={true}
  overlay={true}
  overlayClassName="bg-black/25"
/>
```

## 📊 Performance Improvements

### Loading States
- **Perceived Performance**: Users see immediate feedback
- **Better UX**: Clear indication of loading progress
- **Reduced Bounce**: Users wait longer with visual feedback
- **Accessibility**: Screen readers announce loading states

### Image Optimization
- **Faster LCP**: Priority loading for above-fold images
- **Reduced Bandwidth**: Optimized quality and format
- **Better Mobile**: Responsive images with proper sizes
- **Graceful Degradation**: Fallback images for errors
- **Smooth Loading**: Blur placeholders prevent layout shift

## 🎨 Loader Variants

### Spinner
```tsx
<Loader variant="spinner" size="lg" color="primary" />
```
Classic rotating circle loader

### Dots
```tsx
<Loader variant="dots" size="default" color="primary" />
```
Three bouncing dots animation

### Pulse
```tsx
<Loader variant="pulse" size="lg" color="secondary" />
```
Pulsing circle animation

### Bars
```tsx
<Loader variant="bars" size="default" color="primary" />
```
Animated vertical bars

### Ring
```tsx
<Loader variant="ring" size="xl" color="primary" />
```
Rotating ring with gradient

## 🖼️ Image Types

### BannerImage
- **Use for**: Hero sections, headers, featured images
- **Features**: High priority, overlay support, quality 95%
- **Loading**: Immediate with blur placeholder

### GalleryImage
- **Use for**: Content galleries, thumbnails, media grids
- **Features**: Lazy loading, quality 85%, error handling
- **Loading**: On-demand as user scrolls

### AvatarImage
- **Use for**: Profile pictures, user avatars
- **Features**: Circular cropping, multiple sizes
- **Loading**: Optimized for small sizes

## 🔥 Advanced Features

### Smart Loading Strategy
```tsx
// Priority for above-fold images
<BannerImage priority={true} />

// Lazy loading for below-fold
<GalleryImage loading="lazy" />

// Preload critical images
<OptimizedImage 
  priority={index <= 2} 
  quality={index === 0 ? 95 : 85}
/>
```

### Error Handling
```tsx
<OptimizedImage
  src="/primary-image.jpg"
  fallbackSrc="/fallback-image.jpg"
  onError={() => console.log('Image failed to load')}
  onLoadComplete={() => console.log('Image loaded successfully')}
/>
```

### Loading State Management
```tsx
const [isLoading, setIsLoading] = useState(true);

// Show loader while content loads
{isLoading && (
  <ContentLoader 
    variant="dots" 
    message="Loading content..." 
  />
)}

// Hide loader when images are ready
<GalleryImage
  onLoadComplete={() => setIsLoading(false)}
/>
```

## 📱 Responsive Behavior

### Adaptive Loading
- **Mobile**: Lower quality, smaller sizes
- **Desktop**: Higher quality, larger sizes
- **Retina**: Automatic density optimization

### Touch-Friendly
- **Loading States**: Large enough for touch
- **Error Messages**: Clear and readable
- **Accessibility**: Proper contrast and sizing

## 🔧 Configuration

### Global Defaults
```tsx
// Default blur placeholder
const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQ...";

// Quality settings
const bannerQuality = 95;  // High quality for banners
const galleryQuality = 85; // Optimized for galleries
const avatarQuality = 90;  // Good quality for avatars
```

### Customization
```tsx
// Custom loader colors
<Loader color="current" className="text-red-500" />

// Custom image placeholder
<OptimizedImage 
  blurDataURL="your-custom-placeholder"
  placeholder="blur"
/>
```

## 🚀 Migration Guide

### From Basic Images
1. **Replace `<img>` tags** with `<OptimizedImage>`
2. **Add loading states** with appropriate loaders
3. **Set priorities** for above-fold images
4. **Add fallbacks** for error handling

### From Next.js Image
1. **Wrap with optimization components** (BannerImage, GalleryImage)
2. **Add loading callbacks** for state management
3. **Configure blur placeholders** for smooth loading

## 📈 Metrics to Track

### Performance
- **Largest Contentful Paint (LCP)**: Should improve with priority loading
- **Cumulative Layout Shift (CLS)**: Reduced with proper placeholders
- **Time to Interactive (TTI)**: Better with progressive loading

### User Experience
- **Bounce Rate**: Should decrease with better loading states
- **Time on Page**: May increase with smoother experience
- **User Engagement**: Better with visual feedback

## 🎯 Best Practices

1. **Use appropriate variants** for different contexts
2. **Set priorities correctly** for above-fold content
3. **Provide meaningful messages** in loading states
4. **Test on slow connections** to verify experience
5. **Monitor performance metrics** to track improvements

The components are now production-ready and provide significant performance and UX improvements! 🚀