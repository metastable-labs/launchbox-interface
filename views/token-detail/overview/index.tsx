import { useEffect, useState } from 'react';

import useTransactionActions from '@/store/transaction/actions';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useHolderActions from '@/store/holder/actions';
import useTokenActions from '@/store/token/actions';
import { setAnalytics } from '@/store/token';
import { generateData, periods } from '../dummy';
import { Period } from '../types';
import DesktopView from './desktop';
import MobileView from './mobile';
import { IOverview } from './types';

const tabTexts = ['transactions', 'holders'];

const Overview = ({ userRole }: IOverview) => {
  const { getTokenTransactions } = useTransactionActions();
  const { getTokenHolders } = useHolderActions();
  const { transactionState, holderState, tokenState, dispatch } = useSystemFunctions();
  const { getAnalytics } = useTokenActions();

  const [period, setPeriod] = useState<Period>('1w');
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
    shouldFetchMoreTransactions,
    setShouldFetchMoreTransactions,
    shouldFetchMoreHolders,
    setShouldFetchMoreHolders,
  };

  useEffect(() => {
    if (!tokenState.token) return;

    const states = {
      '1h': tokenState.oneWeekAnalytics,
      '24h': tokenState.oneDayAnalytics,
      '1w': tokenState.oneWeekAnalytics,
      '1m': tokenState.oneMonthAnalytics,
    };

    dispatch(setAnalytics(states[period]));

    // setLiquidityData(generateData(period));
    getAnalytics(tokenState.token?.id, period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
