import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import { ExclaimIcon, TimerIcon } from '@/public/icons';
import { LBClickAnimation, LBLeaderboard } from '@/components';
import useSocialActions from '@/store/social/actions';
import Configuration from './configuration';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const Leaderboard = () => {
  const { address } = useAccount();
  const {
    incentiveState: { systemIncentiveChannels, tokenIncentives },
  } = useSystemFunctions();
  const { authenticated } = usePrivy();
  const { getFarcasterChannels } = useSocialActions();
  const [hasLeaderboard, setHasLeaderboard] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState<string>();

  const nftConfigured = tokenIncentives?.incentives?.find((item) => item.name === 'NFT');
  const farcasterConfigured = tokenIncentives?.incentives?.find((item) => item.name === 'FARCASTER');

  const incentiveActions: Action[] =
    systemIncentiveChannels?.map(({ slug, name, info }) => ({
      image: `/images/${slug}.png`,
      title: name,
      description: info,
      onClick: () => setShowConfiguration(slug),
      actionText: name === 'NFT' && nftConfigured ? 'Edit' : name === 'FARCASTER' && farcasterConfigured ? 'Edit' : 'Configure',
    })) || [];

  const actions: Action[] = [
    ...incentiveActions,
    { image: '/images/audius.png', title: 'Audius', description: 'Music', comingSoon: true },
    { image: '/images/liquidity.png', title: 'Liquidity', secondaryTitle: 'Provision', description: 'Action', comingSoon: true },
  ];

  const isEdit = (showConfiguration === 'nft' && Boolean(nftConfigured)) || (showConfiguration === 'farcaster' && Boolean(farcasterConfigured));

  useEffect(() => {
    getFarcasterChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, authenticated]);

  useEffect(() => {
    if (nftConfigured || farcasterConfigured) setHasLeaderboard(true);
  }, [nftConfigured, farcasterConfigured]);
  return (
    <>
      <div className={classNames('flex flex-col lg:flex-row gap-6 lg:gap-3.5 pb-10', {})}>
        <div
          className={classNames('lg:p-6 lg:rounded-lg lg:border lg:border-primary-50 h-fit flex flex-col gap-9', {
            'w-full lg:w-1/2': !hasLeaderboard,
            'w-full lg:w-2/5': hasLeaderboard,
          })}>
          <div className="hidden lg:flex flex-col gap-1 self-stretch lg:px-5">
            <h1 className="text-[24px] leading-[38px] font-medium text-primary-650 font-Clash-Display">Actions</h1>
            <p className="text-primary-700">Create new actions and build incentives systems for your community</p>
          </div>

          <div className="self-stretch flex flex-col">
            {actions.map(({ comingSoon, description, image, title, secondaryTitle, onClick, actionText }, index) => (
              <div className="p-6 self-stretch flex items-center justify-between gap-2 flex-wrap rounded-[3px] border-[0.3px] border-primary-200" key={index}>
                <div className="flex items-center gap-4 xl:max-w-[70%]">
                  <Image src={image} width={500} height={500} alt={title} className="w-[34px] h-[34px] object-cover" />

                  <div className="flex flex-col gap-1">
                    <h1 className="text-[16px] leading-[28px] font-medium text-primary-650 font-Clash-Display">
                      {title}
                      {secondaryTitle && <span className="hidden sm:inline"> {secondaryTitle}</span>}
                    </h1>
                    <p className="text-[14px] leading-[16px] text-primary-700">{description}</p>
                  </div>
                </div>

                {!comingSoon && (
                  <LBClickAnimation
                    onClick={onClick}
                    className="px-3.5 py-2.5 flex items-center justify-center bg-white rounded-lg border border-primary-1950 shadow-table-cta min-w-20 lg:min-w-[100px]">
                    <span className="text-sm font-semibold text-primary-2000">{actionText}</span>
                  </LBClickAnimation>
                )}

                {comingSoon && (
                  <div className="flex items-center justify-center gap-0.5 py-1 pl-1 pr-2 rounded-full bg-primary-200">
                    <TimerIcon color="#525866" />
                    <span className="text-primary-250 text-[14px] leading-[21px] font-medium">Coming soon</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className={classNames('mt-10 lg:mt-0 lg:p-6 lg:rounded-lg lg:border lg:border-primary-50', {
            'w-full lg:w-1/2 flex items-center justify-center min-h-full': !hasLeaderboard,
            'w-full lg:w-3/5': hasLeaderboard,
          })}>
          {!hasLeaderboard && (
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center justify-center bg-very-light-gray rounded-full border-t border-primary-900 p-4">
                <div className="flex items-center justify-center rounded-full border border-primary-50 bg-white p-[14px] shadow-fade-light">
                  <ExclaimIcon width={16} height={16} />
                </div>
              </div>

              <h1 className="text-primary-400 text-[20px] leading-[30px] text-center font-Clash-Display">No leaderboards yet</h1>
              <p className="text-primary-700 text-[14px] leading-[24px] text-center max-w-[275px]">you don’t have any leaderboard yet, configure a new action to create one.</p>
            </div>
          )}

          {hasLeaderboard && <LBLeaderboard />}
        </div>
      </div>

      <Configuration close={() => setShowConfiguration(undefined)} show={Boolean(showConfiguration)} variant={showConfiguration} isEdit={isEdit} />
    </>
  );
};

export default Leaderboard;
