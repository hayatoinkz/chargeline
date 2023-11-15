'use client';

import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AUTH_LOGOUT_URL, AUTH_ME_URL } from '@/services/api/auth/config';
import { User } from '@/services/api/auth/types/user';
import { api } from '@/services/config';
import HTTP_CODES_ENUM from '@/services/types/http-codes';
import { Tokens } from '@/services/types/tokens';
import Cookies from 'js-cookie';

import { AuthActionsContext, AuthContext, AuthTokensContext, TokensInfo } from './auth-context';

function AuthProvider(props: PropsWithChildren<{}>) {
  const AUTH_TOKEN_KEY = 'auth-token-data';
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const tokensInfoRef = useRef<Tokens>({
    token: null,
    refreshToken: null,
    tokenExpires: null,
  });

  const setTokensInfoRef = useCallback((tokens: TokensInfo) => {
    tokensInfoRef.current = tokens ?? {
      token: null,
      refreshToken: null,
      tokenExpires: null,
    };
  }, []);

  const setTokensInfo = useCallback(
    (tokensInfo: TokensInfo) => {
      setTokensInfoRef(tokensInfo);

      if (tokensInfo) {
        Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokensInfo));
      } else {
        Cookies.remove(AUTH_TOKEN_KEY);
        setUser(null);
      }
    },
    [setTokensInfoRef],
  );

  const logOut = useCallback(async () => {
    if (tokensInfoRef.current.token) {
      await api.post(AUTH_LOGOUT_URL, {
        token: tokensInfoRef.current.token,
        refreshToken: tokensInfoRef.current.refreshToken,
        tokenExpires: tokensInfoRef.current.tokenExpires,
      });
    }
    setTokensInfo(null);
  }, [setTokensInfo]);

  const loadData = useCallback(async () => {
    const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? 'null') as TokensInfo;

    setTokensInfoRef(tokens);

    try {
      if (tokens?.token) {
        const response = await api.get(AUTH_ME_URL, {
          params: {
            token: tokens.token,
            refreshToken: tokens.refreshToken,
            tokenExpires: tokens.tokenExpires,
          },
        });

        if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          logOut();

          return;
        }

        const data = await response.data.json();
        setUser(data);
      }
    } catch {
      logOut();
    } finally {
      setIsLoaded(true);
    }
  }, [logOut, setTokensInfoRef, setTokensInfo]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
    }),
    [isLoaded, user],
  );

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
    }),
    [logOut],
  );

  const contextTokensValue = useMemo(
    () => ({
      tokensInfoRef,
      setTokensInfo,
    }),
    [setTokensInfo],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <AuthTokensContext.Provider value={contextTokensValue}>
          {props.children}
        </AuthTokensContext.Provider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
