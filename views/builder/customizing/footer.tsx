import CustomizingPaper from './paper';
import { IFooter } from './types';
import { FooterIcon } from '@/public/icons';
import CustomizeInput from './input';

const Footer = ({ onClick, handleChange, isActive, chainExplorerLink, farcasterLink, telegramLink, xLink }: IFooter) => {
  const inputs = [
    {
      label: 'X(formerly Twitter) link',
      placeholder: 'Enter project x link',
      value: xLink,
      handleChange: (value: string) => handleChange('xLink', value),
    },
    {
      label: 'Farcaster link',
      placeholder: 'Enter project farcaster link',
      value: farcasterLink,
      handleChange: (value: string) => handleChange('farcasterLink', value),
    },
    {
      label: 'Telegram link',
      placeholder: 'Enter project telegram link',
      value: telegramLink,
      handleChange: (value: string) => handleChange('telegramLink', value),
    },
    {
      label: 'Chain Explorer link',
      placeholder: 'Enter chainexplorer link',
      value: chainExplorerLink,
      handleChange: (value: string) => handleChange('chainExplorerLink', value),
    },
  ];

  return (
    <div className="px-4 rounded-lg border border-primary-50 bg-white flex flex-col self-stretch gap-2">
      <CustomizingPaper icon={<FooterIcon />} isActive={isActive} title="Footer" onClick={() => onClick('footer')} />

      <div className="flex flex-col items-stretch justify-center gap-6 self-stretch pb-8">
        <h1 className="pb-4 border-b-[0.5px] border-b-primary-50 text-primary-2000 text-sm font-semibold">Footer links</h1>

        {inputs.map((input, index) => (
          <CustomizeInput key={index} {...input} />
        ))}
      </div>
    </div>
  );
};

export default Footer;
