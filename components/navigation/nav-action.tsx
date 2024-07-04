import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';

import useTruncateText from '@/hooks/useTruncateText';
import { SelectIcon, SelectSecondaryIcon, WalletIcon } from '@/public/icons';
import LBClickAnimation from '../click-animation';
import { NavActionProps } from './types';

const NavAction = ({ text, onClick, variant = 'network', isVisibile, disabled }: NavActionProps) => {
  const { truncatedText } = useTruncateText(text || '', 4, 4);
  const { authenticated } = usePrivy();

  const [icon, setIcon] = useState<JSX.Element>();

  const handleIcon = () => {
    if (variant !== 'wallet') return;

    setIcon(<WalletIcon />);
  };

  useEffect(() => {
    handleIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  if (!isVisibile) {
    return null;
  }

  return (
    <LBClickAnimation disabled={disabled} onClick={onClick}>
      <div
        className={classNames('max-w-[200px] md:max-w-[240px] h-10 rounded-base border border-primary-50 shadow-nav-select-shadow py-1 px-2 flex items-center relative font-Clash-Display', {
          'w-10 justify-center': variant === 'network',
          'justify-start gap-[6px]': variant === 'wallet',
        })}>
        <div className={classNames('flex items-center', {})}>
          {variant === 'network' && <Image src="/icons/base-primary-mobile-icon.svg" alt="base-icon" width={200} height={200} className="object-cover" />}

          <div className="flex items-center justify-center gap-[2px]">
            {truncatedText && (
              <span
                className={classNames('tracking-[-0.084px] text-sm font-medium text-primary-150', {
                  'hidden lg:block': variant !== 'wallet',
                })}>
                {variant === 'account' || !authenticated ? text : truncatedText}
              </span>
            )}
          </div>
        </div>

        {authenticated && variant === 'network' && (
          <div className="absolute right-[3px] bottom-[5px] flex items-center justify-center bg-primary-300 rounded-full border-[0.171px] border-primary-350">
            <SelectSecondaryIcon />
          </div>
        )}
        {authenticated && variant !== 'network' && <SelectIcon />}
      </div>
    </LBClickAnimation>
  );
};

export default NavAction;
