import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";

import { ILBLandingPageComponent, ILandingLink } from "./types";
import LBContainer from "../container";
import { Flashicon } from "@/public/icons";
import LandingLink from "./landing-link";
import Tokenomics from "./tokenomics";

const LBLandingPageComponent = (props: ILBLandingPageComponent) => {
  const {
    buyLink,
    chainExplorerLink,
    farcasterLink,
    heroDescription,
    heroImageURL,
    heroPrimaryButtonText,
    heroSecondaryButtonText,
    heroTitle,
    isBuilder,
    isDesktop,
    isMobile,
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
  } = props;
  const footerLinks = [
    {
      title: "Social",
      links: [
        { title: "X (Twitter)", link: xLink },
        { title: "Telegram", link: telegramLink },
        { title: "Farcaster", link: farcasterLink },
      ],
    },
    {
      title: "Token",
      links: [
        { title: "Coingecko", link: xLink },
        { title: "Basescan", link: telegramLink },
        { title: "Dexscreener", link: farcasterLink },
      ],
      hidden: isBuilder,
    },
  ];
  return (
    <main>
      <header
        className={classNames("", {
          "fixed w-screen z-30 flex justify-between items-center py-5 px-4 md:px-20 border-b border-b-primary-1400 bg-white":
            !isBuilder,
          "": isBuilder && isDesktop,
          "": isBuilder && isMobile,
        })}
      >
        <Image
          src={logoURL}
          alt="logo"
          width={500}
          height={500}
          className="object-cover w-[104px] h-[38px]"
        />

        <LandingLink
          link={buyLink}
          text={navButtonText}
          color={primaryColor}
          isNavigation
        />
      </header>

      <LBContainer>
        <section
          className={classNames(
            "flex flex-col md:flex-row items-center justify-between gap-20 pb-[72px] md:px-12 lg:px-7 xl:px-[60px]",
            { "pt-[128px] md:pt-[160px]": !isBuilder }
          )}
        >
          <div className="flex flex-col gap-10 items-start">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center justify-center gap-2 h-8 py-3 pl-3 pr-4 rounded-full bg-primary-1600">
                <Flashicon />
                <span className="text-primary-1450 text-[14px] leading-[22.4px] font-medium">
                  Powered by Launchbox
                </span>
              </div>
              <h1 className="text-primary-1650 text-[37px] leading-[44.4px] tracking-[-0.37px] lg:text-[68px] lg:leading-[81.6px] lg:tracking-[-0.68px] font-semibold w-full lg:max-w-[512px]">
                {heroTitle}
              </h1>
              <p className="text-primary-1700 text-[18px] leading-[27px] w-full lg:max-w-[473px]">
                {heroDescription}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 w-full md:w-auto ">
              <LandingLink
                link={buyLink}
                text={heroPrimaryButtonText}
                color={primaryColor}
              />
              <LandingLink
                link={chainExplorerLink}
                text={heroSecondaryButtonText}
                color={secondaryColor}
                variant="secondary"
              />
            </div>
          </div>

          <Image
            src={heroImageURL}
            alt="hero"
            width={500}
            height={500}
            className="object-cover w-[343px] h-[343px] md:w-[260px] md:h-[260px] lg:w-[500px] lg:h-[500px]"
          />
        </section>
      </LBContainer>

      <section className="bg-primary-1750">
        <LBContainer>
          <div className="py-[120px] mt-[80px] md:px-12 lg:px-7 xl:px-[60px] flex flex-col gap-16">
            <div className="flex flex-col self-stretch gap-4 items-start">
              <h1 className="text-primary-1650 text-[37px] leading-[44.4px] tracking-[-0.37px] lg:text-[52px] lg:leading-[62.4px] lg:tracking-[-0.52px] font-semibold">
                Tokenomics
              </h1>

              <p className="text-base md:text-[18px] md:leading-[27px] text-primary-1700 w-full md:max-w-[745px]">
                {tokenomicsSummary}
              </p>
            </div>

            <Tokenomics
              tokenDistributions={tokenDistributions}
              tokenSymbol={tokenSymbol}
              tokenTotalSupply={tokenTotalSupply}
            />
          </div>
        </LBContainer>
      </section>

      <footer className="flex items-center justify-center px-5 md:px-7 lg:px-[140px] py-16 bg-white">
        <div className="w-full flex flex-col items-center justify-center gap-[72px]">
          <div className="w-full flex flex-col md:flex-row md:justify-between gap-9">
            <Image
              src={logoURL}
              alt="logo"
              width={500}
              height={500}
              className="object-cover w-[104px] h-[38px]"
            />

            <div className="w-full md:w-3/5 flex flex-col md:flex-row gap-[61px]">
              {footerLinks.map(({ links, title, hidden }, index) => (
                <div key={index} className="flex flex-col gap-4 min-w-[147px]">
                  <span className="text-primary-1850 ">{title}</span>

                  <div className="flex flex-col items-start justify-center gap-3">
                    {links.map(({ title, link }, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        className="font-medium text-primary-1900"
                      >
                        {title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 h-8 py-3 pl-3 pr-4 rounded-full bg-primary-1600">
            <Flashicon />
            <span className="text-primary-1450 text-[14px] leading-[22.4px] font-medium">
              Powered by Launchbox
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LBLandingPageComponent;
