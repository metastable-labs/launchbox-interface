import classNames from 'classnames';
import { useChainId } from 'wagmi';

import { IConfirmation } from '../types';
import { LBButton } from '@/components';
import { networks } from '@/config/rainbow/config';

const Confirmation = ({ tokenData, handleTokenDeployment }: IConfirmation) => {
  const chainId = useChainId();
  const networkInfo = networks.find((item) => item.chainId === chainId);

  const info = [
    { title: 'Token Name', value: tokenData?.tokenName },
    { title: 'Token Symbol', value: `$${tokenData?.tokenSymbol}` },
    { title: 'Network', value: networkInfo?.variant, icon: networkInfo?.icon },
    {
      title: 'Supply',
      value: Number(tokenData?.tokenSupply)?.toLocaleString(),
    },
    { title: 'Decimal', value: '18' },
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
              <span className="font-medium capitalize">{value}</span>
            </div>
          </div>
        ))}
      </div>

      <LBButton onClick={handleTokenDeployment} text={`Confirm and deploy $${tokenData?.tokenSymbol}`} fullWidth variant="plain" type="submit" />
    </div>
  );
};

export default Confirmation;
