'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLeads } from '@/hooks';
import {
  DashboardHeader,
  StatsCard,
  SearchAndActions,
  LeadsTable,
  Pagination,
} from '@/components/dashboard';

export default function DashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const {
    leads,
    loading,
    pagination,
    deleteLead,
    exportLeads,
    setPage,
    setSearch,
  } = useLeads();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este lead?')) return;
    await deleteLead(id);
  };

  const handleExport = async () => {
    await exportLeads();
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/leads/${id}/edit`);
  };

  const handleView = (id: string) => {
    router.push(`/admin/leads/${id}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSearch(value);
  };

  if (authLoading || !user) {
    return (
      <div className="bg-dark flex min-h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader userName={user.email || 'Admin'} onLogout={logout} />

      <main className="container mx-auto px-4 py-8">
        <StatsCard totalLeads={pagination.total} />

        <SearchAndActions
          search={searchValue}
          onSearchChange={handleSearchChange}
          onExport={handleExport}
        />

        <LeadsTable
          leads={leads}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination
          pagination={pagination}
          currentPage={pagination.page}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
