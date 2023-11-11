'use client';

import { EmptySlot } from '@/components/app/emptyslot';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TabsContent } from '@/components/ui/tabs';
import { Car, GasStation } from 'iconsax-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const validKeyForQuantity = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Backspace',
];

const fuelFormSchema = z.object({
  type: z
    .enum(['gasoline', 'ethanol', 'diesel'], {
      required_error: 'Você precisa selecionar um combustivel',
    })
    .default('gasoline'),
  quantity: z.coerce
    .number({
      required_error: 'Você precisa definir uma quantidade',
    })
    .refine((n) => n >= 1)
    .default(1),
});

type FuelFormValues = z.infer<typeof fuelFormSchema>;

const defaultValues: Partial<FuelFormValues> = {
  type: 'gasoline',
  quantity: 1,
};

const FuelTypes = [
  {
    id: 'gasoline',
    name: 'Gasolina',
    price: 6.5,
  },
  {
    id: 'ethanol',
    name: 'Etanol',
    price: 4.75,
  },
  {
    id: 'diesel',
    name: 'Diesel',
    price: 7.22,
  },
];

export default function Register() {
  const form = useForm<FuelFormValues>({
    resolver: zodResolver(fuelFormSchema),
    defaultValues,
  });

  const watchAllFields = form.watch();

  function onSubmit(data: FuelFormValues) {
    toast({
      title: 'Registro de abastecimento feito com sucesso!',
    });
  }

  function getTotalAmount() {
    const type = FuelTypes.find((type) => type.id === watchAllFields.type);

    if (type) {
      return (type.price * watchAllFields.quantity).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    return 'R$0,00';
  }

  function getTotalQuantity() {
    const type = FuelTypes.find((type) => type.id === watchAllFields.type);

    if (type && watchAllFields.quantity > 0) {
      return `${watchAllFields.quantity}L de ${type.name}`;
    }

    return 'A definir';
  }

  return (
    <TabsContent
      value="register"
      className="w-full border-none p-0 outline-none space-y-6"
    >
      <h2 className="text-xl font-display font-semibold tracking-tight">
        Registro de Abastecimento
      </h2>
      <div className="space-y-2">
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
                      defaultValue={defaultValues.type}
                      onValueChange={field.onChange}
                      className="flex space-x-2"
                    >
                      {FuelTypes.map((type) => (
                        <FormItem
                          key={type.id}
                          className={cn(
                            'flex flex-col w-full bg-white rounded-xl border border-zinc-200',
                            'hover:border-zinc-400 hover:border-dashed transition-all duration-500',
                            {
                              'border-dashed border-zinc-900 hover:border-zinc-900':
                                field.value === type.id,
                            }
                          )}
                        >
                          <FormLabel className="flex flex-col gap-6 p-6 cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value={type.id} checked={field.value === type.id} />
                            </FormControl>
                            <div className="flex items-center justify-between w-full">
                              <div className="space-y-1">
                                <h4 className="text-2xl font-bold">
                                  {type.name}
                                </h4>
                                <p className="text-zinc-500">
                                  {type.price.toLocaleString('pt-BR', {
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
                                    'bg-blue-700': type.id === 'ethanol',
                                  },
                                  {
                                    'bg-red-600': type.id === 'diesel',
                                  }
                                )}
                              >
                                <GasStation
                                  variant="Outline"
                                  className="w-7 h-7 text-white"
                                />
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
                        if (!validKeyForQuantity.includes(event.key)) {
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
            <div className="inline-flex justify-between items-end w-full py-6 border-b border-zinc-200 border-dashed overflow-clip gap-8">
              <div className="space-y-1">
                <p className="text-zinc-500">Preço total por</p>
                <span className="text-2xl font-bold truncate">
                  {getTotalQuantity()}
                </span>
              </div>
              <span className="text-4xl font-bold truncate">
                {getTotalAmount()}
              </span>
            </div>
            <footer className="inline-flex justify-end w-full gap-2">
              <Button
                type="reset"
                variant="outline"
                onClick={() => form.reset()}
              >
                Limpar Campos
              </Button>
              <Button type="submit">Confirmar</Button>
            </footer>
          </form>
        </Form>
      </div>
      <EmptySlot
        icon={Car}
        title="Sem carros na garagem"
        description="Você não possui nenhum carro registrado. Adicione um abaixo."
      >
        <Button>Adicionar Carro</Button>
      </EmptySlot>
    </TabsContent>
  );
}
