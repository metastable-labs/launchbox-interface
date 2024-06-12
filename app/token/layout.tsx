import { PageProps } from '@/app/types';

export default function RootLayout({ children }: Readonly<PageProps>) {
  return <main>{children}</main>;
}
