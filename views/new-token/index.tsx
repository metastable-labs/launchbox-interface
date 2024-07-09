'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePrivy } from '@privy-io/react-auth';

import { LBContainer } from '@/components';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import PrimaryHeader from './primary-header';
import SecondaryHeader from './secondary-header';
import { FormProp, NewTokenData } from './types';
import useSocialActions from '@/store/social/actions';
import { useAccount } from 'wagmi';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const schema = yup.object().shape({
  tokenName: yup.string().required('Token Name is required'),
  tokenSymbol: yup.string().required('Token Symbol is required'),
  tokenSupply: yup.string().required('Token Supply is Required'),
  tokenWebsiteURL: yup.string(),
  tokenTelegramURL: yup.string(),
  tokenTwitterURL: yup.string(),
  warpcastChannelId: yup.string(),
});

const ensureHttps = (url: string): string => {
  if (!url) return url;
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const NewTokenView = () => {
  const { socialState } = useSystemFunctions();
  const { address } = useAccount();
  const { authenticated } = usePrivy();
  const { getFarcasterChannels } = useSocialActions();
  const [step, setStep] = useState(0);
  const [newTokenData, setNewTokenData] = useState<NewTokenData>();
  const [createTokenPage, setCreateTokenPage] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [disableHeader, setDisableHeader] = useState(false);

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

  const steps = [
    <Step1 key={0} register={register} watch={watch} errors={errors} setValue={setValue} setStep={setStep} />,
    <Step2 watch={watch} key={1} createTokenPage={createTokenPage} register={register} file={file} setCreateTokenPage={setCreateTokenPage} setFile={setFile} setValue={setValue} />,
    <Step3 key={2} tokenData={newTokenData} setDisableHeader={setDisableHeader} />,
  ];

  const onSubmit = (data: FormProp) => {
    const farcasterChannel = socialState?.farcasterChannels?.find((channel) => channel.channel_id === data?.warpcastChannelId);

    const formData = {
      ...data,
      tokenSupply: Number(data.tokenSupply.replace(/,/g, '')),
      createTokenPage,
      tokenLogo: file,
      tokenWebsiteURL: ensureHttps(data.tokenWebsiteURL!) || undefined,
      farcasterChannel,
    };
    setNewTokenData?.(formData);

    setStep(2);
  };

  useEffect(() => {
    getFarcasterChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, authenticated]);

  return (
    <LBContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-12 flex flex-col gap-8 lg:px-8 items-center pb-14">
        <PrimaryHeader />

        <div className="w-full flex flex-col self-stretch items-center justify-center gap-6">
          <SecondaryHeader setStep={setStep} step={step} disabled={disableHeader} />
          <AnimatePresence mode="popLayout">
            <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-[370px]">
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </form>
    </LBContainer>
  );
};

export default NewTokenView;
