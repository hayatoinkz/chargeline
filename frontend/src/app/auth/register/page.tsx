'use client';

import withPageRequiredGuest from '@/hooks/auth/with-page-required-guest';

import { RegisterForm } from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Criar uma conta</h1>
        <p className="text-muted-foreground text-sm">Bem-vindo ao ChargeLine</p>
      </div>
      <RegisterForm />
    </div>
  );
}

export default withPageRequiredGuest(RegisterPage);
