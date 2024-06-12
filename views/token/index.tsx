'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { LBButton, LBClickAnimation, LBContainer, LBTokenCard } from '@/components';
import EmptyState from './empty';
import { tokens } from '../home/dummy';
import { ExclaimIcon, PlusIconAlt } from '@/public/icons';
import { Network } from '@/components/button/types';

const TokenView = ({ network }: { network: Network }) => {
  const isConnected = true;

  const showEmptyState = isConnected && !Boolean(tokens.length);
  const showTokens = isConnected && Boolean(tokens.length);
  return (
    <LBContainer>
      <div className="pt-12 flex flex-col gap-[86px] lg:px-8 items-center pb-14">
        <div className="flex flex-col items-start gap-1 flex-1 self-stretch">
          <h1 className="text-primary-650 text-[30px] leading-[38px] font-Biform">Token launch</h1>
          <p className="text-base text-primary-700">Generate and deploy your own L2 tokens without coding</p>
        </div>

        <AnimatePresence mode="popLayout">
          {showEmptyState && (
            <motion.div key="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EmptyState network={network} />
            </motion.div>
          )}

          {showTokens && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="tokens-list"
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-6 flex-1 self-stretch">
              {tokens.map((token) => (
                <LBTokenCard key={token?.id} {...token} network={network} />
              ))}

              <Link href={'/token/new'}>
                <LBClickAnimation className="p-5 bg-white rounded-lg border border-primary-50 flex flex-col gap-2 h-[275px] justify-center items-center">
                  <PlusIconAlt />

                  <span className="text-primary-2050 text-base">Add new token</span>
                </LBClickAnimation>
              </Link>
            </motion.div>
          )}

          {!isConnected && (
            <div className="py-20 flex items-center justify-center bg-white rounded-[5px] border border-primary-950 shadow-table-cta w-[343px] md:w-[448px]">
              <div className="flex flex-col gap-3.5 items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
                    <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
                      <ExclaimIcon />
                    </div>
                  </div>

                  <h1 className="text-primary-400 text-[20px] leading-[30px] text-center">Connect wallet</h1>
                  <span className="text-primary-700 text-[14px] leading-[24px] text-center">Please connect your wallet to continue</span>
                </div>

                <LBButton text="Connect wallet" network="base" onClick={() => {}} variant="plain" />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </LBContainer>
  );
};

export default TokenView;
