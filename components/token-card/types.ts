import { Network } from '../button/types';

interface ILBTokenCard {
  id: string;
  name: string;
  tokenSymbol: string;
  createdAt: string;
  updatedAt: string;
  network: Network;
  liquidity: { numerator: number; denominator: number };
  marketCap: { numerator: number; denominator: number };
  txns: { numerator: number; denominator: { numerator: number; denominator: number } };
  volume: number;
  walletAvatarURL?: string;
  tokenAddress: string;
}

export type { ILBTokenCard };
