import { redirect } from 'next/navigation';
import { api } from '@/services/config';

import { toast } from '@/components/ui/use-toast';

import { Tokens } from '../../types/tokens';
import { User } from './types/user';

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = Tokens & {
  user: User;
};

export async function AuthLogin(data: AuthLoginRequest) {
  try {
    const response = await api.post<AuthLoginResponse>('/auth/email/login', data);

    return response;
  } catch (error) {
    console.error('error in login => ', error);
  }
}

export type AuthGoogleLoginRequest = {
  idToken: string;
};

export type AuthGoogleLoginResponse = Tokens & {
  user: User;
};

export async function AuthGoogleLogin(data: AuthGoogleLoginRequest) {
  try {
    const response = await api.post<AuthGoogleLoginResponse>('/auth/google/login', data);

    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    return response;
  } catch (error) {
    console.error('error in google login => ', error);
  }
}

export type AuthSignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthSignUpResponse = void;

export async function AuthSignUp(data: AuthSignUpRequest) {
  try {
    await api.post<AuthSignUpResponse>('/auth/email/register', data);

    toast({
      title: 'Cadastro feito com sucesso! Realize o login.',
    });

    redirect('/login');
  } catch (error) {
    console.error('error in signup => ', error);

    toast({
      variant: 'destructive',
      title: 'Falha ao fazer cadastro!',
    });

    return error;
  }
}
