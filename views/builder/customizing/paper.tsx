import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

import { RightArrowIcon, RightCarretDarkIcon } from "@/public/icons";
import { ICustomizingPaper } from "./types";

const CustomizingPaper = ({
  icon,
  isActive,
  title,
  onClick,
}: ICustomizingPaper) => {
  const icons = [
    <RightCarretDarkIcon width={24} height={24} color="#375DFB" key={1} />,
    icon,
  ];

  return (
    <div
      onClick={onClick}
      className={classNames(
        "min-w-full flex items-center justify-between self-stretch cursor-pointer",
        {
          "rounded-lg border border-primary-50 bg-white p-4": !isActive,
          "py-4": isActive,
        }
      )}
    >
      <div className="flex items-center justify-center gap-1 min-h-6">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={isActive ? 0 : 1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: isActive ? 180 : 0 }}
            exit={{ opacity: 0 }}
            className="min-w-6 min-h-6"
          >
            {icons[isActive ? 0 : 1]}
          </motion.div>
        </AnimatePresence>

        <motion.span
          animate={{ color: isActive ? "#375DFB" : "#525866" }}
          className="text-[16px] leading-[20px] font-medium"
        >
          {title}
        </motion.span>
      </div>

      <AnimatePresence mode="popLayout">
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RightArrowIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomizingPaper;
