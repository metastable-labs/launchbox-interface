import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useChainId, useAccount } from 'wagmi';

import useTruncateText from '@/hooks/useTruncateText';
import LBClickAnimation from '../click-animation';
import { SelectIcon, VerifiedIcon, SelectSecondaryIcon, WalletIcon } from '@/public/icons';
import { NavActionProps } from './types';
import { networks } from '@/config/rainbow/config';

const NavAction = ({ text, onClick, variant = 'network', isVisibile, disabled }: NavActionProps) => {
  const { truncatedText } = useTruncateText(text || '', 4, 4);
  const chainId = useChainId();
  const { isConnected } = useAccount();

  const [icon, setIcon] = useState<JSX.Element>();

  const connectedNetwork = networks.find((network) => network.chainId === chainId);

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
      <div className="max-w-[200px] md:max-w-[240px] bg-white rounded-base border border-primary-50 shadow-nav-select-shadow py-1 pl-1 pr-2 flex items-center justify-center gap-[6px] relative">
        <div className={classNames('flex items-center justify-center', {})}>
          {isConnected && (icon || connectedNetwork?.icon)}

          <div className="flex items-center justify-center gap-[2px]">
            {truncatedText && (
              <span
                className={classNames('tracking-[-0.084px] text-sm font-medium ml-2', {
                  'hidden lg:block': variant !== 'wallet',
                })}>
                {variant === 'account' || !isConnected ? text : truncatedText}
              </span>
            )}

            {isConnected && variant === 'wallet' && <VerifiedIcon />}
          </div>
        </div>
        {isConnected && variant === 'network' && (
          <div className="absolute right-[3px] bottom-[5px] flex items-center justify-center bg-primary-300 rounded-full border-[0.171px] border-primary-350">
            <SelectSecondaryIcon />
          </div>
        )}
        {isConnected && variant !== 'network' && <SelectIcon />}
      </div>
    </LBClickAnimation>
  );
};

export default NavAction;
