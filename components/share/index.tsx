import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

import { ShareIcon, CopyIcon, CheckAltIcon, XIcon } from '@/public/icons';
import useCopy from '@/hooks/useCopy';
import LBClickAnimation from '../click-animation';

const LBShare = ({ token_address }: ILBShare) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const copy = useCopy();

  const handleClick = () => setIsOpen((prev) => !prev);

  const handleCopy = () => {
    copy(token_address!);
    setHasCopied(true);
  };

  const handleShareOnX = () => {
    window.open(`https://x.com/intent/tweet?text=Check out this token&url=${window.location.href}`, '_blank');
  };

  const items = [
    {
      icons: [<CopyIcon key="copy" width={16} height={16} />, <CheckAltIcon key="check" width={16} height={16} />],
      text: 'Copy',
      onClick: handleCopy,
    },
    {
      icon: <XIcon width={16} height={16} />,
      text: 'Share on X',
      onClick: handleShareOnX,
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasCopied(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [hasCopied]);

  return (
    <div className="relative w-full">
      <LBClickAnimation onClick={handleClick} className="flex items-center justify-center gap-1 cursor-pointer px-3.5 py-2.5 bg-white border border-primary-1950 rounded-lg shadow-table-cta w-full">
        <ShareIcon />
      </LBClickAnimation>

      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            key={+isOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-[200%] min-w-36 right-0 bg-white border border-primary-1950 rounded-lg shadow-table-cta flex flex-col items-stretch justify-center gap-5 px-3.5 py-2.5">
            {items.map(({ icons, icon, text, onClick }, index) => (
              <LBClickAnimation key={index} className="flex items-center justify-between gap-1 cursor-pointer" onClick={onClick}>
                {icons && (
                  <div className="flex items-center gap-1">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={+hasCopied}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        exit={{ opacity: 0 }}
                        className={classNames('', { 'pointer-events-none': hasCopied })}>
                        {icons[+hasCopied]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}

                {icon && icon}

                <span className="text-primary-700 text-[14px] leading-[16px] whitespace-nowrap">{text}</span>
              </LBClickAnimation>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LBShare;