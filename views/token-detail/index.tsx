'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import useCopy from '@/hooks/useCopy';
import { LBBadge, LBClickAnimation, LBShare } from '@/components';
import useTokenActions from '@/store/token/actions';
import { CheckAltIcon, ConfigSiteIcon, CopyIcon, WebIcon } from '@/public/icons';
import useTransactionActions from '@/store/transaction/actions';
import useHolderActions from '@/store/holder/actions';
import useCastActions from '@/store/casts/actions';
import PrimaryHeader from './primary-header';
import Overview from './overview';
import Leaderboard from './leaderboard';
import { Tabs } from './types';
import ClickTabs from './tabs';
import Channel from './channel';
import useIncentiveActions from '@/store/incentive/actions';

const TokenDetailsView = ({ tokenAddress: tokenAddressURL }: { tokenAddress: string }) => {
  const { address } = useAccount();
  const { authenticated } = usePrivy();
  const { tokenState, navigate } = useSystemFunctions();
  const { getToken, getAnalytics } = useTokenActions();
  const { getTokenIncentives, getAllLeaderboard } = useIncentiveActions();
  const { getTokenTransactions } = useTransactionActions();
  const { getTokenHolders } = useHolderActions();
  const { getChannelCasts, getChannelCastAnalytics } = useCastActions();
  const { handleCopy, hasCopied } = useCopy();

  const [tab, setTab] = useState<Tabs>('overview');
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');

  const { token, coinPrice } = tokenState;

  const channelTitle = Boolean(Object.keys(token?.socials.warpcast.channel || {}).length) ? 'channel' : 'community';

  const tabTexts = [{ text: 'overview' }, { text: 'incentive', hide: userRole === 'user' }, { text: channelTitle }];
  const tabsToShow = tabTexts.filter(({ hide }) => !hide).map(({ text }) => text);

  const actions = [
    {
      text: 'Token address',
      icons: [<CopyIcon key="copy" width={16} height={16} />, <CheckAltIcon key="check" width={16} height={16} />],
      onClick: () => {
        handleCopy(token?.token_address!);
      },
    },
    {
      text: 'Configure site',
      icon: <ConfigSiteIcon />,
      onClick: () => navigate.push(`/${token?.id}/builder`),
    },
  ];

  const tabs = [<Overview key="overview" userRole={userRole} />, <Leaderboard key="incentive" />, <Channel key={channelTitle} userRole={userRole} />];

  useEffect(() => {
    if (!token) {
      getToken(tokenAddressURL);
      return;
    }

    getAnalytics(token.id, '1w');
    getChannelCastAnalytics('period=1w');
    getTokenHolders('take=15');
    getChannelCasts('take=15');
    getTokenIncentives();
    getAllLeaderboard(`page=1&limit=20`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAddressURL, token]);

  useEffect(() => {
    if (!token || !coinPrice) {
      return;
    }

    getTokenTransactions('take=15');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinPrice, token]);

  useEffect(() => {
    if (!address || !token || !authenticated) return setUserRole('user');

    if (address === token?.chain?.deployer_address) {
      setUserRole('admin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, token, authenticated]);

  return (
    <div className={classNames('pt-12 flex flex-col gap-9 px-5 items-stretch relative overflow-y-scroll', { 'pb-14': tab === 'overview' || tab === 'channel', 'pb-72': tab === 'leaderboard' })}>
      <PrimaryHeader userRole={userRole} />

      <div className={classNames('flex flex-col gap-8 items-stretch', { 'border-b border-primary-50': userRole === 'admin' })}>
        {userRole === 'admin' && (
          <div className="w-full hidden md:flex items-center justify-between">
            <div className="flex items-start justify-center gap-4">
              {!token ? (
                <div className="w-[72px] h-[72px] rounded-full bg-primary-50 animate-pulse" />
              ) : (
                <Image src={token?.token_logo_url || ''} alt="token-logo" width={500} height={500} className="w-[72px] h-[72px] object-cover" />
              )}

              <div className="flex flex-col gap-3 mt-1">
                {!token ? (
                  <>
                    <div className="animate-pulse h-7 w-20 rounded-base bg-primary-50" />
                    <div className="animate-pulse h-4 w-20 rounded-base bg-primary-50" />
                  </>
                ) : (
                  <>
                    <h1 className="text-primary-650 text-[32px] leading-[28px] font-medium font-Clash-Display">{token?.token_name}</h1>

                    <span className="text-primary-700 text-[14px] leading-[16px]">${token?.token_symbol}</span>
                  </>
                )}
              </div>

              <LBBadge variant="base" />
            </div>

            <div className="flex items-center justify-center gap-2">
              {actions.map(({ icon, onClick, text, icons }, index) => (
                <LBClickAnimation
                  key={index}
                  className={classNames('flex items-center justify-center gap-1 cursor-pointer px-3.5 py-2.5 bg-white border border-primary-1950 rounded-lg shadow-table-cta', {
                    'pointer-events-none': !token,
                  })}
                  onClick={onClick}>
                  {icons && (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={+hasCopied}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        exit={{ opacity: 0 }}
                        className={classNames('', { 'pointer-events-none': hasCopied })}>
                        {icons[+hasCopied]}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {icon && icon}

                  <span className="text-primary-2000 text-sm font-medium font-Clash-Display">{text}</span>
                </LBClickAnimation>
              ))}

              <LBShare />
            </div>
          </div>
        )}

        <ClickTabs tabTexts={tabsToShow} tab={tab} setTab={setTab} />
      </div>

      <div className={classNames('', {})}>
        <AnimatePresence mode="popLayout">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {tabs.find((item) => item.key === tab)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TokenDetailsView;
