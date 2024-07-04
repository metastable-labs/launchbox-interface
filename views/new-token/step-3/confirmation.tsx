import classNames from 'classnames';
import { useChainId } from 'wagmi';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { IConfirmation } from '../types';
import { LBButton } from '@/components';
import { networks } from '@/config/config';

const Confirmation = ({ tokenData, handleTokenDeployment }: IConfirmation) => {
  const chainId = useChainId();
  const [fileURL, setFileURL] = useState('');
  const networkInfo = networks.find((item) => item.chainId === chainId);

  const info = [
    { title: 'Token Name', value: tokenData?.tokenName },
    { title: 'Token Symbol', value: `$${tokenData?.tokenSymbol}` },
    {
      title: 'Total Supply',
      value: Number(tokenData?.tokenSupply)?.toLocaleString(),
    },
    { title: 'Network', value: networkInfo?.variant, icon: networkInfo?.icon },
  ];

  useEffect(() => {
    if (tokenData?.tokenLogo) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileURL(reader.result as string);
      };
      reader.readAsDataURL(tokenData?.tokenLogo);
    }
  }, [tokenData?.tokenLogo]);

  return (
    <div className="min-w-full flex flex-col gap-6">
      <h1 className="text-primary-150 text-lg md:text-[24px] md:leading-[37.2px]">Confirmation</h1>

      <p className="text-center text-base text-primary-750 max-w-[365px]">
        Upon confirmation, <span className="font-medium text-primary-250">${tokenData?.tokenSymbol}</span> contract will be deployed on selected network
      </p>

      <div className="flex flex-col items-stretch gap-4">
        {info.map(({ title, value, icon }, index) => (
          <div key={index} className="w-full flex items-center justify-between text-base text-primary-700 pb-4 border-b border-primary-50">
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

        {tokenData?.farcasterChannel && (
          <div className="flex flex-col gap-4">
            <span className="text-base text-primary-700">Warpcast channel</span>

            <div className="self-stretch flex items-center gap-4 bg-white rounded-lg border border-primary-50 p-2.5">
              <Image src={tokenData.farcasterChannel?.image_url} alt="logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />
              <div className="flex flex-col gap-1">
                <span className="text-[16px] leading-[28px] text-primary-650 font-medium">{tokenData.farcasterChannel?.name}</span>
                <span className="text-[14px] leading-[16px] text-primary-700">{tokenData?.farcasterChannel?.follower_count} followers</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <LBButton onClick={handleTokenDeployment} text="Create token" fullWidth type="submit" />
    </div>
  );
};

export default Confirmation;
