import { useEffect, useState } from 'react';

import { generateData, holdingsData, periods } from '../dummy';
import { Period } from '../types';
import DesktopView from './desktop';
import MobileView from './mobile';
import { IOverview } from './types';

const tabTexts = ['transactions', 'holders'];
export const formatCurrency = (amount: number) => {
  const [whole, decimal] = amount.toFixed(2).split('.');
  return { whole, decimal };
};

const Overview = ({ token, userRole }: IOverview) => {
  const [period, setPeriod] = useState<Period>('1m');
  const [liquidityData, setLiquidityData] = useState(generateData(period));

  const props = {
    holdingsData,
    tabTexts,
    liquidityData,
    period,
    setPeriod,
    periods,
    userRole,
    token,
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
