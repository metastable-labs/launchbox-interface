import { ILBTokenCard } from '../token-card/types';

interface ILBTradeInterface {
  token: ILBTokenCard;
  balance: number;
  standAlone?: boolean;
}

export type { ILBTradeInterface };
