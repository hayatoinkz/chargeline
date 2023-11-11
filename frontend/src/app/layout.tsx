import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/app/sidebar';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

const space = Space_Grotesk({ subsets: ['latin'], variable: '--display-font' });
const inter = Inter({ subsets: ['latin'], variable: '--body-font' });

export const metadata: Metadata = {
  title:
    'ChargeLine - Potencialize seu Posto de Gasolina com Gestão Inteligente"',
  description:
    'Explore novos patamares de eficiência com o ChargeLine, o software de gestão projetado para revolucionar postos de gasolina. Simplifique operações, otimize inventários e fortaleça o controle financeiro. Transforme desafios em oportunidades e leve seu posto a novos horizontes de sucesso com a inteligência e praticidade do ChargeLine.',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: Readonly<LayoutProps>) {
  return (
    <html lang="pt-br">
      <body className={`${space.variable} ${inter.variable}`}>
        <main className="min-h-screen">
          <div className="min-h-screen h-full">
            <div className="grid grid-cols-6 h-full">
              <Sidebar className="hidden lg:block border-r" />
              <div className="lg:ml-[275px] col-span-6">
                {props.children}
              </div>
            </div>
          </div>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
