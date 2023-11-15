'use client';

import * as React from 'react';
import Link from 'next/link';
import useAuthActions from '@/hooks/auth/use-auth-actions';
import useAuthTokens from '@/hooks/auth/use-auth-tokens';
import { AuthLogin } from '@/services/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import { defaultValues, loginFormSchema, LoginFormValues } from './validators';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    const response = await AuthLogin(data);

    if (response) {
      setTokensInfo({
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        tokenExpires: response.data.tokenExpires,
      });
      setUser(response.data.user);
    } else {
      toast({
        variant: 'destructive',
        title: 'Falha ao fazer login!',
      });
    }
    setIsLoading(false);
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log('onSuccess', tokenResponse),
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Digite seu e-mail"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-200"></div>
              )}
              Entrar
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Ou continuar com</span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading} onClick={() => loginGoogle()}>
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600"></div>
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>

      <Link href="/auth/forgot-password" className={cn(buttonVariants({ variant: 'ghost' }))}>
        Esqueceu a senha?
      </Link>
    </div>
  );
}
