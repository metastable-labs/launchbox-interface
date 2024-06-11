import useTruncateText from '@/hooks/useTruncateText';
import Image from 'next/image';
import { IAddress } from './types';

const Address = ({ wallet, walletAvatarURL }: IAddress) => {
  const { truncatedText } = useTruncateText(wallet, 5, 5);
  return (
    <div className="flex items-center gap-2">
      <Image
        src={walletAvatarURL || 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1717871583/Avatar_1.0_npmw4c.jpg'}
        alt={`${walletAvatarURL} icon`}
        width={20}
        height={20}
        className="w-[10.7px] h-[10.9px] object-cover"
      />

      <span className="text-primary-650 text-sm font-medium">{truncatedText}</span>
    </div>
  );
};

export default Address;
