import { SetStateAction, Dispatch } from 'react';

interface FormProp {
  tokenName: string;
  tokenSymbol: string;
  tokenNetwork: string;
  tokenDecimal: string;
  tokenSupply: string;
  tokenWebsiteURL?: string;
  tokenWarpcastChannelLink?: string;
}

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  setNewTokenData?: Dispatch<SetStateAction<NewTokenData | undefined>>;
  tokenData?: NewTokenData;
}

interface ISwitchIcon {
  switched: boolean;
  onClick?: () => void;
}

interface ISwitch {
  handleOverride: () => void;
  switched: boolean;
  title: string;
  instruction: string;
}

interface IConfirmation {
  tokenData: NewTokenData;
}

interface IFirstBuyModal {
  show: boolean;
  tokenSymbol: string;
  tokenLogo: string;
  firstBuyAmount: number;
  setFirstBuyAmount: Dispatch<SetStateAction<number>>;
  firstBuyTokenAmount: number;
  setFirstBuyTokenAmount: Dispatch<SetStateAction<number>>;
}

type NewTokenData = {
  createTokenPage: boolean;
  tokenLogo: File | null;
  firstBuyAmount: number;
  firstBuyTokenAmount: number;
  tokenName: string;
  tokenSymbol: string;
  tokenNetwork: string;
  tokenDecimal: string;
  tokenSupply: number;
  tokenWebsiteURL?: string | undefined;
  tokenWarpcastChannelLink?: string | undefined;
};

export type { StepProps, FormProp, ISwitchIcon, ISwitch, IConfirmation, IFirstBuyModal, NewTokenData };
