import { useEffect, useState } from 'react';

import { generateData, holdingsData, periods } from '../dummy';
import { Period } from '../types';
import DesktopView from './desktop';
import MobileView from './mobile';
import { IOverview } from './types';
import useTransactionActions from '@/store/transaction/actions';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const tabTexts = ['transactions', 'holders'];
export const formatCurrency = (amount: number) => {
  const [whole, decimal] = amount.toFixed(2).split('.');
  return { whole, decimal };
};

const Overview = ({ token, userRole }: IOverview) => {
  const { getTokenTransactions } = useTransactionActions();
  const { transactionState } = useSystemFunctions();

  const [period, setPeriod] = useState<Period>('1m');
  const [liquidityData, setLiquidityData] = useState(generateData(period));
  const [shouldFetchMoreTransactions, setShouldFetchMoreTransactions] = useState(false);

  const props = {
    holdingsData,
    tabTexts,
    liquidityData,
    period,
    setPeriod,
    periods,
    userRole,
    token,
    shouldFetchMoreTransactions,
    setShouldFetchMoreTransactions,
  };

  useEffect(() => {
    setLiquidityData(generateData(period));
  }, [period]);

  useEffect(() => {
    if (!shouldFetchMoreTransactions) return;

    const skip = transactionState?.transactions?.length;

    getTokenTransactions(`take=20&skip=${skip}`, { onSuccess: () => setShouldFetchMoreTransactions(false) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMoreTransactions]);

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
