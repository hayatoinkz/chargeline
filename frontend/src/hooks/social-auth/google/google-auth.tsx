'use client';

import { useState } from 'react';
import { AuthGoogleLogin } from '@/services/api/auth';
import HTTP_CODES_ENUM from '@/services/types/http-codes';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import useAuthActions from '../../auth/use-auth-actions';
import useAuthTokens from '../../auth/use-auth-tokens';

export default function GoogleAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async (tokenResponse: CredentialResponse) => {
    if (!tokenResponse.credential) return;

    setIsLoading(true);

    const { status, data } = await AuthGoogleLogin({
      idToken: tokenResponse.credential,
    });

    if (status === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
    setIsLoading(false);
  };

  return <GoogleLogin onSuccess={onSuccess} />;
}
