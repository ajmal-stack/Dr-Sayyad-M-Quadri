import type { Metadata } from 'next';
import './globals.css';
import ConditionalLayout from '@/components/ui/layout/ConditionalLayout';


export const metadata: Metadata = {
  title: 'Dr. Syed M Quadri - Psychiatrist & Mental Health Specialist',
  description:
    'Professional psychiatric care, therapy sessions, and mental health guidance from Dr. Syed M Quadri',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body suppressHydrationWarning>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
