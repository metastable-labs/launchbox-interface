import { useEffect } from 'react';

import { LBButton, LBInput, LBSelect } from '@/components';
import { StepProps } from '../types';
import { networks } from '@/views/dummy';

const Step1 = ({ setStep, watch, errors, register, setValue }: StepProps) => {
  const blockchainNetworks = networks?.map((network) => {
    return {
      text: network.title,
      value: network.chainId.toString(),
      icon: network.icon,
      id: network.chainId.toString(),
    };
  });

  const tokenName = watch?.('tokenName');
  const tokenSymbol = watch?.('tokenSymbol');
  const tokenNetwork = watch?.('tokenNetwork');
  const tokenSupply = watch?.('tokenSupply');

  const disbleButton = !tokenName || !tokenNetwork || !tokenSupply || !tokenSymbol;

  const primaryInputs = [
    {
      name: 'tokenName',
      register: register?.('tokenName'),
      placeholder: 'Token name',
      error: errors?.tokenName,
      type: 'text',
      label: 'Token Name',
      instruction: 'Maximum of 30 characters',
    },
    {
      name: 'tokenSymbol',
      register: register?.('tokenSymbol'),
      placeholder: 'Token Symbol',
      error: errors?.tokenSymbol,
      type: 'text',
      label: 'Token Symbol',
      instruction: 'Maximum of 10 characters',
    },
  ];

  const next = () => setStep?.((prev) => prev + 1);

  useEffect(() => {
    if (tokenSupply) {
      const formatedTokenSupply = tokenSupply.replace(/[^0-9]/g, '');
      const numberTokenSupply = Number(formatedTokenSupply);
      const thousandSeparator = numberTokenSupply.toLocaleString();
      setValue?.('tokenSupply', thousandSeparator);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenSupply]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-base border border-primary-1200 bg-white p-6 min-w-[343px] md:min-w-[448px]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
        {primaryInputs.map((input, index) => (
          <LBInput key={index} {...input} />
        ))}
      </div>

      <LBSelect label="Blockchain network" text="Select Network" options={blockchainNetworks} onClick={({ text }) => setValue?.('tokenNetwork', text.toLowerCase())} defaultId={tokenNetwork} />

      <LBInput
        name="tokenSupply"
        register={register?.('tokenSupply')}
        placeholder="1,000,000"
        error={errors?.tokenSupply}
        type="text"
        label="Supply"
        instruction="Initial number of tokens that will be created in your wallet"
      />

      <LBButton onClick={next} text="Next" fullWidth variant="plain" disabled={disbleButton} />
    </div>
  );
};

export default Step1;
