import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { LBSecondarySelect } from '@/components';
import { periodOptions } from './dummy';
import ChangeIndicator from './change-indicator';
import LiquidityLineChart from './line-chart';
import { generateData } from './dummy';

const formatCurrency = (amount: number) => {
  const [whole, decimal] = amount.toFixed(2).split('.');
  return { whole, decimal };
};

const liquidityData = generateData();

const infoData = [
  { title: 'Bonding curve progress', value: '34.4%', hasPercentageBar: true },
  { title: 'Total supply', value: '20,000,000' },
  { title: 'Market Cap', value: '$0' },
];

const Overview = ({ tokenDetailData }: IOverview) => {
  const [period, setPeriod] = useState('last-year');

  const { amount, name, networkBadgeURL, siteConfigLink, tokenSymbol, tokenAddress, tokenImageURL, change } = tokenDetailData;

  const { whole, decimal } = formatCurrency(amount);

  const noLiquidityData = liquidityData.every((dataPoint) => dataPoint.value === 0);

  return (
    <div className="self-stretch w-full flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-end self-stretch">
        <LBSecondarySelect defaultValue="last-year" onClick={(option) => setPeriod(option.value)} options={periodOptions} text="Last year" />
      </div>

      <div className="px-6 flex flex-col gap-3 self-stretch">
        <div className="flex items-center gap-3 w-full">
          <Image src={tokenImageURL} alt="token-logo" width={500} height={500} className="w-6 h-6 object-cover" />
          <span className="text-primary-150 font-semibold text-[20px] leading-[32px] tracking-[-0.2px]">{name}</span>
        </div>

        <div className="flex flex-col self-stretch gap-2 items-start">
          <div className="text-primary-150 text-[48px] leading-[56px] font-semibold tracking-[-1.44px]">
            $<span>{whole}</span>.<span className="text-primary-750">{decimal}</span>
          </div>

          <ChangeIndicator change={change} />
        </div>
      </div>

      <div className="w-full flex items-center justify-center h-[295px] relative">
        <LiquidityLineChart liquidityData={liquidityData} />

        {noLiquidityData && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-primary-250 text-[20px] leading-[32px] tracking-[-0.2px] font-semibold">No price data.</div>
        )}
      </div>

      <div className="grid grid-cols-3 items-center justify-between gap-10 w-full mt-20">
        {infoData.map(({ title, value, hasPercentageBar }, index) => (
          <div
            key={index}
            className={classNames('p-4 flex-1 rounded-base border border-primary-1200 bg-primary-2500 min-h-full', {
              'flex flex-col justify-center gap-4': hasPercentageBar,
              'flex items-center': !hasPercentageBar,
            })}>
            <div className="flex flex-col justify-center gap-1.5">
              <span className="text-primary-250 text-sm">{title}</span>
              <span className="text-primary-650 text-[24px] font-medium">{value}</span>
            </div>

            {hasPercentageBar && (
              <div className="w-full h-2 bg-primary-950 rounded">
                <motion.div className="h-full bg-primary-1000 rounded" initial={{ width: 0 }} animate={{ width: value }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="self-stretch flex-1 px-6 py-3 flex items-center rounded-xl bg-primary-300 text-[14px] leading-[24px] text-primary-2550">
        When the market cap reaches $100,000 all the liquidity from the bonding curve will be deposited into Aerodrome and burned. progression increases as the price goes up.
      </p>
    </div>
  );
};

export default Overview;
