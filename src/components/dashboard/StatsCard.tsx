'use client';

import { UserPlus, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  totalLeads: number;
}

export default function StatsCard({ totalLeads }: StatsCardProps) {
  const conversionRate =
    totalLeads > 0 ? Math.min(85, 15 + Math.floor(totalLeads / 5) * 3) : 0;

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="bg-dark-secondary border-secondary/20 rounded-lg border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-light/70 text-sm">Total de Leads</p>
            <p className="text-light text-3xl font-bold">{totalLeads}</p>
          </div>
          <UserPlus className="text-primary-dark h-12 w-12" />
        </div>
      </div>

      <div className="bg-dark-secondary border-secondary/20 rounded-lg border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-light/70 text-sm">Taxa de Conversão</p>
            <p className="text-light text-3xl font-bold">{conversionRate}%</p>
          </div>
          <TrendingUp className="text-primary-dark h-12 w-12" />
        </div>
      </div>
    </div>
  );
}
