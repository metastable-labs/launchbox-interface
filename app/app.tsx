'use client';
import { ReactNode, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';

import RainbowProvider from '@/config/rainbow/rainbowkit';
import useConnect from '@/hooks/useConnect';
import { LBNavigation } from '@/components';
import { store } from '@/store';
import useSocialActions from '@/store/social/actions';
import { useAccount } from 'wagmi';

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

  useEffect(() => {
    getFarcasterChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <main>
      <LBNavigation />
      {children}
    </main>
  );
};

export default App;
