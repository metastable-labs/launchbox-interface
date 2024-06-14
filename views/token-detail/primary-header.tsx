import Link from 'next/link';
import classNames from 'classnames';

import { LBClickAnimation } from '@/components';
import { HomeIcon, RightCarretLightIcon, UpandDownIcon } from '@/public/icons';

const PrimaryHeader = ({ userRole }: { userRole: 'admin' | 'user' }) => {
  let href = '/';
  if (userRole === 'admin') {
    href = '/token';
  }
  return (
    <div className={classNames('self-stretch items-center', { 'px-5 pb-5': userRole === 'admin' })}>
      <div className="w-full flex justify-start items-center gap-3 text-primary-700 text-sm font-medium">
        <Link href={href}>
          <LBClickAnimation>
            {userRole === 'admin' && <HomeIcon />} {userRole === 'user' && <UpandDownIcon width={20} height={20} color="#0A0D14" />}
          </LBClickAnimation>
        </Link>

        <RightCarretLightIcon />

        <span>Token details</span>
      </div>
    </div>
  );
};

export default PrimaryHeader;
