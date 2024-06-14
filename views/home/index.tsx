'use client';
import { useEffect, useState } from 'react';
import { debounce, set } from 'lodash';

import { LBContainer, LBModal, LBTable, LBTradeInterface } from '@/components';
import { BaseBadgeicon, SearchAltIcon } from '@/public/icons';
import { tokens } from './dummy';
import { ILBTokenCard } from '@/components/token-card/types';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useTokenActions from '@/store/token/actions';

const HomeView = () => {
  const { navigate, tokenState } = useSystemFunctions();
  const { getTokens } = useTokenActions();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeToken, setActiveToken] = useState<ILBTokenCard>();

  const debouncedSetSearchTerm = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSetSearchTerm(value);
  };

  const cta = (id: string) => {
    const token = tokens.find((token) => token.id === id);
    setActiveToken(token);
    console.log('CTA', token);
  };

  const rowClick = (id: string) => navigate.push(`/${id}`);

  const closeModal = () => setActiveToken(undefined);
  console.log(tokenState.tokens);

  useEffect(() => {
    console.log('Searching...', searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchTerm]);

  useEffect(() => {
    getTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-[50px] flex flex-col gap-9 w-full">
      <div className="w-full pb-9 border-b border-b-primary-50">
        <LBContainer>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-primary-650 text-[32px] leading-[38px] font-medium">Tokens</h1>
                <BaseBadgeicon />
              </div>
              <p className="text-primary-700">Tokens launched will be updated here in realtime</p>
            </div>

            <div className="flex items-center justify-center gap-2 min-w-80 px-3 py-2 rounded-lg border border-primary-1950 bg-white shadow-table-cta">
              <SearchAltIcon />
              <input
                type="text"
                placeholder="Search by token or contract..."
                className="w-full text-primary-2200 text-[14px] leading-[24px] bg-transparent outline-none"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </LBContainer>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 xl:px-20 relative">
        <LBTable data={tokens} variant="tertiary" cta={cta} rowClick={rowClick} />
      </div>

      <LBModal close={closeModal} show={Boolean(activeToken)}>
        <LBTradeInterface token={activeToken!} balance={100} standAlone={false} />
      </LBModal>
    </div>
  );
};

export default HomeView;
