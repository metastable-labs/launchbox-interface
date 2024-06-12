import { motion } from 'framer-motion';
import classNames from 'classnames';

import { ILandingLink } from './types';

const LandingLink = ({ link, text, color, isNavigation = false, variant = 'primary', isBuilder = false }: ILandingLink) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ backgroundColor: color }}
    target="_blank"
    href={link}
    className={classNames('text-primary-1450 font-medium rounded-full flex items-center justify-center', {
      'border border-primary-1550': variant === 'secondary',
      'text-[14px] leading-[22.4px] min-w-[115px] max-h-[40px] py-3 px-4': isNavigation && !isBuilder,
      'text-base min-w-[170px] max-h-[52px] p-4': !isNavigation && !isBuilder,
      'px-[10px] py-[7.5px] max-h-[25px] text-[8.769px] leading-[14px] min-w-[72px]': isBuilder && isNavigation,
      'p-[10.02px] max-h-[32.5px] text-[10.022px] leading-[15.033px] min-w-[106px]': isBuilder && !isNavigation,
    })}>
    {text}
  </motion.a>
);

export default LandingLink;
