import { TypeFuelStringEnum } from '@/services/types/type-fuel';
import * as z from 'zod';

export const fuelFormSchema = z.object({
  type: z
    .nativeEnum(TypeFuelStringEnum, {
      required_error: 'Você precisa selecionar um combustivel',
    })
    .refine((value) => String(value)),
  quantity: z.coerce
    .number({
      required_error: 'Você precisa definir uma quantidade',
    })
    .refine((number) => number >= 1)
    .default(1),
});

export type FuelFormValues = z.infer<typeof fuelFormSchema>;

export const defaultValues: Partial<FuelFormValues> = {
  quantity: 1,
};
