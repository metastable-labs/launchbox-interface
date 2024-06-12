import { useEffect, useState } from 'react';
import classNames from 'classnames';

import useTruncateText from '@/hooks/useTruncateText';
import LBClickAnimation from '../click-animation';
import { SelectIcon, GitHubMobileIcon, VerifiedIcon, SelectSecondaryIcon, WalletIcon, BasePrimaryMobileIcon } from '@/public/icons';
import { NavActionProps } from './types';

const NavAction = ({ text, onClick, variant = 'network' }: NavActionProps) => {
  const { truncatedText } = useTruncateText(text || '', 4, 4);

  const [icon, setIcon] = useState(<BasePrimaryMobileIcon />);

  const handleIcon = () => {
    if (variant === 'account') {
      return setIcon(<GitHubMobileIcon />);
    }

    if (variant === 'wallet') {
      return setIcon(<WalletIcon />);
    }
  };

  useEffect(() => {
    handleIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  if (!text && variant !== 'network') {
    return null;
  }

  return (
    <LBClickAnimation onClick={onClick}>
      <div className="max-w-[200px] md:max-w-[240px] bg-white rounded-base border border-primary-50 shadow-nav-select-shadow py-1 pl-1 pr-2 flex items-center justify-center gap-[6px] relative">
        <div className={classNames('flex items-center justify-center', {})}>
          {icon}

          <div className="flex items-center justify-center gap-[2px]">
            {truncatedText && (
              <span
                className={classNames('tracking-[-0.084px] text-sm font-medium ml-2', {
                  'hidden lg:block': variant !== 'wallet',
                })}>
                {variant === 'account' ? text : truncatedText}
              </span>
            )}

            {variant === 'wallet' && <VerifiedIcon />}
          </div>
        </div>
        {variant === 'network' && (
          <div className="absolute right-[3px] bottom-[5px] flex items-center justify-center bg-primary-300 rounded-full border-[0.171px] border-primary-350">
            <SelectSecondaryIcon />
          </div>
        )}
        {variant !== 'network' && <SelectIcon />}
      </div>
    </LBClickAnimation>
  );
};

export default NavAction;
