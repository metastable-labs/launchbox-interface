import classNames from 'classnames';
import { motion } from 'framer-motion';

import { ILBButton } from './types';
import { PlusIcon, ExternalLinkIcon } from '@/public/icons';
import LBLoader from '../loader';

const LBButton = ({ network = 'base', onClick, text, variant = 'plain', fullWidth, disabled, type = 'button', loading }: ILBButton) => {
  let iconColor;
  if (network === 'base' || network === 'optimism') {
    iconColor = 'white';
  }
  if (network === 'mode' || network === 'scroll') {
    iconColor = '#242D01';
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      disabled={disabled || loading}
      className={classNames('flex items-center justify-center gap-1 rounded-base transition-colors duration-300', {
        'border-[0.5px] border-primary-600': !disabled,
        'bg-primary-200 pointer-events-none': disabled || loading,
        'bg-base-github-button shadow-base-github-button': network === 'base' && !disabled && variant !== 'link',
        'bg-optimism-github-button shadow-optimism-github-button': network === 'optimism' && !disabled && variant !== 'link',
        'bg-mode-github-button shadow-mode-github-button': network === 'mode' && !disabled && variant !== 'link',
        'bg-scroll-github-button shadow-scroll-github-button': network === 'scroll' && !disabled && variant !== 'link',
        'bg-link-button shadow-link-button': variant === 'link' && !disabled,
        'w-full': fullWidth,
        'px-2 py-2.5': variant === 'plainAlt',
        'px-3 py-2.5': variant === 'plain',
      })}
      onClick={onClick}>
      {!loading && variant === 'new' && <PlusIcon color={iconColor} />}

      <div
        className={classNames('tracking-[-0.084px] text-sm text-center transition-all duration-300 whitespace-nowrap', {
          'text-white': (network === 'base' || network === 'optimism' || variant === 'link') && !disabled,
          'text-primary-500': (network === 'mode' || network === 'scroll') && !disabled,
          'text-primary-550': disabled,
          'font-medium': variant !== 'plainAlt',
          'capitalize font-Biform': variant === 'plainAlt',
        })}>
        {loading ? <LBLoader color="#ffffff" /> : text}
      </div>

      {!loading && variant === 'link' && <ExternalLinkIcon />}
    </motion.button>
  );
};

export default LBButton;
