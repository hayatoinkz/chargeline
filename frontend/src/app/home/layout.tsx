import React from 'react';
import type { Metadata } from 'next';

import { Sidebar } from '@/app/home/components/Sidebar';

import Header from './components/Header';

export const metadata: Metadata = {
  title: 'ChargeLine - Potencialize seu Posto de Gasolina com Gestão Inteligente"',
  description:
    'Explore novos patamares de eficiência com o ChargeLine, o software de gestão projetado para revolucionar postos de gasolina. Simplifique operações, otimize inventários e fortaleça o controle financeiro. Transforme desafios em oportunidades e leve seu posto a novos horizontes de sucesso com a inteligência e praticidade do ChargeLine.',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout(props: Readonly<LayoutProps>) {
  return (
    <div className="h-full min-h-screen">
      <div className="grid h-full grid-cols-6">
        <Sidebar className="hidden border-r lg:block" />
        <div className="col-span-6 lg:ml-[275px]">
          <Header />
          {props.children}
        </div>
      </div>
    </div>
  );
}
