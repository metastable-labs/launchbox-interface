import classNames from 'classnames';
import Image from 'next/image';

const LBBadge = ({ variant }: ILBBadge) => {
  let image;

  switch (variant) {
    case 'base':
      image = '/icons/base-primary-mobile-icon.svg';
      break;
    case 'optimism':
      image = '/icons/optimism-primary-mobile-icon.svg';
      break;
    case 'mode':
      image = '/icons/mode-primary-mobile-icon.svg';
      break;
    case 'warpcast':
      image = '/icons/small-farcaster-icon.svg';
      break;
    default:
      image = '/icons/base-primary-mobile-icon.svg';
      break;
  }

  return (
    <div
      className={classNames('py-1 pl-1 pr-3 flex items-center justify-center gap-0.5 rounded-full transition-colors duration-300', {
        'bg-primary-300': variant === 'base',
        'bg-primary-3150': variant === 'optimism',
        'bg-primary-3200': variant === 'mode',
        'bg-primary-3250': variant === 'warpcast',
      })}>
      <Image src={image} alt="badge-image" width={200} height={200} className="w-4 h-4 object-cover" />
      <span
        className={classNames('uppercase text-[14px] leading-[21px] font-medium', {
          'text-primary-1000': variant === 'base',
          'text-primary-1050': variant === 'optimism',
          'text-primary-1300': variant === 'mode',
          'text-primary-3100': variant === 'warpcast',
        })}>
        {variant}
      </span>
    </div>
  );
};

export default LBBadge;
