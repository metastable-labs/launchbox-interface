import Image from 'next/image';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import useCopy from '@/hooks/useCopy';
import { CheckAltIcon, ConfigSiteIcon, CopyIcon, LinkIcon, SmallFarcasterIcon, TelegramIcon, WebIcon, XIcon } from '@/public/icons';
import { LBBadge, LBClickAnimation, LBShare } from '@/components';
import { IOverview } from './types';
import useScreenDetect from '@/hooks/useScreenDetect';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount, formatNumber } from '@/utils/helpers';

const TokenInfo = ({ userRole }: IOverview) => {
  const { navigate, tokenState, holderState } = useSystemFunctions();
  const { handleCopy, hasCopied } = useCopy();
  const { isDesktop } = useScreenDetect();

  const { token, loading: tokenLoading } = tokenState;
  const { meta: holdersMeta, loading: holdersLoading } = holderState;

  const total_buy_count = token?.total_buy_count || 0;
  const total_sell_count = token?.total_sell_count || 0;
  const total_count = total_buy_count + total_sell_count;

  const marketCap = { numerator: token?.market_cap, denominator: formatAmount(token?.price || 0, 8) };
  const txns = { numerator: total_count, denominator: { numerator: total_buy_count, denominator: total_sell_count } };
  const volume = formatAmount(token?.volume || 0, 5);

  const actions = [
    {
      icon: <LinkIcon />,
      href: token?.website_url || 'some-url',
    },
    {
      icon: <XIcon width={20} height={20} color="#0A0D14" />,
      href: token?.twitter_url || 'some-url',
    },
    {
      icon: <TelegramIcon />,
      href: token?.telegram_url || 'some-url',
    },
  ];

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);

  const secondaryInfo = [
    { text: 'Market cap', value: formatNumber(marketCap.numerator || 0), loading: tokenLoading || !token },
    {
      text: 'Txns',
      value: (
        <div className="flex items-center justify-center gap-1 text-primary-650 text-[16px] leading-[20px] font-medium font-Clash-Display">
          <span>{txns.numerator}</span>
          <span>(</span>
          <span className="text-primary-2600">{txns.denominator.numerator}</span>
          <span className="text-primary-750 text-[12px]">/</span>
          <span className="text-primary-2650">{txns.denominator.denominator}</span>
          <span>)</span>
        </div>
      ),
      loading: tokenLoading || !token,
    },
    { text: 'Total supply', value: `${token?.token_total_supply?.toLocaleString()} ${token?.token_symbol}`, loading: tokenLoading || !token },
    { text: 'Holders', value: holdersMeta?.total_count?.toLocaleString(), loading: holdersLoading },
    { text: 'Volume', value: `$${formatNumber(volume)}`, loading: tokenLoading || !token },
  ];

  const show = (userRole === 'admin' && !isDesktop) || userRole === 'user';

  return (
    <div className="flex flex-col self-stretch w-full gap-6">
      {show && (
        <>
          <div className="flex gap-4">
            {!token ? (
              <div className="w-[50px] h-[50px] rounded-full bg-primary-50 animate-pulse" />
            ) : (
              <Image src={token?.token_logo_url || ''} alt="token-logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />
            )}

            <div className="flex flex-col gap-3">
              {!token ? (
                <>
                  <div className="animate-pulse h-7 w-20 rounded-base bg-primary-50" />
                  <div className="animate-pulse h-4 w-20 rounded-base bg-primary-50" />
                </>
              ) : (
                <>
                  <h1
                    className={classNames(
                      'text-primary-650 font-medium break-words font-Clash-Display',
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
              <LBBadge variant="base" />
            </div>
          </div>
        </>
      )}

      <div className="flex items-stretch gap-2 w-full pb-[30px] border-b border-b-primary-50">
        {actions.map(({ href, icon }, index) => (
          <LBClickAnimation key={index} className="w-1/5 flex items-center justify-center px-3 py-2 bg-white border border-primary-1950 rounded-lg shadow-table-cta">
            <motion.a whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} href={href} target="_blank">
              {icon && icon}
            </motion.a>
          </LBClickAnimation>
        ))}

        <LBShare className="w-1/5" />

        <LBClickAnimation
          className="w-1/5 flex items-center justify-center px-3 py-2 bg-white border border-primary-1950 rounded-lg shadow-table-cta"
          onClick={() => handleCopy(token?.token_address!)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={+hasCopied} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }} exit={{ opacity: 0 }}>
              {hasCopied ? <CheckAltIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
            </motion.div>
          </AnimatePresence>
        </LBClickAnimation>
      </div>

      <div className="self-stretch flex flex-col gap-9 items-stretch">
        <div className="flex flex-col items-center gap-4">
          <div className="self-stretch flex items-center justify-between pb-4 border-b border-b-primary-50">
            <span className="text-primary-700 text-[14px] leading-[24px]">Channel</span>

            <div className="flex items-center gap-1">
              {!tokenLoading && (
                <>
                  <SmallFarcasterIcon />
                  <a
                    href={token?.socials?.warpcast?.channel?.url}
                    target="_blank"
                    className="text-primary-650 text-[16px] leading-[20.8px] font-medium underline underline-offset-4 font-Clash-Display">
                    {noChannel ? '-' : token?.socials?.warpcast?.channel?.name}
                  </a>
                </>
              )}

              {tokenLoading && (
                <>
                  <div className="animate-pulse w-4 h-4 rounded-full bg-primary-50" />
                  <div className="animate-pulse h-6 w-20 rounded-base bg-primary-50" />
                </>
              )}
            </div>
          </div>

          {secondaryInfo.map(({ text, value, loading }, index) => (
            <div
              key={index}
              className={classNames('self-stretch flex items-center justify-between gap-2 text-primary-250', { 'pb-4 border-b border-b-primary-50': index !== secondaryInfo.length - 1 })}>
              <span className="text-primary-700 text-[14px] leading-[24px]">{text}</span>

              {loading ? (
                <div className="animate-pulse h-6 w-20 rounded-base bg-primary-50" />
              ) : (
                <>
                  {typeof value === 'string' && <span className="text-primary-650 text-base font-medium font-Clash-Display uppercase">{value}</span>}
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
