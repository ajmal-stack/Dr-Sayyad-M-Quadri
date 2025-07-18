'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Routes where we don't want to show the main navbar
  const hideNavbarRoutes = ['/admin', '/user', '/auth'];

  // Check if current path starts with any of the hide routes
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Don't render navbar for admin, user, or auth pages
  if (shouldHideNavbar) {
    return null;
  }

  return <Navbar />;
}
