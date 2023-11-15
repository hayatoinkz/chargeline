import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: 'Você precisa digitar o e-mail',
    })
    .email({ message: 'Digite um e-mail válido' }),
  password: z.string({
    required_error: 'Você precisa digitar a senha',
  }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const defaultValues: Partial<LoginFormValues> = {
  email: 'admin@example.com',
  password: 'secret',
};
