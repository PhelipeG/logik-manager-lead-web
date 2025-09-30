'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  LeadHeader,
  LeadBasicInfo,
  LeadMessage,
  LeadTrackingData,
  LeadMetadata,
  LeadActions,
} from '@/components/lead-details';
import { LoadingSpinner, ErrorState } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useSingleLeadById } from '@/hooks';

export default function LeadDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;
  const { lead, loading, error, refetch } = useSingleLeadById(leadId);

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    }
  }, [user, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !lead) {
    return (
      <ErrorState
        title="Lead não encontrado"
        message={error || 'O lead solicitado não pôde ser carregado.'}
        onRetry={refetch}
        onBack={() => router.push('/admin/dashboard')}
      />
    );
  }

  return (
    <div className="bg-dark min-h-screen">
      <main className="container mx-auto px-4 py-4">
        <div className="mx-auto max-w-4xl">
          <div className="bg-dark-secondary border-secondary/20 overflow-hidden rounded-lg border shadow-lg">
            <LeadHeader lead={lead} />

            <div className="space-y-4 p-4">
              <LeadBasicInfo lead={lead} />

              <LeadMessage lead={lead} />

              <LeadTrackingData lead={lead} />

              <LeadMetadata lead={lead} />

              <LeadActions lead={lead} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
