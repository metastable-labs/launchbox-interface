'use client';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { useCookies } from 'react-cookie';

import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';
import SMClickAnimation from '@/components/click-animation';
import useCopy from '@/hooks/useCopy';
import useTruncateText from '@/hooks/useTruncateText';
import { DisconnectIcon, CopyIcon, WalletIcon, CheckAltIcon } from '@/public/icons';

const WalletModal = ({ close }: { close: () => void }) => {
  const { ready, authenticated, logout } = usePrivy();
  const { address } = useAccount();
  const { handleCopy, hasCopied } = useCopy();
  const { truncatedText } = useTruncateText((address as string) || '', 6, 6);
  const [cookies, setCookie] = useCookies(['authtoken']);

  const icons = [<CopyIcon key="copy" />, <CheckAltIcon key="check" width={20} height={20} />];

  const handleDisconnect = async () => {
    if (authenticated && !ready) return;

    await logout();
    setCookie('authtoken', null);
    close();
  };

  return (
    <div className="flex flex-col gap-6 min-w-[300px] md:min-w-80">
      <h1 className="text-[20px] leading-[30px] text-primary-400 text-left font-medium flex items-center gap-1  -mt-10">
        <WalletIcon />
        {truncatedText}
      </h1>

      <div className="flex items-center justify-center gap-3">
        <SMClickAnimation className="flex-1 bg-primary-200 flex items-center justify-center p-3 rounded-base" onClick={() => handleCopy(address as string)}>
          <div className="flex flex-col items-center justify-center gap-2">
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
            <span className="text-primary-150 text-[14px] leading-[21.7px] font-medium text-center">Copy address</span>
          </div>
        </SMClickAnimation>

        <SMClickAnimation className="flex-1 bg-primary-200 flex items-center justify-center p-3 rounded-base" onClick={handleDisconnect}>
          <div className="flex flex-col items-center justify-center gap-2">
            <DisconnectIcon />
            <span className="text-primary-150 text-[14px] leading-[21.7px] font-medium text-center">Disconnect</span>
          </div>
        </SMClickAnimation>
      </div>
    </div>
  );
};

export default WalletModal;
