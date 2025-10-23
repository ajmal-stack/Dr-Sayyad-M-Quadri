import { notFound } from 'next/navigation';
import { treatmentsApi } from '@/services/api/treatmentsApi';
import TreatmentDetailClient from './TreatmentDetailClient';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Get treatment by slug or ID from API
const getTreatmentFromAPI = async (identifier: string): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/treatments/${identifier}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching treatment from API:', error);
    return null;
  }
};

interface TreatmentDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TreatmentDetailPage({ params }: TreatmentDetailPageProps) {
  const { slug } = await params;
  
  // Fetch treatment from API
  const treatment = await getTreatmentFromAPI(slug);

  if (!treatment) {
    notFound();
  }

  return <TreatmentDetailClient treatment={treatment} />;
}
