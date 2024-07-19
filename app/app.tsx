'use client';
import { ReactNode, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import useConnect from '@/hooks/useConnect';
import { LBNavigation } from '@/components';
import { store } from '@/store';
import useSocialActions from '@/store/social/actions';
import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import 'react-toastify/dist/ReactToastify.css';
import useTokenActions from '@/store/token/actions';
import { setTokenHeader } from '@/utils/axios';
import useIncentiveActions from '@/store/incentive/actions';

const cookieOptions = {
  path: '/',
  expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
};

const App = ({ children }: { children: ReactNode }) => {
  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <ReduxProvider store={store}>
        <Wrapper>{children}</Wrapper>
      </ReduxProvider>
    </CookiesProvider>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const {} = useConnect();
  const { address } = useAccount();
  const { getFarcasterChannels } = useSocialActions();
  const { getCoinPrice } = useTokenActions();
  const { authenticated } = usePrivy();
  const { getSystemIncentiveChannels, getRankPosition } = useIncentiveActions();

  const [cookies] = useCookies(['authtoken']);

  useEffect(() => {
    if (!cookies || !cookies.authtoken) return;

    setTokenHeader(cookies.authtoken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  useEffect(() => {
    getFarcasterChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, authenticated]);

  useEffect(() => {
    getCoinPrice();
    getSystemIncentiveChannels();
    getRankPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <LBNavigation />
      {children}
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" bodyStyle={{ alignItems: 'center' }} className="md:min-w-[430px] pt-0" />
    </main>
  );
};

export default App;
