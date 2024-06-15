'use client';
import { useState } from 'react';

import { LBLandingPageComponent } from '@/components';
import { ILBLandingPageComponent } from '@/components/landing/types';

export const defaultData: ILBLandingPageComponent = {
  logoURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717454050/lb-logo_npdu7q.jpg',
  navButtonText: 'Lorem ipsum',
  primaryColor: '#9FE870',
  secondaryColor: '#FFF',
  heroTitle: 'Lorem ipsum dolor sit amet',
  heroDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  ac, nisi.',
  heroPrimaryButtonText: 'Lorem ipsum',
  heroSecondaryButtonText: 'Lorem ipsum',
  heroImageURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717454052/lb-hero-placeholder_xjoaa3.jpg',
  tokenomicsSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  ac, nisi.',
  tokenTotalSupply: 1000000000,
  tokenDistributions: [
    {
      title: 'Launchbox fee',
      percentage: 1,
    },
    {
      title: 'Community Incentives',
      percentage: 9,
    },
    {
      title: 'Fair Launch',
      percentage: 90,
    },
  ],
  tokenSymbol: 'LBT',
  buyLink: 'https://www.landbot.io/',
  xLink: 'https://www.landbot.io/',
  farcasterLink: 'https://www.landbot.io/',
  telegramLink: 'https://www.landbot.io/',
  chainExplorerLink: 'https://www.landbot.io/',
};

const LandingView = () => {
  const [data] = useState<ILBLandingPageComponent>(defaultData);

  return <LBLandingPageComponent {...data} />;
};

export default LandingView;
