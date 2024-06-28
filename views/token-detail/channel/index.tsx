'use client';
import classNames from 'classnames';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { ExclaimIcon } from '@/public/icons';
import { IChannel } from './types';
import CastRender from './cast-render';
import Right from './right';

const Channel = ({ userRole }: IChannel) => {
  const { tokenState } = useSystemFunctions();

  const { token } = tokenState;

  const noChannel = !Boolean(Object.keys(token?.socials.warpcast.channel || {}).length);

  const showRightSection = !noChannel || (noChannel && userRole === 'user');

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between gap-7 lg:gap-3.5 pb-10">
      <div className={classNames('', { ' w-full h-[40vh]': noChannel && userRole === 'admin', 'w-full lg:w-3/5': !noChannel || (noChannel && userRole === 'user') })}>
        {!noChannel && (
          <div className="w-full flex flex-col items-stretch gap-8">
            <CastRender />
          </div>
        )}

        {noChannel && (
          <div className="w-full h-full flex items-start justify-center md:pt-16">
            <div className="p-6 bg-white border border-primary-900 rounded-base shadow-table-cta flex flex-col items-center justify-center gap-1">
              <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
                <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
                  <ExclaimIcon width={28} height={28} />
                </div>
              </div>

              <h1 className="text-primary-400 text-[20px] leading-[30px] text-center">{userRole === 'user' ? 'No communities found' : 'No channels found'}</h1>
              <p className="text-primary-700 text-[14px] leading-[24px] text-center max-w-[400px]">
                {userRole === 'user'
                  ? 'This token does not have any connected community'
                  : "You don't have any farcaster channels connected to your address, use an address that is tied to farcaster to create a token"}
              </p>
            </div>
          </div>
        )}
      </div>

      {showRightSection && <Right userRole={userRole} />}
    </div>
  );
};

export default Channel;
