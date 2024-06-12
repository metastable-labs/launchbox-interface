import { motion } from 'framer-motion';

const LBClickAnimation = ({ children, onClick, className, stopPropagation }: ILBClickAnimation) => {
  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick?.();
  };
  return (
    <motion.div onClick={handleClick} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className={`cursor-pointer ${className}`}>
      {children}
    </motion.div>
  );
};

export default LBClickAnimation;
