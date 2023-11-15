import { Role } from '@/services/types/role';

export enum UserProviderEnum {
  EMAIL = 'email',
  GOOGLE = 'google',
}

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  provider?: UserProviderEnum;
  socialId?: string;
  role?: Role;
};
