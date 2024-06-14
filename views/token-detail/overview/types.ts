import { TableItem } from '@/components/table/types';

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

type Period = '1h' | '24h' | '1w' | '1m';

interface ILiquidityChart {
  liquidityData: { date: Date; value: number }[];
  period: Period;
}

interface IOverview {
  tokenDetailData: TokenDetailData;
  userRole: 'admin' | 'user';
}

interface IView extends IOverview {
  transactionsData: TableItem[];
  holdingsData: TableItem[];
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
  }[];
}

export type { ILiquidityChart, IOverview, IView, Period, TokenDetailData };
