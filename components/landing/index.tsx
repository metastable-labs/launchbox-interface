import classNames from 'classnames';
import Image from 'next/image';

import { ILBLandingPageComponent } from './types';
import LBContainer from '../container';
import LandingLink from './landing-link';
import Hero from './hero';
import About from './about';
import Tokenomics from './tokenomics';
import FAQ from './faq';
import Footer from './footer';

const LBLandingPageComponent = (props: ILBLandingPageComponent) => {
  const {
    aboutDescription,
    aboutImageURL,
    aboutTitle,
    buyLink,
    chainExplorerLink,
    faqDescription,
    faqTitle,
    faqs,
    farcasterLink,
    heroDescription,
    heroImageURL,
    heroPrimaryButtonText,
    heroSecondaryButtonText,
    heroTitle,
    logoURL,
    navButtonText,
    primaryColor,
    secondaryColor,
    telegramLink,
    tokenDistributions,
    tokenSymbol,
    tokenTotalSupply,
    tokenomicsSummary,
    xLink,
    isBuilder,
    isDesktop,
    isMobile,
  } = props;

  const footerLinks = [
    {
      title: 'Social',
      links: [
        { title: 'X (Twitter)', link: xLink },
        { title: 'Telegram', link: telegramLink },
        { title: 'Farcaster', link: farcasterLink },
      ],
    },
    {
      title: 'Token',
      links: [
        { title: 'Coingecko', link: xLink },
        { title: 'Basescan', link: telegramLink },
        { title: 'Dexscreener', link: farcasterLink },
      ],
      hidden: isBuilder,
    },
  ];

  const heroData = {
    buyLink,
    chainExplorerLink,
    heroDescription,
    heroImageURL,
    heroPrimaryButtonText,
    heroSecondaryButtonText,
    heroTitle,
    primaryColor,
    secondaryColor,
    isBuilder,
    isDesktop,
    isMobile,
  };

  const aboutData = {
    aboutDescription,
    aboutImageURL,
    aboutTitle,
    isBuilder,
    isMobile,
    isDesktop,
  };

  const tokenomicsData = {
    tokenDistributions,
    tokenSymbol,
    tokenTotalSupply,
    tokenomicsSummary,
    isBuilder,
    isMobile,
    isDesktop,
  };

  const faqData = {
    faqDescription,
    faqTitle,
    faqs,
    isBuilder,
    isDesktop,
    isMobile,
  };

  const footerData = {
    footerLinks,
    isBuilder,
    isDesktop,
    isMobile,
    logoURL,
  };

  return (
    <main
      className={classNames('transition-all ease-in-out duration-500 relative', {
        'rounded-xl border border-primary-50 shadow-preview-shadow': isBuilder,
        'w-full h-fit mb-10': isBuilder && isDesktop,
        'w-[375px] h-fit mb-10': isBuilder && isMobile,
      })}>
      {isBuilder && (
        <div className="flex flex-col justify-center items-stretch overflow-hidden">
          <Image
            src={'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717504705/Browser_top_lbycmr.jpg'}
            alt="browser-top"
            width={2000}
            height={2000}
            className="object-cover w-full rounded-full"
          />
        </div>
      )}

      <header
        className={classNames('border-b border-b-primary-1400 bg-white flex justify-between items-center', {
          'fixed w-screen z-30  py-5 px-4 md:px-20': !isBuilder,
          'px-[50.11px] py-[12.53px] h-[55px]': isBuilder && isDesktop,
          'px-4 py-1 h-[55px]': isBuilder && isMobile,
        })}>
        <Image
          src={logoURL}
          alt="logo"
          width={500}
          height={500}
          className={classNames('object-cover', {
            'w-[104px] h-[38px]': !isBuilder,
            'w-[65px] h-[24px]': isBuilder && (isDesktop || isMobile),
          })}
        />

        <LandingLink link={buyLink} text={navButtonText} color={primaryColor} isNavigation isBuilder={isBuilder} />
      </header>

      <Hero {...heroData} />

      <About {...aboutData} />

      <section className="bg-primary-1750 bg-opacity-60">
        <LBContainer>
          <div
            className={classNames('flex flex-col w-full', {
              'py-[120px] mt-[80px] md:px-12 lg:px-7 xl:px-[60px] gap-16': !isBuilder,
              'py-[75.17px] flex items-center justify-between gap-10 w-full': isBuilder && isDesktop,
              'py-[120px] flex items-center justify-center gap-16 w-full px-5': isBuilder && isMobile,
            })}>
            <div
              className={classNames('flex flex-col self-stretch items-start', {
                'gap-4': !isBuilder || (isBuilder && isMobile),
                'gap-2.5': isBuilder && isDesktop,
                '-mx-20': isBuilder && isMobile,
              })}>
              <h1
                className={classNames('text-primary-1650 font-semibold', {
                  'text-[37px] leading-[44.4px] tracking-[-0.37px] lg:text-[52px] lg:leading-[62.4px] lg:tracking-[-0.52px]': !isBuilder,
                  'text-[32.572px] leading-[39.087px] tracking-[-0.326px]': isBuilder && isDesktop,
                  'text-[37px] leading-[44.4px] tracking-[-0.37px]': isBuilder && isMobile,
                })}>
                Tokenomics
              </h1>

              <p
                className={classNames('text-primary-1700', {
                  'text-base md:text-[18px] md:leading-[27px] w-full md:max-w-[745px]': !isBuilder,
                  'text-[11.275px] leading-[16.913px] max-w-[466.66px]': isBuilder && isDesktop,
                  'text-base w-full': isBuilder && isMobile,
                })}>
                {tokenomicsSummary}
              </p>
            </div>

            <Tokenomics {...tokenomicsData} />
          </div>
        </LBContainer>
      </section>

      <FAQ {...faqData} />

      <Footer {...footerData} />

      {
        <div className={classNames('absolute left-0 w-full flex flex-col', { 'top-[81px] md:gap-[498px] -z-10': !isBuilder, 'top-[55px] -z-10 gap-[288px]': isBuilder })}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Image key={index} src="/icons/Divider.svg" alt="divider" width={2000} height={2000} className="object-cover w-full" />
          ))}
        </div>
      }
    </main>
  );
};

export default LBLandingPageComponent;
