import { FarcaterChannel } from '@/store/social/types';
import { SetStateAction, Dispatch } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';

interface FormProp {
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: string;
  tokenWebsiteURL?: string;
  tokenTelegramURL?: string;
  tokenTwitterURL?: string;
  warpcastChannelId?: string;
  tokenPageName?: string;
}

interface StepProps {
  setStep?: Dispatch<SetStateAction<number>>;
  setNewTokenData?: Dispatch<SetStateAction<NewTokenData | undefined>>;
  tokenData?: NewTokenData;
  register?: UseFormRegister<FormProp>;
  watch?: UseFormWatch<FormProp>;
  errors?: FieldErrors<FormProp>;
  setFile?: Dispatch<SetStateAction<File | null>>;
  file?: File | null;
  tokenSymbol?: string;
  createTokenPage?: boolean;
  setCreateTokenPage?: Dispatch<SetStateAction<boolean>>;
  setValue?: UseFormSetValue<FormProp>;
  setDisableHeader?: Dispatch<SetStateAction<boolean>>;
}

interface ISwitchIcon {
  switched?: boolean;
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
  handleTokenDeployment: () => void;
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
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: number;
  tokenWebsiteURL?: string | undefined;
  farcasterChannel?: FarcaterChannel;
  tokenTelegramURL?: string | undefined;
  tokenTwitterURL?: string | undefined;
  tokenPageName?: string | undefined;
};

export type { StepProps, FormProp, ISwitchIcon, ISwitch, IConfirmation, IFirstBuyModal, NewTokenData };
