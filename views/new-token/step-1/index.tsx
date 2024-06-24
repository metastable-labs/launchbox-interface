import { useEffect } from 'react';

import { LBButton, LBInput } from '@/components';
import { StepProps } from '../types';

const Step1 = ({ setStep, watch, errors, register, setValue }: StepProps) => {
  const tokenName = watch?.('tokenName');
  const tokenSymbol = watch?.('tokenSymbol');
  const tokenSupply = watch?.('tokenSupply');

  const disbleButton = !tokenName || !tokenSupply || !tokenSymbol;

  const primaryInputs = [
    {
      name: 'tokenName',
      register: register?.('tokenName'),
      placeholder: 'Token name',
      error: errors?.tokenName,
      type: 'text',
      label: 'Token Name',
    },
    {
      name: 'tokenSymbol',
      register: register?.('tokenSymbol'),
      placeholder: 'Token Symbol',
      error: errors?.tokenSymbol,
      type: 'text',
      label: 'Token Symbol',
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
    <div className="flex flex-col items-center justify-center gap-6 rounded-base border border-primary-1200 bg-white p-6 min-w-[343px] md:min-w-[448px]">
      {primaryInputs.map((input, index) => (
        <LBInput key={index} {...input} />
      ))}

      <LBInput
        name="tokenSupply"
        register={register?.('tokenSupply')}
        placeholder="1,000,000"
        error={errors?.tokenSupply}
        type="text"
        label="Total Supply"
        instruction="Total Number of tokens you want available"
      />

      <LBButton onClick={next} text="Next" fullWidth variant="plain" disabled={disbleButton} />
    </div>
  );
};

export default Step1;
