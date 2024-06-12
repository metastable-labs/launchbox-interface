import { BasePrimaryMobileIcon } from '@/public/icons';
import classNames from 'classnames';

export const networks = [
  {
    title: 'Base',
    variant: 'base',
    icon: <BasePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.gateway.tenderly.co',
  },
  {
    title: 'Optimism',
    variant: 'optimism',
    icon: <BasePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.optimism.io',
  },
  {
    title: 'Mode',
    variant: 'mode',
    icon: <BasePrimaryMobileIcon />,
    rpcUrl: 'https://mainnet.mode.network/',
  },
];

const NetworkModal = ({ close }: { close: () => void }) => {
  return (
    <div className="flex flex-col gap-[28px] min-w-[300px] md:min-w-80">
      <h1 className="text-[20px] leading-[30px] text-primary-400 text-left font-medium -mt-10">Select chain</h1>

      <div className="flex flex-col md:min-w-80 flex-1 items-stretch gap-8">
        {networks?.map(({ icon, title, variant }, index) => (
          <div key={index} onClick={() => {}} className="flex items-center justify-between hover:bg-primary-200 transition-colors duration-300 cursor-pointer py-2 px-5 -mx-5">
            <div className="flex items-center justify-center gap-2">
              {icon} <span className="capitalize text-[14px] leading-[21.7px] font-medium text-primary-150">{title}</span>
            </div>

            <div
              className={classNames('w-3 h-3 rounded-full transition-all duration-200', {
                'bg-primary-450': variant === 'base',
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkModal;
