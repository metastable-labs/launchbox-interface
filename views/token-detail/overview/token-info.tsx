import Image from 'next/image';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { formatNumber } from '@/components/table/row';
import useCopy from '@/hooks/useCopy';
import { BaseBadgeicon, CheckAltIcon, ConfigSiteIcon, CopyIcon, FarcasterIcon, ShareIcon, WebIcon } from '@/public/icons';
import { LBClickAnimation, LBShare } from '@/components';
import { IOverview } from './types';
import useScreenDetect from '@/hooks/useScreenDetect';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils/helpers';

const TokenInfo = ({ userRole }: IOverview) => {
  const { navigate, tokenState, transactionState, holderState } = useSystemFunctions();
  const { handleCopy, hasCopied } = useCopy();
  const { isDesktop } = useScreenDetect();

  const { token, loading: tokenLoading } = tokenState;
  const { loading: transactionsLoading } = transactionState;
  const { meta: holdersMeta, loading: holdersLoading } = holderState;

  const total_buy_count = token?.total_buy_count || 0;
  const total_sell_count = token?.total_sell_count || 0;
  const total_count = total_buy_count + total_sell_count;

  const liquidity = { numerator: 3, denominator: 3450.3 };
  const marketCap = { numerator: token?.market_cap, denominator: formatAmount(token?.price || 0, 8) };
  const txns = { numerator: total_count, denominator: { numerator: total_buy_count, denominator: total_sell_count } };
  const volume = formatAmount(token?.volume || 0, 5);
  const fdv = 20000000;

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

  const primaryInfo = [
    { text: 'FDV', value: formatNumber(fdv) },
    { text: 'Market cap', value: formatNumber(marketCap.numerator || 0) },
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
      loading: transactionsLoading,
    },
    { text: 'Total supply', value: `${token?.token_total_supply?.toLocaleString()} ${token?.token_symbol}`, loading: tokenLoading || !token },
    { text: 'Holders', value: holdersMeta?.total_count?.toLocaleString(), loading: holdersLoading },
    { text: 'Volume', value: `$${formatNumber(volume)}` },
  ];

  const show = (userRole === 'admin' && !isDesktop) || userRole === 'user';

  return (
    <div className="flex flex-col self-stretch w-full gap-6">
      {show && (
        <>
          <div className="flex items-start gap-4">
            {!token ? (
              <div className="w-[50px] h-[50px] rounded-full bg-primary-50 animate-pulse" />
            ) : (
              <Image src={token?.token_logo_url || ''} alt="token-logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />
            )}

            <div className="flex flex-col gap-3 mt-1">
              {!token ? (
                <>
                  <div className="animate-pulse h-7 w-20 rounded-base bg-primary-50" />
                  <div className="animate-pulse h-4 w-20 rounded-base bg-primary-50" />
                </>
              ) : (
                <>
                  <h1
                    className={classNames(
                      'text-primary-650 font-medium break-words',
                      { 'text-[30px] lg:text-[32px] leading-[28px]': token?.token_name?.length! <= 6 },
                      { 'text-xl': token?.token_name?.length! > 6 },
                    )}>
                    {token?.token_name}
                  </h1>

                  <span className="text-primary-700 text-[14px] leading-[16px]">${token?.token_symbol}</span>
                </>
              )}
            </div>

            <div className="min-w-fit">
              <BaseBadgeicon />
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

            <LBShare />
          </div>
        </>
      )}

      <div className="self-stretch flex flex-col gap-9 items-stretch">
        <div className="flex items-center gap-2.5 self-stretch">
          {primaryInfo.map(({ text, value }, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-1.5 h-[75px] rounded-base border border-primary-1200 bg-primary-2500 w-1/2">
              <span className="text-primary-250 text-[12px] leading-[17.4px]">{text}</span>
              <span className="text-primary-650 text-base font-medium">${value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {secondaryInfo.map(({ text, value, loading }, index) => (
            <div
              key={index}
              className={classNames('self-stretch flex items-center justify-between gap-2 text-primary-250', { 'pb-4 border-b border-b-primary-50': index !== secondaryInfo.length - 1 })}>
              <span className="text-primary-700 text-[14px] leading-[24px]">{text}</span>
              {loading ? (
                <div className="animate-pulse h-6 w-20 rounded-base bg-primary-50" />
              ) : (
                <>
                  {typeof value === 'string' && <span className="text-primary-650 text-base font-medium">{value}</span>}
                  {typeof value !== 'string' && value}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
