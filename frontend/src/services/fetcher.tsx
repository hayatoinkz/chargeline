import useAuthActions from '@/hooks/auth/use-auth-actions';
import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { api } from './config';

export function useFetch<Data = any, Error = any>(url: string, config?: AxiosRequestConfig<any>) {
  const { logOut } = useAuthActions();
  const { data, error, mutate, isLoading, isValidating } = useSWR<Data, Error>(
    url,
    async (url: string) => {
      const response = await api.get(url, config);

      return response.data;
    },
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        if (error.status === 401) {
          logOut();

          return;
        }

        // Only retry up to 3 times.
        if (retryCount >= 3) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );

  return { data, error, mutate, isLoading, isValidating };
}

export function useMutation<Data = any, Error = any>(url: string, data?: any) {
  const { trigger, isMutating } = useSWRMutation<Data, Error>(url, async (url: string) => {
    const response = await api.post(url, data);

    return response.data;
  });

  return { trigger, isMutating };
}
