import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { useChainId } from 'wagmi';
import { base, optimism, mode } from 'wagmi/chains';

import { CheckIcon, RightCarretDarkIcon } from '@/public/icons';

interface StepProps {
  step: number;
  title: string;
  current: boolean;
  passed: boolean;
  onClick?: () => void;
}

const Step = ({ step, title, current, passed, onClick }: StepProps) => {
  const chainId = useChainId();
  return (
    <div
      className={classNames('flex items-center justify-center gap-2', {
        'cursor-pointer': onClick,
      })}
      onClick={() => onClick && onClick()}>
      <div
        className={classNames('rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300', {
          'bg-primary-1000': current && chainId === base.id,
          'bg-primary-1050': current && chainId === optimism.id,
          'bg-primary-1100': current && chainId === mode.id,
          'bg-primary-450': passed,
          'bg-white border border-primary-50': !current && !passed,
          'text-white': current,
          'text-primary-250': !current,
        })}>
        <AnimatePresence mode="popLayout">
          {passed ? (
            <motion.span key={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute">
              <CheckIcon />
            </motion.span>
          ) : (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={0} className="text-[12px] font-medium text-center leading-none">
              {step}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <span
        className={classNames('text-sm tracking-[-0.084px]', {
          'font-medium text-primary-150': current,
          'font-normal text-primary-250': !current,
        })}>
        {title}
      </span>
    </div>
  );
};

const SecondaryHeader = ({ step, setStep, disabled }: { step: number; setStep: (step: number) => void; disabled: boolean }) => {
  return (
    <div className={classNames('flex items-center justify-center gap-4', { 'pointer-events-none': disabled })}>
      <Step current={step === 0} passed={step != 0} step={1} title="Token info" onClick={() => setStep(0)} />
      <RightCarretDarkIcon />
      <Step current={step === 1} passed={step > 1} step={2} title="Socials" onClick={() => step > 1 && setStep(1)} />
      <RightCarretDarkIcon />
      <Step current={step === 2} passed={step > 2} step={3} title="Review" />
    </div>
  );
};

export default SecondaryHeader;
