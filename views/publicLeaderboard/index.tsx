'use client';
import { useEffect } from 'react';
import Image from 'next/image';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LBBadge, LBLeaderboard } from '@/components';
import useTokenActions from '@/store/token/actions';
import useIncentiveActions from '@/store/incentive/actions';

const PublicLeaderboard = ({ tokenAddress: tokenAddressURL }: { tokenAddress: string }) => {
  const { tokenState } = useSystemFunctions();
  const { getToken } = useTokenActions();
  const { getTokenIncentives } = useIncentiveActions();

  const { token } = tokenState;

  useEffect(() => {
    if (!token) {
      getToken(tokenAddressURL);
      return;
    }

    getTokenIncentives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAddressURL, token]);

  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-start gap-4 px-5 pt-8">
        {!token ? (
          <div className="w-[72px] h-[72px] rounded-full bg-primary-50 animate-pulse" />
        ) : (
          <Image src={token?.token_logo_url || ''} alt="token-logo" width={500} height={500} className="w-[72px] h-[72px] object-cover" />
        )}

        <div className="flex flex-col gap-3 mt-1">
          {!token ? (
            <>
              <div className="animate-pulse h-7 w-20 rounded-base bg-primary-50" />
              <div className="animate-pulse h-4 w-20 rounded-base bg-primary-50" />
            </>
          ) : (
            <>
              <h1 className="text-primary-650 text-[32px] leading-[28px] font-medium font-Clash-Display">{token?.token_name}</h1>

              <span className="text-primary-700 text-[14px] leading-[16px]">${token?.token_symbol}</span>
            </>
          )}
        </div>

        <LBBadge variant={'base'} />
      </div>

      <LBLeaderboard variant="public" />
    </div>
  );
};

export default PublicLeaderboard;
