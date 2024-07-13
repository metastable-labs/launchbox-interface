import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { base } from 'viem/chains';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LBButton, LBInput, LBSwitch, LBSelect } from '@/components';
import { networks } from '@/config/config';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useIncentiveActions from '@/store/incentive/actions';

interface FormProps extends ConfigurationFormProps {
  contractAddress: string;
}

const schema = yup.object().shape({
  contractAddress: yup.string().required('Contract address is required'),
  points: yup.string().required('Points is required'),
});

const NFTConfiguration = ({ close }: { close: () => void }) => {
  const [holders, setHolders] = useState(false);
  const { incentiveState } = useSystemFunctions();
  const { activateIncentive } = useIncentiveActions();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const chainOptions = networks.map(({ variant, chainId, icon }) => ({ text: variant as string, value: `${chainId}`, icon: icon, id: `${chainId}` }));

  const points = watch?.('points');

  const onSubmit = async (data: FormProps) => {
    const nftChannel = incentiveState.incentiveChannels?.find((channel) => channel.slug === 'nft');
    const nftOwnAction = nftChannel?.actions?.find((action) => action.slug === 'nft_own');
    const points = Number(data.points.replace(/[^0-9]/g, ''));

    const payload: ActivateIncentiveProps = {
      actions: [
        {
          id: nftOwnAction?.id!,
          points,
          metadata: {
            contract: data.contractAddress,
          },
        },
      ],
    };

    await activateIncentive(payload, { onSuccess: close });
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-80 md:w-[400px] flex flex-col gap-6">
      <div className="self-stretch flex flex-col justify-center items-stretch gap-4">
        <LBSelect text="Select chain" options={chainOptions} label="Blockchain network" defaultId={`${base.id}`} disabled />

        <LBInput
          name="contractAddress"
          register={register?.('contractAddress')}
          placeholder="0x.."
          error={errors?.contractAddress}
          type="text"
          label="Contract address"
          instruction="Contract address of the NFT"
        />

        <div className="self-stretch flex flex-col gap-3">
          <h4 className="text-primary-150 text-sm tracking-[-0.084px] font-medium">Actions</h4>

          <motion.div animate={{ height: holders ? 'fit-content' : '76px' }} className={classNames('self-stretch pb-4 border-b border-b-primary-50', { 'flex flex-col gap-4': holders })}>
            <LBSwitch instruction="Members that hold this collectible in their wallet" onClick={() => setHolders((prev) => !prev)} switched={holders} title="Holders" hasBorder={false} />

            <AnimatePresence>
              {holders && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                  <LBInput name="points" register={register?.('points')} placeholder="750 points" error={errors?.points} type="text" label="Set points for this action" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <LBButton text="Create" fullWidth type="submit" disabled={!holders} />
    </form>
  );
};

export default NFTConfiguration;
