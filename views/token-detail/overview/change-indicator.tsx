import classNames from "classnames";
import { motion } from "framer-motion";

import { ChangeIndicatorIcon } from "@/public/icons";

interface ChangeIndicatorProps {
  change: number;
}

const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({ change }) => {
  const isPositive = change > 0;

  return (
    <div
      className={classNames(
        "flex items-center justify-center gap-1 text-[14px] leading-[24px] tracking-[-0.14px] font-semibold",
        {
          "text-primary-2450": isPositive,
          "text-primary-1050": !isPositive,
        }
      )}
    >
      <motion.div animate={{ rotate: isPositive ? 0 : 180 }}>
        <ChangeIndicatorIcon color={isPositive ? "#32AE60" : "#DF1C41"} />
      </motion.div>
      {Math.abs(change).toFixed(2)}%
    </div>
  );
};

export default ChangeIndicator;
