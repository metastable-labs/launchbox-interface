import { TableItem } from '@/components/table/types';
import { Token } from '@/store/token/types';
import { Period } from '../types';
import { Dispatch, SetStateAction } from 'react';

type TokenDetailData = {
  id: string;
  name: string;
  tokenSymbol: string;
  tokenAddress: string;
  tokenImageURL: string;
  tokenSupply: number;
  siteConfigLink: string;
  networkBadgeURL: string;
  amount: number;
  change: number;
  farcasterLink: string;
  websiteLink: string;
  createdAt: string;
  updatedAt: string;
  liquidity: { numerator: number; denominator: number };
  marketCap: { numerator: number; denominator: number };
  txns: { numerator: number; denominator: { numerator: number; denominator: number } };
  volume: number;
  walletAvatarURL: string;
  holders: number;
  fdv: number;
};

interface IOverview {
  userRole: 'admin' | 'user';
}

interface IView extends IOverview {
  tabTexts: string[];
  liquidityData: {
    date: Date;
    value: number;
  }[];
  period: Period;
  setPeriod: (period: Period) => void;
  periods: {
    text: string;
    value: Period;
    loading?: boolean;
  }[];
  shouldFetchMoreTransactions: boolean;
  setShouldFetchMoreTransactions: Dispatch<SetStateAction<boolean>>;
  shouldFetchMoreHolders: boolean;
  setShouldFetchMoreHolders: Dispatch<SetStateAction<boolean>>;
}

export type { IOverview, IView, Period, TokenDetailData };
