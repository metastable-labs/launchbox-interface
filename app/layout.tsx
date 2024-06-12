import { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import App from './app';

export const metadata: Metadata = {
  title: 'Launchbox',
  description: 'Launchbox is a platform for launching your tokens.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-Aeonik">
        <App>{children}</App>
      </body>
    </html>
  );
}
