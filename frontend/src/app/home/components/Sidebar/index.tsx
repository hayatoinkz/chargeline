'use client';

import Image from 'next/image';
import useCarActions from '@/hooks/car/use-car-actions';
import useCar from '@/hooks/car/user-car';
import { CAR_URL } from '@/services/api/car/config';
import { Car as CarType } from '@/services/api/car/types/car';
import { useFetch } from '@/services/fetcher';
import { PaginationType } from '@/services/types/pagination';
import { SortEnum } from '@/services/types/sort';
import { TypeCarEnum } from '@/services/types/type-car';
import { Car, GasStation } from 'iconsax-react';
import { KeyedMutator } from 'swr';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { AddCarDialog } from '../AddCarDialog';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const cars = useFetch<PaginationType<CarType>>(CAR_URL, {
    params: {
      sort: JSON.stringify([
        {
          orderBy: 'brand',
          order: SortEnum.ASC,
        },
        {
          orderBy: 'model',
          order: SortEnum.ASC,
        },
      ]),
    },
  });

  const isDisabledToAddCar =
    !cars.data || cars.error || cars.isValidating || cars.isLoading || cars.data.data.length >= 3;

  return (
    <div className={cn('h-full max-h-screen w-[275px] fixed bg-background top-0 pb-6', className)}>
      <div className="space-y-6 px-6 py-8">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/assets/img/logo.svg"
          alt="ChargeLine Logo"
          width={150}
          height={36}
          priority
        />
        <div className="my-6 space-y-1">
          {/* <Button variant="secondary" className="w-full justify-start">
            <ZapIcon className="mr-2 h-4 w-4" />
            Abastecimento
          </Button> */}
          {/* <Button variant="ghost" className="w-full justify-start">
            <UserIcon className="mr-2 h-4 w-4" />
            Conta
          </Button> */}
        </div>
        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display relative text-lg font-light tracking-tight">
              Meus <b className="font-bold">Carros</b>
            </h2>
            <AddCarDialog size="icon" disabled={isDisabledToAddCar} />
          </div>
          <CarSection cars={cars} />
        </div>
      </div>
    </div>
  );
}

function CarSection({
  cars,
}: {
  cars: {
    data: PaginationType<CarType> | undefined;
    error: any;
    mutate: KeyedMutator<PaginationType<CarType>>;
    isLoading: boolean;
    isValidating: boolean;
  };
}) {
  const { car } = useCar();
  const { setCar } = useCarActions();
  const { data, error, mutate, isLoading } = cars;

  function handleChange(item: CarType) {
    if (car?.id === item.id) {
      setCar(null);
    } else {
      setCar(item);
    }
  }

  if ((!data && !error) || isLoading) {
    return (
      <>
        {new Array(3).fill(1).map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-zinc-200 p-4"
          >
            <header className="inline-flex w-full gap-2">
              <Skeleton className="h-12 w-20 rounded-lg" />
              <div className="space-y-0">
                <Skeleton className="h-12 w-14" />
              </div>
            </header>
            <div className="inline-flex w-full items-end justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-[112px]" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-zinc-200 px-4 py-12 pb-6">
        <Car variant="Outline" className="h-6 w-6 text-zinc-500" />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h4 className=" text-sm font-semibold leading-tight text-zinc-900">
            Error ao carregar carros
          </h4>
          <p className=" text-xs leading-tight text-zinc-500">Tente novamente no botão abaixo.</p>
        </div>
        <Button size="sm" onClick={() => mutate()} className="w-full">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (data && data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-zinc-200 px-4 py-12">
        <Car variant="Outline" className="h-6 w-6 text-zinc-500" />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h4 className=" text-sm font-semibold leading-tight text-zinc-900">
            Sem carros na garagem
          </h4>
          <p className=" text-xs leading-tight text-zinc-500">
            Você não possui nenhum carro registrado. Adicione no botão acima.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data &&
        data.data.map((item) => (
          <button
            key={item.id}
            onClick={() => handleChange(item)}
            className={cn(
              'cursor-pointer p-4 text-left rounded-xl border border-dashed border-zinc-200 justify-center items-center gap-4 flex flex-col w-full',
              'hover:border-zinc-400 hover:border-dashed transition-all duration-500',
              {
                'border-dashed border-zinc-900 hover:border-zinc-900': item.id === car?.id,
              },
            )}
          >
            <header className="inline-flex w-full gap-2">
              <div className="inline-flex h-12 w-20 items-center justify-center rounded-lg border border-zinc-100 text-zinc-400">
                <Car variant="Outline" className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">{item.brand}</h3>
                <p className="text-zinc-500">{item.model}</p>
              </div>
            </header>
            <div className="inline-flex w-full items-end justify-between">
              <div className="space-y-1">
                <p className="text-xs text-zinc-500">Placa do Veículo</p>
                <h3 className="text-xl font-bold">{item.licensePlate}</h3>
              </div>
              <div
                className={cn(
                  'inline-flex w-10 h-10 p-2 bg-zinc-900 rounded-md justify-center items-center',
                  {
                    'bg-red-600': item.type.id === TypeCarEnum.DIESEL,
                  },
                )}
              >
                <GasStation variant="Outline" className="h-5 w-5 text-white" />
              </div>
            </div>
          </button>
        ))}
    </div>
  );
}
