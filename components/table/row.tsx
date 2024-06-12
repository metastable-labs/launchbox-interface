import { useEffect, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { IAddress, IRow, ITXNS, ITokenSample } from './types';
import useTruncateText from '@/hooks/useTruncateText';
import useCopy from '@/hooks/useCopy';
import { CheckAltIcon, CopyIcon, ETHIcon, TimerAltIcon } from '@/public/icons';
import LBClickAnimation from '../click-animation';

const formatNumber = (num: number): string => {
  const formatWithPrecision = (value: number) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
  };

  if (num >= 1e9) {
    return formatWithPrecision(num / 1e9) + 'b';
  }
  if (num >= 1e6) {
    return formatWithPrecision(num / 1e6) + 'm';
  }
  if (num >= 1e3) {
    return formatWithPrecision(num / 1e3) + 'k';
  }
  return num.toString();
};

const Address = ({ wallet, walletAvatarURL }: IAddress) => {
  const { truncatedText } = useTruncateText(wallet, 5, 5);
  return (
    <div className="flex items-center gap-2">
      <Image
        src={walletAvatarURL || 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg'}
        alt={`${walletAvatarURL} icon`}
        width={20}
        height={20}
        className="w-[10.7px] h-[10.9px] object-cover"
      />

      <span className="text-primary-650 text-sm font-medium">{truncatedText}</span>
    </div>
  );
};

const TokenSample = ({ tokenAddress, tokenLogoURL, tokenSymbol }: ITokenSample) => {
  const [hasCopied, setHasCopied] = useState(false);
  const copy = useCopy();

  const icons = [<CopyIcon key="copy" width={16} height={16} />, <CheckAltIcon key="check" width={16} height={16} />];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    copy(tokenAddress!);
    setHasCopied(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasCopied(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [hasCopied]);
  return (
    <div className="flex items-center gap-2">
      <Image
        src={tokenLogoURL || 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg'}
        alt={`${tokenSymbol} icon`}
        width={200}
        height={200}
        className="w-6 h-6 object-cover"
      />

      <span className="text-primary-650 text-sm font-medium">${tokenSymbol}</span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={+hasCopied}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={classNames('cursor-pointer', { 'pointer-events-none': hasCopied })}
          onClick={handleCopy}>
          {icons[+hasCopied]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CreatedAt = ({ createdAt }: { createdAt: string }) => (
  <div className="flex items-center gap-1">
    <TimerAltIcon />
    <span className="text-primary-250 text-sm font-medium">{moment(createdAt).fromNow()}</span>
  </div>
);

const Liquidity = ({ numerator, denominator }: { numerator: number; denominator: number }) => (
  <div className="flex items-center gap-1 text-sm font-medium text-primary-750">
    <ETHIcon width={16} height={16} />
    <span className="text-primary-650">{numerator.toLocaleString()}</span>
    <span className="text-[12px] leading-[20px]">/</span>
    <span>${denominator.toLocaleString()}</span>
  </div>
);

const MarketCap = ({ numerator, denominator }: { numerator: number; denominator: number }) => (
  <div className="flex flex-col gap-1 text-sm font-medium">
    <span className="text-primary-650">${formatNumber(numerator)}</span>
    <span className="text-primary-750">${denominator}</span>
  </div>
);

const TXNS = ({ denominator, numerator }: ITXNS) => (
  <div className="flex flex-col gap-1 text-sm font-medium">
    <span className="text-primary-650">{numerator.toLocaleString()}</span>
    <div className="flex items-center gap-1">
      <span className="text-primary-2600">{denominator.numerator.toLocaleString()}</span>
      <span className="text-[12px] leading-[20px] text-primary-750">/</span>
      <span className="text-primary-2650">{denominator.denominator.toLocaleString()}</span>
    </div>
  </div>
);

const Row = ({ item, variant, index, tokenSymbol, cta, rowClick }: IRow) => {
  const handleRowClick = () => {
    if (rowClick) {
      rowClick(item.id!);
    }
    return;
  };

  return (
    <tr onClick={handleRowClick} className={classNames('', { 'hover:bg-primary-200 cursor-pointer transition-colors duration-300': variant === 'tertiary' })}>
      <td
        className={classNames('min-h-[71px] px-4 md:px-6 py-4', {
          'w-[83px]': variant === 'secondary',
        })}>
        {variant === 'primary' && <Address wallet={item.wallet || '-'} walletAvatarURL={item.walletAvatarURL} />}

        {variant === 'secondary' && <div className="w-full flex items-center justify-center text-primary-650">{index + 1}</div>}

        {variant === 'tertiary' && <TokenSample tokenAddress={item.wallet} tokenLogoURL={item.walletAvatarURL} tokenSymbol={item.tokenSymbol} />}
      </td>

      <td className={classNames('min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-gray-500', { 'w-4/6': variant === 'secondary' })}>
        {variant === 'primary' && (
          <span
            className={classNames('capitalize', {
              'text-primary-2600': item.type === 'buy',
              'text-primary-2650': item.type === 'sell',
            })}>
            {item.type || '-'}
          </span>
        )}

        {variant === 'secondary' && <Address wallet={item.wallet || '-'} walletAvatarURL={item.walletAvatarURL} />}

        {variant === 'tertiary' && <CreatedAt createdAt={item.createdAt || ''} />}
      </td>

      {variant !== 'secondary' && (
        <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-gray-500">
          {variant === 'primary' && <span className="text-primary-650">{item.usdAmount ? '$' + formatNumber(item.usdAmount) : '-'}</span>}
          {variant === 'tertiary' && <Liquidity numerator={item.liquidity?.numerator || 0} denominator={item.liquidity?.denominator || 0} />}
        </td>
      )}

      {variant !== 'secondary' && (
        <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-gray-500">
          {variant === 'primary' && (
            <span className="text-primary-650">
              {item.tokenAmount && formatNumber(item.tokenAmount || 0) + ' ' + tokenSymbol}
              {!item.tokenAmount && '-'}
            </span>
          )}

          {variant === 'tertiary' && <MarketCap numerator={item.marketCap?.numerator || 0} denominator={item.marketCap?.denominator || 0} />}
        </td>
      )}

      <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
        {variant === 'primary' && <p className="text-primary-250 min-w-full text-right">{item.createdAt ? moment(item.createdAt).fromNow() : '-'}</p>}

        {variant === 'secondary' && <span className="text-primary-650">{`${item.holding?.toLocaleString() + '%' || '-'}`}</span>}

        {variant === 'tertiary' && <TXNS numerator={item.txns?.numerator || 0} denominator={item.txns?.denominator || { numerator: 0, denominator: 0 }} />}
      </td>

      {variant === 'tertiary' && (
        <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap">
          <span className="text-primary-650">{item.volume ? '$' + formatNumber(item.volume) : '-'}</span>
        </td>
      )}

      {variant === 'tertiary' && (
        <td className="min-h-[71px] px-4 md:px-6 py-4 whitespace-nowrap">
          <LBClickAnimation
            className="flex items-center justify-center text-white font-medium text-sm tracking-[-0.084px] px-1.5 py-2 w-full shadow-link-button rounded-lg bg-link-button"
            onClick={() => cta?.(item.id!)}
            stopPropagation>
            Quick buy
          </LBClickAnimation>
        </td>
      )}
    </tr>
  );
};

export default Row;
