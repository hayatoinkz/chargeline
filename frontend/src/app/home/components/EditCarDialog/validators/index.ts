import { TypeCarStringEnum } from '@/services/types/type-car';
import * as z from 'zod';

const licensePlateRegex = RegExp(/^[A-Z]{3}-\d{5}$/);

export const addCarFormSchema = z.object({
  brand: z
    .string({
      required_error: 'Você precisa digitar a marca',
    })
    .min(2, {
      message: 'Marca deve conter no minimo 2 caracteres.',
    })
    .max(30, {
      message: 'Marca deve conter no máximo 30 caracteres.',
    }),
  model: z
    .string({
      required_error: 'Você precisa digitar o modelo',
    })
    .min(2, {
      message: 'Modelo deve conter no minimo 2 caracteres.',
    })
    .max(30, {
      message: 'Modelo deve conter no máximo 30 caracteres.',
    }),
  type: z
    .nativeEnum(TypeCarStringEnum, {
      required_error: 'Você precisa selecionar o tipo do carro',
    })
    .refine((value) => String(value))
    .default(TypeCarStringEnum.FLEX),
  capacity: z.coerce
    .number({
      required_error: 'Você precisa definir a capacidade',
    })
    .refine((number) => number >= 1)
    .default(35),
});

export type AddCarFormValues = z.infer<typeof addCarFormSchema>;
