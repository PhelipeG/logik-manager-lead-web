'use client';

import { useRouter } from 'next/navigation';
import { Lead } from '@/types';
import { useLeads } from '@/hooks';
import { Button } from '@/components/ui';
import { Edit, ArrowLeft, Trash2 } from 'lucide-react';

interface LeadActionsProps {
  lead: Lead;
}

export default function LeadActions({ lead }: LeadActionsProps) {
  const router = useRouter();
  const { deleteLead } = useLeads();

  const handleEdit = () => {
    router.push(`/admin/leads/${lead.id}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Tem certeza que deseja deletar o lead "${lead.name}"? Esta ação não pode ser desfeita.`
    );

    if (confirmed) {
      const success = await deleteLead(lead.id);
      if (success) {
        router.push('/admin/dashboard');
      }
    }
  };

  const handleBack = () => {
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleEdit}
        className="flex items-center justify-center gap-2"
      >
        <Edit size={20} />
        Editar Lead
      </Button>

      <Button
        variant="danger"
        size="lg"
        fullWidth
        onClick={handleDelete}
        className="flex items-center justify-center gap-2"
      >
        <Trash2 size={20} />
        Deletar Lead
      </Button>

      <Button
        variant="secondary"
        size="lg"
        fullWidth
        onClick={handleBack}
        className="flex items-center justify-center gap-2"
      >
        <ArrowLeft size={20} />
        Voltar
      </Button>
    </div>
  );
}
