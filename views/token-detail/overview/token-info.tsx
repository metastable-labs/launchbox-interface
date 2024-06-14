import Image from 'next/image';
import classNames from 'classnames';

import { formatNumber } from '@/components/table/row';
import useCopy from '@/hooks/useCopy';
import { BaseBadgeicon, ConfigSiteIcon, CopyIcon, FarcasterIcon, ShareIcon, WebIcon } from '@/public/icons';
import { LBClickAnimation } from '@/components';
import { IOverview } from './types';
import useScreenDetect from '@/hooks/useScreenDetect';

const TokenInfo = ({ tokenDetailData, userRole }: IOverview) => {
  const copy = useCopy();
  const { isDesktop } = useScreenDetect();

  const { name, tokenSymbol, tokenAddress, tokenImageURL, liquidity, marketCap, websiteLink, farcasterLink, siteConfigLink, fdv, txns, tokenSupply, holders, volume } = tokenDetailData;

  const actions = [
    {
      icon: <CopyIcon />,
      onClick: () => copy(tokenAddress),
      show: true,
    },
    {
      icon: <ConfigSiteIcon />,
      onClick: () => window.open(siteConfigLink, '_blank'),
      show: userRole === 'admin',
    },
    {
      icon: <WebIcon />,
      onClick: () => window.open(websiteLink, '_blank'),
      show: userRole === 'user',
    },
    {
      icon: <FarcasterIcon />,
      onClick: () => window.open(farcasterLink, '_blank'),
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
    { text: 'Total supply', value: `${tokenSupply.toLocaleString()} ${tokenSymbol}` },
    { text: 'Holders', value: holders.toLocaleString() },
    { text: 'Volume', value: formatNumber(volume) },
  ];

  const show = (userRole === 'admin' && !isDesktop) || userRole === 'user';

  return (
    <div className="flex flex-col self-stretch w-full gap-6">
      {show && (
        <>
          <div className="flex items-start gap-4">
            <Image src={tokenImageURL} alt="token-logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />

            <div className="flex flex-col gap-3 mt-1">
              <h1 className="text-primary-650 text-[30px] lg:text-[32px] leading-[28px] font-medium">{name}</h1>

              <span className="text-primary-700 text-[14px] leading-[16px]">${tokenSymbol}</span>
            </div>

            <BaseBadgeicon />
          </div>

          <div className="flex items-stretch gap-2 w-full pb-[30px] border-b border-b-primary-50">
            {actions.map(({ icon, onClick, show }, index) => (
              <LBClickAnimation
                key={index}
                className={classNames('w-full flex items-center justify-center px-3 py-2 bg-white border border-primary-1950 rounded-lg shadow-table-cta', {
                  hidden: !show,
                })}
                onClick={onClick}>
                {icon}
              </LBClickAnimation>
            ))}

            <LBClickAnimation className="flex items-center justify-center gap-1 cursor-pointer px-3.5 py-2.5 bg-white border border-primary-1950 rounded-lg shadow-table-cta w-full">
              <ShareIcon />
            </LBClickAnimation>
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
