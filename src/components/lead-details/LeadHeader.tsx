'use client';

import { Lead } from '@/types';

interface LeadHeaderProps {
  lead: Lead;
}

export default function LeadHeader({ lead }: LeadHeaderProps) {
  return (
    <div className="bg-secondary px-6 py-8">
      <h1 className="text-light mb-2 text-3xl font-bold">{lead.name}</h1>
      <p className="text-light/70">Lead ID: {lead.id}</p>
    </div>
  );
}
