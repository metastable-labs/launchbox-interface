import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { BaseBadgeicon, CheckAltIcon, ConfigSiteIcon, CopyIcon, FarcasterIcon, SmallFarcasterIcon, WebIcon } from '@/public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useCopy from '@/hooks/useCopy';
import { generateData, holders, periods } from '../dummy';
import { Period } from '../types';
import { LBClickAnimation, LBShare } from '@/components';
import classNames from 'classnames';
import LineChart from '../line-chart';
import { formatNumber } from '@/components/table/row';
import Info from './info';

const dollarRate = 0.014728;

const Header = () => {
  const { tokenState } = useSystemFunctions();

  const { token } = tokenState;
  const channel = token?.socials?.warpcast?.channel;

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);
  const noChannelDescription = 'Satosh is a lorem lore mlore lore. Satosh is a lorem lore mlore lore Satosh is a lorem lore mlore lore Satosh is a lorem lore mlore lore';

  const channelImage = noChannel ? 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717743095/crypto-icon-instance_ygqnhb.jpg' : channel?.image_url!;

  return (
    <div className="flex items-start gap-4">
      <Image src={channelImage} alt="channel-logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-primary-650 font-medium break-words text-[30px] lg:text-[32px] leading-[28px]">{channel?.name || 'No Channel'}</h1>
          <BaseBadgeicon />
        </div>

        <p className="text-primary-700 text-[14px] leading-[21px]">{channel?.description || noChannelDescription}</p>
      </div>
    </div>
  );
};

const Actions = ({ userRole }: { userRole: 'admin' | 'user' }) => {
  const { tokenState, navigate } = useSystemFunctions();
  const { handleCopy, hasCopied } = useCopy();

  const { token } = tokenState;
  const channel = token?.socials?.warpcast?.channel;

  const actions = [
    {
      icons: [<CopyIcon key="copy" width={16} height={16} />, <CheckAltIcon key="check" width={16} height={16} />],
      onClick: () => handleCopy(channel?.url || ''),
      show: true,
      hasCopied,
    },
    {
      icon: <ConfigSiteIcon />,
      onClick: () => navigate.push('/builder'),
      show: userRole === 'admin',
    },
    {
      icon: <WebIcon />,
      onClick: () => window.open(token?.website_url, '_blank'),
      show: userRole === 'user',
    },
    {
      icon: <FarcasterIcon />,
      onClick: () => window.open(token?.warpcast_channel_link, '_blank'),
      show: userRole === 'user',
    },
  ];

  return (
    <div className="flex items-stretch gap-2 w-full pb-[30px] border-b border-b-primary-50">
      {actions.map(({ icon, onClick, show, hasCopied, icons }, index) => (
        <LBClickAnimation
          key={index}
          className={classNames('w-full flex items-center justify-center px-3 py-2 bg-white border border-primary-1950 rounded-lg shadow-table-cta', {
            hidden: !show,
          })}
          onClick={onClick}>
          {icons && (
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
          )}

          {icon && icon}
        </LBClickAnimation>
      ))}

      <LBShare fullWidth />
    </div>
  );
};

const Chart = () => {
  const { tokenState } = useSystemFunctions();

  const [period, setPeriod] = useState<Period>('1w');
  const [growthData, setGrowthData] = useState(generateData(period, true));

  const { token } = tokenState;

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);

  useEffect(() => {
    if (!noChannel) {
      return setGrowthData(generateData(period, true));
    }

    return setGrowthData([]);
  }, [period, noChannel]);

  return (
    <div className="self-stretch flex flex-col gap-[30px]">
      <div className="self-stretch flex items-center justify-between flex-wrap gap-4">
        <span className="text-primary-700 text-[14px] leading-[24px]">Channel growth</span>

        <div className="flex items-center justify-center gap-8">
          {periods.map(({ text, value }) => (
            <span
              onClick={() => setPeriod(value)}
              key={value}
              className={classNames('text-sm flex items-center justify-center px-1.5 py-0.5 cursor-pointer transition-colors duration-300 font-Aeonik', {
                'bg-primary-200 rounded-base text-primary-2000 font-medium': value === period,
                'text-primary-700': value !== period,
                'pointer-events-none': noChannel,
              })}>
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className={classNames('w-full flex items-center justify-center min-h-[180px]', { 'pointer-events-none': noChannel })}>
        <LineChart period={period} data={growthData} variant="secondary" />
      </div>
    </div>
  );
};

const Right = ({ userRole }: { userRole: 'admin' | 'user' }) => {
  const { tokenState } = useSystemFunctions();

  const { token } = tokenState;
  const channel = token?.socials?.warpcast?.channel;

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);

  const info = [
    { title: 'Channel followers', text: channel?.follower_count?.toString(), activeFollowersPercentage: 13.3 },
    { title: 'Weekly cast', text: (10354).toLocaleString(), weeklyCastPercentage: 16.7 },
    { title: 'Social score', text: (504.01).toLocaleString(), socialScore: 3 },
    { title: 'Price (1D)', text: `$${0.00567}`, priceChangePercentage: 6.7 },
    { title: 'Txns', txns: { numerator: 706, denominator: { numerator: 406, denominator: 300 } } },
    { title: 'Total supply', text: `${token?.token_total_supply.toLocaleString()} ${token?.token_symbol}` },
    { title: 'Liquidity', text: `$${formatNumber(206_000)}` },
    { title: 'Volume', text: `$${formatNumber(4_000_000)}` },
  ];

  return (
    <div className="w-full lg:w-2/5">
      <div className="w-full p-6 rounded-lg border border-primary-50 h-fit flex flex-col gap-6">
        <Header />

        <Actions userRole={userRole} />

        <div className="self-stretch flex flex-col items-center gap-4">
          <div className="self-stretch flex flex-col gap-9 items-center pb-4 border-b border-b-primary-50">
            <Chart />

            <div className="self-stretch flex items-center justify-between">
              <span className="text-primary-700 text-[14px] leading-[24px]">Channel</span>
              <div className="flex items-center gap-1">
                <SmallFarcasterIcon />
                <span className="text-primary-650 leading-[20.8px] font-medium underline underline-offset-4">{noChannel ? '-' : token?.token_name}</span>
              </div>
            </div>
          </div>

          <div className={classNames('self-stretch flex items-center justify-between', { 'pb-4 border-b border-b-primary-50': noChannel })}>
            <span className="text-primary-700 text-[14px] leading-[24px]">Holders</span>

            <span className="text-primary-650 leading-[20.8px] font-medium">{noChannel ? '-' : (37602).toLocaleString()}</span>
          </div>

          {!noChannel && (
            <div className="flex content-start gap-2.5 flex-wrap pb-4 border-b border-b-primary-50">
              {holders.map(({ name, amount, avatarURL }, index) => (
                <div key={index} className="flex items-center gap-0.5 py-1 pl-1 pr-2 justify-center bg-primary-200 rounded-full">
                  <Image src={avatarURL} alt="avatar" width={500} height={500} className="w-4 h-4 object-cover rounded-full" />
                  <p className="font-medium">
                    <span className="text-primary-250 text-[14px] leading-[21px]">{name}</span>{' '}
                    <span className="text-[12px] leading-[150%] text-primary-850">
                      {formatNumber(amount)} = ${formatNumber(amount * dollarRate)}
                    </span>
                  </p>
                </div>
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