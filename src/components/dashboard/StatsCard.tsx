'use client';

import { UserPlus } from 'lucide-react';

interface StatsCardProps {
  totalLeads: number;
}

export default function StatsCard({ totalLeads }: StatsCardProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="bg-dark-secondary border-secondary/20 rounded-lg border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-light/70 text-sm">Total de Leads</p>
            <p className="text-light text-3xl font-bold">{totalLeads}</p>
          </div>
          <UserPlus className="text-primary h-12 w-12 opacity-20" />
        </div>
      </div>
    </div>
  );
}
