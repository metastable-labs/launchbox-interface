import { Address } from 'viem';

type HolderResponse = {
  data: Holder[];
  meta: HolderMeta;
};

type Holder = {
  id: string;
  address: Address;
  balance: string;
  block_number: number;
  token_id: string;
  created_at: string;
  updated_at: string;
};

type HolderMeta = {
  take: number;
  skip: number;
  total_count: number;
};

export type { Holder, HolderResponse, HolderMeta };
