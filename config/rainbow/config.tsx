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
    launchboxFactory: '0xb4a3244f839104542068CE35f2ba4FA9BFC082DB',
    launchboxExchange: '0x99FDcA64009B90a3D28D3D18290C403E6F2935d3',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'optimism',
    chainId: optimism.id,
    icon: <OptimismPrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.optimism.io',
    launchboxFactory: '0xb4a3244f839104542068CE35f2ba4FA9BFC082DB',
    launchboxExchange: '0x99FDcA64009B90a3D28D3D18290C403E6F2935d3',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'mode',
    chainId: mode.id,
    icon: <ModePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.mode.network/',
    launchboxFactory: '0xb4a3244f839104542068CE35f2ba4FA9BFC082DB',
    launchboxExchange: '0x99FDcA64009B90a3D28D3D18290C403E6F2935d3',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
];
