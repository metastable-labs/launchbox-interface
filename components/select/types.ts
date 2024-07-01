import { ReactNode } from 'react';

interface IOption {
  text: string;
  value: string;
  icon: ReactNode;
  id: string;
}

interface ILBSelect {
  text: string;
  onClick?: (option: IOption) => void;
  options?: IOption[];
  defaultId?: string;
  disabled?: boolean;
  label?: string;
  isOptional?: boolean;
  textIcon?: ReactNode;
  instruction?: string;
}
export type { IOption, ILBSelect };
