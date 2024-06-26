import { useEffect, useState } from 'react';

import { generateData, periods } from '../dummy';
import { Period } from '../types';
import DesktopView from './desktop';
import MobileView from './mobile';
import { IOverview } from './types';
import useTransactionActions from '@/store/transaction/actions';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useHolderActions from '@/store/holder/actions';

const tabTexts = ['transactions', 'holders'];
export const formatCurrency = (amount: number) => {
  const [whole, decimal] = amount.toFixed(2).split('.');
  return { whole, decimal };
};

const Overview = ({ token, userRole }: IOverview) => {
  const { getTokenTransactions } = useTransactionActions();
  const { getTokenHolders } = useHolderActions();
  const { transactionState, holderState } = useSystemFunctions();

  const [period, setPeriod] = useState<Period>('1m');
  const [liquidityData, setLiquidityData] = useState(generateData(period));
  const [shouldFetchMoreTransactions, setShouldFetchMoreTransactions] = useState(false);
  const [shouldFetchMoreHolders, setShouldFetchMoreHolders] = useState(false);

  const props = {
    tabTexts,
    liquidityData,
    period,
    setPeriod,
    periods,
    userRole,
    token,
    shouldFetchMoreTransactions,
    setShouldFetchMoreTransactions,
    shouldFetchMoreHolders,
    setShouldFetchMoreHolders,
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

  useEffect(() => {
    if (!shouldFetchMoreHolders) return;

    const skip = holderState?.holders?.length;

    getTokenHolders(`take=20&skip=${skip}`, { onSuccess: () => setShouldFetchMoreHolders(false) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMoreHolders]);

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
