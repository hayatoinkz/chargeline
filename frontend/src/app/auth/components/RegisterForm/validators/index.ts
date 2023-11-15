import * as z from 'zod';

export const registerFormSchema = z.object({
  firstName: z
    .string({
      required_error: 'Você precisa digitar o nome',
    })
    .min(2, { message: 'Digite um nome válido' }),
  lastName: z
    .string({
      required_error: 'Você precisa digitar o sobrenome',
    })
    .min(2, { message: 'Digite um sobrenome válido' }),
  email: z
    .string({
      required_error: 'Você precisa digitar o e-mail',
    })
    .email({ message: 'Digite um e-mail válido' }),
  password: z.string({
    required_error: 'Você precisa digitar a senha',
  }),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const defaultValues: Partial<RegisterFormValues> = {};
