import classNames from 'classnames';
import { motion } from 'framer-motion';

const SwitchIcon = ({ switched, onClick }: ISwitchIcon) => {
  return (
    <div
      className={classNames('py-[3px] px-1 flex items-center rounded-[10px] relative w-7 h-4 transition-colors duration-300 cursor-pointer', {
        'bg-primary-550': !switched,
        'bg-primary-3450': switched,
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
              'bg-primary-3450': switched,
            })}
          />
        </div>
      </motion.div>
    </div>
  );
};

const LBSwitch = ({ instruction, onClick, switched, title, hasBorder = true, disabled }: ILBSwitch) => {
  return (
    <div className={classNames('self-stretch flex flex-col items-start justify-center gap-1', { 'px-6 -mx-6 pb-3 border-b border-b-primary-50': hasBorder })}>
      <div className={classNames('flex items-center justify-center gap-2', { 'pointer-events-none opacity-50': disabled })}>
        <SwitchIcon switched={switched} onClick={onClick} />
        <span className="text-primary-150 text-sm font-medium tracking-[-0.084px]">{title}</span>
      </div>

      <p className="text-xs text-primary-250 max-w-[322px] py-0.5">{instruction}</p>
    </div>
  );
};

export default LBSwitch;
