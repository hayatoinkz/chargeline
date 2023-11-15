'use client';

import useCar from '@/hooks/car/user-car';
import { CAR_URL } from '@/services/api/car/config';
import { Car as CarType } from '@/services/api/car/types/car';
import { useFetch } from '@/services/fetcher';
import { PaginationType } from '@/services/types/pagination';
import { Car, GasStation, Pointer } from 'iconsax-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TabsContent } from '@/components/ui/tabs';

import { AddCarDialog } from '../AddCarDialog';
import EmptySlot from '../EmptySlot';
import RegisterForm from './Form';

export default function RegisterTab() {
  return (
    <TabsContent value="register" className="w-full space-y-6 border-none p-0 outline-none">
      <h2 className="font-display text-xl font-semibold tracking-tight">
        Registro de Abastecimento
      </h2>
      <Content />
    </TabsContent>
  );
}

function Content() {
  const { car } = useCar();
  const { data, error, mutate } = useFetch<PaginationType<CarType>>(CAR_URL);

  if (!data && !error) {
    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-6 w-56" />
          <div className="flex w-full flex-col gap-4 md:flex-row">
            {new Array(3).fill(1).map((_, index) => (
              <div
                key={index}
                className="flex w-full flex-col rounded-xl border border-zinc-200 bg-white"
              >
                <div className="flex cursor-pointer flex-col gap-6 p-6">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <div className="flex w-full items-center justify-between gap-8">
                    <div className="space-y-1">
                      <Skeleton className="h-8 w-28" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-16 w-16 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="inline-flex w-full items-end justify-between gap-8 text-clip border-b border-dashed border-zinc-200 py-6">
          <div className="space-y-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-7 w-56" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>
        <footer className="inline-flex w-full justify-end gap-2">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-24" />
        </footer>
      </div>
    );
  }

  if (error) {
    return (
      <EmptySlot
        icon={GasStation}
        title="Error ao carregar combustiveis"
        description="Tente novamente no botão abaixo."
      >
        <Button onClick={() => mutate()}>Tentar Novamente</Button>
      </EmptySlot>
    );
  }

  if (!car) {
    return (
      <EmptySlot
        icon={Pointer}
        title="Selecione um carro"
        description="Você precisa de um carro selecionado para fazer o registro."
      />
    );
  }

  if (data && data.data.length === 0) {
    return (
      <EmptySlot
        icon={Car}
        title="Sem carros na garagem"
        description="Você não possui nenhum carro registrado. Adicione um abaixo."
      >
        <AddCarDialog />
      </EmptySlot>
    );
  }

  return (
    <div className="space-y-2">
      <RegisterForm />
    </div>
  );
}
