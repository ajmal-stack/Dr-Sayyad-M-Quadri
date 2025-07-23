import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';

export const metadata: Metadata = {
  title: 'Dr. Syed M Quadri - Psychiatrist & Mental Health Specialist',
  description:
    'Professional psychiatric care, therapy sessions, and mental health guidance from Dr. Syed M Quadri',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        suppressHydrationWarning
        className={`antialiased min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-slate-800`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
