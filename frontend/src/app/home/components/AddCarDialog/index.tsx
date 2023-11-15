import React from 'react';
import { CarRegister } from '@/services/api/car';
import { CAR_URL } from '@/services/api/car/config';
import { TypeCarEnum } from '@/services/types/type-car';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { cn } from '@/lib/utils';
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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

import { addCarFormSchema, AddCarFormValues, defaultValues } from './validators';

export function AddCarDialog(props: ButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<AddCarFormValues>({
    resolver: zodResolver(addCarFormSchema),
    defaultValues,
  });

  async function onSubmit(data: AddCarFormValues) {
    setIsLoading(true);
    const apiData = {
      brand: data.brand,
      model: data.model,
      licensePlate: data.licensePlate,
      capacity: data.capacity,
      type: {
        id: Number(data.type),
      },
    };

    const response = await CarRegister(apiData);

    if (response) {
      mutate(CAR_URL);
      setOpen(false);
      toast({
        title: 'Carro cadastrado com sucesso!',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Falha ao cadastrar carro!',
      });
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => form.reset()}>
        {props.size === 'icon' ? (
          <Button size="icon" variant="ghost" {...props}>
            <PlusCircleIcon />
          </Button>
        ) : (
          <Button {...props}>Adicionar Carro</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Adicionar Carro</DialogTitle>
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
                <FormLabel htmlFor="licensePlate" className="text-right">
                  Placa
                </FormLabel>
                <FormField
                  control={form.control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          placeholder="Exemplo: JJJ-78628"
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
              <DialogClose>
                <Button variant="outline" disabled={isLoading} onClick={() => form.reset()}>
                  Cancelar
                </Button>
              </DialogClose>
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
