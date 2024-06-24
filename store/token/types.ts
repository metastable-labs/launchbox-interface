import { Address } from 'viem';
import { FarcaterChannel } from '../social/types';

type Token = {
  id: string;
  token_name: string;
  token_symbol: string;
  token_address: Address;
  exchange_address: Address;
  token_total_supply: number;
  token_logo_url: string;
  create_token_page: boolean;
  warpcast_channel_link: string;
  website_url: string;
  chain: {
    id: number;
    name: 'optimism' | 'base' | 'mode';
    deployer_address: Address;
    transaction_hash: string;
  };
  socials: {
    warpcast: {
      channel: FarcaterChannel;
    };
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
  market_cap: number;
  token_price_in_usd: number;
  token_price_in_eth: number;
};

type TokenData = {
  logo: File;
  token_name: string;
  token_symbol: string;
  create_token_page: boolean;
  token_total_supply: number;
  token_address?: Address;
  warpcast_channel_link?: string;
  website_url?: string;
  socials?: FarcaterChannel;
};

type Meta = {
  take: number;
  skip: number;
  totalTokens: number;
};

type Tokens = {
  tokens: Token[];
  meta: Meta;
};

type CoinPrice = {
  name: string;
  symbol: string;
  price: number;
  currency: string;
  last_updated: string;
};

export type { Token, TokenData, Meta, Tokens, CoinPrice };
