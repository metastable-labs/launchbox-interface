'use client';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { ExclaimIcon } from '@/public/icons';
import LBButton from '../button';

const LBError = ({ onClick, subtitle, title, show, standAlone = false }: ILBError) => (
  <AnimatePresence>
    {show && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={classNames('', { 'w-full h-[80vh] flex items-center justify-center': standAlone })}>
        <div className="p-6 flex flex-col items-center justify-center gap-1">
          <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
            <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
              <ExclaimIcon width={28} height={28} />
            </div>
          </div>

          <h1 className="text-primary-400 text-[20px] leading-[30px] text-center">{title}</h1>
          <p className="text-primary-700 text-[14px] leading-[24px] text-center max-w-[400px]">{subtitle}</p>

          <div className="self-center w-40 items-stretch justify-center flex mt-5">
            <LBButton text="Try again" fullWidth onClick={onClick} />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LBError;
