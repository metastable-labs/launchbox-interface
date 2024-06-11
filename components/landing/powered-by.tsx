import classNames from 'classnames';

import { Flashicon } from '@/public/icons';
import { IPoweredBy } from './types';

const PoweredBy = ({ isBuilder, isDesktop, isMobile }: IPoweredBy) => (
  <div
    className={classNames('flex items-center justify-center bg-primary-1600', {
      'gap-2 h-8 py-3 pl-3 pr-4 rounded-full': !isBuilder,
      'gap-[5.01px] h-5 py-[7.52px] pl-[7.52px] pr-[10.02px] rounded-full': isBuilder && (isDesktop || isMobile),
    })}>
    <Flashicon width={isBuilder ? 11.3 : undefined} height={isBuilder ? 11.3 : undefined} />
    <span
      className={classNames('text-primary-1450 font-medium', {
        'text-[14px] leading-[22.4px]': !isBuilder,
        'text-[8.769px] leading-[14px]': isBuilder && isDesktop,
        'text-sm': isBuilder && isMobile,
      })}>
      Powered by Launchbox
    </span>
  </div>
);

export default PoweredBy;
