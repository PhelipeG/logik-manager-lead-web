'use client';

import { Tag } from 'lucide-react';

import { Lead } from '@/types';

interface LeadTrackingDataProps {
  lead: Lead;
}

export default function LeadTrackingData({ lead }: LeadTrackingDataProps) {
  const hasTrackingData =
    lead.utmSource ||
    lead.utmMedium ||
    lead.utmCampaign ||
    lead.utmTerm ||
    lead.utmContent ||
    lead.gclid ||
    lead.fbclid;

  if (!hasTrackingData) {
    return null;
  }

  const trackingFields = [
    { label: 'UTM Source', value: lead.utmSource },
    { label: 'UTM Medium', value: lead.utmMedium },
    { label: 'UTM Campaign', value: lead.utmCampaign },
    { label: 'UTM Term', value: lead.utmTerm },
    { label: 'UTM Content', value: lead.utmContent },
    { label: 'GCLID', value: lead.gclid },
    { label: 'FBCLID', value: lead.fbclid },
  ].filter(field => field.value);

  return (
    <section>
      <h2 className="text-light mb-4 flex items-center gap-2 text-xl font-semibold">
        <Tag className="h-5 w-5" />
        Dados de Tracking
      </h2>
      <div className="bg-secondary/20 border-primary/20 grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
        {trackingFields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-light/70 text-sm">{label}</p>
            <p
              className={`text-light font-medium ${label.includes('CLID') ? 'break-all' : ''}`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
