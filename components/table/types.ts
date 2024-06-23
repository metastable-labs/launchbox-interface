import { Address } from 'viem';

type TableVariant = 'primary' | 'secondary' | 'secondaryAlt' | 'tertiary';

interface TableItem {
  wallet?: Address;
  walletAvatarURL?: string;
  type?: 'buy' | 'sell';
  userType?: 'farcaster' | 'wallet';
  usdAmount?: number;
  tokenAmount?: number;
  tokenSymbol?: string;
  createdAt?: string;
  holding?: number;
  name?: string;
  id?: string;
  liquidity?: {
    numerator: number;
    denominator: number;
  };
  marketCap?: {
    numerator: number;
    denominator: number;
  };
  txns?: {
    numerator: number;
    denominator: {
      numerator: number;
      denominator: number;
    };
  };
  volume?: number;
  transactionType?: 'buy' | 'sell';
  points?: number;
}

interface IAddress {
  wallet?: string;
  walletAvatarURL?: string;
  isTransaction?: boolean;
  variant?: 'buy' | 'sell';
}

interface ILeaderboardEntity {
  name?: string;
  walletAvatarURL?: string;
  wallet?: string;
  type?: 'farcaster' | 'wallet';
}

interface ILBTable {
  data: TableItem[];
  variant?: TableVariant;
  loading?: boolean;
  tokenSymbol?: string;
  cta?: (id: string) => void;
  rowClick?: (id: string) => void;
  total?: number;
  take?: number;
  shouldFetchMore?: boolean;
  setShouldFetchMore?: (value: boolean) => void;
}

interface IRow {
  variant: TableVariant;
  item: TableItem;
  items: TableItem[];
  index: number;
  tokenSymbol?: string;
  cta?: (id: string) => void;
  rowClick?: (id: string) => void;
  setShouldFetchMore?: (value: boolean) => void;
  total?: number;
  take?: number;
}

interface ITokenSample {
  tokenLogoURL?: string;
  tokenSymbol?: string;
  tokenAddress?: string;
}

interface ITXNS {
  numerator: number;
  denominator: {
    numerator: number;
    denominator: number;
  };
}

export type { TableItem, TableVariant, IAddress, ILBTable, IRow, ITokenSample, ITXNS, ILeaderboardEntity };
