import Link from 'next/link';

import { LBButton } from '@/components';
import { LaunchIcon } from '@/public/icons';

const EmptyState = ({ isSecondary = false }: { isSecondary?: boolean }) => {
  const titleToShow = isSecondary ? 'No tokens on Launchbox yet' : 'No tokens launched';
  const subtitleToShow = isSecondary ? 'No tokens haven been launched yet, new tokens will show here' : 'You haven’t launched a new token yet, new tokens will show here';
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
          <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
            <LaunchIcon width={28} height={28} />
          </div>
        </div>

        <h1 className="text-primary-650 text-[20px] leading-[30px] text-center tracking-[0.4px] font-Clash-Display font-semibold">{titleToShow}</h1>

        <p className="text-primary-700 text-base text-center max-w-[304px]">{subtitleToShow}</p>
      </div>

      <Link href="/token/new">
        <LBButton text="Create a token" variant="new" />
      </Link>
    </div>
  );
};

export default EmptyState;
