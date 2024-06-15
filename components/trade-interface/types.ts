import { Token } from '@/store/token/types';

interface ILBTradeInterface {
  token: Token;
  balance: number;
  standAlone?: boolean;
}

export type { ILBTradeInterface };
