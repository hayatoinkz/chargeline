import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

import './globals.css';

import React from 'react';
import AuthProvider from '@/hooks/auth/auth-provider';
import CarProvider from '@/hooks/car/car-provider';
import GoogleAuthProvider from '@/hooks/social-auth/google/google-auth-provider';

import { Toaster } from '@/components/ui/toaster';

const space = Space_Grotesk({ subsets: ['latin'], variable: '--display-font' });
const inter = Inter({ subsets: ['latin'], variable: '--body-font' });

export const metadata: Metadata = {
  title: 'ChargeLine - Potencialize seu Posto de Gasolina com Gestão Inteligente',
  description:
    'Explore novos patamares de eficiência com o ChargeLine, o software de gestão projetado para revolucionar postos de gasolina. Simplifique operações, otimize inventários e fortaleça o controle financeiro. Transforme desafios em oportunidades e leve seu posto a novos horizontes de sucesso com a inteligência e praticidade do ChargeLine.',
};

interface LayoutProps {
  auth: React.ReactNode;
  dashboard: React.ReactNode;
  children: React.ReactNode;
}

export default function RootLayout(props: Readonly<LayoutProps>) {
  return (
    <html lang="pt-br">
      <body className={`${space.variable} ${inter.variable}`}>
        <AuthProvider>
          <GoogleAuthProvider>
            <CarProvider>
              <main className="bg-background min-h-screen">{props.children}</main>
              <Toaster />
            </CarProvider>
          </GoogleAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
