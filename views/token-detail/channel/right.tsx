import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { CheckAltIcon, CopyIcon, SmallFarcasterIcon } from '@/public/icons';
import { formatAmount, formatNumber } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useCopy from '@/hooks/useCopy';
import useTruncateText from '@/hooks/useTruncateText';
import { LBBadge, LBClickAnimation, LBShare } from '@/components';
import { Holder } from '@/store/holder/types';
import useCastActions from '@/store/casts/actions';
import { generateData, periods } from '../dummy';
import { Period } from '../types';
import AreaChart from '../area-chart';
import Info from './info';

const Header = () => {
  const { tokenState } = useSystemFunctions();
  const { handleCopy, hasCopied } = useCopy();

  const { token } = tokenState;
  const channel = token?.socials?.warpcast?.channel;

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);
  const noChannelDescription = '- -';

  const channelImage = noChannel ? 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717743095/crypto-icon-instance_ygqnhb.jpg' : channel?.image_url!;

  const icons = [<CopyIcon key="copy" width={16} height={16} />, <CheckAltIcon key="check" width={16} height={16} />];

  return (
    <div className="flex items-start justify-between pb-[30px] border-b border-b-primary-50 flex-wrap gap-y-5">
      <div className="flex items-start gap-4">
        <Image src={channelImage} alt="channel-logo" width={500} height={500} className="w-10 h-10 md:w-[50px] md:h-[50px] object-cover" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h1 className="text-primary-650 font-medium break-words text-2xl lg:text-[32px] lg:leading-[28px] font-Clash-Display">{channel?.name || '- -'}</h1>
            <LBBadge variant="warpcast" />
          </div>

          <p className="text-primary-700 text-[14px] leading-[21px] max-w-[313px]">{channel?.description || noChannelDescription}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 h-[40px] justify-self-end">
        <LBClickAnimation
          className="h-full flex items-center justify-center px-3 py-2.5 bg-white border border-primary-1950 rounded-lg shadow-table-cta"
          onClick={() => handleCopy(channel?.url || '')}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={+hasCopied}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              exit={{ opacity: 0 }}
              className={classNames('', { 'pointer-events-none': hasCopied })}>
              {icons[+hasCopied]}
            </motion.div>
          </AnimatePresence>
        </LBClickAnimation>

        <LBShare />
      </div>
    </div>
  );
};

