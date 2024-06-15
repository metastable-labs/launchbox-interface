import '@rainbow-me/rainbowkit/styles.css';

import { ReactNode } from 'react';
import { base, optimism, mode } from 'wagmi/chains';

import LaunchBoxFactory from './abis/LaunchBoxFactory.json';
import LaunchBoxExchange from './abis/LaunchBoxExchange.json';

import { BasePrimaryMobileIcon, ModePrimaryMobileIcon, OptimismPrimaryMobileIcon } from '@/public/icons';
import { Address } from 'viem';

export type Network = 'base' | 'optimism' | 'mode';

export interface NetworkProps {
  variant?: Network;
  onClick?: (network: Network) => void;
  chainId: number;
  icon?: ReactNode;
  comingSoon?: boolean;
  rpcUrl?: string;
  launchboxFactory: Address;
  launchboxExchange: Address;
  factoryAbi?: any;
  exchangeAbi?: any;
}

export const networks: NetworkProps[] = [
  {
    variant: 'base',
    chainId: base.id,
    icon: <BasePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.gateway.tenderly.co',
    launchboxFactory: '0x1f7c7BAf64FbfD9eB8a0Aa9ad52c85f70f2297A4',
    launchboxExchange: '0xD1012738d8e2f20681C09E5941D9D97B441232c7',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'optimism',
    chainId: optimism.id,
    icon: <OptimismPrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.optimism.io',
    launchboxFactory: '0x1f7c7BAf64FbfD9eB8a0Aa9ad52c85f70f2297A4',
    launchboxExchange: '0xD1012738d8e2f20681C09E5941D9D97B441232c7',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'mode',
    chainId: mode.id,
    icon: <ModePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.mode.network/',
    launchboxFactory: '0x1f7c7BAf64FbfD9eB8a0Aa9ad52c85f70f2297A4',
    launchboxExchange: '0xD1012738d8e2f20681C09E5941D9D97B441232c7',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
];
