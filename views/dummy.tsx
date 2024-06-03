import { ReactNode } from "react";

import { Network } from "@/components/button/types";
import {
  BasePrimaryMobileIcon,
  ModePrimaryMobileIcon,
  OptimismPrimaryMobileIcon,
} from "@/public/icons";

export interface NetworkProps {
  title: string;
  variant?: Network;
  onClick?: (network: Network) => void;
  chainId: number;
  icon?: ReactNode;
  comingSoon?: boolean;
}

export const networks: NetworkProps[] = [
  {
    title: "Base",
    variant: "base",
    chainId: 1,
    icon: <BasePrimaryMobileIcon />,
  },
  {
    title: "Optimism",
    variant: "optimism",
    chainId: 2,
    icon: <OptimismPrimaryMobileIcon />,
  },
  {
    title: "Mode",
    variant: "mode",
    chainId: 3,
    icon: <ModePrimaryMobileIcon />,
  },
];