const Chart = () => {
  const { tokenState } = useSystemFunctions();
  const { getChannelCastAnalytics } = useCastActions();

  const [period, setPeriod] = useState<Period>('1w');
  const [growthData, setGrowthData] = useState(generateData(period, true));

  const { token } = tokenState;

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);

  useEffect(() => {
    if (noChannel) {
      return setGrowthData([]);
    }

    getChannelCastAnalytics(`period=${period}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, noChannel]);

  return (
    <div className="self-stretch flex flex-col gap-[30px]">
      <div className="self-stretch flex items-center justify-between flex-wrap gap-4">
        <span className="text-primary-700 text-[14px] leading-[24px] font-Clash-Display">Channel growth</span>

        <div className="flex items-center justify-center gap-8">
          {periods.map(({ text, value }) => (
            <span
              onClick={() => setPeriod(value)}
              key={value}
              className={classNames('text-sm flex items-center justify-center px-1.5 py-0.5 cursor-pointer transition-colors duration-300 font-Clash-Display', {
                'bg-primary-200 rounded-[5px] text-primary-2000 font-medium': value === period,
                'text-primary-700': value !== period,
                'pointer-events-none': noChannel,
              })}>
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className={classNames('w-full flex items-center justify-center h-[180px]', { 'pointer-events-none': noChannel })}>
        <AreaChart period={period} variant="secondary" />
      </div>
    </div>
  );
};

const HolderBadge = ({ address, balance }: Holder) => {
  const { tokenState } = useSystemFunctions();
  const { truncatedText } = useTruncateText(address, 4, 4);

  const formattedBalance = Number(balance);
  const formattedPriceInUSD = formattedBalance * Number(tokenState?.token?.price!);

  const holderAmount = formatNumber(formattedBalance);
  const holderAmountInUSD = formatNumber(formatAmount(formattedPriceInUSD));
  const imageToShow = '/icons/wallet-alt-icon.svg';
  const textToShow = truncatedText;

  return (
    <div className="flex items-center gap-0.5 py-1 pl-1 pr-2 justify-center bg-primary-200 rounded-full">
      <Image src={imageToShow} alt="avatar" width={500} height={500} className="w-4 h-4 object-cover rounded-full" />
      <p className="font-medium">
        <span className="text-primary-250 text-[14px] leading-[21px]">{textToShow}</span>{' '}
        <span className="text-[12px] leading-[150%] text-primary-850">
          {holderAmount} = <span className="font-Clash-Display">$</span>
          {holderAmountInUSD}
        </span>
      </p>
    </div>
  );
};

const max_star_rating = 5;
const max_social_score = 500;

const Right = ({ userRole }: { userRole: 'admin' | 'user' }) => {
  const { tokenState, holderState, transactionState, castState } = useSystemFunctions();

  const { token } = tokenState;

  const channel = token?.socials?.warpcast?.channel;

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);

  const total_tx_buy_count = token?.total_buy_count || 0;
  const total_tx_sell_count = token?.total_sell_count || 0;
  const total_tx_count = total_tx_buy_count + total_tx_sell_count;
  const social_capital = castState.meta?.social_capital || 0;
  const social_score = (social_capital / max_social_score) * max_star_rating;

  const weekly_cast = castState.meta?.weekly_casts || 0;
  const weekly_casts_increased = castState.meta?.weekly_casts_increased;
  const weekly_casts_change = castState.meta?.weekly_casts_percentage_change;
  const realCastChange = weekly_casts_increased ? Math.abs(weekly_casts_change!) : -Math.abs(weekly_casts_change!);

  const info = [
    { title: 'Channel followers', text: channel?.follower_count?.toString(), activeFollowersPercentage: 13.3 },
    { title: 'Weekly cast', text: weekly_cast.toLocaleString(), weeklyCastPercentage: realCastChange },
    { title: 'Social score', text: social_capital.toLocaleString(), socialScore: social_score },
    { title: 'Price (USD)', text: `$${formatAmount(token?.price, 7)}`, priceChangePercentage: 6.7 },
    { title: 'Txns', txns: { numerator: total_tx_count, denominator: { numerator: total_tx_buy_count, denominator: total_tx_sell_count } } },
    { title: 'Total supply', text: `${token?.token_total_supply?.toLocaleString()} ${token?.token_symbol}` },
    // { title: 'Liquidity', text: `$${formatNumber(206_000)}` },
    { title: 'Volume', text: `$${formatNumber(formatAmount(token?.volume))}` },
  ];

  return (
    <div className="w-full lg:w-2/5">
      <div className="w-full p-6 rounded-lg border border-primary-50 h-fit flex flex-col gap-6">
        <Header />

        <div className="self-stretch flex flex-col items-center gap-4">
          <div className="self-stretch flex flex-col gap-9 items-center pb-4 border-b border-b-primary-50">
            <Chart />

            <div className="self-stretch flex items-center justify-between">
              <span className="text-primary-700 text-[14px] leading-[24px]">Channel</span>
              <div className="flex items-center gap-1">
                <SmallFarcasterIcon />
                <a href={channel?.url} target="_blank" className="text-primary-650 leading-[20.8px] font-medium underline underline-offset-4 font-Clash-Display">
                  {noChannel ? '-' : channel?.name}
                </a>
              </div>
            </div>
          </div>

          <div className={classNames('self-stretch flex items-center justify-between', { 'pb-4 border-b border-b-primary-50': noChannel })}>
            <span className="text-primary-700 text-[14px] leading-[24px]">Holders</span>

            <span className="text-primary-650 leading-[20.8px] font-medium font-Clash-Display">{noChannel ? '-' : holderState.meta?.total_count!.toLocaleString()}</span>
          </div>

          {!noChannel && (
            <div className="flex content-start gap-2.5 flex-wrap pb-4 border-b border-b-primary-50">
              {holderState?.holders?.map((holder, index) => (
                <HolderBadge key={index} {...holder} />
              ))}
            </div>
          )}

          {info.map((item, index) => (
            <Info noChannel={noChannel} key={index} {...item} hasBorder={index !== info.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Right;
