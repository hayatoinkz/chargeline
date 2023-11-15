'use client';

import { useEffect } from 'react';
import useCar from '@/hooks/car/user-car';
import { FuelSupplyRegister } from '@/services/api/fuel-supply';
import { useFetch } from '@/services/fetcher';
import { PaginationType } from '@/services/types/pagination';
import { TypeCarEnum } from '@/services/types/type-car';
import { TypeFuel, TypeFuelEnum } from '@/services/types/type-fuel';
import { validKeyForNumber } from '@/utils/validators/number-key';
import { zodResolver } from '@hookform/resolvers/zod';
import { GasStation } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import { mutate as globalMutate } from 'swr';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

import EmptySlot from '../EmptySlot';
import { defaultValues, fuelFormSchema, FuelFormValues } from './validators';

export default function RegisterForm() {
  const { car } = useCar();
  const form = useForm<FuelFormValues>({
    resolver: zodResolver(fuelFormSchema),
    defaultValues,
  });

  const watchAllFields = form.watch();

  const { data, error, mutate, isLoading, isValidating } =
    useFetch<PaginationType<TypeFuel>>('/type-fuel');

  useEffect(() => {
    form.reset();
  }, [car, form]);

  async function onSubmit(values: FuelFormValues) {
    const type = data?.data.find((type) => type.id === Number(watchAllFields.type));

    if (type && car) {
      const apiData = {
        quantity: Number(values.quantity),
        price: type.price,
        totalPrice: type.price * Number(values.quantity),
        car: {
          id: car.id,
        },
        type: {
          id: Number(values.type),
        },
      };

      const response = await FuelSupplyRegister(apiData);

      if (response) {
        globalMutate('/fuel-supply');
        toast({
          title: 'Registro de abastecimento feito com sucesso!',
        });
      } else {
        toast({
          title: 'Erro ao registrar abastecimento!',
          variant: 'destructive',
        });
      }
    }
  }

  function getTotalAmount() {
    const type = data?.data.find((type) => type.id === Number(watchAllFields.type));

    if (type) {
      return (type.price * watchAllFields.quantity).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    return 'R$0,00';
  }

  function getTotalQuantity() {
    const type = data?.data.find((type) => type.id === Number(watchAllFields.type));

    if (type && watchAllFields.quantity > 0) {
      return `${watchAllFields.quantity}L de ${type.name}`;
    }

    return 'A definir';
  }

  if (!data && !error && isLoading) {
    return (
      <div className="space-y-3">
        <Label>Selecione o Tipo de Combustível</Label>
        <LoadingTypeFuel />
      </div>
    );
  }

  if (error) {
    return (
      <EmptySlot
        icon={GasStation}
        title="Error ao carregar combustíveis"
        description="Tente novamente no botão abaixo."
      >
        <Button disabled={isValidating} onClick={() => mutate()}>
          {isValidating && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-200"></div>
          )}
          Tentar Novamente
        </Button>
      </EmptySlot>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Selecione o Tipo de Combustível</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={defaultValues.type?.toString()}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                  {data &&
                    data.data
                      .filter((type) =>
                        car?.type.id === TypeCarEnum.DIESEL
                          ? type.id === TypeFuelEnum.DIESEL
                          : type.id !== TypeFuelEnum.DIESEL,
                      )
                      .map((type) => (
                        <FormItem
                          key={type.id}
                          className={cn(
                            'col-span-1 flex flex-col w-full bg-white rounded-xl border border-zinc-200',
                            'hover:border-zinc-400 hover:border-dashed transition-all duration-500',
                            {
                              'border-dashed border-zinc-900 hover:border-zinc-900':
                                field.value === type.id.toString(),
                            },
                          )}
                        >
                          <FormLabel
                            itemType="string"
                            className="flex cursor-pointer flex-col gap-6 p-6"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={String(type.id)}
                                checked={field.value === type.id.toString()}
                              />
                            </FormControl>
                            <div className="flex w-full items-center justify-between">
                              <div className="space-y-1">
                                <h4 className="text-2xl font-bold">{type.name}</h4>
                                <p className="text-zinc-500">
                                  {Number(type.price).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                  })}
                                  /Litro
                                </p>
                              </div>
                              <div
                                className={cn(
                                  'inline-flex w-16 h-16 p-2 bg-zinc-900 rounded-xl justify-center items-center',
                                  {
                                    'bg-blue-700': type.id === TypeFuelEnum.ETHANOL,
                                  },
                                  {
                                    'bg-red-600': type.id === TypeFuelEnum.DIESEL,
                                  },
                                )}
                              >
                                <GasStation variant="Outline" className="h-7 w-7 text-white" />
                              </div>
                            </div>
                          </FormLabel>
                        </FormItem>
                      ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade (Litros)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a quantidade"
                  type="number"
                  min="0"
                  onKeyDown={(event) => {
                    if (!validKeyForNumber.includes(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="inline-flex w-full items-end justify-between gap-8 text-clip border-b border-dashed border-zinc-200 py-6">
          <div className="space-y-1">
            <p className="text-zinc-500">Preço total por</p>
            <span className="truncate text-2xl font-bold">{getTotalQuantity()}</span>
          </div>
          <span className="truncate text-4xl font-bold">{getTotalAmount()}</span>
        </div>
        <footer className="inline-flex w-full justify-end gap-2">
          <Button type="reset" variant="outline" onClick={() => form.reset()}>
            Limpar Campos
          </Button>
          <Button type="submit">Confirmar</Button>
        </footer>
      </form>
    </Form>
  );
}

function LoadingTypeFuel() {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      {new Array(3).fill(1).map((item, index) => (
        <div
          key={index}
          className="flex w-full flex-col rounded-xl border border-zinc-200 bg-white"
        >
          <div className="flex cursor-pointer flex-col gap-6 p-6">
            <Skeleton className="h-4 w-4 rounded-full" />
            <div className="flex w-full items-center justify-between gap-8">
              <div className="space-y-1">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-16 w-16 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
