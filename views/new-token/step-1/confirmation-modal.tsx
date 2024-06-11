import { useEffect } from 'react';
import classNames from 'classnames';

import { IConfirmationModal } from '../types';
import { LBButton, LBModal } from '@/components';
import { networks } from '@/views/dummy';

const ConfirmationModal = ({ close, network, show, tokenDecimal, tokenName, tokenSupply, tokenSymbol }: IConfirmationModal) => {
  const networkInfo = networks.find((item) => item.variant === String(network));
  const info = [
    { title: 'Token Name', value: tokenName },
    { title: 'Token Symbol', value: `$${tokenSymbol}` },
    { title: 'Network', value: networkInfo?.title, icon: networkInfo?.icon },
    { title: 'Supply', value: Number(tokenSupply)?.toLocaleString() },
    { title: 'Decimal', value: tokenDecimal },
  ];

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [show]);

  return (
    <LBModal show={show} close={close} title="Confirmation">
      <div className="w-[303px] md:w-[408px] flex-1 flex flex-col gap-6">
        <p className="text-center text-base text-primary-750">
          Upon confirmation, <span className="font-medium text-primary-250">${tokenSymbol}</span> contract will be deployed on selected network
        </p>

        <div className="flex flex-col items-stretch gap-4">
          {info.map(({ title, value, icon }, index) => (
            <div key={index} className={classNames('w-full flex items-center justify-between text-base text-primary-700', { 'pb-4 border-b border-primary-50': index !== info.length - 1 })}>
              <span>{title}</span>

              <div
                className={classNames('', {
                  'flex items-center justify-center gap-1': icon,
                })}>
                {icon && icon}
                <span className="font-medium">{value}</span>
              </div>
            </div>
          ))}
        </div>

        <LBButton text={`Confirm and deploy $${tokenSymbol}`} fullWidth network={network} variant="plain" type="submit" />
      </div>
    </LBModal>
  );
};

export default ConfirmationModal;
