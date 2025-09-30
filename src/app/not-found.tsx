'use client';

import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="bg-dark flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="bg-primary/10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full">
          <span className="text-primary text-6xl font-bold">404</span>
        </div>

        <h1 className="text-light mb-4 text-4xl font-bold">
          Página não encontrada
        </h1>

        <p className="text-light/70 mb-8 max-w-md text-lg">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              <Home size={20} />
              Página Inicial
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
