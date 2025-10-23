import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Medical and Health Websites
      {
        protocol: 'https',
        hostname: 'www.nimh.nih.gov',
      },
      {
        protocol: 'https',
        hostname: 'nimh.nih.gov',
      },
      {
        protocol: 'https',
        hostname: 'www.nih.gov',
      },
      {
        protocol: 'https',
        hostname: 'nih.gov',
      },
      {
        protocol: 'https',
        hostname: 'www.cdc.gov',
      },
      {
        protocol: 'https',
        hostname: 'cdc.gov',
      },
      {
        protocol: 'https',
        hostname: 'www.who.int',
      },
      {
        protocol: 'https',
        hostname: 'who.int',
      },
      {
        protocol: 'https',
        hostname: 'www.mayoclinic.org',
      },
      {
        protocol: 'https',
        hostname: 'mayoclinic.org',
      },
      {
        protocol: 'https',
        hostname: 'www.webmd.com',
      },
      {
        protocol: 'https',
        hostname: 'webmd.com',
      },
      {
        protocol: 'https',
        hostname: 'medlineplus.gov',
      },
      {
        protocol: 'https',
        hostname: 'www.medlineplus.gov',
      },
      // Placeholder images
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
