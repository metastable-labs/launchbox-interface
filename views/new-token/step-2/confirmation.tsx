import { useEffect } from 'react';
import classNames from 'classnames';

import { IConfirmation } from '../types';
import { LBButton, LBModal } from '@/components';
import { networks } from '@/views/dummy';

const Confirmation = ({ tokenData, network }: IConfirmation) => {
  const networkInfo = networks.find((item) => item.variant === String(network));

  const info = [
    { title: 'Token Name', value: tokenData?.tokenName },
    { title: 'Token Symbol', value: `$${tokenData?.tokenSymbol}` },
    { title: 'Network', value: networkInfo?.title, icon: networkInfo?.icon },
    {
      title: 'Supply',
      value: Number(tokenData?.tokenSupply)?.toLocaleString(),
    },
    { title: 'Decimal', value: tokenData?.tokenDecimal },
    {
      title: "You'll get",
      value: `${tokenData?.firstBuyTokenAmount} ${tokenData?.tokenSymbol}`,
    },
    { title: 'Network fee', value: `0.02 ETH` },
  ];

  return (
    <div className="min-w-full flex flex-col gap-6">
      <h1 className="text-primary-150 text-lg md:text-[24px] md:leading-[37.2px]">Confirmation</h1>

      <p className="text-center text-base text-primary-750 max-w-[365px]">
        Upon confirmation, <span className="font-medium text-primary-250">${tokenData?.tokenSymbol}</span> contract will be deployed on selected network
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

      <LBButton text={`Confirm and deploy $${tokenData?.tokenSymbol}`} fullWidth network={network} variant="plain" type="submit" />
    </div>
  );
};

export default Confirmation;
