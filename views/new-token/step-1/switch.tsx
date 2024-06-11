import classNames from 'classnames';
import { motion } from 'framer-motion';

import { ISwitch, ISwitchIcon } from '../types';

const SwitchIcon = ({ switched, onClick, network }: ISwitchIcon) => {
  return (
    <div
      className={classNames('py-[3px] px-1 flex items-center rounded-[10px] relative w-7 h-4 transition-colors duration-300 cursor-pointer', {
        'bg-primary-550': !switched,
        'bg-primary-1000': network === 'base' && switched,
        'bg-primary-1050': network === 'optimism' && switched,
        'bg-primary-1300': network === 'mode' && switched,
        'bg-primary-1150': network === 'scroll' && switched,
      })}
      onClick={onClick}>
      <motion.div
        animate={{
          top: '20%',
          left: switched ? '50%' : '12%',
        }}
        className="bg-white rounded-full p-[1px] absolute w-[10px] h-[10px]">
        <div className="p-[2px] rounded-full bg-primary-2200">
          <div
            className={classNames('w-1 h-1 rounded-full', {
              'bg-primary-550': !switched,
              'bg-primary-1000': network === 'base' && switched,
              'bg-primary-1050': network === 'optimism' && switched,
              'bg-primary-1300': network === 'mode' && switched,
              'bg-primary-1150': network === 'scroll' && switched,
            })}
          />
        </div>
      </motion.div>
    </div>
  );
};

const Switch = ({ handleOverride, switched, network, title, instruction }: ISwitch) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-center gap-1 pb-3 border-b border-b-primary-50">
      <div className="flex items-center justify-center gap-2">
        <SwitchIcon switched={switched} onClick={handleOverride} network={network} />
        <span className="text-primary-150 text-sm font-medium tracking-[-0.084px]">{title}</span>
      </div>

      <p className="text-[10px] leading-[16px] text-primary-250">{instruction}</p>
    </div>
  );
};

export default Switch;
