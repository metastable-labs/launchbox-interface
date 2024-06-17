import { LBButton, LBFileInput, LBFileSample, LBInput, LBSelect } from '@/components';
import { StepProps } from '../types';
import Switch from './switch';
import { warpcastChannels } from './dummy';

const Step2 = ({ file, register, setFile, tokenSymbol, createTokenPage, setCreateTokenPage, setValue, watch }: StepProps) => {
  const tokenWarpcastChannelLink = watch?.('tokenWarpcastChannelLink');
  console.log(tokenWarpcastChannelLink);
  const disbleButton = !file || !tokenWarpcastChannelLink;

  let buttonText = 'Deploy';
  if (tokenSymbol) buttonText = `Deploy $${tokenSymbol} token`;

  const inputs = [
    {
      name: 'tokenWebsiteURL',
      register: register?.('tokenWebsiteURL'),
      placeholder: '...',
      type: 'text',
      label: 'Website URL',
      instruction: "Link to your token's website",
      isOptional: true,
    },
  ];

  const handleFile = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) setFile?.(file);
  };

  const deleteFile = () => setFile?.(null);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-base border border-primary-1200 bg-white p-6 min-w-[343px] md:min-w-[448px]">
      <LBFileInput handleFileChange={handleFile} name="token-logo" label="Upload logo" show={!file} />

      <LBFileSample file={file} deleteFile={deleteFile} />

      {inputs.map((input, index) => (
        <LBInput key={index} {...input} />
      ))}

      <LBSelect
        label="Warpcast channel"
        text="Select channel"
        options={warpcastChannels}
        onClick={({ text }) => setValue?.('tokenWarpcastChannelLink', text.toLowerCase())}
        defaultId={tokenWarpcastChannelLink}
      />

      <Switch
        handleOverride={() => setCreateTokenPage?.((prev) => !prev)}
        instruction="Add a landing page that shows full details about your token"
        switched={createTokenPage!}
        title="Create token page"
      />

      <LBButton text={buttonText} fullWidth variant="plain" disabled={disbleButton} type="submit" />
    </div>
  );
};

export default Step2;
