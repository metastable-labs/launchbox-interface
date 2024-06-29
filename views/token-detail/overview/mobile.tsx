import { useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { SecondaryTabs } from '../types';
import { LBTable, LBTradeInterface } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import TokenInfo from './token-info';
import ChangeIndicator from './change-indicator';
import LineChart from '../line-chart';
import ClickTabs from '../tabs';
import { IView } from './types';
import { formatAmount, formatCurrency } from '@/utils/helpers';

type MobileTabs = 'info' | 'chart+txns' | 'buy/sell';
const mobileTabs: MobileTabs[] = ['info', 'chart+txns', 'buy/sell'];

const MobileView = ({
  liquidityData,
  period,
  periods,
  setPeriod,
  setShouldFetchMoreHolders,
  setShouldFetchMoreTransactions,
  shouldFetchMoreHolders,
  shouldFetchMoreTransactions,
  tabTexts,
  userRole,
}: IView) => {
  const { transactionState, holderState, tokenState } = useSystemFunctions();

  const [tab, setTab] = useState<SecondaryTabs>('transactions');
  const [mobileTab, setMobileTab] = useState<MobileTabs>('info');
  const { token } = tokenState;

  const change = -12.34;

  const { whole, decimal } = formatCurrency(token?.price, 7);

  const noLiquidityData = liquidityData.every((dataPoint) => dataPoint.value === 0);

  const transactionsData = transactionState.transactions?.map((tx) => ({
    wallet: tx.address,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    type: tx.type,
    usdAmount: tx.token_value_in_usd,
    tokenAmount: Number(tx.token_value),
    createdAt: tx.created_at,
    transactionType: tx.type,
  }));

  const holdersData = holderState.holders?.map((holder) => ({
    wallet: holder.address,
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg',
    holding: Number(holder.balance) / Number(token?.token_total_supply) / 100,
  }));

  const showShouldFetchMore = shouldFetchMoreTransactions || (transactionState.loading && !transactionState.transactions);
  const showShouldFetchMoreHolders = shouldFetchMoreHolders || (holderState.loading && !holderState.holders);

  const tabs = [
    <LBTable
      data={transactionsData || []}
      loading={false}
      variant="primary"
      key="transactions"
      tokenSymbol={token?.token_symbol}
      take={transactionState.meta?.take}
      total={transactionState.meta?.total_count}
      setShouldFetchMore={setShouldFetchMoreTransactions}
      shouldFetchMore={showShouldFetchMore}
    />,
    <LBTable
      data={holdersData || []}
      loading={false}
      variant="secondary"
      key="holders"
      take={holderState.meta?.take}
      total={holderState.meta?.total_count}
      setShouldFetchMore={setShouldFetchMoreHolders}
      shouldFetchMore={showShouldFetchMoreHolders}
    />,
  ];

  const items = [
    <div key="info" className="self-stretch p-6 rounded-lg border border-primary-50 h-fit">
      <TokenInfo userRole={userRole} />
    </div>,
    <div key="chart+txns" className="w-full self-stretch flex flex-col items-stretch justify-center gap-6 rounded-lg border border-primary-50 p-6">
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
        <LineChart period={period} data={liquidityData} />

        {noLiquidityData && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-primary-250 text-[20px] leading-[32px] tracking-[-0.2px] font-semibold">No price data.</div>
        )}
      </div>

      {userRole === 'user' && (
        <>
          <div className="flex flex-col justify-center gap-4 w-full p-4 flex-1">
            <h1 className="text-primary-2900 text-[24px] leading-[36px] tracking-[-0.48px] font-medium">Market cap progress</h1>

            <div className="flex items-center gap-2">
              <span className="text-primary-650 text-[15px] font-medium">{'34.4%'}</span>
              <div className="w-full h-2 bg-primary-950 rounded">
                <motion.div className="h-full bg-primary-1000 rounded" initial={{ width: 0 }} animate={{ width: '34.4%' }} />
              </div>
            </div>
          </div>

          <p className="self-stretch flex-1 px-6 py-3 flex items-center rounded-xl bg-primary-300 text-[14px] leading-[24px] text-primary-2550">
            When the market cap reaches $100,000 all the liquidity from the Exchange Contract will be deposited into Aerodrome. Progression increases as the price goes up.
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
    <div key="buy/sell" className="max-w-full">
      <LBTradeInterface token={token} />
    </div>,
  ];

  return (
    <div className="pb-10">
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
