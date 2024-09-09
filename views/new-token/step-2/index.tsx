import { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

import { LBButton, LBFileInput, LBFileSample, LBInput, LBSelect, LBSwitch } from '@/components';
import { FarcasterIcon } from '@/public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { StepProps } from '../types';
import useTokenActions from '@/store/token/actions';

const Step2 = ({ file, register, setFile, tokenSymbol, createTokenPage, setCreateTokenPage, setValue, watch }: StepProps) => {
  const {
    socialState,
    tokenState: { slugVerificationLoading },
  } = useSystemFunctions();
  const { verifyTokenSlug } = useTokenActions();
  const [slugIsAvailable, setSlugIsAvailable] = useState(false);

  const warpcastChannelId = watch?.('warpcastChannelId');
  const tokenPageName = watch?.('tokenPageName');

  const disbleButton = !file || (createTokenPage && (!slugIsAvailable || !tokenPageName)) || slugVerificationLoading;

  let buttonText = 'Review';
  if (tokenSymbol) buttonText = `Deploy $${tokenSymbol} token`;

  const disableCreateTokenPage = Boolean(watch?.('tokenWebsiteURL'));
  const dynamicPlaceholder = `${watch?.('tokenName')?.toLowerCase().replace(/\s/g, '_')}_token_page`;

  const warpcastChannels = socialState?.farcasterChannels?.map((channel) => ({
    text: channel.name,
    value: channel.name,
    icon: <Image src={channel.image_url} alt={channel.name} width={24} height={24} />,
    id: channel.channel_id,
  }));

  const inputs = [
    {
      name: 'tokenWebsiteURL',
      register: register?.('tokenWebsiteURL'),
      type: 'text',
      label: 'Website URL',
      disabled: createTokenPage,
    },
    {
      name: 'tokenTelegramURL',
      register: register?.('tokenTelegramURL'),
      type: 'text',
      label: 'Telegram URL',
    },
    {
      name: 'tokenTwitterURL',
      register: register?.('tokenTwitterURL'),
      type: 'text',
      label: 'Twitter URL',
    },
  ];

  const handleFile = (e: any) => {
    const file = e.target?.files?.[0];
    if (file.size > 5000000) {
      toast.warning('File size should be less than 5MB');
      return;
    }

    if (file) setFile?.(file);
  };

  const deleteFile = () => setFile?.(null);

  const debouncedVerifyTokenSlug = debounce((slug: string) => {
    if (/^[a-zA-Z0-9_]+$/.test(slug)) {
      verifyTokenSlug(slug, { onSuccess: () => setSlugIsAvailable(false), onError: () => setSlugIsAvailable(true) });
    }
  }, 300);

  useEffect(() => {
    if (tokenPageName) {
      debouncedVerifyTokenSlug(tokenPageName);
    }
    return () => {
      debouncedVerifyTokenSlug.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenPageName]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-base border border-primary-1200 bg-white p-6 max-w-[370px]">
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
          instruction="You can configure your community later, we’ll be adding more social options to this list."
        />
      )}

      {inputs.map((input, index) => (
        <LBInput key={index} {...input} isOptional />
      ))}

      <LBSwitch
        onClick={() => setCreateTokenPage?.((prev) => !prev)}
        instruction="Don’t have a website? Add a landing page that shows full details about your token project and community"
        switched={createTokenPage!}
        title="Create token page"
        disabled={disableCreateTokenPage}
      />

      {createTokenPage && (
        <div className="relative">
          <LBInput
            label="Token page name"
            name="tokenPageName"
            isRequired
            instruction="Enter a unique name for your token page. It will be used in the URL like launchbox.xyz/your_token_name. Use one word or words joined with underscores."
            register={register?.('tokenPageName')}
            placeholder={dynamicPlaceholder}
          />

          {tokenPageName && (
            <span
              className={classNames('absolute top-0 right-0 text-xs', {
                'animate-pulse text-primary-250 right-2': slugVerificationLoading,
                'text-primary-3350': slugIsAvailable && !slugVerificationLoading,
                'text-primary-2650': !slugIsAvailable && !slugVerificationLoading,
              })}>
              {slugVerificationLoading && '...'}
              {slugIsAvailable && !slugVerificationLoading && 'Available'}
              {!slugIsAvailable && !slugVerificationLoading && 'Unavailable'}
            </span>
          )}
        </div>
      )}

      <div className="self-stretch flex justify-stretch mt-2">
        <LBButton text={buttonText} fullWidth disabled={disbleButton} type="submit" />
      </div>
    </div>
  );
};

export default Step2;
