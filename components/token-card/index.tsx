import Link from 'next/link';
import moment from 'moment';

import React from 'react';
import { SmallBaseIcon } from '@/public/icons';
import LBClickAnimation from '../click-animation';
import { ILBTokenCard } from './types';

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

const LBTokenCard = ({ createdAt, name, symbol, id, network }: ILBTokenCard) => {
  const date = timeAgo(createdAt);

  return (
    <Link href={`/${network}/tokens/${id}`}>
      <LBClickAnimation className="p-5 bg-white rounded-lg border border-primary-50 flex flex-col gap-4 w-full h-[275px]">
        <div className="flex items-center justify-between self-stretch">
          <div className="w-12 h-12 rounded bg-primary-300" />
          <SmallBaseIcon />
        </div>

        <div className="flex flex-col items-start gap-0.5">
          <div className="flex items-center justify-center gap-1 text-primary-700 text-[20px] leading-[24px]">
            {name} <span className="border-[0.5px] border-primary-50 rounded-lg bg-primary-800 px-2 text-primary-750 text-[12px] leading-[24px] font-medium">{symbol}</span>
          </div>
          <p className="text-primary-850 text-[14px] leading-[24px]">Deployed {date}</p>
        </div>
      </LBClickAnimation>
    </Link>
  );
};

export default LBTokenCard;
