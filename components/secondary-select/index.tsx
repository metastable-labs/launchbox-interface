import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

import { ILBSecondarySelect, IOption } from "./types";
import { SelectArrowIcon } from "@/public/icons";
import LBClickAnimation from "../click-animation";

const LBSecondarySelect = ({
  defaultValue,
  onClick,
  options,
  text,
  disabled,
  label,
}: ILBSecondarySelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>();

  const showOptions = isOpen && options;

  const handleValue = (option: IOption) => {
    setIsOpen((prev) => !prev);
    setSelectedOption(option);

    if (onClick) onClick(option);
  };

  useEffect(() => {
    if (defaultValue && options) {
      const defaultOption = options.find(
        (option) => option.value === defaultValue
      );
      if (defaultOption) setSelectedOption(defaultOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, options]);

  return (
    <div className="relative">
      <LBClickAnimation
        className="px-3.5 py-2.5 flex items-center justify-center gap-1 rounded-lg border border-primary-1950 bg-white shadow-table-cta min-w-[124.17px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={classNames("transition-all duration-200", {
            "-rotate-90": !isOpen,
          })}
        >
          <SelectArrowIcon />
        </div>

        <span className="text-sm font-semibold text-primary-2000">
          {selectedOption?.text}
        </span>
      </LBClickAnimation>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            key={0}
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "200px" }}
            exit={{ opacity: 0, maxHeight: 0 }}
            className="w-full rounded-lg border border-primary-1950 bg-white shadow-table-cta flex flex-col gap-5 absolute top-[120%] px-2 py-4 overflow-auto"
          >
            {options.map((option, index) => (
              <LBClickAnimation
                className="text-sm font-semibold text-primary-2000 hover:bg-primary-200 px-3.5 py-2.5 transition-colors whitespace-nowrap rounded-lg"
                key={index}
                onClick={() => handleValue(option)}
              >
                {option.text}
              </LBClickAnimation>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LBSecondarySelect;
