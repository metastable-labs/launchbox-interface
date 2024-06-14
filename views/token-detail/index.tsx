'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import { LBClickAnimation } from '@/components';
import PrimaryHeader from './primary-header';
import { BaseBadgeicon, ConfigSiteIcon, CopyIcon, FarcasterIcon, ShareIcon, WebIcon } from '@/public/icons';
import { tokenDetailData } from './dummy';
import useCopy from '@/hooks/useCopy';
import Overview from './overview';
import Leaderboard from './leaderboard';
import { Tabs } from './types';
import ClickTabs from './tabs';

const TokenDetailsView = ({ tokenId }: { tokenId: string }) => {
  const [tab, setTab] = useState<Tabs>('overview');
  const [userRole, setUserRole] = useState<'admin' | 'user'>('admin');
  const copy = useCopy();

  const tabTexts = [{ text: 'overview' }, { text: 'leaderboard', hide: userRole === 'user' }, { text: 'channel' }];
  const tabsToShow = tabTexts.filter(({ hide }) => !hide).map(({ text }) => text);

  const { farcasterLink, name, siteConfigLink, tokenAddress, tokenImageURL, tokenSymbol, websiteLink } = tokenDetailData;

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

  const tabs = [<Overview key="overview" userRole={userRole} tokenDetailData={tokenDetailData} />, <Leaderboard key="leaderboard" />, <div key="channel">Channel</div>];

  const showTradingInterface = tab === 'overview' && userRole === 'user';

  return (
    <div className={classNames('pt-12 flex flex-col gap-9 px-5 items-stretch relative overflow-y-scroll', { 'pb-14': tab === 'overview', 'pb-72': tab === 'leaderboard' })}>
      <PrimaryHeader userRole={userRole} />

      <div className={classNames('flex flex-col gap-8 items-stretch', { 'border-b border-primary-50': userRole === 'admin' })}>
        {userRole === 'admin' && (
          <div className="w-full hidden md:flex items-center justify-between">
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
        )}

        <div className="w-full">
          <ClickTabs tabTexts={tabsToShow} tab={tab} setTab={setTab} />
        </div>
      </div>

      <div
        className={classNames('', {
          'flex justify-between gap-24': showTradingInterface,
        })}>
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
