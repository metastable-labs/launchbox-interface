import { motion } from "framer-motion";
import classNames from "classnames";

import { ILandingLink } from "./types";

const LandingLink = ({
  link,
  text,
  color,
  isNavigation = false,
  variant = "primary",
}: ILandingLink) => (
  <motion.a
    animate={{ backgroundColor: color }}
    target="_blank"
    href={link}
    className={classNames(
      "text-primary-1450 font-medium rounded-full flex items-center justify-center",
      {
        "border border-primary-1550": variant === "secondary",
        "text-[14px] leading-[22.4px] min-w-[115px] max-h-[40px] py-3 px-4":
          isNavigation,
        "text-base min-w-[170px] max-h-[52px] p-4": !isNavigation,
      }
    )}
  >
    {text}
  </motion.a>
);

export default LandingLink;
