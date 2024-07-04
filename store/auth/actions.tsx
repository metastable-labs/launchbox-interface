'use client';

import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setLoading } from '.';
import { setTokenHeader } from '@/utils/axios';

const useAuthActions = () => {
  const { ready, authenticated, login, getAccessToken } = usePrivy();
  const { dispatch } = useSystemFunctions();

  const [cookies, setCookie] = useCookies(['authtoken']);

  const authenticateUser = async () => {
    try {
      if (!ready) return;
      dispatch(setLoading(true));

      login();
    } catch (error: any) {
      dispatch(setLoading(false));
      return toast('Something went wrong!', {
        type: 'error',
      });
    }
  };

  const _loginUser = async () => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) return;

      const response = await api.login(accessToken);

      setCookie('authtoken', response.token, {
        expires: new Date(new Date().getTime() + response.expire * 1000),
      });

      setTokenHeader(response.token);
    } catch (error: any) {
      return toast('Something went wrong!', {
        type: 'error',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    _loginUser();
  }, [authenticated]);

  return {
    authenticateUser,
  };
};

export default useAuthActions;
