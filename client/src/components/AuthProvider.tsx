'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  permissions: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canManageUsers: boolean;
    canManageRoles: boolean;
    canAccessAnalytics: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!user && !!token;

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/user'];
  const adminRoutes = ['/admin'];
  const authRoutes = ['/auth/login', '/auth/register'];

  useEffect(() => {
    // Check for existing auth data on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Handle route protection
    if (!isLoading) {
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );
      const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route)
      );
      const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (isProtectedRoute && !isAuthenticated) {
        // Redirect to login if trying to access protected route without auth
        router.push('/auth/login');
      } else if (
        isAdminRoute &&
        isAuthenticated &&
        user?.role !== 'Admin' &&
        user?.role !== 'SuperAdmin'
      ) {
        // Redirect to user dashboard if not admin trying to access admin route
        router.push('/user');
      } else if (isAuthRoute && isAuthenticated) {
        // Redirect authenticated users away from auth pages
        if (user?.role === 'Admin' || user?.role === 'SuperAdmin') {
          router.push('/admin');
        } else {
          router.push('/user');
        }
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    // Redirect based on role
    if (newUser.role === 'Admin' || newUser.role === 'SuperAdmin') {
      router.push('/admin');
    } else {
      router.push('/user');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
