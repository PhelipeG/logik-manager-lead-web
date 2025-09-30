'use client';

import { Mail, Phone, Briefcase, Calendar } from 'lucide-react';

import { formatDate } from '@/lib/utils';
import { Lead } from '@/types';

interface LeadBasicInfoProps {
  lead: Lead;
}

export default function LeadBasicInfo({ lead }: LeadBasicInfoProps) {
  return (
    <section>
      <h2 className="text-light mb-4 text-xl font-semibold">
        Informações Básicas
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <Mail className="text-primary mt-1 h-5 w-5" />
          <div>
            <p className="text-light/70 text-sm">Email</p>
            <p className="text-light font-medium">{lead.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="text-primary mt-1 h-5 w-5" />
          <div>
            <p className="text-light/70 text-sm">Telefone</p>
            <p className="text-light font-medium">{lead.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Briefcase className="text-primary mt-1 h-5 w-5" />
          <div>
            <p className="text-light/70 text-sm">Cargo</p>
            <p className="text-light font-medium">{lead.position}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="text-primary mt-1 h-5 w-5" />
          <div>
            <p className="text-light/70 text-sm">Data de Nascimento</p>
            <p className="text-light font-medium">
              {formatDate(lead.birthDate)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
