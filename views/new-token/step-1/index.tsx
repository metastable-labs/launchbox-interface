import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LBButton, LBInput, LBSelect } from '@/components';
import { FormProp, StepProps } from '../types';
import { Network } from '@/components/button/types';
import { networks } from '@/views/dummy';
import Switch from './switch';
import ConfirmationModal from './confirmation-modal';

const schema = yup.object().shape({
  tokenName: yup.string().required('Token Name is required'),
  tokenSymbol: yup.string().required('Token Symbol is required'),
  tokenNetwork: yup.string().required('Blockchain Network is required'),
  tokenDecimal: yup.string().required('Token Decimal is required'),
  tokenSupply: yup.string().required('Token Supply is Required'),
});

const Step1 = ({ network, setStep, setTokenSymbol, setTokenName }: StepProps) => {
  const [createTokenPage, setCreateTokenPage] = useState(false);
  const [revokeMintAuthority, setRevokeMintAuthority] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormProp>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const blockchainNetworks = networks?.map((network) => {
    return {
      text: network.title,
      value: network.chainId.toString(),
      icon: network.icon,
      id: network.chainId.toString(),
    };
  });

  const tokenName = watch('tokenName');
  const tokenSymbol = watch('tokenSymbol');
  const tokenNetwork = watch('tokenNetwork');
  const tokenDecimal = watch('tokenDecimal');
  const tokenSupply = watch('tokenSupply');

  const disbleButton = !tokenDecimal || !tokenName || !tokenNetwork || !tokenSupply || !tokenSymbol;

  let buttonText = 'Deploy';
  if (tokenDecimal && tokenName && tokenNetwork && tokenSupply && tokenSymbol) buttonText = `Deploy $${tokenSymbol} token`;

  const switches = [
    {
      title: 'Create token page',
      instruction: 'Add a landing page that shows full details about your token',
      switched: createTokenPage,
      handleOverride: () => setCreateTokenPage((prev) => !prev),
    },
    {
      title: 'Revoke mint authority',
      instruction: 'Limit the token supply to increase investor confidence.',
      switched: revokeMintAuthority,
      handleOverride: () => setRevokeMintAuthority((prev) => !prev),
    },
  ];

  const confirmationModalData = {
    close: () => setShowConfirmationModal(false),
    network: tokenNetwork as Network,
    show: showConfirmationModal,
    tokenDecimal,
    tokenName,
    tokenSupply,
    tokenSymbol,
  };

  const onSubmit = (data: FormProp) => {
    const formData = {
      ...data,
      createTokenPage,
      revokeMintAuthority,
    };
    console.log(formData);
    setShowConfirmationModal(false);
    setStep(1);
  };

  useEffect(() => {
    setTokenSymbol?.(tokenSymbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenSymbol]);

  useEffect(() => {
    setTokenName?.(tokenName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenName]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 rounded-base border border-primary-1200 bg-white p-6 min-w-[343px] md:min-w-[448px]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
        <LBInput name="tokenAddress" register={register?.('tokenName')} placeholder="Token name" error={errors?.tokenName} type="text" label="Token Name" instruction="Maximum of 30 characters" />
        <LBInput
          name="tokenSymbol"
          register={register?.('tokenSymbol')}
          placeholder="Token Symbol"
          error={errors?.tokenSymbol}
          type="text"
          label="Token Symbol"
          instruction="Maximum of 10 characters"
        />
      </div>

      <LBSelect label="Blockchain network" text="Select Network" options={blockchainNetworks} onClick={({ text }) => setValue?.('tokenNetwork', text.toLowerCase())} />

      <LBInput
        name="tokenDecimal"
        register={register?.('tokenDecimal')}
        placeholder="5"
        error={errors?.tokenDecimal}
        type="number"
        label="Decimals"
        instruction="The number of decimals for your token"
      />

      <LBInput
        name="tokenSupply"
        register={register?.('tokenSupply')}
        placeholder="1,000,000"
        error={errors?.tokenSupply}
        type="text"
        label="Supply"
        instruction="Initial number of tokens that will be created in your wallet"
      />

      {switches.map((switchData, index) => (
        <Switch key={index} {...switchData} network={network} />
      ))}

      <LBButton onClick={() => setShowConfirmationModal(true)} text={buttonText} fullWidth network={network} variant="plain" disabled={disbleButton} />

      <ConfirmationModal {...confirmationModalData} />
    </form>
  );
};

export default Step1;
