import { motion } from "framer-motion";

const LBClickAnimation = ({
  children,
  onClick,
  className,
}: ILBClickAnimation) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default LBClickAnimation;
