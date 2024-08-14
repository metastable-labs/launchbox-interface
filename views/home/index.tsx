'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { LBBadge, LBContainer, LBError, LBModal, LBTable, LBTradeInterface } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useTokenActions from '@/store/token/actions';
import { Token } from '@/store/token/types';
import { resetAnalytics, setToken } from '@/store/token';
import EmptyState from '../token/empty';
import { setMeta as setTransactionsMeta, setTransactions } from '@/store/transaction';
import { setMeta as setHoldersMeta, setHolders } from '@/store/holder';
import { formatAmount } from '@/utils/helpers';
import { resetCastAnalytics } from '@/store/casts';
import SearchComponent from './search';

const HomeView = () => {
  const { navigate, tokenState, dispatch } = useSystemFunctions();
  const { getTokens } = useTokenActions();

  const [activeToken, setActiveToken] = useState<Token>();
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);

  const { tokens, meta, loading } = tokenState;

  const tableData = tokens?.map((token) => ({
    name: token.token_name,
    tokenSymbol: token.token_symbol,
    id: token.id,
    createdAt: token.created_at,
    updatedAt: token.updated_at,
    liquidity: { numerator: 3, denominator: 3450.3 },
    marketCap: { numerator: token.market_cap, denominator: formatAmount(token?.price, 8) },
    txns: { numerator: token.total_buy_count + token.total_sell_count, denominator: { numerator: token.total_buy_count, denominator: token.total_sell_count } },
    volume: formatAmount(token.volume),
    walletAvatarURL: token.token_logo_url,
    wallet: token.token_address,
  }));

  const showShouldFetchMore = tokens && tokens.length > 0 ? false : shouldFetchMore || (loading && !tokens);

  const cta = (id: string) => {
    const token = tokens?.find((token) => token.id === id);
    setActiveToken(token!);
  };

  const rowClick = (id: string) => {
    const token = tokens?.find((token) => token.token_address === id);
    dispatch(setToken(token!));
    dispatch(setTransactions(undefined));
    dispatch(setTransactionsMeta(undefined));
    dispatch(setHolders(undefined));
    dispatch(setHoldersMeta(undefined));
    dispatch(resetAnalytics());
    dispatch(resetCastAnalytics());
    navigate.push(`/${id}`);
  };

  const closeModal = () => setActiveToken(undefined);

  const fetchTokens = () => {
    setShowErrorState(false);
    getTokens('take=20', { onError: () => setShowErrorState(true) });
  };

  useEffect(() => {
    if (!shouldFetchMore) return;

    getTokens(`take=20&skip=${tokens?.length}`, { onSuccess: () => setShouldFetchMore(false) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  useEffect(() => {
    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showErrorState && !tokens) {
    return (
      <LBError
        onClick={fetchTokens}
        subtitle="Unable to get list of tokens at the moment. Please check your network connection and try again later."
        title="Unable to get Tokens"
        standAlone
        show={showErrorState}
      />
    );
  }

  return (
    <div className="py-[50px] flex flex-col gap-9 w-full">
      <div className="w-full pb-9 border-b border-b-primary-50">
        <LBContainer>
          <div className="w-full flex flex-wrap gap-8 items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-primary-650 text-[32px] leading-[38px] font-medium font-Clash-Display">Tokens</h1>
                <LBBadge variant="base" />
              </div>
              <p className="text-primary-700">Tokens launched will be updated here in realtime</p>
            </div>

            <AnimatePresence>{Boolean(tableData?.length) && <SearchComponent />}</AnimatePresence>
          </div>
        </LBContainer>
      </div>

      {tableData?.length === 0 ? (
        <div key="empty-state" className="w-full h-[50vh] flex items-center justify-center">
          <EmptyState isSecondary />
        </div>
      ) : (
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 xl:px-20 relative">
          <LBTable
            setShouldFetchMore={setShouldFetchMore}
            shouldFetchMore={showShouldFetchMore}
            take={meta?.take}
            total={meta?.total_count}
            data={tableData || []}
            variant="tertiary"
            cta={cta}
            rowClick={rowClick}
          />
        </div>
      )}

      <LBModal close={closeModal} show={Boolean(activeToken)}>
        <LBTradeInterface standAlone={false} token={activeToken} />
      </LBModal>
    </div>
  );
};

export default HomeView;
