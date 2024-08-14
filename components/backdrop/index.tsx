import classNames from 'classnames';
import { motion } from 'framer-motion';

const LBBackdrop = ({ onClick, variant = 'primary' }: ILBBackdrop) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className={classNames('fixed inset-0', { 'bg-transparent z-10': variant === 'primary', 'bg-[#000000b3] z-50': variant === 'secondary' })}
    onClick={onClick}
  />
);
export default LBBackdrop;
