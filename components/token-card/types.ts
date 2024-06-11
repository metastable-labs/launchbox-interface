import { Network } from '../button/types';

interface ILBTokenCard {
  id: string;
  name: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
  network: Network;
}

export type { ILBTokenCard };
