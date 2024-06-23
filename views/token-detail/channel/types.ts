import { Token } from '@/store/token/types';

interface IChannel {
  token?: Token;
  userRole: 'admin' | 'user';
}

interface IInfo {
  title: string;
  text?: string;
  activeFollowersPercentage?: number;
  weeklyCastPercentage?: number;
  socialScore?: number;
  priceChangePercentage?: number;
  txns?: {
    numerator: number;
    denominator: {
      numerator: number;
      denominator: number;
    };
  };
  hasBorder?: boolean;
}

export type { IChannel, IInfo };
