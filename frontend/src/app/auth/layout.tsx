import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Autenticação',
  description:
    'Explore novos patamares de eficiência com o ChargeLine, o software de gestão projetado para revolucionar postos de gasolina. Simplifique operações, otimize inventários e fortaleça o controle financeiro. Transforme desafios em oportunidades e leve seu posto a novos horizontes de sucesso com a inteligência e praticidade do ChargeLine.',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: Readonly<LayoutProps>) {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Image
        className="absolute left-8 top-5 md:hidden"
        src="/assets/img/logo.svg"
        alt="ChargeLine Logo"
        width={128}
        height={16}
        priority
      />
      <Link
        href="/auth/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Login
      </Link>
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-black" />
        <Image
          className="relative invert dark:invert-0"
          src="/assets/img/logo.svg"
          alt="ChargeLine Logo"
          width={150}
          height={36}
          priority
        />
      </div>
      <div className="flex w-full lg:p-8">{props.children}</div>
    </div>
  );
}
