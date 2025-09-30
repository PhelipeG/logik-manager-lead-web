import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { Lead } from '@/types';

interface UseSingleLeadReturn {
  lead: Lead | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSingleLeadById(id: string | string[]): UseSingleLeadReturn {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeadById = useCallback(async () => {
    if (!id || Array.isArray(id)) {
      setError('ID inválido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api.get<{ success: boolean; data: Lead }>(
        `/api/leads/${id}`
      );

      if (response.data.success && response.data.data) {
        setLead(response.data.data);
      } else {
        throw new Error('Lead não encontrado');
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar lead';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLeadById();
  }, [fetchLeadById]);

  return {
    lead,
    loading,
    error,
    refetch: fetchLeadById,
  };
}
