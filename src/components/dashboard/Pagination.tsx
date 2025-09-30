'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface PaginationProps {
  pagination: PaginationData;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * pagination.limit + 1;
  const endItem = Math.min(currentPage * pagination.limit, pagination.total);

  return (
    <div className="bg-dark-secondary border-secondary/20 flex items-center justify-between rounded-lg border px-6 py-4 shadow-lg">
      <div className="text-light/70 text-sm">
        Mostrando {startItem} a {endItem} de {pagination.total} resultados
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-light hover:text-primary disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </Button>
        <span className="text-light/70 mx-4 text-sm">
          Página {currentPage} de {pagination.pages}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pagination.pages}
          className="text-light hover:text-primary disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}
