'use client';

import { Search, Download } from 'lucide-react';
import { Button, Input } from '@/components/ui';

interface SearchAndActionsProps {
  search: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
}

export default function SearchAndActions({
  search,
  onSearchChange,
  onExport,
}: SearchAndActionsProps) {
  return (
    <div className="bg-dark-secondary border-secondary/20 mb-6 rounded-lg border p-4 shadow-lg">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="w-full flex-1 md:max-w-md">
          <Input
            variant="filled"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            leftIcon={<Search size={20} />}
            fullWidth
          />
        </div>
        <Button
          variant="primary"
          onClick={onExport}
          className="flex items-center gap-2"
        >
          <Download size={20} />
          Exportar CSV
        </Button>
      </div>
    </div>
  );
}
