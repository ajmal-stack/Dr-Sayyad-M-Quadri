# Custom Button Component

A fully responsive, accessible button component that matches your navbar theme colors (`from-blue-500 to-indigo-600`) with multiple variants, sizes, and interactive states.

## Features

✅ **Theme Integration**: Matches navbar icon colors perfectly  
✅ **Fully Responsive**: Adapts to all screen sizes with mobile-first design  
✅ **Multiple Variants**: Primary, secondary, outline, ghost, success, warning, destructive  
✅ **Flexible Sizing**: From xs to xl, plus icon-only variants  
✅ **Interactive States**: Loading, disabled, hover, focus with smooth transitions  
✅ **Accessibility**: Proper ARIA labels, keyboard navigation, focus management  
✅ **Icon Support**: Left and right icons with proper spacing  
✅ **TypeScript**: Full type safety with variant props  

## Installation

The component uses these dependencies (already installed):
```bash
npm install class-variance-authority clsx tailwind-merge
```

## Basic Usage

```tsx
import { Button } from '@/components/ui/Button';
import { CalendarDaysIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Basic button
<Button>Click me</Button>

// Primary button with icons (matches navbar theme)
<Button 
  variant="primary" 
  leftIcon={<CalendarDaysIcon className="w-5 h-5" />}
  rightIcon={<ArrowRightIcon className="w-4 h-4" />}
>
  Book Consultation
</Button>

// Loading state
<Button variant="primary" loading>
  Processing...
</Button>

// Full width responsive
<Button variant="primary" fullWidth>
  Mobile-friendly Button
</Button>
```

## Variants

### Primary (Theme Colors)
Matches your navbar icon gradient: `from-blue-500 to-indigo-600`
```tsx
<Button variant="primary">Primary Action</Button>
```

### Secondary
Clean white background for alternative actions
```tsx
<Button variant="secondary">Secondary Action</Button>
```

### Outline
Transparent with theme-colored border
```tsx
<Button variant="outline">Outline Button</Button>
```

### Ghost
Minimal styling for subtle actions
```tsx
<Button variant="ghost">Ghost Button</Button>
```

### Success, Warning, Destructive
For specific action types
```tsx
<Button variant="success">Save Changes</Button>
<Button variant="warning">Warning Action</Button>
<Button variant="destructive">Delete Item</Button>
```

## Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

{/* Icon-only buttons */}
<Button size="icon"><PlusIcon className="w-5 h-5" /></Button>
<Button size="icon-sm"><HeartIcon className="w-4 h-4" /></Button>
<Button size="icon-lg"><SearchIcon className="w-6 h-6" /></Button>
```

## Responsive Design

The button component is built mobile-first and includes:

- **Touch-friendly**: Minimum 44px touch target
- **Flexible layouts**: Stack on mobile, row on desktop
- **Responsive sizing**: Different sizes for different breakpoints
- **Proper spacing**: Adequate gaps between buttons

```tsx
{/* Responsive layout */}
<div className="flex flex-col sm:flex-row gap-4">
  <Button variant="primary" fullWidth className="sm:flex-1">
    Mobile Stack 1
  </Button>
  <Button variant="secondary" fullWidth className="sm:flex-1">
    Mobile Stack 2
  </Button>
</div>

{/* Responsive sizing */}
<Button 
  variant="primary" 
  size="sm"
  className="sm:text-base sm:px-8 md:px-12"
>
  Responsive Size
</Button>
```

## Integration with Existing Components

### Replace CTA Buttons
```tsx
// Before (inline styles)
<button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
  Book Consultation
</button>

// After (using Button component)
<Button 
  variant="primary" 
  size="xl"
  leftIcon={<CalendarDaysIcon className="w-5 h-5" />}
>
  Book Consultation
</Button>
```

### Navbar-style Buttons
```tsx
<Button 
  variant="primary" 
  size="sm"
  leftIcon={
    <div className="p-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <BookOpenIcon className="w-4 h-4" />
    </div>
  }
>
  Books
</Button>
```

### Media Controls
```tsx
<div className="flex items-center gap-2">
  <Button variant="ghost" size="icon-sm">
    <HeartIcon className="w-4 h-4" />
  </Button>
  <Button variant="ghost" size="icon-sm">
    <BookmarkIcon className="w-4 h-4" />
  </Button>
  <Button variant="primary" size="sm">
    Watch Now
  </Button>
</div>
```

## Props API

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'destructive';
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with proper focus indicators
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Loading States**: Accessible loading indicators with proper announcements
- **Focus Management**: Clear focus rings that match your theme
- **Disabled States**: Proper disabled styling and behavior

## Theme Colors

The button component uses your existing theme colors:

- **Primary**: `from-blue-500 to-indigo-600` (matches navbar icons)
- **Hover**: `from-blue-600 to-indigo-700`
- **Focus**: `focus:ring-blue-500`
- **Background**: Consistent with your gradient backgrounds

## Examples

See the complete examples in:
- `ButtonExamples.tsx` - Comprehensive showcase of all variants
- `ButtonIntegration.tsx` - Real-world integration examples

## Best Practices

1. **Use primary for main CTAs** - Reserve for the most important actions
2. **Secondary for alternatives** - Use for less critical actions  
3. **Icons enhance UX** - Add relevant icons to improve clarity
4. **Loading states** - Always show loading for async operations
5. **Responsive design** - Test on mobile devices
6. **Accessibility** - Include proper labels and ARIA attributes

## Migration Guide

To replace existing buttons with the new component:

1. **Identify button patterns** in your existing code
2. **Map to appropriate variants** (primary, secondary, etc.)
3. **Update imports** to use the new Button component
4. **Test responsive behavior** on different screen sizes
5. **Verify accessibility** with screen readers and keyboard navigation

The component is designed to be a drop-in replacement for most existing button implementations while providing better consistency and accessibility.