import classNames from 'classnames';
import { motion } from 'framer-motion';

import { ChangeIndicatorIcon } from '@/public/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';

interface ChangeIndicatorProps {
  change: number;
}

const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({ change }) => {
  const { tokenState } = useSystemFunctions();
  const { analytics } = tokenState;

  const price_increased = analytics?.isIncreased;
  const price_change = analytics?.percentageChange;

  const realCastChange = price_increased ? Math.abs(Number(price_change || 0)) : -Math.abs(Number(price_change || 0)!);
  const isPositive = realCastChange > 0;

  return (
    <div
      className={classNames('flex items-center justify-center gap-1 text-[14px] leading-[24px] tracking-[-0.14px] font-medium', {
        'text-primary-2450': isPositive,
        'text-primary-1050': !isPositive,
      })}>
      <motion.div animate={{ rotate: isPositive ? 0 : 180 }}>
        <ChangeIndicatorIcon color={isPositive ? '#32AE60' : '#DF1C41'} />
      </motion.div>
      {realCastChange}%
    </div>
  );
};

export default ChangeIndicator;
