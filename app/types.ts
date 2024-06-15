import { Network } from '@/components/button/types';

interface PageProps {
  params: { network: Network; tokenAddress: string };
  children?: React.ReactNode;
}

export type { PageProps };
