'use client';

import SMClickAnimation from '@/components/click-animation';
import useCopy from '@/hooks/useCopy';
import useTruncateText from '@/hooks/useTruncateText';
import { DisconnectIcon, CopyIcon, WalletIcon } from '@/public/icons';

const address = '0x1234567890123456789012345678901234567890';

const WalletModal = ({ close, network }: { close: () => void; network: string }) => {
  const copy = useCopy();
  const { truncatedText } = useTruncateText((address as string) || '', 6, 6);

  return (
    <div className="flex flex-col gap-6 min-w-[300px] md:min-w-80">
      <h1 className="text-[20px] leading-[30px] text-primary-400 text-left font-medium flex items-center gap-1  -mt-10">
        <WalletIcon />
        {truncatedText}
      </h1>
      <div className="flex items-center justify-center gap-3">
        <SMClickAnimation className="flex-1 bg-primary-200 flex items-center justify-center p-3 rounded-base" onClick={() => copy(address as string)}>
          <div className="flex flex-col items-center justify-center gap-2">
            <CopyIcon />
            <span className="text-primary-150 text-[14px] leading-[21.7px] font-medium text-center">Copy address</span>
          </div>
        </SMClickAnimation>

        <SMClickAnimation className="flex-1 bg-primary-200 flex items-center justify-center p-3 rounded-base" onClick={() => {}}>
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
