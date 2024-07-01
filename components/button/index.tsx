import classNames from 'classnames';
import { motion } from 'framer-motion';

import { ILBButton } from './types';
import { PlusIcon, ExternalLinkAltIcon } from '@/public/icons';
import LBLoader from '../loader';

const LBButton = ({ text, color = 'primary', disabled, fullWidth, loading, onClick, type = 'button', variant = 'plain' }: ILBButton) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      disabled={disabled || loading}
      className={classNames('flex items-center justify-center rounded-base transition-colors duration-300 p-2.5 shadow-trade-tab', {
        'opacity-75 pointer-events-none': disabled || loading,
        'bg-primary-3350': color === 'primary',
        'bg-primary-2650': color === 'secondary',
        'bg-primary-150': color === 'tertiary',
        'w-full': fullWidth,
        'gap-0.5': variant === 'new',
      })}
      onClick={onClick}>
      {!loading && variant === 'new' && <PlusIcon color="white" />}

      <div
        className={classNames('tracking-[-0.084px] text-sm text-center transition-all duration-300 whitespace-nowrap text-white font-Clash-Display', {
          'font-semibold': variant !== 'new',
          'font-bold': variant === 'new',
        })}>
        {loading ? <LBLoader color="#ffffff" /> : text}
      </div>

      {!loading && variant === 'link' && <ExternalLinkAltIcon />}
    </motion.button>
  );
};

export default LBButton;
