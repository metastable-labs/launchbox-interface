import { Address } from 'viem';

type Token = {
  id: string;
  token_name: string;
  token_symbol: string;
  token_decimals: number;
  token_address: Address;
  token_total_supply: number;
  token_logo_url: number;
  create_token_page: boolean;
  warpcast_channel_link: string;
  website_url: string;
  chain: {
    id: number;
    name: 'optimism' | 'base' | 'mode';
    deployer_address: Address;
    transaction_hash: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type TokenData = {
  logo: File;
  token_name: string;
  token_symbol: string;
  token_decimals: string;
  create_token_page: boolean;
  token_total_supply: number;
  token_address?: Address;
  warpcast_channel_link?: string;
  website_url?: string;
};

export type { Token, TokenData };