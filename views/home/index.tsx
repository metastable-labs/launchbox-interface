'use client';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { LBContainer, LBLoader, LBModal, LBTable, LBTradeInterface } from '@/components';
import { BaseBadgeicon, SearchAltIcon } from '@/public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useTokenActions from '@/store/token/actions';
import { Token } from '@/store/token/types';
import { setToken } from '@/store/token';
import { readContract } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbow/rainbowkit';
import LaunchBoxExchange from '@/config/rainbow/abis/LaunchBoxExchange.json';
import { formatEther } from 'viem';
import EmptyState from '../token/empty';
import { setMeta, setTransactions } from '@/store/transaction';

const HomeView = () => {
  const { navigate, tokenState, dispatch } = useSystemFunctions();
  const { getTokens } = useTokenActions();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeToken, setActiveToken] = useState<Token>();
  const [shouldFetchMore, setShouldFetchMore] = useState(false);

  const { tokens, meta, loading } = tokenState;

  const tableData = tokens?.map((token) => ({
    name: token.token_name,
    tokenSymbol: token.token_symbol,
    id: token.id,
    createdAt: token.created_at,
    updatedAt: token.updated_at,
    liquidity: { numerator: 3, denominator: 3450.3 },
    marketCap: { numerator: token.market_cap, denominator: token?.token_price_in_usd },
    txns: { numerator: 706, denominator: { numerator: 406, denominator: 300 } },
    volume: token.token_total_supply,
    walletAvatarURL: token.token_logo_url,
    wallet: token.token_address,
  }));

  const debouncedSetSearchTerm = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSetSearchTerm(value);
  };

  const cta = (id: string) => {
    const token = tokens?.find((token) => token.id === id);
    setActiveToken(token!);
  };

  const rowClick = (id: string) => {
    const token = tokens?.find((token) => token.token_address === id);
    dispatch(setToken(token!));
    dispatch(setTransactions(undefined));
    dispatch(setMeta(undefined));
    navigate.push(`/${id}`);
  };

  const closeModal = () => setActiveToken(undefined);

  useEffect(() => {
    // getTokens(`take=50&search=${searchTerm}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchTerm]);

  useEffect(() => {
    if (!shouldFetchMore) return;

    getTokens(`take=20&skip=${tokens?.length}`, { onSuccess: () => setShouldFetchMore(false) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  useEffect(() => {
    getTokens('take=50');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-screen h-[80vh] flex items-center justify-center">
        <LBLoader variant="large" />
      </div>
    );

  return (
    <div className="py-[50px] flex flex-col gap-9 w-full">
      <div className="w-full pb-9 border-b border-b-primary-50">
        <LBContainer>
          <div className="w-full flex flex-wrap gap-8 items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-primary-650 text-[32px] leading-[38px] font-medium">Tokens</h1>
                <BaseBadgeicon />
              </div>
              <p className="text-primary-700">Tokens launched will be updated here in realtime</p>
            </div>

            {tableData?.length !== 0 && (
              <div className="flex items-center justify-center gap-2 min-w-80 px-3 py-2 rounded-lg border border-primary-1950 bg-white shadow-table-cta">
                <SearchAltIcon />
                <input
                  type="text"
                  placeholder="Search by token or contract..."
                  className="w-full text-primary-2200 text-[14px] leading-[24px] bg-transparent outline-none"
                  onChange={handleSearchChange}
                />
              </div>
            )}
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
            shouldFetchMore={shouldFetchMore}
            take={meta?.take}
            total={meta?.totalCount}
            data={tableData || []}
            variant="tertiary"
            cta={cta}
            rowClick={rowClick}
          />
        </div>
      )}

      <LBModal close={closeModal} show={Boolean(activeToken)}>
        <LBTradeInterface token={activeToken!} balance={100} standAlone={false} />
      </LBModal>
    </div>
  );
};

export default HomeView;
