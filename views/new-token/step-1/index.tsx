import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LBButton, LBFileInput, LBFileSample, LBInput, LBSelect } from '@/components';
import { FormProp, StepProps } from '../types';
import { networks } from '@/views/dummy';
import Switch from './switch';
import FirstBuyModal from './first-buy-modal';

const schema = yup.object().shape({
  tokenName: yup.string().required('Token Name is required'),
  tokenSymbol: yup.string().required('Token Symbol is required'),
  tokenNetwork: yup.string().required('Blockchain Network is required'),
  tokenDecimal: yup.string().required('Token Decimal is required'),
  tokenSupply: yup.string().required('Token Supply is Required'),
  tokenWebsiteURL: yup.string(),
  tokenWarpcastChannelLink: yup.string(),
});

const Step1 = ({ network, setStep, setNewTokenData }: StepProps) => {
  const [createTokenPage, setCreateTokenPage] = useState(false);
  // const [revokeMintAuthority, setRevokeMintAuthority] = useState(false);
  const [showFirstBuyModal, setShowFirstBuyModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [firstBuyAmount, setFirstBuyAmount] = useState(0);
  const [firstBuyTokenAmount, setFirstBuyTokenAmount] = useState(0);

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

  const disbleButton = !tokenDecimal || !tokenName || !tokenNetwork || !tokenSupply || !tokenSymbol || !file;

  let buttonText = 'Deploy';
  if (tokenDecimal && tokenName && tokenNetwork && tokenSupply && tokenSymbol) buttonText = `Deploy $${tokenSymbol} token`;

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

  const secondaryInputs = [
    {
      name: 'tokenDecimal',
      placeholder: '5',
      register: register?.('tokenDecimal'),
      error: errors?.tokenDecimal,
      type: 'number',
      label: 'Decimals',
      instruction: 'The number of decimals for your token',
    },
    {
      name: 'tokenSupply',
      register: register?.('tokenSupply'),
      placeholder: '1,000,000',
      error: errors?.tokenSupply,
      type: 'text',
      label: 'Supply',
      instruction: 'Initial number of tokens that will be created in your wallet',
    },
  ];

  const tertiaryInputs = [
    {
      name: 'tokenWebsiteURL',
      register: register?.('tokenWebsiteURL'),
      placeholder: '...',
      type: 'text',
      label: 'Website URL',
      instruction: "Link to your token's website",
      isOptional: true,
    },
    {
      name: 'tokenWarpcastChannelLink',
      register: register?.('tokenWarpcastChannelLink'),
      placeholder: '...',
      type: 'text',
      label: 'Warpcast channel link',
      instruction: "Link to your token's warpcast channel",
      isOptional: true,
    },
  ];

  const switches = [
    {
      title: 'Create token page',
      instruction: 'Add a landing page that shows full details about your token',
      switched: createTokenPage,
      handleOverride: () => setCreateTokenPage((prev) => !prev),
    },
    // {
    //   title: "Revoke mint authority",
    //   instruction: "Limit the token supply to increase investor confidence.",
    //   switched: revokeMintAuthority,
    //   handleOverride: () => setRevokeMintAuthority((prev) => !prev),
    // },
  ];

  const firstBuyModalData = {
    show: showFirstBuyModal,
    network,
    tokenSymbol,
    tokenLogo: fileURL!,
    firstBuyAmount,
    setFirstBuyAmount,
    firstBuyTokenAmount,
    setFirstBuyTokenAmount,
  };

  const handleFile = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) {
      setFile?.(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFileURL(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = () => setFile?.(null);

  const onSubmit = (data: FormProp) => {
    const formData = {
      ...data,
      tokenSupply: Number(data.tokenSupply.replace(/,/g, '')),
      createTokenPage,
      // revokeMintAuthority,
      tokenLogo: file,
      firstBuyAmount,
      firstBuyTokenAmount,
    };
    setNewTokenData?.(formData);
    console.log(formData);

    setStep(1);
  };

  useEffect(() => {
    if (tokenSupply) {
      const formatedTokenSupply = tokenSupply.replace(/[^0-9]/g, '');
      const numberTokenSupply = Number(formatedTokenSupply);
      const thousandSeparator = numberTokenSupply.toLocaleString();
      setValue('tokenSupply', thousandSeparator);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenSupply]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 rounded-base border border-primary-1200 bg-white p-6 min-w-[343px] md:min-w-[448px]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
        {primaryInputs.map((input, index) => (
          <LBInput key={index} {...input} />
        ))}
      </div>

      <LBSelect label="Blockchain network" text="Select Network" options={blockchainNetworks} onClick={({ text }) => setValue?.('tokenNetwork', text.toLowerCase())} />

      {secondaryInputs.map((input, index) => (
        <LBInput key={index} {...input} />
      ))}

      <LBFileInput handleFileChange={handleFile} name="token-logo" label="Upload logo" network={network} show={!file} />

      <LBFileSample file={file} deleteFile={deleteFile} />

      {tertiaryInputs.map((input, index) => (
        <LBInput key={index} {...input} />
      ))}

      {switches.map((switchData, index) => (
        <Switch key={index} {...switchData} network={network} />
      ))}

      <LBButton onClick={() => setShowFirstBuyModal(true)} text={buttonText} fullWidth network={network} variant="plain" disabled={disbleButton} />

      <FirstBuyModal {...firstBuyModalData} />
    </form>
  );
};

export default Step1;
