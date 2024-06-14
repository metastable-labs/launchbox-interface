import { useState } from 'react';

import { SecondaryTabs } from '../types';
import { formatCurrency } from '.';
import { LBTable, LBTradeInterface } from '@/components';
import TokenInfo from './token-info';
import classNames from 'classnames';
import ChangeIndicator from './change-indicator';
import LiquidityLineChart from './line-chart';
import ClickTabs from '../tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { IView } from './types';

type MobileTabs = 'info' | 'chart+txns' | 'buy/sell';
const mobileTabs: MobileTabs[] = ['info', 'chart+txns', 'buy/sell'];

const MobileView = ({ tokenDetailData, userRole, holdingsData, tabTexts, transactionsData, liquidityData, period, setPeriod, periods }: IView) => {
  const [tab, setTab] = useState<SecondaryTabs>('transactions');
  const [mobileTab, setMobileTab] = useState<MobileTabs>('info');

  const { amount, name, tokenSymbol, tokenAddress, tokenImageURL, change, createdAt, id, liquidity, marketCap, txns, updatedAt, volume, walletAvatarURL } = tokenDetailData;

  const { whole, decimal } = formatCurrency(amount);

  const noLiquidityData = liquidityData.every((dataPoint) => dataPoint.value === 0);

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

  const tabs = [
    <LBTable data={transactionsData} loading={false} variant="primary" key="transactions" tokenSymbol="SAT" />,
    <LBTable data={holdingsData} loading={false} variant="secondary" key="holders" />,
  ];

  const items = [
    <div key="info" className="min-w-[343px] p-6 rounded-lg border border-primary-50 h-fit">
      <TokenInfo tokenDetailData={tokenDetailData} userRole={userRole} />
    </div>,
    <div key="chart+txns" className="max-w-[343px] self-stretch flex flex-col items-stretch justify-center gap-6 rounded-lg border border-primary-50 p-6">
      <div className="flex items-center justify-center self-stretch">
        <div className="flex items-center justify-center gap-8 px-3.5 py-2.5 rounded border border-primary-1950 shadow-table-cta bg-white">
          {periods.map(({ text, value }) => (
            <span
              onClick={() => setPeriod(value)}
              key={value}
              className={classNames('text-sm flex items-center justify-center px-1.5 py-0.5 text-primary-2000 cursor-pointer transition-colors duration-300', {
                'bg-primary-200 rounded-base': value === period,
              })}>
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 flex flex-col gap-3 self-stretch">
        <div className="flex flex-col self-stretch gap-2 items-start">
          <div className="text-primary-150 text-[30px] leading-[150%] font-semibold tracking-[-0.9px]">
            $<span>{whole}</span>.<span className="text-primary-750">{decimal}</span>
          </div>

          <ChangeIndicator change={change} />
        </div>
      </div>

      <div className="w-full flex items-center justify-center h-[295px] relative">
        <LiquidityLineChart period={period} liquidityData={liquidityData} />

        {noLiquidityData && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-primary-250 text-[20px] leading-[32px] tracking-[-0.2px] font-semibold">No price data.</div>
        )}
      </div>

      {userRole === 'user' && (
        <>
          <div className="flex flex-col justify-center gap-4 w-full p-4 flex-1">
            <h1 className="text-primary-2900 text-[24px] leading-[36px] tracking-[-0.48px] font-medium">Bonding curve progress</h1>

            <div className="flex items-center gap-2">
              <span className="text-primary-650 text-[15px] font-medium">{'34.4%'}</span>
              <div className="w-full h-2 bg-primary-950 rounded">
                <motion.div className="h-full bg-primary-1000 rounded" initial={{ width: 0 }} animate={{ width: '34.4%' }} />
              </div>
            </div>
          </div>

          <p className="self-stretch flex-1 px-6 py-3 flex items-center rounded-xl bg-primary-300 text-[14px] leading-[24px] text-primary-2550">
            When the market cap reaches $100,000 all the liquidity from the bonding curve will be deposited into Aerodrome and burned. progression increases as the price goes up.
          </p>
        </>
      )}

      <div className="mt-8">
        <ClickTabs tabTexts={tabTexts} tab={tab} setTab={setTab} />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {tabs.find((item) => item.key === tab)}
        </motion.div>
      </AnimatePresence>
    </div>,
    <div key="buy/sell" className="max-w-[343px]">
      <LBTradeInterface balance={120330} token={tradingToken} />
    </div>,
  ];

  return (
    <div className="flex flex-col justify-between gap-3.5 pb-10">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={mobileTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {items.find((item) => item.key === mobileTab)}
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-0 left-0 w-screen h-fit flex items-center justify-between px-[34px] py-4 bg-primary-200">
        {mobileTabs.map((tab, index) => (
          <div
            onClick={() => setMobileTab(tab)}
            key={index}
            className={classNames('py-2.5 px-3.5 flex items-center justify-center text-sm capitalize transition-colors relative', {
              'text-primary-2300': tab === mobileTab,
              'text-primary-700': tab !== mobileTab,
            })}>
            {tab}

            {tab === mobileTab && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-[3px] bg-primary-1000 absolute bottom-0 left-0"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileView;
