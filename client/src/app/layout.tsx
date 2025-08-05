import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';


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
      <body suppressHydrationWarning >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
