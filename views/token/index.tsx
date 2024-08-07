'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import { LBButton, LBClickAnimation, LBContainer, LBError, LBLoader, LBTokenCard } from '@/components';
import { PlusIconAlt, WalletAltIcon } from '@/public/icons';
import useTokenActions from '@/store/token/actions';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import EmptyState from './empty';
import Skeleton from './skeleton';
import useAuthActions from '@/store/auth/actions';

const animateVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const TokenView = () => {
  const { address } = useAccount();
  const { ready, authenticated } = usePrivy();

  const { authenticateUser } = useAuthActions();
  const { getUserTokens } = useTokenActions();
  const { tokenState } = useSystemFunctions();
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);

  const { userTokens, userTokensLoading, userTokensMeta } = tokenState;
  const showEmptyState = authenticated && !Boolean(userTokens?.length) && !userTokensLoading;
  const showShouldFetchMore = authenticated && (shouldFetchMore || userTokensLoading);
  const showNewCard = !showShouldFetchMore && Boolean(userTokens?.length);

  const connectWallet = () => {
    if (!ready) return;

    authenticateUser();
  };

  const fetchTokens = () => {
    setShowErrorState(false);
    getUserTokens(`deployer_address=${address}&take=12`, { onError: () => setShowErrorState(true) });
  };

  useEffect(() => {
    if (!address || !authenticated) return;

    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, authenticated]);

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
          <h1 className="text-primary-650 text-[30px] leading-[38px] font-Clash-Display font-bold">Token launch</h1>
          <p className="text-base text-primary-700">Launch tokens and grow your community fast</p>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {showEmptyState && (
            <motion.div key="empty-state" {...animateVariant}>
              <EmptyState />
            </motion.div>
          )}

          <motion.div {...animateVariant} key="userTokens-list" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-6 flex-1 self-stretch">
            {authenticated && userTokens?.map((token) => <LBTokenCard key={token?.id} {...token} />)}

            {showShouldFetchMore && <Skeleton />}

            {authenticated && showNewCard && (
              <Link href={'/token/new'}>
                <LBClickAnimation className="p-5 bg-white rounded-lg border border-primary-50 flex flex-col gap-2 h-[170px] justify-center items-center">
                  <PlusIconAlt />

                  <span className="text-primary-250 text-base">Create new token</span>
                </LBClickAnimation>
              </Link>
            )}
          </motion.div>

          {!authenticated && (
            <motion.div key="connect-wallet" {...animateVariant} className="p-6 flex items-center justify-center">
              <div className="flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="flex items-center justify-center bg-white-linear rounded-full border-t border-primary-1200 p-[17.45px]">
                    <div className="flex items-center justify-center rounded-full border border-primary-3400 bg-primary-3350 p-[15.27px] shadow-basic">
                      <WalletAltIcon />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-primary-150 text-[20px] leading-[20px] text-center tracking-[-0.12px] font-medium font-Clash-Display">Login / Sign up</h1>
                    <span className="text-primary-750 text-base text-center">Please connect your wallet to continue</span>
                  </div>
                </div>

                <div className="w-40">
                  <LBButton text="Login / Sign up" onClick={connectWallet} fullWidth />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LBContainer>
  );
};

export default TokenView;
