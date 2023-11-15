'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useAuth from './use-auth';

type PropsType = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function withPageRequiredGuest(Component: any) {
  return function PageRequiredGuest(props: PropsType) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const check = () => {
        if (!user || !isLoaded) return;

        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get('returnTo') ?? `/home`;
        router.replace(returnTo);
      };

      check();
    }, [user, isLoaded, router]);

    return !user && isLoaded ? <Component {...props} /> : null;
  };
}

export default withPageRequiredGuest;
