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
  const price_change = Number(analytics?.percentageChange || 0);

  const isNeutral = price_change === 0 && price_increased === false;
  const isPositive = price_change > 0;
  const realCastChange = isNeutral ? 0 : price_increased ? Math.abs(price_change) : -Math.abs(price_change);

  const loading = !analytics;

  return (
    <div
      className={classNames('flex items-center justify-center gap-1 text-[14px] leading-[24px] tracking-[-0.14px] font-medium', {
        'text-primary-2450': isPositive && !loading,
        'text-primary-1050': !isPositive && !loading && !isNeutral,
        'text-primary-50 animate-pulse': loading,
        'text-neutral-500': isNeutral && !loading,
      })}>
      <motion.div animate={{ rotate: isPositive || isNeutral ? 0 : 180 }}>
        <ChangeIndicatorIcon color={loading ? '#e2e4e9' : isNeutral ? '#A0A0A0' : isPositive ? '#32AE60' : '#DF1C41'} />
      </motion.div>
      {loading ? '--' : realCastChange}%
    </div>
  );
};

export default ChangeIndicator;
