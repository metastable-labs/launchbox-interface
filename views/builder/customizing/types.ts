import { CustomizeChange, ILBLandingPageComponent, TokenDistribution } from '@/components/landing/types';
import { ReactElement } from 'react';

interface ICustomizingPaper {
  icon: ReactElement;
  isActive: boolean;
  title: string;
  onClick: () => void;
}

interface ICustomizeInterface {
  handleChange: (name: CustomizeChange, value: any) => void;
  data: ILBLandingPageComponent;
  setLogoFile: (file: File) => void;
  setHeroImageFile: (file: File) => void;
  setAboutImageFile: (file: File) => void;
}

type Tabs = 'appearance' | 'navigation' | 'hero' | 'about' | 'tokenomics' | 'faq' | 'footer' | 'undefined';

interface ICustomizeTab {
  isActive: boolean;
  handleChange: (name: CustomizeChange, value: any) => void;
  onClick: (tab: Tabs) => void;
}

interface IAppearance extends ICustomizeTab {
  primaryColor: string;
  secondaryColor: string;
}

interface INavigation extends ICustomizeTab {
  handleLogoFile: (file: File) => void;
  logoURL: string;
  buyLink: string;
  navButtonText: string;
}

interface IHero extends ICustomizeTab {
  heroTitle: string;
  heroDescription: string;
  heroImageURL: string;
  handleHeroImageFile: (file: File) => void;
}

interface IAbout extends ICustomizeTab {
  aboutImageURL: string;
  aboutTitle: string;
  aboutDescription: string;
  handleAboutImageFile: (file: File) => void;
}

interface ITokenomics extends ICustomizeTab {
  tokenTotalSupply: number;
  tokenDistributions: TokenDistribution[];
}

interface IFAQ extends ICustomizeTab {
  faqTitle: string;
  faqDescription: string;
  faqs: { question: string; answer: string }[];
}

interface IFooter extends ICustomizeTab {
  xLink: string;
  farcasterLink: string;
  telegramLink: string;
  chainExplorerLink: string;
}

interface ICustomizeInput {
  label: string;
  placeholder: string;
  handleChange: (value: string) => void;
  instruction?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  rows?: number;
}

interface IInactiveTabs {
  onClick: (tab: Tabs) => void;
}

export type { ICustomizingPaper, ICustomizeInterface, Tabs, ICustomizeTab, IAppearance, INavigation, IHero, ITokenomics, IFooter, ICustomizeInput, IInactiveTabs, IFAQ, IAbout };
