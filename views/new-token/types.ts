import { Network } from "@/components/button/types";
import { SetStateAction, Dispatch } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

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
  network: Network;
  setStep: Dispatch<SetStateAction<number>>;
  setNewTokenData?: Dispatch<SetStateAction<NewTokenData | undefined>>;
  tokenData?: NewTokenData;
}

interface ISwitchIcon {
  switched: boolean;
  onClick?: () => void;
  network: Network;
}

interface ISwitch {
  handleOverride: () => void;
  switched: boolean;
  network: Network;
  title: string;
  instruction: string;
}

interface IConfirmation {
  tokenData: NewTokenData;
  network: Network;
}

interface IFirstBuyModal {
  show: boolean;
  network: Network;
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
  tokenSupply: string;
  tokenWebsiteURL?: string | undefined;
  tokenWarpcastChannelLink?: string | undefined;
};

export type {
  StepProps,
  FormProp,
  ISwitchIcon,
  ISwitch,
  IConfirmation,
  IFirstBuyModal,
  NewTokenData,
};
