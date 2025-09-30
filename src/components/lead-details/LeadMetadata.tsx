'use client';

import { formatDateTime } from '@/lib/utils';
import { Lead } from '@/types';

interface LeadMetadataProps {
  lead: Lead;
}

export default function LeadMetadata({ lead }: LeadMetadataProps) {
  return (
    <section className="border-secondary/20 border-t pt-6">
      <h3 className="text-light mb-4 text-lg font-semibold">Metadados</h3>
      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <div>
          <p className="text-light/70">Criado em</p>
          <p className="text-light font-medium">
            {lead?.createdAt ? formatDateTime(lead.createdAt) : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-light/70">Atualizado em</p>
          <p className="text-light font-medium">
            {lead?.updatedAt ? formatDateTime(lead.updatedAt) : 'N/A'}
          </p>
        </div>
      </div>
    </section>
  );
}
