'use client';

import { DragEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { ILBFileInput } from './types';
import { UploadIcon } from '@/public/icons';
import LBClickAnimation from '../click-animation';

const LBFileInput = ({ name, handleFileChange, disabled, label, network = 'base', show }: ILBFileInput) => {
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleButtonClick = () => {
    if (documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

  const handleDocumentDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const fileEvent = { target: { files: event.dataTransfer.files } };
      handleFileChange(fileEvent);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classNames('w-full text-sm tracking-[-0.084px] text-primary-150 flex flex-col items-start gap-1', {
            'pointer-events-none': disabled,
          })}>
          <label htmlFor={name}>{label}</label>

          <div
            className={classNames('w-full p-8 flex flex-col gap-5 items-center bg-white rounded-xl border border-dashed transition-colors duration-300', {
              'border-primary-550': !isDragOver,
              'border-primary-1000': network === 'base' && isDragOver,
              'border-primary-1050': network === 'optimism' && isDragOver,
              'border-primary-1300': network === 'mode' && isDragOver,
              'border-primary-1150': network === 'scroll' && isDragOver,
            })}
            onDrop={handleDocumentDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}>
            <motion.div animate={{ scale: isDragOver ? 1.5 : 1 }}>
              <UploadIcon />
            </motion.div>

            <p className="flex flex-col self-stretch gap-1 text-center">
              <p className="text-primary-150 text-sm tracking-[-0.084px] font-medium max-w-[332px] text-center">Choose a file or drag & drop it here.</p>
              <span className="text-primary-750 text-xs font-normal">SVG, PNG, JPEG formats up to 5MB</span>
            </p>

            <LBClickAnimation onClick={handleButtonClick} className="px-4 py-[6px] flex items-center justify-center shadow-fade-dark rounded-lg bg-white border border-primary-50">
              <span className="text-sm tracking-[-0.084px] text-primary-250 font-medium text-center px-1">Browse File</span>
            </LBClickAnimation>
          </div>

          <input ref={documentInputRef} id="file-input" type="file" accept=".svg , .png, .jpeg" className="hidden" onChange={handleFileChange} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LBFileInput;
