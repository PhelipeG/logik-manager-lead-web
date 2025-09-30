import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { ApiError, ApiResponse, Lead, UseLeadsParams } from '@/types';

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as ApiError;
    return apiError.response?.data?.error || defaultMessage;
  }
  return defaultMessage;
};

interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  // Ações
  fetchLeads: () => Promise<void>;
  createLead: (
    leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<boolean>;
  updateLead: (id: string, leadData: Partial<Lead>) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;
  exportLeads: () => Promise<boolean>;
  // Controles de estado
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setLimit: (limit: number) => void;
}

export function useLeads(initialParams: UseLeadsParams = {}): UseLeadsReturn {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialParams.page || 1);
  const [limit, setLimit] = useState(initialParams.limit || 10);
  const [search, setSearch] = useState(initialParams.search || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const DELAY_FOR_DEBOUNCE = 500; // 500ms de delay
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  // Debounce para busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, DELAY_FOR_DEBOUNCE);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: Record<string, string | number> = {
        page,
        limit,
      };

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch;
      }
      const response = await api.get<ApiResponse>('/api/leads', {
        params,
      });
      if (response.data.success && response.data.data) {
        setLeads(response.data.data.leads);
        setPagination({
          page: response.data.data.page,
          limit: limit,
          total: response.data.data.total,
          pages: response.data.data.totalPages,
        });
      } else {
        throw new Error('Resposta da API inválida');
      }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erro ao carregar leads');
      setError(errorMessage);
      toast.error(errorMessage);

      setLeads([]);
      setPagination({
        page: 1,
        limit: 10,
        total: 0,
        pages: 1,
      });
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  const createLead = useCallback(
    async (
      leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<boolean> => {
      try {
        const response = await api.post<{ success: boolean; data: Lead }>(
          '/api/leads',
          leadData
        );

        if (response.data.success) {
          toast.success('Lead criado com sucesso!');
          await fetchLeads(); // Recarrega a lista
          return true;
        } else {
          throw new Error('Erro ao criar lead');
        }
      } catch (err: unknown) {
        const errorMessage = getErrorMessage(err, 'Erro ao criar lead');
        toast.error(errorMessage);
        return false;
      }
    },
    [fetchLeads]
  );

  const updateLead = useCallback(
    async (id: string, leadData: Partial<Lead>): Promise<boolean> => {
      try {
        const response = await api.put<{ success: boolean; data: Lead }>(
          `/api/leads/${id}`,
          leadData
        );

        if (response.data.success) {
          toast.success('Lead atualizado com sucesso!');
          await fetchLeads(); // Recarrega a lista
          return true;
        } else {
          throw new Error('Erro ao atualizar lead');
        }
      } catch (err: unknown) {
        const errorMessage = getErrorMessage(err, 'Erro ao atualizar lead');
        toast.error(errorMessage);
        return false;
      }
    },
    [fetchLeads]
  );

  const deleteLead = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const response = await api.delete<{ success: boolean }>(
          `/api/leads/${id}`
        );

        if (response.data.success) {
          toast.success('Lead deletado com sucesso!');
          await fetchLeads();
          return true;
        } else {
          throw new Error('Erro ao deletar lead');
        }
      } catch (err: unknown) {
        const errorMessage = getErrorMessage(err, 'Erro ao deletar lead');
        toast.error(errorMessage);
        return false;
      }
    },
    [fetchLeads]
  );

  const exportLeads = useCallback(async (): Promise<boolean> => {
    try {
      const response = await api.get('/api/leads/export/csv', {
        responseType: 'blob',
      });

      // Cria link para download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `leads_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Leads exportados com sucesso!');
      return true;
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erro ao exportar leads');
      toast.error(errorMessage);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handlers para controle de estado
  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSetSearch = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1); // Reset para primeira página ao buscar
  }, []);

  const handleSetLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset para primeira página ao mudar limite
  }, []);

  return {
    leads,
    loading,
    error,
    pagination,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    exportLeads,
    setPage: handleSetPage,
    setSearch: handleSetSearch,
    setLimit: handleSetLimit,
  };
}
