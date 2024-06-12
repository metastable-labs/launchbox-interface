import { Network } from '@/components/button/types';

interface PageProps {
  params: { network: Network; tokenId: string };
  children?: React.ReactNode;
}

export type { PageProps };
