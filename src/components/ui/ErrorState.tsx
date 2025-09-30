'use client';

import { AlertTriangle, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function ErrorState({
  title = 'Ops! Algo deu errado',
  message = 'Não foi possível carregar os dados solicitados.',
  onRetry,
  onBack,
  showBackButton = true,
}: ErrorStateProps) {
  return (
    <div className="bg-dark flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md p-6 text-center">
        <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-400" />

        <h1 className="text-light mb-2 text-2xl font-bold">{title}</h1>

        <p className="text-light/70 mb-6">{message}</p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {onRetry && (
            <Button variant="primary" onClick={onRetry}>
              Tentar Novamente
            </Button>
          )}

          {showBackButton && (
            <Button
              variant="secondary"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Voltar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
