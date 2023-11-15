import { Metadata } from 'next';

import { ForgotForm } from '../components/ForgotForm';

export const metadata: Metadata = {
  title: 'Esqueci a senha',
  description: 'Authentication.',
};

export default function ForgotPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Recuperação de Conta</h1>
        <p className="text-sm text-muted-foreground">
          Digite seu e-mail abaixo para iniciar o processo.
        </p>
      </div>
      <ForgotForm />
    </div>
  );
}
