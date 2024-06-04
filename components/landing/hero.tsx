import Image from "next/image";
import classNames from "classnames";

import LBContainer from "../container";
import PoweredBy from "./powered-by";
import LandingLink from "./landing-link";
import { IHero } from "./types";

const Hero = ({
  isBuilder,
  isDesktop,
  isMobile,
  buyLink,
  heroDescription,
  heroPrimaryButtonText,
  heroTitle,
  chainExplorerLink,
  heroImageURL,
  heroSecondaryButtonText,
  primaryColor,
  secondaryColor,
}: IHero) => (
  <LBContainer>
    <section
      className={classNames("", {
        "pt-[128px] md:pt-[160px] flex flex-col md:flex-row items-center justify-between gap-20 pb-[72px] md:px-12 lg:px-7 xl:px-[60px]":
          !isBuilder,
        "py-[45px] flex items-center justify-between gap-[50.111px] w-full":
          isBuilder && isDesktop,
        "py-[45px] flex flex-col items-stretch justify-center gap-20 -mx-20 px-5":
          isBuilder && isMobile,
      })}
    >
      <div
        className={classNames("flex flex-col items-start", {
          "gap-10": !isBuilder || (isBuilder && isMobile),
          "gap-[25.06px] w-full": isBuilder && isDesktop,
        })}
      >
        <div
          className={classNames("flex flex-col items-start", {
            "gap-4": !isBuilder || (isBuilder && isMobile),
            "gap-2.5 w-full": isBuilder && isDesktop,
          })}
        >
          <PoweredBy
            isBuilder={isBuilder}
            isDesktop={isDesktop}
            isMobile={isMobile}
          />

          <h1
            className={classNames("text-primary-1650 font-semibold", {
              "text-[37px] leading-[44.4px] tracking-[-0.37px] lg:text-[68px] lg:leading-[81.6px] lg:tracking-[-0.68px] w-full lg:max-w-[512px]":
                !isBuilder,
              "text-[42.594px] leading-[51.113px] tracking-[-0.426px]":
                isBuilder && isDesktop,
              "text-[37px] leading-[44.4px] tracking-[-0.37px] w-full":
                isBuilder && isMobile,
            })}
          >
            {heroTitle}
          </h1>

          <p
            className={classNames("text-primary-1700", {
              "text-[18px] leading-[27px] w-full lg:max-w-[473px]": !isBuilder,
              "text-[11.275px] leading-[16.913px] max-w-[296px]":
                isBuilder && isDesktop,
              "text-base w-full": isBuilder && isMobile,
            })}
          >
            {heroDescription}
          </p>
        </div>

        <div
          className={classNames("", {
            "flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 w-full md:w-auto":
              !isBuilder,
            "flex items-center justify-start gap-[10.02px] w-full":
              isBuilder && isDesktop,
            "flex flex-col items-stretch justify-center gap-4 w-full":
              isBuilder && isMobile,
          })}
        >
          <LandingLink
            link={buyLink}
            text={heroPrimaryButtonText}
            color={primaryColor}
            isBuilder={isBuilder}
          />
          <LandingLink
            link={chainExplorerLink}
            text={heroSecondaryButtonText}
            color={secondaryColor}
            variant="secondary"
            isBuilder={isBuilder}
          />
        </div>
      </div>

      <Image
        src={heroImageURL}
        alt="hero"
        width={500}
        height={500}
        className={classNames("object-cover", {
          "w-[343px] h-[343px] md:w-[260px] md:h-[260px] lg:w-[500px] lg:h-[500px]":
            !isBuilder,
          "w-[313px] h-[313px]": isBuilder && isDesktop,
          "w-[343px] h-[343px]": isBuilder && isMobile,
        })}
      />
    </section>
  </LBContainer>
);

export default Hero;
