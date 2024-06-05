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
}

interface StepProps {
  network: Network;
  setStep: Dispatch<SetStateAction<number>>;
  tokenSymbol?: string;
  tokenName?: string;
  setTokenSymbol?: Dispatch<SetStateAction<string>>;
  setTokenName?: Dispatch<SetStateAction<string>>;
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

interface IConfirmationModal {
  tokenSymbol: string;
  tokenName: string;
  network: Network;
  tokenSupply: string;
  tokenDecimal: string;
  show: boolean;
  close: () => void;
}

export type { StepProps, FormProp, ISwitchIcon, ISwitch, IConfirmationModal };
