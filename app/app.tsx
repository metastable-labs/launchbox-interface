'use client';
import { ReactNode, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import RainbowProvider from '@/config/rainbow/rainbowkit';
import useConnect from '@/hooks/useConnect';
import { LBNavigation } from '@/components';
import { store } from '@/store';
import useSocialActions from '@/store/social/actions';
import { useAccount } from 'wagmi';

import 'react-toastify/dist/ReactToastify.css';
import useTokenActions from '@/store/token/actions';

const cookieOptions = {
  path: '/',
  expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000),
};

const App = ({ children }: { children: ReactNode }) => {
  return (
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <RainbowProvider>
        <ReduxProvider store={store}>
          <Wrapper>{children}</Wrapper>
        </ReduxProvider>
      </RainbowProvider>
    </CookiesProvider>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  const {} = useConnect();
  const { address } = useAccount();
  const { getFarcasterChannels } = useSocialActions();
  const { getCoinPrice } = useTokenActions();

  useEffect(() => {
    getFarcasterChannels();
    getCoinPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <main>
      <LBNavigation />
      {children}
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" theme="colored" bodyStyle={{ alignItems: 'center' }} className="md:min-w-[430px] pt-0" />
    </main>
  );
};

export default App;
