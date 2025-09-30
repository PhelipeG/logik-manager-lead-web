'use client';

import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui';

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export default function DashboardHeader({
  userName,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="bg-dark-secondary border-b border-green-500/50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-light text-2xl font-bold">
              Painel Administrativo
            </h1>
            <p className="text-light/70 text-sm">Bem-vindo, {userName}</p>
            <span>Vamos gerenciar seus leads!</span>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-light hover:text-primary"
          >
            <LogOut size={20} />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
