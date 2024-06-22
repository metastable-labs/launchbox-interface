import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LBButton, LBSelect } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { FarcasterIcon, InfoIcon } from '@/public/icons';

const schema = yup.object().shape({
  warpcastChannelId: yup.string().required('Warpcast channel is required'),
});

const SelectChannel = () => {
  const { handleSubmit, setValue } = useForm<SelectChannelFormProps>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { socialState } = useSystemFunctions();

  const warpcastChannels = socialState?.farcasterChannels?.map((channel) => ({
    text: channel.name,
    value: channel.name,
    icon: <Image src={channel.image_url} alt={channel.name} width={24} height={24} />,
    id: channel.channel_id,
  }));

  const onSubmit = (data: SelectChannelFormProps) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-80 md:w-[400px] flex flex-col gap-6">
      <LBSelect
        label="Warpcast channel"
        text="Select channel"
        options={warpcastChannels}
        onClick={({ id }) => setValue?.('warpcastChannelId', id)}
        textIcon={<Image src="/images/farcaster-alt.png" alt="farcaster" width={200} height={200} className="w-5 h-5 object-cover" />}
      />

      <LBButton text="Continue" fullWidth type="submit" />

      <div className="self-stretch px-3 py-3.5 flex items-center gap-3.5 rounded-[10px] bg-primary-2950">
        <div>
          <InfoIcon width={18} height={18} color="#6E330C" />
        </div>

        <p className="max-w-full text-[14px] leading-[21px] text-primary-3000">Once a channel is selected, it cannot be changed. Please choose this carefully</p>
      </div>
    </form>
  );
};

export default SelectChannel;
