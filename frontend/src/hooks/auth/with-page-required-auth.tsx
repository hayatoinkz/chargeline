'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RoleEnum } from '@/services/types/role';

import useAuth from './use-auth';

type PropsType = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type OptionsType = {
  roles: RoleEnum[];
};

const roles = Object.values(RoleEnum).filter((value) => !Number.isNaN(Number(value))) as RoleEnum[];

function withPageRequiredAuth(Component: any, options?: OptionsType) {
  const optionRoles = options?.roles || roles;

  return function WithPageRequiredAuth(props: PropsType) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const check = () => {
        if ((user && user?.role?.id && optionRoles.includes(user?.role.id)) || !isLoaded) return;

        const currentLocation = window.location.toString();
        const returnToPath = currentLocation.replace(new URL(currentLocation).origin, '');
        const params = new URLSearchParams({
          returnTo: returnToPath,
        });

        let redirectTo = `/auth/login?${params.toString()}`;

        if (user) {
          redirectTo = `/home`;
        }

        router.replace(redirectTo);
      };

      check();
    }, [user, isLoaded, router]);

    return user && user?.role?.id && optionRoles.includes(user?.role.id) ? (
      <Component {...props} />
    ) : null;
  };
}

export default withPageRequiredAuth;
