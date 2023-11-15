'use client';

import React, { useEffect } from 'react';
import useCarActions from '@/hooks/car/use-car-actions';
import useCar from '@/hooks/car/user-car';
import { CarEdit } from '@/services/api/car';
import { CAR_URL } from '@/services/api/car/config';
import { TypeCarEnum, TypeCarStringEnum } from '@/services/types/type-car';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { cn } from '@/lib/utils';
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import { addCarFormSchema, AddCarFormValues } from './validators';

interface Props extends ButtonProps {}

export function EditCarDialog({ ...props }: Props) {
  const { car } = useCar();
  const { setCar } = useCarActions();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<AddCarFormValues>({
    resolver: zodResolver(addCarFormSchema),
    defaultValues: {
      ...car,
      type: car ? (car.type.id.toString() as TypeCarStringEnum) : TypeCarStringEnum.FLEX,
    },
  });

  useEffect(() => {
    form.reset({
      ...car,
      type: car ? (car.type.id.toString() as TypeCarStringEnum) : TypeCarStringEnum.FLEX,
    });
  }, [car, form]);

  async function onSubmit(data: Partial<AddCarFormValues>) {
    setIsLoading(true);
    const apiData = {
      ...data,
      type: {
        id: Number(data.type),
      },
    };

    const response = await CarEdit(car!.id, apiData);

    if (response) {
      mutate(CAR_URL);
      setCar(response.data);
      setOpen(false);
      toast({
        title: `${response.data.brand} ${response.data.model} editado com sucesso!`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: `Falha ao editar ${car?.brand} ${car?.model}!`,
      });
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hidden md:inline-flex" asChild onClick={() => form.reset()}>
        <Button size="icon" variant="outline" {...props}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogTrigger className="md:hidden" asChild onClick={() => form.reset()}>
        <Button size="sm" variant="outline" className="w-full" {...props}>
          <Edit className="mr-1 h-3 w-3" />
          Editar Carro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Editar Carro</DialogTitle>
            <DialogDescription>Digite as informações necessárias do seu veículo</DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="brand" className="text-right">
                  Marca
                </FormLabel>
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="Exemplo: Nissan"
                          autoCapitalize="on"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="model" className="text-right">
                  Modelo
                </FormLabel>
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="Exemplo: Kicks"
                          autoCapitalize="on"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="capacity" className="text-right">
                  Capacidade
                </FormLabel>
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Digite a capacidade"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="type" className="text-right">
                  Tipo
                </FormLabel>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <select
                          className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'w-full appearance-none bg-transparent font-normal',
                          )}
                          {...field}
                        >
                          <option value={TypeCarEnum.FLEX}>Flex</option>
                          <option value={TypeCarEnum.DIESEL}>Diesel</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-200"></div>
                )}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
