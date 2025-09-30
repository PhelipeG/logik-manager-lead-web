import LeadForm from '@/components/forms/LeadForm';
import { Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <main className="bg-background-dark flex min-h-screen items-center justify-center">
      <div className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
            <div className="mb-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Briefcase className="text-primary h-8 w-8" />
              </div>
              <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Entre em Contato
              </h1>
              <p className="text-lg text-gray-600">
                Preencha o formulário abaixo e nossa equipe entrará em contato
                com você em breve.
              </p>
            </div>
            <LeadForm />
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-center text-sm text-gray-500">
                Ao enviar este formulário, você concorda com nossa política de
                privacidade e termos de uso.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-light text-sm">
              Já tem uma conta?{' '}
              <a
                href="/admin/login"
                className="text-primary-dark hover:text-primary-dark font-medium"
              >
                Faça login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
