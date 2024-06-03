"use client";
import { motion } from "framer-motion";
import classNames from "classnames";

import { ILBLoaderAlt } from "./types";
import { Network } from "@/components/button/types";

const loaderColors: any = {
  base: "#375DFB",
  optimism: "#DF1C41",
  mode: "#699000",
};

const LoaderAltArc = ({ network }: { network: Network }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <motion.path
      d="M45.6 0C46.9255 0 48.0063 1.0752 47.94 2.39902C47.6656 7.88285 46.4519 13.2851 44.3462 18.3688C41.934 24.1924 38.3983 29.4839 33.9411 33.9411C29.4839 38.3983 24.1924 41.934 18.3688 44.3462C13.2851 46.4519 7.88284 47.6656 2.39902 47.94C1.07519 48.0063 -2.05118e-06 46.9255 -1.99324e-06 45.6V45.6C-1.9353e-06 44.2745 1.07537 43.2069 2.39881 43.1333C7.25194 42.8635 12.0307 41.7761 16.5319 39.9116C21.7732 37.7406 26.5355 34.5585 30.547 30.547C34.5585 26.5355 37.7406 21.7732 39.9116 16.5319C41.7761 12.0307 42.8635 7.25194 43.1333 2.39881C43.2069 1.07537 44.2745 0 45.6 0V0Z"
      animate={{ fill: loaderColors[network] }}
    />
    <path
      d="M45.6 0C46.9255 0 48.0063 1.0752 47.94 2.39902C47.6656 7.88285 46.4519 13.2851 44.3462 18.3688C41.934 24.1924 38.3983 29.4839 33.9411 33.9411C29.4839 38.3983 24.1924 41.934 18.3688 44.3462C13.2851 46.4519 7.88284 47.6656 2.39902 47.94C1.07519 48.0063 -2.05118e-06 46.9255 -1.99324e-06 45.6V45.6C-1.9353e-06 44.2745 1.07537 43.2069 2.39881 43.1333C7.25194 42.8635 12.0307 41.7761 16.5319 39.9116C21.7732 37.7406 26.5355 34.5585 30.547 30.547C34.5585 26.5355 37.7406 21.7732 39.9116 16.5319C41.7761 12.0307 42.8635 7.25194 43.1333 2.39881C43.2069 1.07537 44.2745 0 45.6 0V0Z"
      fill="url(#paint0_linear_3092_24650)"
      fill-opacity="0.12"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3092_24650"
        x1="0"
        y1="-48"
        x2="0"
        y2="48"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const LBLoaderAlt = ({ text, network }: ILBLoaderAlt) => {
  return (
    <div className="w-24 h-24 relative">
      <div className="flex items-center justify-center w-full h-full rounded-full bg-primary-1350 p-[4.8px]">
        <div className="flex items-center justify-center w-full h-full rounded-full bg-white p-[2.3px]">
          <div
            className={classNames(
              "flex items-center justify-center w-full h-full rounded-full",
              {
                "bg-primary-1000": network === "base",
                "bg-primary-1050": network === "optimism",
                "bg-primary-1100": network === "mode",
              }
            )}
          >
            <span className="text-[19.2px] leading-[29.76px] text-white font-medium font-Aeonik">
              {text}
            </span>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 2,
        }}
        className="absolute w-full h-full top-0 left-0 flex items-end justify-end"
      >
        <LoaderAltArc network={network} />
      </motion.div>
    </div>
  );
};

export default LBLoaderAlt;
