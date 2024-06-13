'use client';
import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';

import RainbowProvider from '@/config/rainbow/rainbowkit';
import useConnect from '@/hooks/useConnect';
import { LBNavigation } from '@/components';
import { store } from '@/store';

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
  return (
    <main>
      <LBNavigation network="base" />
      {children}
    </main>
  );
};

export default App;
