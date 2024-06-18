import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useChainId } from 'wagmi';
import { base, optimism, mode } from 'wagmi/chains';

import { ISwitch, ISwitchIcon } from '../types';

const SwitchIcon = ({ switched, onClick }: ISwitchIcon) => {
  const chainId = useChainId();
  return (
    <div
      className={classNames('py-[3px] px-1 flex items-center rounded-[10px] relative w-7 h-4 transition-colors duration-300 cursor-pointer', {
        'bg-primary-550': !switched,
        'bg-primary-1000': chainId === base.id && switched,
        'bg-primary-1050': chainId === optimism.id && switched,
        'bg-primary-1300': chainId === mode.id && switched,
      })}
      onClick={onClick}>
      <motion.div
        animate={{
          top: '20%',
          left: switched ? '50%' : '12%',
        }}
        className="bg-white rounded-full p-[1px] absolute w-[10px] h-[10px]">
        <div className="p-[2px] rounded-full bg-primary-1750">
          <div
            className={classNames('w-1 h-1 rounded-full', {
              'bg-primary-550': !switched,
              'bg-primary-1000': chainId === base.id && switched,
              'bg-primary-1050': chainId === optimism.id && switched,
              'bg-primary-1300': chainId === mode.id && switched,
            })}
          />
        </div>
      </motion.div>
    </div>
  );
};

const Switch = ({ handleOverride, switched, title, instruction }: ISwitch) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-center gap-1 pb-3 border-b border-b-primary-50">
      <div className="flex items-center justify-center gap-2">
        <SwitchIcon switched={switched} onClick={handleOverride} />
        <span className="text-primary-150 text-sm font-medium tracking-[-0.084px]">{title}</span>
      </div>

      <p className="text-[10px] leading-[16px] text-primary-250 max-w-[400px]">{instruction}</p>
    </div>
  );
};

export default Switch;
