'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import { LBClickAnimation, LBContainer, LBTable } from '@/components';
import PrimaryHeader from './primary-header';
import { BaseBadgeicon, ConfigSiteIcon, CopyIcon, FarcasterIcon, ShareIcon, WebIcon } from '@/public/icons';
import { holdingsData, tokenDetailData, transactionsData } from './dummy';
import useCopy from '@/hooks/useCopy';
import Overview from './overview';
import Leaderboard from './leaderboard';
import { Tabs, SecondaryTabs } from './types';
import { LBTradeInterface } from '@/components';

const tabTexts = ['overview', 'leaderboard'];
const secondaryTabTexts = ['transactions', 'holders'];

const TokenDetailsView = ({ tokenId }: { tokenId: string }) => {
  const [tab, setTab] = useState<Tabs>('overview');
  const [secondaryTab, setSecondaryTab] = useState<SecondaryTabs>('transactions');
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');
  const copy = useCopy();

  const {
    amount,
    change,
    createdAt,
    farcasterLink,
    id,
    liquidity,
    marketCap,
    name,
    network: tokenNetwork,
    networkBadgeURL,
    siteConfigLink,
    tokenAddress,
    tokenImageURL,
    tokenSymbol,
    txns,
    updatedAt,
    volume,
    walletAvatarURL,
    websiteLink,
  } = tokenDetailData;

  const tradingToken = {
    id,
    name,
    tokenSymbol,
    updatedAt,
    createdAt,
    liquidity,
    marketCap,
    txns,
    volume,
    walletAvatarURL,
    tokenAddress,
  };

  const actions = [
    {
      text: 'Token address',
      icon: <CopyIcon />,
      onClick: () => copy(tokenAddress),
      show: true,
    },
    {
      text: 'Configure site',
      icon: <ConfigSiteIcon />,
      onClick: () => window.open(siteConfigLink, '_blank'),
      show: userRole === 'admin',
    },
    {
      text: 'Website',
      icon: <WebIcon />,
      onClick: () => window.open(websiteLink, '_blank'),
      show: userRole === 'user',
    },
    {
      text: 'Farcaster',
      icon: <FarcasterIcon />,
      onClick: () => window.open(farcasterLink, '_blank'),
      show: userRole === 'user',
    },
  ];

  const tabs = [<Overview tokenDetailData={tokenDetailData} key={0} />, <Leaderboard key={1} />];

  const secondaryTabs = [<LBTable data={transactionsData} loading={false} variant="primary" key={0} tokenSymbol="SAT" />, <LBTable data={holdingsData} loading={false} variant="secondary" key={1} />];

  const showTradingInterface = tab === 'overview' && userRole === 'user';

  return (
    <LBContainer>
      <div className={classNames('pt-12 flex flex-col gap-9 lg:px-8 items-stretch', { 'pb-14': tab === 'overview', 'pb-72': tab === 'leaderboard' })}>
        <PrimaryHeader />

        <div className="flex flex-col gap-8 items-stretch border-b border-primary-50">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-start justify-center gap-4">
              <Image src={tokenImageURL} alt="token-logo" width={500} height={500} className="w-[72px] h-[72px] object-cover" />

              <div className="flex flex-col gap-3 mt-1">
                <h1 className="text-primary-650 text-[32px] leading-[28px] font-medium">{name}</h1>

                <span className="text-primary-700 text-[14px] leading-[16px]">${tokenSymbol}</span>
              </div>

              <BaseBadgeicon />
            </div>

            <div className="flex items-center justify-center gap-2">
              {actions.map(({ icon, onClick, text, show }, index) => (
                <LBClickAnimation
                  key={index}
                  className={classNames('flex items-center justify-center gap-1 cursor-pointer px-3.5 py-2.5 bg-white border border-primary-1950 rounded-lg shadow-table-cta', {
                    hidden: !show,
                  })}
                  onClick={onClick}>
                  {icon}

                  <span className="text-primary-2000 text-sm font-semibold">{text}</span>
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
                  className={classNames('px-3.5 pt-2.5 pb-[13px] flex items-center justify-center cursor-pointer text-sm font-semibold transition-colors duration-300 capitalize', {
                    'text-primary-2300': text === tab,
                    'text-primary-700': text !== tab,
                  })}
                  onClick={() => setTab(text as Tabs)}>
                  {text}
                </div>
              ))}

              <motion.div
                initial={{ width: '0%' }}
                animate={{
                  width: tab === 'overview' ? '44%' : '50%',
                  left: tab === 'overview' ? '0%' : '48.5%',
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-[3px] bg-primary-1000"
              />
            </div>
          </div>
        </div>

        <div
          className={classNames('', {
            'flex justify-between gap-24': showTradingInterface,
          })}>
          <AnimatePresence mode="popLayout">
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {tabs[tab === 'overview' ? 0 : 1]}
            </motion.div>
          </AnimatePresence>

          {showTradingInterface && <LBTradeInterface balance={120330} token={tradingToken} />}
        </div>

        {tab === 'overview' && (
          <>
            <div className="w-full pt-8 border-b border-primary-50">
              <div className="flex items-center justify-start relative max-w-fit gap-2">
                {secondaryTabTexts.map((text, index) => (
                  <div
                    key={index}
                    className={classNames('px-3.5 pt-2.5 pb-[13px] flex items-center justify-center cursor-pointer text-sm font-semibold transition-colors duration-300 capitalize', {
                      'text-primary-2300': text === tab,
                      'text-primary-700': text !== tab,
                    })}
                    onClick={() => setSecondaryTab(text as SecondaryTabs)}>
                    {text}
                  </div>
                ))}

                <motion.div
                  initial={{ width: '0%' }}
                  animate={{
                    width: secondaryTab === 'transactions' ? '56%' : '40%',
                    left: secondaryTab === 'transactions' ? '0%' : '60%',
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-[3px] bg-primary-1000"
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div key={secondaryTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {secondaryTabs[secondaryTab === 'transactions' ? 0 : 1]}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </LBContainer>
  );
};

export default TokenDetailsView;
