import { ReactNode } from 'react';

interface IOption {
  text: string;
  value: string;
}

interface ILBSecondarySelect {
  text: string;
  onClick: (option: IOption) => void;
  options: IOption[];
  defaultValue: string;
  disabled?: boolean;
  label?: string;
}
export type { IOption, ILBSecondarySelect };
