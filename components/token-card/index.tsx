import Link from 'next/link';
import moment from 'moment';

import React from 'react';
import { SmallBaseIcon } from '@/public/icons';
import LBClickAnimation from '../click-animation';
import Image from 'next/image';
import { Token } from '@/store/token/types';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setToken } from '@/store/token';

const timeAgo = (date: string) => {
  const now = moment();
  const createdMoment = moment(date);
  const daysThreshold = 7;

  const diffInDays = now.diff(createdMoment, 'days');

  if (diffInDays >= daysThreshold) {
    return createdMoment.format('DD/MM/YY');
  }

  return createdMoment.fromNow();
};

const LBTokenCard = (token: Token) => {
  const { dispatch } = useSystemFunctions();

  const { created_at, token_address, token_logo_url, token_name, token_symbol } = token;
  const date = timeAgo(created_at);

  const onClick = () => dispatch(setToken(token));

  return (
    <Link onClick={onClick} href={`/${token_address}`}>
      <LBClickAnimation className="p-5 bg-white rounded-lg border border-primary-50 flex flex-col gap-4 w-full h-[275px]">
        <div className="flex items-center justify-between self-stretch">
          <Image src={token_logo_url} alt={`${token_name} logo`} width={500} height={500} className="w-12 h-12 object-cover" />
          <SmallBaseIcon />
        </div>

        <div className="flex flex-col items-start gap-0.5">
          <div className="flex items-center justify-center gap-1 text-primary-700 text-[20px] leading-[24px]">
            {token_name} <span className="border-[0.5px] border-primary-50 rounded-lg bg-primary-800 px-2 text-primary-750 text-[12px] leading-[24px] font-medium">{token_symbol}</span>
          </div>
          <p className="text-primary-850 text-[14px] leading-[24px]">Deployed {date}</p>
        </div>
      </LBClickAnimation>
    </Link>
  );
};

export default LBTokenCard;
