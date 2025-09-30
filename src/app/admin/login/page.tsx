'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Input } from '@/components/ui';
import { LogIn, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
    } catch {
      // Error handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-dark flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <LogIn className="text-primary h-8 w-8" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Área Administrativa
            </h1>
            <p className="text-gray-600">Faça login para acessar o painel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="seu@email.com"
              leftIcon={<Mail size={16} />}
              error={errors.email?.message}
              fullWidth
            />

            <Input
              {...register('password')}
              type="password"
              label="Senha"
              placeholder="••••••••"
              leftIcon={<Lock size={16} />}
              error={errors.password?.message}
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Credenciais padrão: admin@logik.com / admin123
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="hover:text-primary text-sm text-gray-400">
            ← Voltar para o formulário público
          </Link>
        </div>
      </div>
    </div>
  );
}
