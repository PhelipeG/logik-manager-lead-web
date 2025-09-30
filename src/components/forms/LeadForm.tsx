'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Send,
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input } from '@/components/ui';
import { useLeads } from '@/hooks';
import { formatPhone, captureUTMParams } from '@/lib/utils';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido'),
  position: z.string().min(2, 'Cargo deve ter pelo menos 2 caracteres'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type LeadFormData = z.infer<typeof leadSchema>;

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const { createLead } = useLeads();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const phoneValue = watch('phone');

  // Tracking de início de formulário
  useEffect(() => {
    const handleFormInteraction = () => {
      if (!formStarted) {
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'form_start',
            form_name: 'lead_contact_form',
            timestamp: new Date().toISOString(),
          });
        }
        setFormStarted(true);
      }
    };

    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.addEventListener('focusin', handleFormInteraction);
      return () =>
        formElement.removeEventListener('focusin', handleFormInteraction);
    }
  }, [formStarted]);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const utmParams = captureUTMParams();

      const leadData = {
        ...data,
        ...utmParams,
      };
      const success = await createLead(leadData);

      if (success) {
        // Enhanced GTM tracking
        if (typeof window !== 'undefined' && window.dataLayer) {
          const [firstName, ...lastNameParts] = data.name.split(' ');
          const lastName = lastNameParts.join(' ');

          // GA4 Enhanced Conversions
          window.dataLayer.push({
            event: 'generate_lead',
            currency: 'BRL',
            value: 100.0,
            lead_type: 'contact_form',
            user_data: {
              email: data.email,
              phone_number: data.phone.replace(/\D/g, ''),
              first_name: firstName,
              last_name: lastName,
            },
            lead_details: {
              position: data.position,
              message_length: data.message.length,
              timestamp: new Date().toISOString(),
            },
            // UTM data
            campaign_source: utmParams.utmSource,
            campaign_medium: utmParams.utmMedium,
            campaign_name: utmParams.utmCampaign,
            gclid: utmParams.gclid,
            fbclid: utmParams.fbclid,
          });

          // Meta Pixel Lead
          window.dataLayer.push({
            event: 'meta_lead',
            event_name: 'Lead',
            value: 100.0,
            currency: 'BRL',
            user_data: {
              em: data.email,
              ph: data.phone.replace(/\D/g, ''),
              fn: firstName,
              ln: lastName,
            },
          });
        }

        reset();
        setFormStarted(false);
      }
    } catch (error: unknown) {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_error',
          form_name: 'lead_contact_form',
          error_message: (error as Error).message || 'Erro desconhecido',
          timestamp: new Date().toISOString(),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted);
  };

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3"
    >
      <Input
        {...register('name')}
        type="text"
        label="Nome Completo *"
        placeholder="Seu nome completo"
        leftIcon={<User size={16} />}
        error={errors.name?.message}
        fullWidth
      />

      <Input
        {...register('email')}
        type="email"
        label="Email *"
        placeholder="seu@email.com"
        leftIcon={<Mail size={16} />}
        error={errors.email?.message}
        fullWidth
      />

      <Input
        {...register('phone')}
        type="tel"
        label="Telefone *"
        placeholder="(11) 99999-9999"
        leftIcon={<Phone size={16} />}
        error={errors.phone?.message}
        onChange={handlePhoneChange}
        value={phoneValue || ''}
        maxLength={15}
        fullWidth
      />

      <Input
        {...register('position')}
        type="text"
        label="Cargo *"
        placeholder="Seu cargo atual"
        leftIcon={<Briefcase size={16} />}
        error={errors.position?.message}
        fullWidth
      />

      <Input
        {...register('birthDate')}
        type="date"
        label="Data de Nascimento *"
        leftIcon={<Calendar size={16} />}
        error={errors.birthDate?.message}
        fullWidth
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          <MessageSquare size={16} className="mr-2 inline" />
          Mensagem *
        </label>
        <textarea
          {...register('message')}
          rows={3}
          className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:ring-2 focus:outline-none"
          placeholder="Conte-nos mais sobre seu interesse..."
        />
        {errors.message && (
          <span className="mt-1 block text-sm text-red-600">
            {errors.message.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isSubmitting}
        fullWidth
        className="mt-4"
      >
        <Send size={20} className="mr-2" />
        {isSubmitting ? 'Enviando...' : 'Enviar Formulário'}
      </Button>
    </form>
  );
}
