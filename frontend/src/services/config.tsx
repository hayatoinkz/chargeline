import { TokensInfo } from '@/hooks/auth/auth-context';
import axios, { AxiosHeaders, HeadersDefaults, RawAxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';

import { AUTH_REFRESH_URL } from './api/auth/config';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

function CreateApi() {
  const AUTH_TOKEN_KEY = 'auth-token-data';
  const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null') as TokensInfo;

  let headers: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults> = {
    'Content-Type': 'application/json',
  };

  if (tokens?.token) {
    headers = {
      ...headers,
      Authorization: 'Bearer ' + tokens.token,
    };
  }

  if (tokens?.tokenExpires && tokens?.tokenExpires <= Date.now()) {
    fetch(AUTH_REFRESH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          Cookies.set(
            AUTH_TOKEN_KEY,
            JSON.stringify({
              token: data.token,
              refreshToken: data.refreshToken,
              tokenExpires: data.tokenExpires,
            }),
          );

          headers = {
            ...headers,
            Authorization: `Bearer ${data.token}`,
          };
        }
      })
      .catch((error) => {
        Cookies.remove(AUTH_TOKEN_KEY);
      });
  }

  return axios.create({
    baseURL: API_URL,
    headers,
  });
}

export const api = CreateApi();
