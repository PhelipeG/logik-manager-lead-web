'use client';

import { Eye, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { formatDateTime } from '@/lib/utils';
import { Lead } from '@/types';

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function LeadsTable({
  leads,
  loading,
  onView,
  onEdit,
  onDelete,
}: LeadsTableProps) {
  if (loading) {
    return (
      <div className="bg-dark-secondary border-secondary/20 rounded-lg border p-8 text-center shadow-lg">
        <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
        <p className="text-light/70 mt-4">Carregando leads...</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-dark-secondary border-secondary/20 rounded-lg border p-8 text-center shadow-lg">
        <p className="text-light/70">Nenhum lead encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-secondary border-secondary/20 overflow-hidden rounded-lg border shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary border-secondary/20 border-b">
            <tr>
              <th className="text-light px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Nome
              </th>
              <th className="text-light px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Email
              </th>
              <th className="text-light px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Telefone
              </th>
              <th className="text-light px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Cargo
              </th>
              <th className="text-light px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Aniversario
              </th>
              <th className="text-light px-6 py-3 text-right text-xs font-medium tracking-wider uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-secondary/20 divide-y">
            {leads.map(lead => (
              <tr
                key={lead.id}
                className="hover:bg-secondary/10 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-light text-sm font-medium">
                    {lead.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-light/70 text-sm">{lead.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-light/70 text-sm">{lead.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-light/70 text-sm">{lead.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-light/70 text-sm">
                    {lead.birthDate ? formatDateTime(lead.birthDate) : '-'}
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(lead.id)}
                      className="text-blue-400 hover:text-blue-300"
                      title="Visualizar"
                    >
                      <Eye size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(lead.id)}
                      className="text-yellow-400 hover:text-yellow-300"
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(lead.id)}
                      className="text-red-400 hover:text-red-300"
                      title="Deletar"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
