import Image from 'next/image';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { formatNumber } from '@/components/table/row';
import useCopy from '@/hooks/useCopy';
import { BaseBadgeicon, CheckAltIcon, ConfigSiteIcon, CopyIcon, FarcasterIcon, ShareIcon, WebIcon } from '@/public/icons';
import { LBClickAnimation, LBShare } from '@/components';
import { IOverview } from './types';
import useScreenDetect from '@/hooks/useScreenDetect';
import { useEffect, useState } from 'react';

const TokenInfo = ({ token, userRole }: IOverview) => {
  const copy = useCopy();
  const { isDesktop } = useScreenDetect();
  const [hasCopiedAddress, setHasCopiedAddress] = useState(false);

  const siteConfigLink = 'https://satoshis.com';
  const liquidity = { numerator: 3, denominator: 3450.3 };
  const marketCap = { numerator: 400000, denominator: 0.000056 };
  const txns = { numerator: 706, denominator: { numerator: 406, denominator: 300 } };
  const volume = 1430000;
  const holders = 20000;
  const fdv = 20000000;

  const actions = [
    {
      icons: [<CopyIcon key="copy" width={16} height={16} />, <CheckAltIcon key="check" width={16} height={16} />],
      onClick: () => {
        copy(token?.token_address!);
        setHasCopiedAddress(true);
      },
      show: true,
      hasCopiedAddress,
    },
    {
      icon: <ConfigSiteIcon />,
      onClick: () => window.open(siteConfigLink, '_blank'),
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

  const primaryInfo = [
    { text: 'Liquidity', value: formatNumber(liquidity.denominator) },
    { text: 'FDV', value: formatNumber(fdv) },
    { text: 'Market cap', value: formatNumber(marketCap.numerator) },
  ];

  const secondaryInfo = [
    {
      text: 'Txns',
      value: (
        <div className="flex items-center justify-center gap-1 text-primary-650 text-[16px] leading-[20px] font-medium">
          <span>{txns.numerator}</span>
          <span>(</span>
          <span className="text-primary-2600">{txns.denominator.numerator}</span>
          <span className="text-primary-750 text-[12px]">/</span>
          <span className="text-primary-2650">{txns.denominator.denominator}</span>
          <span>)</span>
        </div>
      ),
    },
    { text: 'Total supply', value: `${token?.token_total_supply.toLocaleString()} ${token?.token_symbol}` },
    { text: 'Holders', value: holders.toLocaleString() },
    { text: 'Volume', value: formatNumber(volume) },
  ];

  const show = (userRole === 'admin' && !isDesktop) || userRole === 'user';

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasCopiedAddress(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [hasCopiedAddress]);

  return (
    <div className="flex flex-col self-stretch w-full gap-6">
      {show && (
        <>
          <div className="flex items-start gap-4">
            <Image src={token?.token_logo_url || ''} alt="token-logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />

            <div className="flex flex-col gap-3 mt-1">
              <h1
                className={classNames(
                  'text-primary-650 font-medium break-words',
                  { 'text-[30px] lg:text-[32px] leading-[28px]': token?.token_name?.length! <= 6 },
                  { 'text-xl': token?.token_name?.length! > 6 },
                )}>
                {token?.token_name}
              </h1>

              <span className="text-primary-700 text-[14px] leading-[16px]">${token?.token_symbol}</span>
            </div>

            <div className="min-w-fit">
              <BaseBadgeicon />
            </div>
          </div>

          <div className="flex items-stretch gap-2 w-full pb-[30px] border-b border-b-primary-50">
            {actions.map(({ icon, onClick, show, hasCopiedAddress, icons }, index) => (
              <LBClickAnimation
                key={index}
                className={classNames('w-full flex items-center justify-center px-3 py-2 bg-white border border-primary-1950 rounded-lg shadow-table-cta', {
                  hidden: !show,
                })}
                onClick={onClick}>
                {icons && (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={+hasCopiedAddress}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                      exit={{ opacity: 0 }}
                      className={classNames('', { 'pointer-events-none': hasCopiedAddress })}>
                      {icons[+hasCopiedAddress]}
                    </motion.div>
                  </AnimatePresence>
                )}

                {icon && icon}
              </LBClickAnimation>
            ))}

            <LBShare token_address={token?.token_address} />
          </div>
        </>
      )}

      <div className="self-stretch flex flex-col gap-9 items-stretch">
        <div className="flex items-center gap-2.5 self-stretch">
          {primaryInfo.map(({ text, value }, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-1.5 h-[75px] rounded-base border border-primary-1200 bg-primary-2500 w-[33.333333%]">
              <span className="text-primary-250 text-[12px] leading-[17.4px]">{text}</span>
              <span className="text-primary-650 text-base font-medium">${value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {secondaryInfo.map(({ text, value }, index) => (
            <div
              key={index}
              className={classNames('self-stretch flex items-center justify-between gap-2 text-primary-250', { 'pb-4 border-b border-b-primary-50': index !== secondaryInfo.length - 1 })}>
              <span className="text-primary-700 text-[14px] leading-[24px]">{text}</span>
              {typeof value === 'string' && <span className="text-primary-650 text-base font-medium">{value}</span>}
              {typeof value !== 'string' && value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
