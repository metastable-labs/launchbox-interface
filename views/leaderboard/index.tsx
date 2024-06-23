'use client';

import Image from 'next/image';

import { BaseBadgeicon } from '@/public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LBLeaderboard } from '@/components';

const LeaderboardView = () => {
  const { tokenState, navigate } = useSystemFunctions();

  const { token } = tokenState;
  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-start gap-4 px-5 pt-8">
        <Image src={token?.token_logo_url || ''} alt="token-logo" width={500} height={500} className="w-[72px] h-[72px] object-cover" />

        <div className="flex flex-col gap-3 mt-1">
          <h1 className="text-primary-650 text-[32px] leading-[28px] font-medium">{token?.token_name}</h1>

          <span className="text-primary-700 text-[14px] leading-[16px]">${token?.token_symbol}</span>
        </div>

        <BaseBadgeicon />
      </div>

      <LBLeaderboard variant="public" />
    </div>
  );
};

export default LeaderboardView;
