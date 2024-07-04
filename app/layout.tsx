import { ReactNode } from 'react';
import type { Metadata } from 'next';
import App from './app';
import Provider from '../config/privy-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Launchbox',
  description: 'Launchbox is a platform for launching your tokens.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-Aeonik">
        <Provider>
          <App>{children}</App>
        </Provider>
      </body>
    </html>
  );
}
