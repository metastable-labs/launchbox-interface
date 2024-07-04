type TokenDistribution = {
  title: string;
  percentage: number;
};

type BuilderData = {
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
  aboutImageURL: string;
  aboutTitle: string;
  aboutDescription: string;
  faqTitle: string;
  faqDescription: string;
  faqs: { question: string; answer: string }[];
  logoFile: File | null;
  heroImageFile: File | null;
  aboutImageFile: File | null;
};
