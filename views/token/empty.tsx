import Link from 'next/link';

import { LBButton } from '@/components';
import { LaunchIcon } from '@/public/icons';
import { EmptyProps } from './types';

const EmptyState = ({ network }: EmptyProps) => {
  return (
    <div className="flex flex-col gap-3.5 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
          <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
            <LaunchIcon width={28} height={28} />
          </div>
        </div>

        <h1 className="text-primary-400 text-[20px] leading-[30px] text-center">No tokens yet</h1>
        <span className="text-primary-700 text-[14px] leading-[24px] text-center">You haven’t launched a new token yet, new tokens will show here</span>
      </div>

      <Link href="/tokens/new">
        <LBButton text="Create token" network={network} variant="new" />
      </Link>
    </div>
  );
};

export default EmptyState;
