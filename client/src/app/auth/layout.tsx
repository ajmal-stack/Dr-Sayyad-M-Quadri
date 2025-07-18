import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Dr. Syed M Quadri',
  description:
    "Sign in or create an account to access Dr. Syed M Quadri's platform",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='mt-16 auth-layout'>{children}</div>;
}
