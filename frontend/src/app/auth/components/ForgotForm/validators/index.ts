import * as z from 'zod';

export const forgotFormSchema = z.object({
  email: z
    .string({
      required_error: 'Você precisa digitar o e-mail',
    })
    .email({ message: 'Digite um e-mail válido' }),
});

export type ForgotFormValues = z.infer<typeof forgotFormSchema>;

export const defaultValues: Partial<ForgotFormValues> = {};
