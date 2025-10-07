import type { Metadata } from 'next';
import MuiThemeProvider from '@/components/admin/MuiThemeProvider';
import AdminLayout from '@/components/admin/AdminLayout';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin Panel - Dr. Syed M Quadri',
  description: 'Administrative dashboard for managing content and users',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiThemeProvider>
      <AdminLayout>
        {children}
      </AdminLayout>
    </MuiThemeProvider>
  );
}
