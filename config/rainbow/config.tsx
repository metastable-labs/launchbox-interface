import '@rainbow-me/rainbowkit/styles.css';

import { ReactNode } from 'react';
import { base, optimism, mode } from 'wagmi/chains';

import LaunchBoxFactory from './abis/LaunchBoxFactory.json';
import LaunchBoxExchange from './abis/LaunchBoxExchange.json';

import { BasePrimaryMobileIcon, ModePrimaryMobileIcon, OptimismPrimaryMobileIcon } from '@/public/icons';

export type Network = 'base' | 'optimism' | 'mode';

export interface NetworkProps {
  variant?: Network;
  onClick?: (network: Network) => void;
  chainId: number;
  icon?: ReactNode;
  comingSoon?: boolean;
  rpcUrl?: string;
  launchboxERC20Factory: `0x${string}`;
  factoryAbi?: any;
  exchangeAbi?: any;
}

export const networks: NetworkProps[] = [
  {
    variant: 'base',
    chainId: base.id,
    icon: <BasePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.gateway.tenderly.co',
    launchboxERC20Factory: '0xd94ec8ab4789c0cd88b61e1bda846459668ed920',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'optimism',
    chainId: optimism.id,
    icon: <OptimismPrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.optimism.io',
    launchboxERC20Factory: '0xd94ec8ab4789c0cd88b61e1bda846459668ed920',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'mode',
    chainId: mode.id,
    icon: <ModePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.mode.network/',
    launchboxERC20Factory: '0xd94ec8ab4789c0cd88b61e1bda846459668ed920',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
];
