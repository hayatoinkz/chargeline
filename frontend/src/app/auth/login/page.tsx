'use client';

import withPageRequiredGuest from '@/hooks/auth/with-page-required-guest';

import { LoginForm } from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Acesso a conta</h1>
        <p className="text-muted-foreground text-sm">Bem-vindo ao ChargeLine</p>
      </div>
      <LoginForm />
    </div>
  );
}

export default withPageRequiredGuest(LoginPage);
