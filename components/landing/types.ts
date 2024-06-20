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
  aboutImageURL: string;
  aboutTitle: string;
  aboutDescription: string;
  faqTitle: string;
  faqDescription: string;
  faqs: { question: string; answer: string }[];
}

type CustomizeChange =
  | 'logoURL'
  | 'navButtonText'
  | 'primaryColor'
  | 'secondaryColor'
  | 'heroTitle'
  | 'heroDescription'
  | 'heroPrimaryButtonText'
  | 'heroSecondaryButtonText'
  | 'heroImageURL'
  | 'tokenomicsSummary'
  | 'tokenTotalSupply'
  | 'tokenDistributions'
  | 'tokenSymbol'
  | 'buyLink'
  | 'xLink'
  | 'farcasterLink'
  | 'telegramLink'
  | 'chainExplorerLink'
  | 'aboutImageURL'
  | 'aboutTitle'
  | 'aboutDescription'
  | 'faqTitle'
  | 'faqDescription'
  | 'faqs';

interface ILandingLink {
  link: string;
  text: string;
  variant?: 'primary' | 'secondary';
  color?: string;
  isNavigation?: boolean;
  isBuilder?: boolean;
}

interface ITokenomics {
  tokenTotalSupply: number;
  tokenDistributions: TokenDistribution[];
  tokenSymbol: string;
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
}

interface IDistributionCard {
  title: string;
  color: string;
  percentage: number;
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
}

interface IPoweredBy {
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
}

type FooterLink = {
  title: string;
  links: { title: string; link: string }[];
  hidden?: boolean;
};

interface IFooter {
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
  footerLinks: FooterLink[];
  logoURL: string;
}

interface IHero {
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
  heroTitle: string;
  heroDescription: string;
  buyLink: string;
  heroPrimaryButtonText: string;
  primaryColor: string;
  chainExplorerLink: string;
  heroSecondaryButtonText: string;
  secondaryColor: string;
  heroImageURL: string;
}

interface IAbout {
  aboutImageURL: string;
  aboutTitle: string;
  aboutDescription: string;
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
}

interface IFAQ {
  faqTitle: string;
  faqDescription: string;
  faqs: { question: string; answer: string }[];
  isBuilder?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
}

export type { TokenDistribution, ILBLandingPageComponent, ILandingLink, ITokenomics, IDistributionCard, IPoweredBy, IFooter, IHero, CustomizeChange, IAbout, IFAQ };
