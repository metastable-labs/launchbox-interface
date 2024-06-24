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
    launchboxFactory: '0x965eee85BD8885251c7A04CD7317a7Ab3E1Ce256',
    launchboxExchange: '0x11BBaeE94EEeb0f4Bc56A01cF175dFF0502f588a',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'optimism',
    chainId: optimism.id,
    icon: <OptimismPrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.optimism.io',
    launchboxFactory: '0x965eee85BD8885251c7A04CD7317a7Ab3E1Ce256',
    launchboxExchange: '0x11BBaeE94EEeb0f4Bc56A01cF175dFF0502f588a',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
  {
    variant: 'mode',
    chainId: mode.id,
    icon: <ModePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.mode.network/',
    launchboxFactory: '0x965eee85BD8885251c7A04CD7317a7Ab3E1Ce256',
    launchboxExchange: '0x11BBaeE94EEeb0f4Bc56A01cF175dFF0502f588a',
    factoryAbi: LaunchBoxFactory.abi,
    exchangeAbi: LaunchBoxExchange.abi,
  },
];
