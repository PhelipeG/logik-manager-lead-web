'use client';

import { Lead } from '@/types';
import { MessageSquare } from 'lucide-react';

interface LeadMessageProps {
  lead: Lead;
}

export default function LeadMessage({ lead }: LeadMessageProps) {
  return (
    <section>
      <div className="flex items-start gap-3">
        <MessageSquare className="text-primary mt-1 h-5 w-5" />
        <div className="flex-1">
          <p className="text-light/70 mb-2 text-sm">Mensagem</p>
          <div className="text-light bg-dark border-secondary/20 rounded-lg border p-4">
            {lead.message}
          </div>
        </div>
      </div>
    </section>
  );
}
