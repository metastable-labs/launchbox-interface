import Link from 'next/link';

import { LBClickAnimation } from '@/components';
import { HomeIcon, RightCarretLightIcon } from '@/public/icons';

const PrimaryHeader = () => (
  <div className="pb-5 self-stretch items-center border-b border-primary-950">
    <div className="w-full flex justify-start items-center gap-3 text-primary-700 text-sm font-medium">
      <Link href={'/token'}>
        <LBClickAnimation>
          <HomeIcon />
        </LBClickAnimation>
      </Link>

      <RightCarretLightIcon />

      <Link href={`/token`}>
        <LBClickAnimation>Token</LBClickAnimation>
      </Link>

      <RightCarretLightIcon />

      <span className="pointer-events-none">New Token</span>
    </div>
  </div>
);

export default PrimaryHeader;
