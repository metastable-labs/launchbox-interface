import { Address } from 'viem';

type TransactionResponse = {
  data: Transaction[];
  meta: TransactionMeta;
};

type Transaction = {
  id: string;
  address: Address;
  token_value: string;
  token_value_in_usd: number;
  eth_value: string;
  fee: string;
  type: 'buy' | 'sell';
  transaction_hash: Address;
  block_number: number;
  token_id: string;
  created_at: string;
  updated_at: string;
};

type TransactionMeta = {
  take: number;
  skip: number;
  total_count: number;
  total_sell_count: number;
  total_buy_count: number;
};

export type { Transaction, TransactionResponse, TransactionMeta };
