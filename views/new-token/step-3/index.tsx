import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useChainId, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import { usePrivy } from '@privy-io/react-auth';

import { StepProps } from '../types';
import { LBButton, LBLoaderAlt } from '@/components';
import { InfoIcon, SuccessIcon } from '@/public/icons';
import Confirmation from './confirmation';
import { networks } from '@/config/config';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useTokenActions from '@/store/token/actions';
import Link from 'next/link';
import { getTokenLink } from '@/utils/helpers';
import useAuthActions from '@/store/auth/actions';

const Step3 = ({ tokenData, setDisableHeader }: StepProps) => {
  const { authenticateUser } = useAuthActions();
  const { ready, authenticated } = usePrivy();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const { tokenState } = useSystemFunctions();
  const { createToken } = useTokenActions();
  const [step, setStep] = useState(0);
  const [deployStep, setDeployStep] = useState(0);

  const { loading, token } = tokenState;

  let stepText;
  switch (deployStep) {
    case 1:
      stepText = 'Deploying on the blockchain...';
      break;
    default:
      stepText = 'Deploying contract...';
  }

  const handleTokenDeployment = () => {
    setDisableHeader?.(true);

    if (!authenticated && ready) {
      return authenticateUser();
    }

    const tokenNetwork = networks.find((network) => network.chainId === chainId);

    if (!tokenNetwork) {
      return switchChain({ chainId: base.id });
    }

    createToken(
      {
        create_token_page: tokenData?.createTokenPage!,
        token_name: tokenData?.tokenName!,
        token_symbol: tokenData?.tokenSymbol!,
        token_total_supply: tokenData?.tokenSupply!,
        logo: tokenData?.tokenLogo!,
        website_url: tokenData?.tokenWebsiteURL!,
        socials: tokenData?.farcasterChannel,
      },
      {
        onError: () => {
          setStep(0);
        },
      },
    );

    setStep(1);
  };

  const { title, url } = getTokenLink(chainId, token?.chain.transaction_hash);

  useEffect(() => {
    if (loading && token) {
      setStep(2);
    }
  }, [loading, token]);

  return (
    <>
      <div className={classNames('flex flex-col rounded-base border border-primary-1200 bg-white p-6 max-w-[370px]', { 'h-[488px] items-center justify-center': step !== 0 })}>
        <AnimatePresence mode="popLayout">
          {step === 0 && (
            <motion.div key="zero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Confirmation handleTokenDeployment={handleTokenDeployment} tokenData={tokenData!} />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="first" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-12 items-center justify-center">
              <p className="text-center text-base text-primary-750 max-w-[365px]">
                Upon confirmation, <span className="font-medium text-primary-250">${tokenData?.tokenSymbol}</span> contract will be deployed on selected network
              </p>

              <LBLoaderAlt text={`$${tokenData?.tokenSymbol}`} />

              <div
                className={classNames('', {
                  'flex flex-col items-center justify-center': deployStep === 1,
                })}>
                <span>{stepText}</span>
                {deployStep === 1 && <span className="text-primary-750 text-sm lg:text-base">Confirm transaction</span>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="second" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-12 items-center justify-center w-full">
              <div className="w-full flex flex-col items-center justify-center gap-6">
                <SuccessIcon />

                <div className="flex flex-col items-center justify-center max-w-[365px] gap-2">
                  <span className="text-primary-150 text-[20px] leading-[20px] font-medium tracking-[-0.12px] font-Clash-Display">Token created successfullly</span>
                  <p className="text-primary-750 text-base text-center">{`Congratulations! Your ${token?.token_name}($${token?.token_symbol}) token has been successfully created!`}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Link href={`/${token?.token_address}`}>
                  <LBButton text="View token details" fullWidth />
                </Link>

                <a href={`${url}`} target="_blank">
                  <LBButton text={`View on ${title}`} fullWidth variant="link" color="tertiary" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step !== 2 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 bg-primary-3500 border border-primary-50 py-[20.512px] px-[25.64px] flex items-center justify-between rounded-base max-w-[370px]">
            <div className="flex items-center justify-center p-3">
              <InfoIcon width={24} height={24} color="#6E330C" />
            </div>

            <p className="text-primary-3000 text-[14px] leading-[24px] ">We’d charge a fee of 1% of the total supply, this applies to all tokens created on Launchbox</p>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Step3;
