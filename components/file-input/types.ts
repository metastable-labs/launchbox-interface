import { Network } from '../button/types';

interface ILBFileInput {
  name: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  handleFileChange: any;
  network?: Network;
  show?: boolean;
}

export type { ILBFileInput };
