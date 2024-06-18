import { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { BaseBadgeicon, CheckAltIcon, ConfigSiteIcon, CopyIcon, FarcasterIcon, SmallFarcasterIcon, WebIcon } from '@/public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LBClickAnimation, LBShare } from '@/components';
import useCopy from '@/hooks/useCopy';
import { Period } from '../types';
import IChannel from './types';
import { generateData, periods } from '../dummy';
import LineChart from '../line-chart';

const Channel = ({ token, userRole }: IChannel) => {
  const { navigate } = useSystemFunctions();
  const { handleCopy, hasCopied } = useCopy();

  const [period, setPeriod] = useState<Period>('1m');
  const [growthData, setGrowthData] = useState(generateData(period, true));

  const noGrowthData = growthData.every((dataPoint) => dataPoint.value === 0);

  const actions = [
    {
      icons: [<CopyIcon key="copy" width={16} height={16} />, <CheckAltIcon key="check" width={16} height={16} />],
      onClick: () => handleCopy(token?.token_address!),
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

  useEffect(() => {
    setGrowthData(generateData(period, true));
  }, [period]);

  return (
    <div className="flex justify-between gap-2.5">
      <div className="w-3/5 p-6 rounded-lg border border-primary-50 h-fit">jhg</div>

      <div className="w-2/5 p-6 rounded-lg border border-primary-50 h-fit flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <Image src={token?.token_logo_url || ''} alt="token-logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <h1 className="text-primary-650 font-medium break-words text-[30px] lg:text-[32px] leading-[28px]">{token?.token_name}</h1>
              <BaseBadgeicon />
            </div>

            <p className="text-primary-700 text-[14px] leading-[21px]">
              Satosh is a lorem lore mlore lore. Satosh is a lorem lore mlore lore Satosh is a lorem lore mlore lore Satosh is a lorem lore mlore lore
            </p>
          </div>
        </div>

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

        <div className="self-stretch flex flex-col items-center gap-4">
          <div className="self-stretch flex flex-col gap-9 items-center">
            <div className="self-stretch flex flex-col gap-[30px]">
              <div className="self-stretch flex items-center justify-between">
                <span className="text-primary-700 text-[14px] leading-[24px]">Channel growth</span>

                <div className="flex items-center justify-center gap-8">
                  {periods.map(({ text, value }) => (
                    <span
                      onClick={() => setPeriod(value)}
                      key={value}
                      className={classNames('text-sm flex items-center justify-center px-1.5 py-0.5 cursor-pointer transition-colors duration-300 font-Aeonik', {
                        'bg-primary-200 rounded-base text-primary-2000 font-medium': value === period,
                        'text-primary-700': value !== period,
                      })}>
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full flex items-center justify-center h-[295px] relative">
                <LineChart period={period} data={growthData} variant="secondary" />

                {noGrowthData && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-primary-250 text-[20px] leading-[32px] tracking-[-0.2px] font-semibold">No price data.</div>
                )}
              </div>
            </div>

            <div className="self-stretch flex items-center justify-between">
              <span className="text-primary-700 text-[14px] leading-[24px]">Channel</span>
              <div className="flex items-center gap-1">
                <SmallFarcasterIcon />
                <span className="text-primary-650 leading-[20.8px] font-medium underline underline-offset-4">{token?.token_name}</span>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
