"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

import { Network } from "@/components/button/types";
import { LBClickAnimation, LBContainer } from "@/components";
import PrimaryHeader from "./primary-header";
import {
  BaseBadgeicon,
  ConfigSiteIcon,
  CopyIcon,
  ShareIcon,
} from "@/public/icons";
import { tokenDetailData } from "./dummy";
import useCopy from "@/hooks/useCopy";
import Overview from "./overview";
import Leaderboard from "./leaderboard";
import { Tabs, SecondaryTabs } from "./types";

const tabTexts = ["overview", "leaderboard"];
const secondaryTabTexts = ["transactions", "holders"];

const TokenDetailsView = ({
  tokenId,
  network,
}: {
  tokenId: string;
  network: Network;
}) => {
  const [tab, setTab] = useState<Tabs>("overview");
  const [secondaryTab, setSecondaryTab] =
    useState<SecondaryTabs>("transactions");
  const copy = useCopy();
  const {
    name,
    siteConfigLink,
    symbol,
    tokenAddress,
    tokenImageURL,
    networkBadgeURL,
  } = tokenDetailData;

  const actions = [
    {
      text: "Token address",
      icon: <CopyIcon />,
      onClick: () => copy(tokenAddress),
    },

    {
      text: "Configure site",
      icon: <ConfigSiteIcon />,
      onClick: () => window.open(siteConfigLink, "_blank"),
    },
  ];

  const tabs = [
    <Overview tokenDetailData={tokenDetailData} key={0} />,
    <Leaderboard key={1} />,
  ];

  return (
    <LBContainer>
      <div className="pt-12 flex flex-col gap-9 lg:px-8 items-stretch pb-14">
        <PrimaryHeader network={network} />

        <div className="flex flex-col gap-8 items-stretch border-b border-primary-50">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-start justify-center gap-4">
              <Image
                src={tokenImageURL}
                alt="token-logo"
                width={500}
                height={500}
                className="w-[72px] h-[72px] object-cover"
              />

              <div className="flex flex-col gap-3 mt-1">
                <h1 className="text-primary-650 text-[32px] leading-[28px] font-medium">
                  {name}
                </h1>

                <span className="text-primary-700 text-[14px] leading-[16px]">
                  ${symbol}
                </span>
              </div>

              <BaseBadgeicon />
            </div>

            <div className="flex items-center justify-center gap-2">
              {actions.map(({ text, icon, onClick }, index) => (
                <LBClickAnimation
                  key={index}
                  className="flex items-center justify-center gap-1 cursor-pointer px-3.5 py-2.5 bg-white border border-primary-1950 rounded-lg shadow-table-cta"
                  onClick={onClick}
                >
                  {icon}

                  <span className="text-primary-2000 text-sm font-semibold">
                    {text}
                  </span>
                </LBClickAnimation>
              ))}

              <LBClickAnimation className="flex items-center justify-center gap-1 cursor-pointer px-3.5 py-2.5 bg-white border border-primary-1950 rounded-lg shadow-table-cta">
                <ShareIcon />
              </LBClickAnimation>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-start relative max-w-fit gap-2">
              {tabTexts.map((text, index) => (
                <div
                  key={index}
                  className={classNames(
                    "px-3.5 pt-2.5 pb-[13px] flex items-center justify-center cursor-pointer text-sm font-semibold transition-colors duration-300 capitalize",
                    {
                      "text-primary-2300": text === tab,
                      "text-primary-700": text !== tab,
                    }
                  )}
                  onClick={() => setTab(text as Tabs)}
                >
                  {text}
                </div>
              ))}

              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: tab === "overview" ? "44%" : "50%",
                  left: tab === "overview" ? "0%" : "48.5%",
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-[3px] bg-primary-1000"
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tabs[tab === "overview" ? 0 : 1]}
          </motion.div>
        </AnimatePresence>

        <div className="w-full pt-8 border-b border-primary-50">
          <div className="flex items-center justify-start relative max-w-fit gap-2">
            {secondaryTabTexts.map((text, index) => (
              <div
                key={index}
                className={classNames(
                  "px-3.5 pt-2.5 pb-[13px] flex items-center justify-center cursor-pointer text-sm font-semibold transition-colors duration-300 capitalize",
                  {
                    "text-primary-2300": text === tab,
                    "text-primary-700": text !== tab,
                  }
                )}
                onClick={() => setSecondaryTab(text as SecondaryTabs)}
              >
                {text}
              </div>
            ))}

            <motion.div
              initial={{ width: "0%" }}
              animate={{
                width: secondaryTab === "transactions" ? "56%" : "40%",
                left: secondaryTab === "transactions" ? "0%" : "60%",
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-[3px] bg-primary-1000"
            />
          </div>
        </div>
      </div>
    </LBContainer>
  );
};

export default TokenDetailsView;
