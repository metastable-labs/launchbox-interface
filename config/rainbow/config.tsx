import "@rainbow-me/rainbowkit/styles.css";

import { ReactNode } from "react";
import { base, optimism, mode } from "wagmi/chains";

import OptimismMintableERC20Factory from "./abis/OptimismMintableERC20Factory.json";
import BasedERC20FactoryMain from "./abis/BasedERC20FactoryMain.json";

import {
  BasePrimaryMobileIcon,
  ModePrimaryMobileIcon,
  OptimismPrimaryMobileIcon,
} from "@/public/icons";

export type Network = "base" | "optimism" | "mode";

export interface NetworkProps {
  variant?: Network;
  onClick?: (network: Network) => void;
  chainId: number;
  icon?: ReactNode;
  comingSoon?: boolean;
  rpcUrl?: string;
  factoryAddress?: `0x${string}`;
  superFactoryAddress?: `0x${string}`;
  abi?: any;
}

export const networks: NetworkProps[] = [
  {
    variant: "base",
    chainId: base.id,
    icon: <BasePrimaryMobileIcon />,
    rpcUrl: "https://mainnet.gateway.tenderly.co",
    factoryAddress: "0xf23d369d7471bd9f6487e198723eea023389f1d4",
    superFactoryAddress: "0x7F46a4944F9C3ecF4Ea622364132b3fE9aBa1015",
    abi: BasedERC20FactoryMain.abi,
  },
  {
    variant: "optimism",
    chainId: optimism.id,
    icon: <OptimismPrimaryMobileIcon />,
    rpcUrl: "https://mainnet.optimism.io",
    factoryAddress: "0x4200000000000000000000000000000000000012",
    superFactoryAddress: "0x885E7a50287d62Fc4b490EB38eA599bF2F48c19F",
    abi: OptimismMintableERC20Factory.abi,
  },
  {
    variant: "mode",
    chainId: mode.id,
    icon: <ModePrimaryMobileIcon />,
    rpcUrl: "https://mainnet.mode.network/",
    factoryAddress: "0x49e14991C9E735975a782F3C2AAc8C26DE8245fA",
    superFactoryAddress: "0x49e14991C9E735975a782F3C2AAc8C26DE8245fA",
    abi: OptimismMintableERC20Factory.abi,
  },
];
