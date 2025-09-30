'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Save,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ErrorState, Input, LoadingSpinner } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useLeads, useSingleLeadById } from '@/hooks';
import { formatPhone } from '@/lib/utils';

const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido'),
  position: z.string().min(2, 'Cargo deve ter pelo menos 2 caracteres'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function EditLeadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;
  const { updateLead } = useLeads();
  const { lead, loading, error, refetch } = useSingleLeadById(leadId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const phoneValue = watch('phone');

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    if (error) {
      router.push('/admin/dashboard');
      return;
    }

    if (lead) {
      const date = new Date(lead.birthDate);
      const formattedDate = date.toISOString().split('T')[0];

      setValue('name', lead.name);
      setValue('email', lead.email);
      setValue('phone', lead.phone);
      setValue('position', lead.position);
      setValue('birthDate', formattedDate);
      setValue('message', lead.message);
    }
  }, [user, lead, error, setValue, router]);

  const onSubmit = async (data: LeadFormData) => {
    if (!leadId) return;

    setIsSubmitting(true);

    try {
      const success = await updateLead(leadId, data);
      if (success) {
        router.push(`/admin/leads/${leadId}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !lead) {
    return (
      <ErrorState
        title="Lead não encontrado"
        message={error || 'O lead solicitado não pôde ser carregado.'}
        onRetry={refetch}
        onBack={() => router.push('/admin/dashboard')}
      />
    );
  }

  return (
    <div className="bg-dark min-h-screen">
      <main className="container mx-auto px-4 py-4">
        <div className="mx-auto max-w-2xl">
          <div className="bg-dark-secondary border-secondary/20 rounded-lg border p-4 shadow-lg">
            <h1 className="text-light mb-4 text-2xl font-bold">Editar Lead</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('name')}
                label="Nome Completo *"
                type="text"
                leftIcon={<User size={16} />}
                error={errors.name?.message}
                variant="filled"
                fullWidth
              />

              <Input
                {...register('email')}
                label="Email *"
                type="email"
                leftIcon={<Mail size={16} />}
                error={errors.email?.message}
                variant="filled"
                fullWidth
              />

              <Input
                {...register('phone')}
                label="Telefone *"
                type="tel"
                leftIcon={<Phone size={16} />}
                onChange={handlePhoneChange}
                value={phoneValue || ''}
                error={errors.phone?.message}
                variant="filled"
                fullWidth
                maxLength={15}
              />

              <Input
                {...register('position')}
                label="Cargo *"
                type="text"
                leftIcon={<Briefcase size={16} />}
                error={errors.position?.message}
                variant="filled"
                fullWidth
              />

              <Input
                {...register('birthDate')}
                label="Data de Nascimento *"
                type="date"
                leftIcon={<Calendar size={16} />}
                error={errors.birthDate?.message}
                variant="filled"
                fullWidth
              />

              <div className="space-y-2">
                <label className="text-light block text-sm font-medium">
                  Mensagem *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <MessageSquare size={16} className="text-light/60" />
                  </div>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="bg-dark border-secondary/30 text-light placeholder-light/40 focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border py-3 pr-4 pl-10 transition-colors focus:ring-2 focus:outline-none"
                    placeholder="Digite sua mensagem..."
                  />
                </div>
                {errors.message && (
                  <p className="text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <Save size={20} />
                  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={() => router.push(`/admin/dashboard`)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
