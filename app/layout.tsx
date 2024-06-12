import type { Metadata } from 'next';
import './globals.css';
import App from './app';

export const metadata: Metadata = {
  title: 'Launchbox',
  description: 'Launchbox is a platform for launching your tokens.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-Aeonik">
        <App params={{ network: 'base' }}>{children}</App>
      </body>
    </html>
  );
}
