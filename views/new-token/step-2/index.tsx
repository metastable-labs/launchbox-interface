import { useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import { StepProps } from "../types";
import { LBButton, LBLoaderAlt } from "@/components";
import { SuccessIcon } from "@/public/icons";

const Step2 = ({ network, tokenSymbol, tokenName }: StepProps) => {
  const [step, setStep] = useState(1);
  const [deployStep, setDeployStep] = useState(1);

  let stepText;
  switch (deployStep) {
    case 1:
      stepText = "Deploying on the blockchain...";
      break;
    default:
      stepText = "Deploying contract...";
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-base border border-primary-1200 bg-white p-6 min-w-[343px] md:min-w-[448px] h-[488px]">
      <AnimatePresence mode="popLayout">
        {step === 0 && (
          <motion.div
            key="first"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-12 items-center justify-center"
          >
            <p className="text-center text-base text-primary-750 max-w-[365px]">
              Upon confirmation,{" "}
              <span className="font-medium text-primary-250">
                ${tokenSymbol}
              </span>{" "}
              contract will be deployed on selected network
            </p>

            <LBLoaderAlt text={`$${tokenSymbol}`} network={network} />

            <div
              className={classNames("", {
                "flex flex-col items-center justify-center": deployStep === 1,
              })}
            >
              <span>{stepText}</span>
              {deployStep === 1 && (
                <span className="text-primary-750 text-sm lg:text-base">
                  Confirm transaction
                </span>
              )}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="second"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-12 items-center justify-center w-full"
          >
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <SuccessIcon />

              <div className="flex flex-col items-center justify-center max-w-[365px] gap-2">
                <span className="text-primary-150 text-[20px] leading-[20px] font-medium tracking-[-0.12px]">
                  Contract created successfullly
                </span>
                <p className="text-primary-750 text-base text-center">{`Congratulations! Your ${tokenName}($${tokenSymbol}) token has been successfully created!`}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <a href="#" className="text-primary-150 text-sm font-medium">
                <LBButton
                  text="View token details"
                  network={network}
                  fullWidth
                  variant="plain"
                />
              </a>

              <a href="#" target="_blank">
                <LBButton
                  text={`View on ${network}scan`}
                  fullWidth
                  variant="link"
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Step2;
