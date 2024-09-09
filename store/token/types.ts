import { Address } from 'viem';
import { FarcaterChannel } from '../social/types';

type WebsiteBuilder = {
  hero_section: {
    title: string;
    description: string;
    image_url: string;
  };
  about_section: {
    title: string;
    description: string;
    image_url: string;
  };
  appearance: {
    primary_color: string;
    secondary_color: string;
  };
  navigation: {
    buy_url: string;
    logo_url: string;
  };
  tokenomics: {
    'Launchbox fee': string;
    'Community Incentives': string;
    'Fair Launch': string;
  };
  faq: {
    title: string;
    description: string;
    questions: {
      title: string;
      answer: string;
    }[];
  };
  footer: {
    twitter_url: string;
    farcaster_url: string;
    telegram_url: string;
    chain_explorer_url: string;
  };
};

type Token = {
  id: string;
  token_name: string;
  token_symbol: string;
  token_address: Address;
  exchange_address: Address;
  token_total_supply: number;
  token_logo_url: string;
  create_token_page: boolean;
  create_token_page_slug: string;
  warpcast_channel_link: string;
  website_url: string;
  twitter_url: string;
  telegram_url: string;
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
  website_builder: WebsiteBuilder;
  created_at: string;
  updated_at: string;
  market_cap: number;
  price: number;
  volume: number;
  total_buy_count: number;
  total_sell_count: number;
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
  twitter_url?: string;
  telegram_url?: string;
  create_token_page_slug?: string;
};

type Meta = {
  take: number;
  skip: number;
  total_count: number;
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

type Analytics = {
  averagePrice: string;
  minPrice: string;
  maxPrice: string;
  priceAtStart: string;
  priceAtEnd: string;
  percentageChange: string;
  isIncreased: boolean;
  dataPoints: {
    date: string;
    timestamp: number;
    price: string;
  }[];
};

export type { Token, TokenData, Meta, Tokens, CoinPrice, Analytics };
