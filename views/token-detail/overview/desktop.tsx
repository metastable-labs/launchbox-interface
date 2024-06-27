import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { SecondaryTabs } from '../types';
import { formatCurrency } from '.';
import { LBTable, LBTradeInterface } from '@/components';
import TokenInfo from './token-info';
import ChangeIndicator from './change-indicator';
import LineChart from '../line-chart';
import ClickTabs from '../tabs';
import { IView } from './types';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const DesktopView = ({
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
  token,
}: IView) => {
  const { transactionState, holderState } = useSystemFunctions();

  const [tab, setTab] = useState<SecondaryTabs>('transactions');

  const amount = 456.86;
  const change = 12.34;

  const { whole, decimal } = formatCurrency(amount);

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
    holding: Number(holder?.balance) / Number(token?.token_total_supply) / 100,
  }));

  const showShouldFetchMoreTransactions = shouldFetchMoreTransactions || (transactionState.loading && !transactionState.transactions);
  const showShouldFetchMoreHolders = shouldFetchMoreHolders || (holderState.loading && !holderState.holders);

  const tabs = [
    <LBTable
      data={transactionsData || []}
      loading={false}
      variant="primary"
      key="transactions"
      tokenSymbol="SAT"
      take={transactionState.meta?.take}
      total={transactionState.meta?.total_count}
      setShouldFetchMore={setShouldFetchMoreTransactions}
      shouldFetchMore={showShouldFetchMoreTransactions}
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

  return (
    <div className="flex justify-between gap-3.5 sticky top-0">
      {userRole === 'user' && (
        <div className="w-1/4 p-6 rounded-lg border border-primary-50 h-fit">
          <TokenInfo token={token} userRole={userRole} />
        </div>
      )}

      <div
        className={classNames('self-stretch', {
          'xl:w-2/4': userRole === 'user',
          'xl:w-full': userRole === 'admin',
        })}>
        <div className={classNames('w-full self-stretch flex flex-col items-stretch gap-6 rounded-lg border border-primary-50 p-6')}>
          <div className="flex items-center justify-end self-stretch">
            <div className="flex items-center justify-center gap-8 px-3.5 py-2.5 rounded border border-primary-1950 shadow-table-cta bg-white">
              {periods.map(({ text, value }) => (
                <span
                  onClick={() => setPeriod(value)}
                  key={value}
                  className={classNames('text-sm flex items-center justify-center px-1.5 py-0.5 text-primary-2000 cursor-pointer transition-colors duration-300 font-Aeonik', {
                    'bg-primary-200 rounded-base': value === period,
                  })}>
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="px-6 flex flex-col gap-3 self-stretch font-Aeonik">
            <div className="flex flex-col self-stretch gap-2 items-start">
              <div className="text-primary-150 text-[48px] leading-[56px] font-semibold tracking-[-1.44px]">
                $<span>{whole}</span>.<span className="text-primary-750">{decimal}</span>
              </div>

              <ChangeIndicator change={change} />
            </div>
          </div>

          <div className="w-full flex items-center justify-center min-h-[295px] relative">
            <LineChart period={period} data={liquidityData} />

            {noLiquidityData && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-primary-250 text-[20px] leading-[32px] tracking-[-0.2px] font-semibold">No price data.</div>
            )}
          </div>

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

          <div className="sticky top-0 w-full bg-white z-10">
            <ClickTabs tabTexts={tabTexts} tab={tab} setTab={setTab} />
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {tabs.find((item) => item.key === tab)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className={classNames('w-1/4 ', { 'flex flex-col gap-8 items-stretch': userRole === 'admin' })}>
        <LBTradeInterface balance={120330} token={token!} />

        {userRole === 'admin' && (
          <div className="min-w-[300px] p-6 rounded-lg border border-primary-50 h-fit">
            <TokenInfo userRole={userRole} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopView;
