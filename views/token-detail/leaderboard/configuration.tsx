import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LBButton, LBModal, LBInput, LBSwitch } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { ExclaimIcon } from '@/public/icons';
import SelectChannel from './select-channel';

const schema = yup.object().shape({
  points: yup.string().required('Points is required'),
});

const EmptyState = ({ close }: { close: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-6">
    <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
      <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
        <ExclaimIcon width={16} height={16} />
      </div>
    </div>

    <div className="flex flex-col items-center justify-center gap-1">
      <h1 className="text-primary-400 text-[20px] leading-[30px] text-center">No channels found</h1>

      <p className="text-primary-700 text-[14px] leading-[24px] text-center max-w-[400px]">
        You don’t have any channels created with this account, kindly create a Warpcast channel and continue this process{' '}
      </p>
    </div>

    <LBButton variant="plain" text="Got it" fullWidth onClick={close} />
  </div>
);

const Configuration = ({ close, show }: IConfiguration) => {
  const [cast, setCast] = useState(false);
  const { socialState, tokenState } = useSystemFunctions();
  const { token } = tokenState;

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConfigurationFormProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const channel = token?.socials?.warpcast?.channel;
  const hasChannel = Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);

  const hasHeader = Boolean(socialState?.farcasterChannels?.length);
  const title = Boolean(channel) ? 'Configure action' : 'Select a channel';

  const points = watch?.('points');

  const onSubmit = (data: ConfigurationFormProps) => {
    const points = Number(data.points.replace(/[^0-9]/g, ''));
    close();
  };

  useEffect(() => {
    if (points) {
      const formatedTokenSupply = points?.replace(/[^0-9]/g, '');
      const numberTokenSupply = Number(formatedTokenSupply);
      const thousandSeparator = numberTokenSupply.toLocaleString();
      setValue?.('points', thousandSeparator);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <LBModal show={show} close={close} variant="primary" hasHeader={hasHeader} title={title}>
      {hasChannel && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-80 md:w-[400px] flex flex-col gap-6">
          <div className="self-stretch flex flex-col justify-center items-stretch gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm tracking-[-0.084px] font-medium text-primary-150">Warpcast channel</span>

              <div className="self-stretch flex items-center gap-4 bg-white rounded-lg border border-primary-50 p-3.5">
                <Image src={channel?.image_url || ''} alt="logo" width={500} height={500} className="w-[50px] h-[50px] object-cover" />
                <div className="flex flex-col gap-1">
                  <span className="text-[16px] leading-[28px] text-primary-650 font-medium">{channel?.name}</span>
                  <span className="text-[14px] leading-[16px] text-primary-700">{channel?.follower_count?.toLocaleString()} followers</span>
                </div>
              </div>

              <span className="text-primary-250 text-xs">Hint text</span>
            </div>

            <div className="self-stretch flex flex-col gap-3">
              <h4 className="text-primary-150 text-sm tracking-[-0.084px] font-medium">Actions</h4>

              <motion.div animate={{ height: cast ? 'fit-content' : '57px' }} className={classNames('self-stretch pb-4 border-b border-b-primary-50', { 'flex flex-col gap-4': cast })}>
                <LBSwitch instruction="Members with top cast actions on the channel get points for casting" onClick={() => setCast((prev) => !prev)} switched={cast} title="Cast" hasBorder={false} />

                <AnimatePresence>
                  {cast && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                      <LBInput name="points" register={register?.('points')} placeholder="250 points" error={errors?.points} type="text" label="Set points for this action" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <LBButton text="Create" fullWidth type="submit" disabled={!cast} />
        </form>
      )}

      {!hasChannel && hasHeader && <SelectChannel />}

      {!hasHeader && <EmptyState close={close} />}
    </LBModal>
  );
};

export default Configuration;
