import { ReactNode } from 'react';

interface ILBModal {
  children: ReactNode;
  show: boolean;
  close?: () => void;
  variant?: 'primary';
  title?: string | ReactNode;
}

export type { ILBModal };
