import { useEffect, useState } from 'react';

import { generateData } from './dummy';
import { holdingsData, transactionsData } from '../dummy';
import { IOverview, Period } from './types';
import DesktopView from './desktop';
import MobileView from './mobile';

const tabTexts = ['transactions', 'holders'];
export const formatCurrency = (amount: number) => {
  const [whole, decimal] = amount.toFixed(2).split('.');
  return { whole, decimal };
};

const Overview = ({ tokenDetailData, userRole }: IOverview) => {
  const [period, setPeriod] = useState<Period>('1m');
  const [liquidityData, setLiquidityData] = useState(generateData(period));

  const periods = [
    { text: '1H', value: '1h' as Period },
    { text: '24H', value: '24h' as Period },
    { text: '1W', value: '1w' as Period },
    { text: '1M', value: '1m' as Period },
  ];

  const props = {
    transactionsData,
    holdingsData,
    tabTexts,
    liquidityData,
    period,
    setPeriod,
    periods,
    tokenDetailData,
    userRole,
  };

  useEffect(() => {
    setLiquidityData(generateData(period));
  }, [period]);

  return (
    <>
      <div className="hidden xl:block">
        <DesktopView {...props} />
      </div>
      <div className="block xl:hidden">
        <MobileView {...props} />
      </div>
    </>
  );
};

export default Overview;
