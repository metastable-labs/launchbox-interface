'use client';

import { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { RoundedCloseIcon } from '@/public/icons';
import classNames from 'classnames';
import LBClickAnimation from '../click-animation';
import { ILBModal } from './types';

const LBModal = ({ children, close, show, variant = 'primary', title }: ILBModal) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center z-[9999] p-[15px] justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames('relative flex justify-center items-center bg-white p-5 rounded-base', {
              'border border-primary-50': variant === 'primary',
            })}>
            <div>
              <div
                className={classNames('flex items-center pb-6', {
                  'justify-between': title,
                  'justify-end': !title,
                })}>
                <h1 className="text-primary-150 text-lg md:text-[24px] md:leading-[37.2px]">{title}</h1>

                <LBClickAnimation onClick={close}>
                  <RoundedCloseIcon />
                </LBClickAnimation>
              </div>

              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LBModal;
