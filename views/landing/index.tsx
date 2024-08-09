'use client';
import { useEffect, useState } from 'react';

import { LBLandingPageComponent } from '@/components';
import { ILBLandingPageComponent } from '@/components/landing/types';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import Skeleton from './skeleton';

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
  aboutImageURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717454052/lb-hero-placeholder_xjoaa3.jpg',
  aboutTitle: 'About the project',
  aboutDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  ac, nisi.',
  faqTitle: 'Frequently asked questions',
  faqDescription: 'Everything you need to know about the project.',
  faqs: [
    {
      question: 'What is the project about?',
      answer: 'Lorem ipsum dolor sit amet, ',
    },
    {
      question: 'How can I participate?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  ac, nisi.',
    },
  ],
};

const TokenLandingPageView = () => {
  const [data, setData] = useState<ILBLandingPageComponent>();
  const { tokenState } = useSystemFunctions();

  const loading = !data || tokenState?.loading;

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
  }, []);

  useEffect(() => {
    const data = tokenState.token?.website_builder;
    if (!data) return;
    const websiteBuilderData: ILBLandingPageComponent = {
      aboutDescription: data?.about_section?.description!,
      aboutImageURL: data?.about_section?.image_url!,
      aboutTitle: data?.about_section?.title!,
      buyLink: data?.navigation?.buy_url!,
      chainExplorerLink: data?.footer?.chain_explorer_url!,
      faqDescription: data?.faq?.description!,
      faqTitle: data?.faq?.title!,
      faqs: data?.faq?.questions!.map((faq) => ({
        question: faq.title!,
        answer: faq.answer!,
      }))!,
      heroDescription: data?.hero_section?.description!,
      heroImageURL: data?.hero_section?.image_url!,
      heroPrimaryButtonText: 'Buy Now',
      heroSecondaryButtonText: 'Learn More',
      heroTitle: data?.hero_section?.title!,
      logoURL: data?.navigation?.logo_url!,
      navButtonText: 'Buy Now',
      primaryColor: data?.appearance?.primary_color!,
      secondaryColor: data?.appearance?.secondary_color!,
      telegramLink: data?.footer?.telegram_url!,
      farcasterLink: data?.footer?.farcaster_url!,
      tokenSymbol: tokenState.token?.token_symbol!,
      tokenDistributions: data?.tokenomics
        ? Object.entries(data?.tokenomics!)?.map(([title, percentage]) => ({
            title,
            percentage: Number(percentage),
          }))
        : [],
      tokenTotalSupply: tokenState.token?.token_total_supply!,
      tokenomicsSummary: 'This is this is the total distribution of the token',
      xLink: data?.footer?.twitter_url!,
    };

    setData(websiteBuilderData);
  }, [tokenState.token]);

  if (loading) return <Skeleton />;

  return <LBLandingPageComponent {...data} />;
};

export default TokenLandingPageView;
