'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useAccount } from 'wagmi';

import { LBButton, LBClickAnimation, LBContainer, LBError, LBLoader, LBTokenCard } from '@/components';
import EmptyState from './empty';
import { ExclaimIcon, PlusIconAlt } from '@/public/icons';
import useTokenActions from '@/store/token/actions';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import Skeleton from './skeleton';

const animateVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const TokenView = () => {
  const { isConnected, address } = useAccount();
  const { getUserTokens } = useTokenActions();
  const { tokenState } = useSystemFunctions();
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);

  const { userTokens, userTokensLoading, userTokensMeta } = tokenState;
  const showEmptyState = isConnected && !Boolean(userTokens?.length) && !userTokensLoading;
  const showShouldFetchMore = shouldFetchMore || userTokensLoading;
  const showNewCard = !showShouldFetchMore && Boolean(userTokens?.length);

  const fetchTokens = () => {
    setShowErrorState(false);
    getUserTokens(`deployer_address=${address}&take=12`, { onError: () => setShowErrorState(true) });
  };

  useEffect(() => {
    if (!address) return;

    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && Number(userTokens?.length) < Number(userTokensMeta?.total_count)) {
        setShouldFetchMore(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userTokensLoading, userTokens, userTokensMeta]);

  useEffect(() => {
    if (!shouldFetchMore) return;

    const query = `deployer_address=${address}&take=12&skip=${userTokens?.length}`;

    getUserTokens(query, { onSuccess: () => setShouldFetchMore(false) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  if (showErrorState && !userTokens) {
    return (
      <LBError
        onClick={fetchTokens}
        subtitle="Unable to get list of tokens at the moment. Please check your network connection and try again later."
        title="Unable to get Tokens"
        standAlone
        show={showErrorState}
      />
    );
  }

  return (
    <LBContainer>
      <div className="pt-12 flex flex-col gap-[86px] lg:px-8 items-center pb-14">
        <div className="flex flex-col items-start gap-1 flex-1 self-stretch">
          <h1 className="text-primary-650 text-[30px] leading-[38px] font-Biform">Token launch</h1>
          <p className="text-base text-primary-700">Generate and deploy your own L2 userTokens without coding</p>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {showEmptyState && (
            <motion.div key="empty-state" {...animateVariant}>
              <EmptyState />
            </motion.div>
          )}

          <motion.div {...animateVariant} key="userTokens-list" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-6 flex-1 self-stretch">
            {userTokens?.map((token) => (
              <LBTokenCard key={token?.id} {...token} />
            ))}

            {showShouldFetchMore && <Skeleton />}

            {showNewCard && (
              <Link href={'/token/new'}>
                <LBClickAnimation className="p-5 bg-white rounded-lg border border-primary-50 flex flex-col gap-2 h-[275px] justify-center items-center">
                  <PlusIconAlt />

                  <span className="text-primary-2050 text-base">Add new token</span>
                </LBClickAnimation>
              </Link>
            )}
          </motion.div>

          {!isConnected && (
            <motion.div
              key="connect-wallet"
              {...animateVariant}
              className="py-20 flex items-center justify-center bg-white rounded-[5px] border border-primary-950 shadow-table-cta w-[343px] md:w-[448px]">
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

                <LBButton text="Connect wallet" onClick={() => {}} variant="plain" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LBContainer>
  );
};

export default TokenView;
