import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import './globals.css';

import GTMScript from '@/components/GTMScript';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lead Management System - L0gik',
  description: 'Sistema de gestão de leads com rastreamento avançado',
  keywords: [
    'gestão de leads',
    'lead management',
    'captação de leads',
    'formulário de contato',
    'painel administrativo',
    'tracking de conversão',
    'google analytics',
    'crm leads',
    'sistema de leads',
    'logik',
  ],
  authors: [
    {
      name: 'PhelipeG',
      url: 'https://github.com/PhelipeG',
    },
  ],
  creator: 'PhelipeG',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Lead Management System - L0gik',
    description:
      'Sistema completo de gestão de leads com tracking avançado e painel administrativo profissional.',
    siteName: 'L0gik Lead Manager',
    images: [
      {
        url: '/screenshorts/painel-adminstrativo.png',
        width: 1200,
        height: 630,
        alt: 'Painel Administrativo do Sistema de Leads L0gik',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="pt-BR">
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', 'YOUR_PIXEL_ID');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${inter.className} bg-dark text-light`}
        suppressHydrationWarning={true}
      >
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Suspense fallback={null}>
          <GTMScript />
        </Suspense>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--color-dark-secondary)',
                color: 'var(--color-light)',
                border: '1px solid var(--color-primary)',
                borderRadius: '8px',
              },
              success: {
                style: {
                  color: 'var(--color-primary)',
                },
              },
              error: {
                style: {
                  color: '#ff4757',
                  border: '1px solid #ff4757',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
