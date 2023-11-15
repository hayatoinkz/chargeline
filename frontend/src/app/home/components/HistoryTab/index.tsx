'use client';

import { useEffect } from 'react';
import useCar from '@/hooks/car/user-car';
import { Car } from '@/services/api/car/types/car';
import { FUEL_SUPPLY_URL } from '@/services/api/fuel-supply/config';
import { FuelSupply } from '@/services/api/fuel-supply/types/fuel-supply';
import { useFetch } from '@/services/fetcher';
import { PaginationType } from '@/services/types/pagination';
import { SortEnum } from '@/services/types/sort';
import { GasStation, Pointer } from 'iconsax-react';
import { KeyedMutator } from 'swr';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TabsContent } from '@/components/ui/tabs';

import EmptySlot from '../EmptySlot';
import { columns } from './components/Columns';
import { DataTable } from './components/Table';

export default function HistoryTab() {
  const { car } = useCar();
  const { data, error, mutate } = useFetch<PaginationType<FuelSupply>>(FUEL_SUPPLY_URL, {
    params: {
      sort: JSON.stringify([
        {
          orderBy: 'createdAt',
          order: SortEnum.DESC,
        },
      ]),
      filters: JSON.stringify({
        carId: car?.id,
      }),
    },
  });

  useEffect(() => {
    mutate();
  }, [car, mutate]);

  return (
    <TabsContent value="history" className="space-y-6 border-none p-0 outline-none">
      <div className="space-y-6">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Histórico de Abastecimento
        </h2>
        <div className="space-y-6">
          {data && !error && car && <DataTable data={data.data} columns={columns} />}
          <StateHandler data={data} error={error} mutate={mutate} car={car} />
        </div>
      </div>
    </TabsContent>
  );
}

function StateHandler({
  car,
  data,
  error,
  mutate,
}: {
  car: Car | null;
  data?: PaginationType<FuelSupply>;
  error: any;
  mutate: KeyedMutator<PaginationType<FuelSupply>>;
}) {
  if (!data && !error) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-[128px]" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptySlot
        icon={GasStation}
        title="Error ao carregar abastecimentos"
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
}
