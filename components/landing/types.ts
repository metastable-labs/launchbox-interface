type TokenDistribution = {
  title: string;
  percentage: number;
};

interface ILBLandingPageComponent {
  logoURL: string;
  navButtonText: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  heroImageURL: string;
  tokenomicsSummary: string;
  tokenTotalSupply: number;
  tokenDistributions: TokenDistribution[];
  tokenSymbol: string;
  buyLink: string;
  xLink: string;
  farcasterLink: string;
  telegramLink: string;
  chainExplorerLink: string;
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
}

interface ILandingLink {
  link: string;
  text: string;
  variant?: "primary" | "secondary";
  color?: string;
  isNavigation?: boolean;
}

interface ITokenomics {
  tokenTotalSupply: number;
  tokenDistributions: TokenDistribution[];
  tokenSymbol: string;
}

interface IDistributionCard {
  title: string;
  color: string;
  percentage: number;
}

export type {
  ILBLandingPageComponent,
  ILandingLink,
  ITokenomics,
  IDistributionCard,
};
