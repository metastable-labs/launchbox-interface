import Image from 'next/image';
import { LBButton, LBFileInput, LBFileSample, LBInput, LBSelect, LBSwitch } from '@/components';
import { FarcasterIcon } from '@/public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { StepProps } from '../types';

const Step2 = ({ file, register, setFile, tokenSymbol, createTokenPage, setCreateTokenPage, setValue, watch }: StepProps) => {
  const { socialState } = useSystemFunctions();
  const warpcastChannelId = watch?.('warpcastChannelId');

  const disbleButton = !file;

  let buttonText = 'Review';
  if (tokenSymbol) buttonText = `Deploy $${tokenSymbol} token`;

  const handleFile = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) setFile?.(file);
  };

  const deleteFile = () => setFile?.(null);

  const warpcastChannels = socialState?.farcasterChannels?.map((channel) => ({
    text: channel.name,
    value: channel.name,
    icon: <Image src={channel.image_url} alt={channel.name} width={24} height={24} />,
    id: channel.channel_id,
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-base border border-primary-1200 bg-white p-6 min-w-[343px] md:min-w-[448px]">
      <LBFileInput handleFileChange={handleFile} name="token-logo" label="Upload logo" show={!file} />

      <LBFileSample file={file} deleteFile={deleteFile} />

      {warpcastChannels && warpcastChannels?.length > 0 && (
        <LBSelect
          label="Warpcast channel"
          text="Select channel"
          options={warpcastChannels}
          onClick={({ id }) => setValue?.('warpcastChannelId', id)}
          defaultId={warpcastChannelId}
          isOptional
          textIcon={<FarcasterIcon />}
        />
      )}

      <LBInput name="tokenWebsiteURL" register={register?.('tokenWebsiteURL')} placeholder="..." type="text" label="Website URL" instruction="Link to your token's website" isOptional />

      <LBSwitch
        onClick={() => setCreateTokenPage?.((prev) => !prev)}
        instruction="Don’t have a website? Add a landing page that shows full details about your token project and community"
        switched={createTokenPage!}
        title="Create token page"
      />

      <LBButton text={buttonText} fullWidth variant="plain" disabled={disbleButton} type="submit" />
    </div>
  );
};

export default Step2;
