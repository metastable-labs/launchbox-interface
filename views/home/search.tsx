import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import useTokenActions from '@/store/token/actions';
import { LBBackdrop } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { SearchAltIcon } from '@/public/icons';
import { Token } from '@/store/token/types';
import { formatAmount, formatDateDifference, formatNumber } from '@/utils/helpers';
import useTruncateText from '@/hooks/useTruncateText';

const DotPulse = () => {
  const dots = Array(3).fill(0);

  return (
    <div className="flex gap-1">
      {dots.map((_, index) => (
        <motion.div
          key={index}
          className="w-1 h-1 rounded-full bg-gray-500"
          animate={{ opacity: [1 - 0.4 * index, 0.5, 0.1 + 0.4 * index, 0.5, 1 - 0.4 * index] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
};

const SkeletonPaper = () => {
  return (
    <div className="animate-pulse p-3.5 w-full rounded-base border border-primary-50 flex gap-4 min-h-[92px]">
      <div className="flex flex-col justify-between">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="rounded-full bg-primary-50 h-5 w-5" />
        ))}
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 bg-primary-50 rounded w-1/2" />

        <div className="flex gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={classNames('h-4 bg-primary-50 rounded', {
                'w-1/4': index !== 3,
                'w-1/6': index === 3,
              })}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <div className="h-4 bg-primary-50 rounded w-1/2"></div>
          <div className="h-4 bg-primary-50 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const Paper = ({ token }: { token: Token }) => {
  const { truncate } = useTruncateText(undefined, 4, 3);

  const { token_logo_url, token_name, price, market_cap, created_at, token_address, exchange_address } = token;
  const icons = [token_logo_url, '/icons/base-primary-mobile-icon.svg'];
  const age = formatDateDifference(created_at);

  const info = [
    { title: 'Price', value: `$${formatAmount(price, 7)}` },
    { title: 'Market Cap', value: `$${formatNumber(market_cap || 0)}` },
    { title: 'Age', value: age },
  ];

  const extra = [
    {
      title: 'Pair',
      value: truncate(exchange_address),
    },
    {
      title: 'Token',
      value: truncate(token_address),
    },
  ];

  return (
    <Link href={`/${token.token_address}`} className="p-3.5 w-full rounded-base border border-primary-50 flex gap-4 min-h-[92px]">
      <div className="flex flex-col justify-between">
        {icons.map((icon, index) => (
          <Image key={index} src={icon} alt={index === 0 ? `${token_name}-icon` : 'base-icon'} width={200} height={200} className="w-4 h-4 object-cover" />
        ))}
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h1 className="text-primary-650 text-[16px] leading-[16px] font-medium">
          {token_name} / <span className="text-primary-250 text-[14px] leading-[14px]">Base</span>
        </h1>

        <div className="flex gap-3.5 flex-wrap">
          {info.map(({ title, value }, index) => (
            <div key={index} className="flex gap-1.5 text-[13px] leading-[16px]">
              <span className="text-primary-750">{title}:</span>
              <span className="text-primary-250 font-Clash-Display">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-1.5">
          {extra.map(({ title, value }, index) => (
            <div key={index} className="flex gap-0.5 text-[10px] leading-[16px]">
              <span className="text-primary-750">{title}:</span>
              <span className="text-primary-250 font-Clash-Display">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

const SearchComponent = () => {
  const { getSearchedTokens } = useTokenActions();
  const { tokenState } = useSystemFunctions();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { searchLoading } = tokenState;

  const showDropdown = searchTerm.length > 1 && isOpen;
  const showEmptyState = !searchLoading && !Boolean(tokenState.searchedTokens?.length);
  const showResults = !searchLoading && Boolean(tokenState.searchedTokens?.length);

  const debouncedSetSearchTerm = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length > 1) {
      getSearchedTokens(`search=${searchTerm}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative h-10">
      <div
        className={classNames('flex items-center justify-center gap-2 min-w-80 px-3 py-2 rounded-lg border border-primary-1950 bg-white shadow-table-cta relative max-h-full', { 'z-[70]': isOpen })}>
        <div className="min-w-fit">
          <SearchAltIcon />
        </div>

        <input
          type="text"
          placeholder="Search by token or contract..."
          className={classNames('w-full text-primary-2200 text-[14px] leading-[24px] bg-transparent outline-none', {})}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
        />

        <div className="min-w-5">
          <AnimatePresence>
            {searchLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DotPulse />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {showDropdown && (
          <>
            <motion.div
              key={+isOpen}
              initial={{ opacity: 0, y: '250px' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
              className="top-[115%] absolute w-80 md:w-[414px] lg:w-[573px] right-0 bg-primary-3300 border border-primary-1200 rounded-base flex flex-col items-stretch gap-4 p-6 z-[70] max-h-[504px] overflow-auto">
              <h1 className="text-primary-650 text-[16px] leading-[16px] font-medium font-Clash-Display">Results</h1>

              {searchLoading && [...Array(2)].map((_, index) => <SkeletonPaper key={index} />)}

              {showEmptyState && (
                <div className="flex items-center justify-center h-36">
                  <p className="text-primary-700 text-sm">
                    No results found for <span className="font-Clash-Display">&quot;{searchTerm}&quot;</span>
                  </p>
                </div>
              )}

              {showResults && tokenState.searchedTokens?.map((token: Token) => <Paper token={token} key={token.id} />)}
            </motion.div>

            <LBBackdrop onClick={() => setIsOpen(false)} variant="secondary" />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchComponent;
