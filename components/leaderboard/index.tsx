import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import Image from 'next/image';
import { useAccount } from 'wagmi';

import { CopyIcon, UserIcon, CoinIcon, LinkIcon, RoundedCloseIcon } from '@/public/icons';
import { formatNumber } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useCopy from '@/hooks/useCopy';
import useIncentiveActions from '@/store/incentive/actions';
import { setAllLeaderboardMeta } from '@/store/incentive';
import LBClickAnimation from '../click-animation';
import LBTable from '../table';
import { TableItem } from '../table/types';
import useTruncateText from '@/hooks/useTruncateText';

const LBLeaderboard = ({ variant = 'private' }: ILBLeaderboard) => {
  const [shouldFetchMoreRankings, setShouldFetchMoreRankings] = useState(false);
  const [user, setUser] = useState<ILBLeaderboardUser>();
  const [showCheckScore, setShowCheckScore] = useState(true);
  const { handleCopy } = useCopy();
  const [fullURL, setFullURL] = useState('');

  const { address } = useAccount();
  const {
    incentiveState: { tokenIncentives, allLeaderboardMeta, allLeaderboardLoading, allLeaderboard, rankPosition },
    dispatch,
  } = useSystemFunctions();
  const { truncate } = useTruncateText();
  const { getAllLeaderboard } = useIncentiveActions();

  const showShouldFetchMoreRankings = shouldFetchMoreRankings || (allLeaderboardLoading && !allLeaderboard?.ranking);

  const numberOfParticipants = tokenIncentives?.participants?.length || 0;

  const actions = [
    {
      type: 'inactive',
      show: true,
      items: [
        {
          icon: <UserIcon />,
          text: `${numberOfParticipants.toLocaleString()}`,
          secondaryText: 'Participants',
          onClick: undefined,
        },
        {
          icon: <CoinIcon />,
          text: `${formatNumber(22_700_000).toUpperCase()}`,
          secondaryText: 'Total Points',
          onClick: undefined,
        },
      ],
    },
    {
      type: 'active',
      show: variant === 'private',
      items: [
        {
          icon: <LinkIcon />,
          text: 'Public link',
          secondaryText: undefined,
          onClick: () => handleCopy(`${fullURL}/leaderboard`),
        },
        {
          icon: <CopyIcon />,
          text: 'Embed',
          secondaryText: undefined,
          onClick: () => {},
        },
      ],
    },
  ];

  const leaderboard: TableItem[] = allLeaderboard?.ranking?.map(({ address, farcaster_username, points }) => ({
    name: farcaster_username || truncate(address),
    walletAvatarURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
    points,
    userType: farcaster_username ? 'farcaster' : 'wallet',
  }))!;

  const handleFindUser = () => {
    const obj: ILBLeaderboardUser = {
      name: truncate(address!) || 'Choco',
      avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
      type: 'wallet',
      position: rankPosition?.rank!,
    };

    setUser(obj);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentURL = window.location.href;
      setFullURL(currentURL);
    }
  }, [window]);

  useEffect(() => {
    if (!shouldFetchMoreRankings) return;

    const page = allLeaderboardMeta?.page! + 1;
    const limit = allLeaderboardMeta?.limit!;

    dispatch(setAllLeaderboardMeta({ page }));

    getAllLeaderboard(`page=${page}&limit=${limit}`, { onSuccess: () => setShouldFetchMoreRankings(false) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMoreRankings]);

  return (
    <div
      className={classNames('self-stretch flex-1 flex flex-col gap-3.5 md:gap-6 relative', {
        'p-6 rounded-lg border border-primary-50 mx-5 mb-10 max-h-[80vh]': variant === 'public',
        'min-h-full overflow-auto': variant !== 'public',
      })}>
      <h1 className="text-primary-650 text-[24px] leading-[38px] font-medium font-Clash-Display">Leaderboard</h1>

      <div className="flex items-center justify-between flex-wrap -mt-2.5 md:mt-0 gap-y-4">
        {actions.map(({ type, items, show }) => (
          <div key={type} className="flex items-center gap-2 flex-wrap">
            {items.map(({ icon, text, secondaryText, onClick }) => (
              <LBClickAnimation
                key={text}
                className={classNames('px-3.5 py-2.5 rounded-lg border border-primary-1950 flex items-center shadow-table-cta', {
                  'pointer-events-none gap-1': type === 'inactive',
                  hidden: !show,
                  'md:gap-1': type === 'active',
                })}
                onClick={onClick}>
                {icon}
                <p className={classNames('flex items-center justify-center gap-1 text-primary-2000 text-sm font-medium', { 'md:px-0.5': type == 'active', 'px-0.5': type === 'inactive' })}>
                  <span className={classNames('', { 'hidden md:block': type === 'active' })}>{text}</span>
                  <span className="hidden md:block">{secondaryText}</span>
                </p>
              </LBClickAnimation>
            ))}
          </div>
        ))}
      </div>

      <div className={classNames('pb-20 overflow-auto', { 'max-h-[50vh] ': variant === 'private', 'max-h-[80%]': variant === 'public' })}>
        <LBTable
          data={leaderboard || []}
          variant="secondaryAlt"
          take={allLeaderboardMeta?.limit}
          total={allLeaderboardMeta?.total}
          setShouldFetchMore={setShouldFetchMoreRankings}
          shouldFetchMore={showShouldFetchMoreRankings}
        />
      </div>

      <AnimatePresence>
        {showCheckScore && Boolean(leaderboard?.length) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-full absolute bottom-0 left-0 px-[53px] pb-[30px] flex items-center justify-center">
            <div className={classNames('w-full px-3.5 py-2.5 rounded-lg border border-primary-1950 md:flex items-center justify-center md:justify-between bg-white shadow-landing-nav', { '': !user })}>
              <span className="hidden md:block px-4 py-2.5 rounded-lg border border-primary-1950 shadow-table-cta">#{user ? user.position : '??'}</span>

              <>
                {user && (
                  <div className="hidden md:flex items-center gap-1 py-1 pl-1 pr-2 justify-center bg-primary-200 rounded-full">
                    <Image src={user.avatar} alt="avatar" width={500} height={500} className="w-4 h-4 object-cover rounded-full" />
                    <span className="text-primary-250 text-[14px] leading-[21px] font-medium">{user.name}</span>{' '}
                  </div>
                )}

                {!user && (
                  <div className="hidden md:flex items-center justify-center gap-1.5">
                    <CoinIcon />
                    <span className="text-primary-2000 text-sm font-medium">Where are you on the leaderboard?</span>
                  </div>
                )}
              </>

              <div
                className={classNames('flex items-center', {
                  'justify-between gap-3': user,
                  'justify-center': !user,
                })}>
                <LBClickAnimation
                  onClick={handleFindUser}
                  className={classNames('py-2 px-3 md:px-3.5 md:py-2.5 rounded-lg border border-primary-1950 shadow-table-cta w-fit', {
                    'pointer-events-none': user,
                  })}>
                  <span className="text-primary-2000 text-sm font-medium">{user ? "You're on the table!" : 'Check your score'}</span>
                </LBClickAnimation>

                {user && (
                  <LBClickAnimation className="md:hidden" onClick={() => setShowCheckScore(false)}>
                    <RoundedCloseIcon />
                  </LBClickAnimation>
                )}
              </div>

              {user && (
                <div className="mt-3 flex items-center gap-3 md:hidden">
                  <span className="px-3.5 py-2.5 rounded-lg border border-primary-1950 shadow-table-cta">#{user.position}</span>
                  <div className="flex items-center gap-1 py-1 pl-1 pr-2 justify-center bg-primary-200 rounded-full">
                    <Image src={user.avatar} alt="avatar" width={500} height={500} className="w-4 h-4 object-cover rounded-full" />
                    <span className="text-primary-250 text-[14px] leading-[21px] font-medium">{user.name}</span>{' '}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LBLeaderboard;
